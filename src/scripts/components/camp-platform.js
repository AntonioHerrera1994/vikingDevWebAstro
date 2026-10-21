// AD Platform: revelado de cada sección de plataforma + preselección en el cotizador.
import { reveal } from '../utils/reveal.js';
import '../utils/quoter-select.js';

document.querySelectorAll('[data-camp-pf]').forEach((section) => reveal(section));
