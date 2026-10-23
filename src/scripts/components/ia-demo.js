
import { reveal } from '../utils/reveal.js';

const root = document.querySelector('[data-ia-demo]');

if (root) {
  reveal(root);

  const data = JSON.parse(root.querySelector('[data-ia-demo-data]').textContent);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const log = root.querySelector('[data-ia-log]');
  const form = root.querySelector('[data-ia-form]');
  const input = root.querySelector('[data-ia-input]');
  const sendBtn = form.querySelector('button[type="submit"]');
  const micBtn = root.querySelector('[data-ia-mic]');
  const voiceBtn = root.querySelector('[data-ia-voice]');
  const voiceNote = root.querySelector('[data-ia-voice-note]');
  const chips = Array.from(root.querySelectorAll('[data-ia-action]'));
  const agendaEl = root.querySelector('[data-ia-agenda]');
  const clientsEl = root.querySelector('[data-ia-clients]');
  const servicesEl = root.querySelector('[data-ia-services]');
  const cards = {
    agenda: root.querySelector('[data-ia-card="agenda"]'),
    income: root.querySelector('[data-ia-card="income"]'),
    clients: root.querySelector('[data-ia-card="clients"]'),
    services: root.querySelector('[data-ia-card="services"]'),
  };
  const firstMessage = log.innerHTML;
  const defaultPlaceholder = input.placeholder;
  const V = data.voice;

  let state;
  let done;
  let busy = false;

  /* ── Utilidades ── */
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const DAY_ORDER = { Hoy: 0, Mañana: 1 };
  // Para texto libre: primero las intenciones más específicas
  // ("pasa la cita…" debe ser mover, no agendar)
  const MATCH_ORDER = ['inasistencia', 'mover', 'servicio', 'agendar', 'ventas', 'clientes'];
  const fmtTime = (t) => {
    const [h, m] = t.split(':').map(Number);
    return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'p.m.' : 'a.m.'}`;
  };
  const tone = (s) =>
    s === 'Pagada' ? 'ok' : s === 'Inasistencia' ? 'bad' : s.startsWith('Anticipo') ? 'warn' : 'neutral';

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text; // siempre textContent: nada de HTML del usuario
    return node;
  };

  /* ══ Voz del agente (síntesis) ══════════════════════════ */
 const synth = null;
  let voiceOn = false;
  let esVoice = null;

  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    esVoice =
      voices.find((v) => v.lang === V.lang) ||
      voices.find((v) => v.lang.startsWith('es-') && /mex|latin|419|us/i.test(v.lang + v.name)) ||
      voices.find((v) => v.lang.startsWith('es')) ||
      null;
  }

  // Limpia el texto para que suene natural: sin símbolos, "$2,350" → "2350 pesos"
  const speakable = (text) =>
    text
      .replace(/\s*✓\s*/g, '. ') // "Hecho ✓ Moví…" → "Hecho. Moví…" (pausa natural)
      .replace(/👋/g, '')
      .replace(/\$\s?([\d,]+)/g, (_, n) => `${n.replace(/,/g, '')} pesos`)
      .replace(/p\.m\./g, 'de la tarde')
      .replace(/a\.m\./g, 'de la mañana')
      .replace(/\s+/g, ' ')
      .trim();

  function speak(text) {
    if (!synth || !voiceOn) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(speakable(text));
    u.lang = V.lang;
    if (esVoice) u.voice = esVoice;
    u.rate = 1.05;
    synth.speak(u);
  }

  function setVoice(on) {
    voiceOn = on;
    voiceBtn.setAttribute('aria-pressed', String(on));
    voiceBtn.setAttribute('aria-label', on ? 'Silenciar la voz del agente' : 'Activar la voz del agente');
    if (!on && synth) synth.cancel();
  }

  if (synth && voiceBtn) {
    voiceBtn.hidden = false;
    pickVoice();
    synth.addEventListener?.('voiceschanged', pickVoice);
    voiceBtn.addEventListener('click', () => setVoice(!voiceOn));
  }

  /* ══ Dictado (reconocimiento de voz) */
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  let listening = false;

  function setListening(on) {
    listening = on;
    micBtn.setAttribute('aria-pressed', String(on));
    micBtn.classList.toggle('is-listening', on);
    form.classList.toggle('is-listening', on);
    input.placeholder = on ? V.listening : defaultPlaceholder;
  }

  if (Recognition && micBtn) {
    micBtn.hidden = false;
    if (voiceNote) voiceNote.hidden = false;

    rec = new Recognition();
    rec.lang = V.lang;
    rec.interimResults = true; // muestra el texto mientras hablas
    rec.continuous = false;
    rec.maxAlternatives = 1;

    let finalText = '';

    rec.addEventListener('start', () => {
      finalText = '';
      input.value = '';
      setListening(true);
    });

    rec.addEventListener('result', (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      input.value = (finalText + interim).trim();
    });

    rec.addEventListener('error', (e) => {
      setListening(false);
      if (e.error === 'aborted') return;
      const msg =
        e.error === 'not-allowed' || e.error === 'service-not-allowed'
          ? V.denied
          : e.error === 'no-speech'
            ? V.noSpeech
            : V.error;
      addMessage('agent ia-demo__msg--info', msg, 'Aviso');
    });

    rec.addEventListener('end', () => {
      setListening(false);
      const text = (finalText || input.value).trim();
      input.value = '';
      if (text) {
        // Si te hablaron por voz, el agente contesta con voz
        if (synth && !voiceOn) setVoice(true);
        handle(text);
      }
    });

    micBtn.addEventListener('click', () => {
      if (busy) return;
      if (listening) {
        rec.stop(); // termina y procesa lo que se dijo
        return;
      }
      if (synth) synth.cancel(); // que el micrófono no escuche al propio agente
      try {
        rec.start();
      } catch {
        /* ya estaba escuchando */
      }
    });
  }

  /* ── Panel ── */
  function renderAgenda(newId) {
    const list = [...state.appointments].sort(
      (a, b) => (DAY_ORDER[a.day] ?? 9) - (DAY_ORDER[b.day] ?? 9) || a.time.localeCompare(b.time)
    );
    agendaEl.replaceChildren(
      ...list.map((a) => {
        const li = el('li', 'ia-demo__appt' + (a.id === newId ? ' is-new' : ''));
        li.dataset.id = a.id;
        const time = el('span', 'ia-demo__time');
        time.append(el('small', null, a.day), document.createTextNode(fmtTime(a.time)));
        const client = el('span', 'ia-demo__client');
        client.append(el('strong', null, a.client), document.createTextNode(a.service));
        li.append(time, client, el('span', `ia-demo__status is-${tone(a.status)}`, a.status));
        return li;
      })
    );
    clientsEl.textContent = state.clients;
    servicesEl.textContent = state.services;
  }

  function flash(keys = []) {
    keys.forEach((k) => {
      const card = cards[k];
      if (!card) return;
      card.classList.remove('is-flash');
      void card.offsetWidth; // reinicia la animación
      card.classList.add('is-flash');
      setTimeout(() => card.classList.remove('is-flash'), 1600);
    });
  }

  function applyEffects(fx = {}) {
    let newId = null;
    if (fx.add) {
      state.appointments.push({ ...fx.add });
      newId = fx.add.id;
    }
    if (fx.move) {
      const a = state.appointments.find((x) => x.id === fx.move.id);
      if (a) a.time = fx.move.time;
    }
    if (fx.status) {
      const a = state.appointments.find((x) => x.id === fx.status.id);
      if (a) a.status = fx.status.status;
    }
    if (fx.clients) state.clients += fx.clients;
    if (fx.services) state.services += fx.services;
    renderAgenda(newId);
    flash(fx.flash);
  }

  /* ── Chat ── */
  function scrollLog() {
    log.scrollTop = log.scrollHeight; // solo dentro del chat, no mueve la página
  }

  function addMessage(from, text, label) {
    const li = el('li', `ia-demo__msg ia-demo__msg--${from}`);
    if (label) li.append(el('span', 'ia-demo__exec', label));
    li.append(document.createTextNode(text));
    log.append(li);
    scrollLog();
  }

  function setBusy(value) {
    busy = value;
    sendBtn.disabled = value;
    if (micBtn) micBtn.disabled = value;
    chips.forEach((c) => (c.disabled = value || c.classList.contains('is-done')));
  }

  async function agentSays(text, label, effects) {
    const typing = el('li', 'ia-demo__typing');
    typing.setAttribute('aria-label', 'El agente está escribiendo');
    typing.append(el('span'), el('span'), el('span'));
    log.append(typing);
    scrollLog();
    await wait(900);
    typing.remove();
    addMessage(label === 'Aviso' ? 'agent ia-demo__msg--info' : 'agent', text, label);
    if (effects) applyEffects(effects);
    speak(text);
  }

  async function handle(text, forcedAction) {
    if (busy || !text.trim()) return;
    setBusy(true);
    addMessage('you', text.trim());

    const q = normalize(text);
    const action =
      forcedAction ||
      MATCH_ORDER.map((id) => data.actions.find((a) => a.id === id))
        .filter(Boolean)
        .find((a) => a.keywords.some((k) => q.includes(normalize(k))));

    if (!action) {
      await agentSays(data.fallback, 'Aviso');
    } else if (done.has(action.id)) {
      await agentSays(data.repeated, 'Aviso');
    } else {
      done.add(action.id);
      const chip = chips.find((c) => c.dataset.iaAction === action.id);
      if (chip) chip.classList.add('is-done');
      await agentSays(action.reply, '✓ Ejecutado', action.effects);
    }
    setBusy(false);
  }

  /* ── Eventos ── */
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      const action = data.actions.find((a) => a.id === chip.dataset.iaAction);
      handle(action.chip, action);
    })
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    handle(text);
  });

  function reset() {
    if (synth) synth.cancel();
    if (rec && listening) rec.abort();
    state = structuredClone(data.state);
    done = new Set();
    log.innerHTML = firstMessage;
    chips.forEach((c) => c.classList.remove('is-done'));
    setBusy(false);
    renderAgenda();
  }

  root.querySelector('[data-ia-reset]').addEventListener('click', reset);

  // Si el visitante sale de la página o cambia de pestaña, el agente deja de hablar
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && synth) synth.cancel();
  });

  reset();
}
