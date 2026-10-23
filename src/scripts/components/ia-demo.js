// IA Demo: simulador del agente. Lee el guion de <script data-ia-demo-data>,
// responde a chips o texto libre y actualiza el panel del negocio.
import { reveal } from '../utils/reveal.js';

const root = document.querySelector('[data-ia-demo]');

if (root) {
  reveal(root);

  const data = JSON.parse(root.querySelector('[data-ia-demo-data]').textContent);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const log = root.querySelector('[data-ia-log]');
  const form = root.querySelector('[data-ia-form]');
  const input = root.querySelector('[data-ia-input]');
  const sendBtn = form.querySelector('button');
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
    state = structuredClone(data.state);
    done = new Set();
    log.innerHTML = firstMessage;
    chips.forEach((c) => c.classList.remove('is-done'));
    setBusy(false);
    renderAgenda();
  }

  root.querySelector('[data-ia-reset]').addEventListener('click', reset);
  reset();
}
