// HL WhatsApp: revelado + conversación que aparece mensaje por mensaje
// (con indicador "escribiendo" antes de cada respuesta automática).
import { reveal } from '../utils/reveal.js';

const section = document.querySelector('[data-hl-wa]');

if (section) {
  reveal(section);

  const chat = section.querySelector('[data-hl-wa-chat]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (chat && !reduce && 'IntersectionObserver' in window) {
    const msgs = Array.from(chat.querySelectorAll('.hl-wa__msg'));
    const typing = chat.querySelector('.hl-wa__typing');
    chat.classList.add('is-animated');

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const play = async () => {
      for (const msg of msgs) {
        if (msg.classList.contains('hl-wa__msg--auto')) {
          chat.insertBefore(typing, msg); // el indicador aparece donde irá la respuesta
          typing.classList.add('is-on');
          await wait(900);
          typing.classList.remove('is-on');
        } else {
          await wait(500);
        }
        msg.classList.add('is-shown');
      }
      chat.appendChild(typing);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        play();
      },
      { threshold: 0.4 }
    );
    io.observe(chat);
  }
}
