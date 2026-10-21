// src/data/paginas-web.ts
// Contenido de /paginas-web-tijuana/. Edita textos y precios aquí, no en los componentes.

export const pwMeta = {
  title: 'Páginas Web en Tijuana desde $6,000 | VikingDev',
  description:
    'Landing pages, páginas web completas y tiendas en línea en Tijuana, con SEO y hosting por un año. Entrega en 5 a 10 días hábiles. Cotiza gratis.',
  url: 'https://vikingdevtj.com/paginas-web-tijuana/',
  image: 'https://vikingdevtj.com/og-image.jpg',
};

// Rutas de los otros pilares (enlaces puente)
export const pwLinks = {
  ads: '/publicidad-google-facebook-tijuana/',
  crm: '/crm-gohighlevel/',
};

export const pwHero = {
  h1Main: 'Páginas web en Tijuana',
  h1Accent: 'diseñadas para vender',
  intro:
    'Somos especialistas en diseño de páginas web en Tijuana: landing pages, páginas web completas y tiendas en línea con diseño web a la medida, SEO incluido y hosting por un año. Hacemos desarrollo web rápido y pensado para que cada visita termine en un mensaje de WhatsApp, un formulario o una venta.',
  chips: ['Desde $6,000 MXN + IVA', 'Entrega en 5 a 10 días hábiles', 'Hosting 1 año incluido'],
  proof: 'Más de 30 proyectos entregados · Respuesta en menos de 24 hrs',
};

export const pwSubnav = [
  { id: 'incluye', label: 'Qué incluye' },
  { id: 'landing', label: 'Landing page' },
  { id: 'pagina-completa', label: 'Página completa' },
  { id: 'tienda-en-linea', label: 'Tienda en línea' },
  { id: 'seo', label: 'SEO y mantenimiento' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'faq', label: 'Preguntas' },
];

export type PwIcon = 'target' | 'bolt' | 'search' | 'phone' | 'chat' | 'chart' | 'server';

export const pwBeneficios: { icon: PwIcon; title: string; text: string }[] = [
  {
    icon: 'target',
    title: 'Diseñada para convertir visitas en clientes',
    text: 'Cada sección guía al visitante hacia una acción: escribirte por WhatsApp, llenar un formulario o comprar. Diseño personalizado basado en tu marca, no plantillas genéricas.',
  },
  {
    icon: 'bolt',
    title: 'Carga en menos de 2 segundos',
    text: 'Optimizada para Core Web Vitals. Una página lenta pierde visitas y posiciones en Google.',
  },
  {
    icon: 'search',
    title: 'SEO on-page desde el inicio',
    text: 'Títulos, encabezados, estructura y velocidad listos para posicionar en Google.',
  },
  {
    icon: 'phone',
    title: 'Mobile first',
    text: 'La mayoría de tus clientes te visita desde el celular. Diseñamos primero para móvil.',
  },
  {
    icon: 'chat',
    title: 'WhatsApp y formularios',
    text: 'Botón flotante de WhatsApp y formularios estratégicos para que te contacten en un clic.',
  },
  {
    icon: 'chart',
    title: 'Google Analytics y Meta Pixel',
    text: 'Mide visitas y conversiones desde el primer día y prepara tu página para campañas de anuncios.',
  },
  {
    icon: 'server',
    title: 'Hosting por un año incluido',
    text: 'Incluido en todos los paquetes de páginas web, sin pagos extra el primer año.',
  },
];

export interface PwBridge {
  before: string;
  anchor: string;
  after: string;
  href: string;
}

export interface PwPlan {
  id: string;
  label: string;
  h2: string;
  lead: string;
  ideal: string;
  price: string;
  priceValue: number;
  period: string;
  delivery: string;
  highlight?: boolean;
  features: string[];
  bridge: PwBridge;
  cta: string;
}

export const pwPlanes: PwPlan[] = [
  {
    id: 'landing',
    label: 'Lanzamiento rápido',
    h2: 'Landing page en Tijuana',
    lead: 'Una sola página enfocada en un objetivo concreto: recibir mensajes, agendar citas o captar prospectos de una campaña. Rápida de lanzar y fácil de medir.',
    ideal: 'emprendedores, freelancers, eventos, lanzamientos de producto y campañas de publicidad.',
    price: '$6,000',
    priceValue: 6000,
    period: 'MXN + IVA · pago único',
    delivery: '5 a 7 días hábiles',
    features: [
      'Diseño personalizado basado en tu marca',
      '1 página con scroll fluido y de 3 a 6 secciones',
      'Diseño responsive para móvil, tablet y escritorio',
      'Formulario de contacto y WhatsApp flotante',
      'Blog con hasta 2 entradas',
      'SEO básico on-page',
      'Google Analytics integrado',
      '2 rondas de revisiones',
      'Hosting por un año incluido',
    ],
    bridge: {
      before: '¿Vas a invertir en anuncios? Diseñamos ',
      anchor: 'landing pages para tus campañas en Google y Facebook',
      after: ' que convierten cada clic en un prospecto.',
      href: pwLinks.ads,
    },
    cta: 'Cotizar landing page',
  },
  {
    id: 'pagina-completa',
    label: 'Más popular',
    h2: 'Página web completa para tu negocio',
    lead: 'Si buscas una página web para tu negocio con presencia profesional completa, este es el paquete: de 5 a 8 páginas navegables, blog y funciones como calendarios, galerías o chatbot.',
    ideal: 'empresas establecidas, consultorios, despachos y servicios profesionales.',
    price: '$7,000',
    priceValue: 7000,
    period: 'MXN + IVA · pago único',
    delivery: '5 a 7 días hábiles',
    highlight: true,
    features: [
      'Diseño personalizado basado en tu marca',
      'De 5 a 8 páginas navegables',
      'Diseño responsive para móvil, tablet y escritorio',
      'Formularios en todas las páginas y WhatsApp',
      'Blog con hasta 4 entradas',
      'SEO técnico optimizado',
      'Calendarios, galerías, chatbot y más',
      'Google Analytics integrado',
      '3 rondas de revisiones',
      'Hosting por un año incluido',
    ],
    bridge: {
      before: 'Cada formulario puede llegar directo a tu sistema de ventas: ',
      anchor: 'conecta tus formularios a un CRM',
      after: ' y da seguimiento automático a cada prospecto.',
      href: pwLinks.crm,
    },
    cta: 'Cotizar página web completa',
  },
  {
    id: 'tienda-en-linea',
    label: 'Vende en línea',
    h2: 'Tienda en línea en Tijuana',
    lead: 'Una página web para vender productos las 24 horas: carrito de compras, checkout optimizado, múltiples métodos de pago y facturas automáticas.',
    ideal: 'tiendas, marcas de producto y emprendedores que quieren vender en línea.',
    price: '$10,000',
    priceValue: 10000,
    period: 'MXN + IVA · pago único',
    delivery: '7 a 10 días hábiles',
    features: [
      'Diseño de tienda personalizado',
      'De 5 a 8 páginas navegables',
      'Carrito de compras y checkout optimizado',
      'Catálogo de hasta 50 productos',
      'Múltiples métodos de pago',
      'Facturas PDF automáticas',
      'SEO técnico y Meta Pixel integrado',
      'Google Analytics integrado',
      '3 rondas de revisiones',
      'Hosting por un año incluido',
    ],
    bridge: {
      before: 'Incluye Meta Pixel para lanzar ',
      anchor: 'anuncios de Facebook e Instagram para tu tienda',
      after: ' y volver a mostrarle tus productos a quien no terminó su compra.',
      href: pwLinks.ads,
    },
    cta: 'Cotizar tienda en línea',
  },
];

export const pwSeo = {
  label: 'Consultoría y SEO',
  h2: 'SEO en Tijuana y mantenimiento de páginas web',
  lead: 'Una página web no termina el día del lanzamiento. Como agencia SEO en Tijuana, trabajamos tu SEO local, mejoramos tu posicionamiento web en Google y mantenemos tu sitio seguro y actualizado mes con mes.',
  pillars: [
    {
      title: 'SEO técnico',
      text: 'Velocidad, Core Web Vitals, estructura y schema para que Google entienda y priorice tu sitio.',
    },
    {
      title: 'SEO local en Tijuana',
      text: 'Optimizamos tu página para aparecer cuando tus clientes buscan tu servicio en Tijuana.',
    },
    {
      title: 'Mantenimiento web',
      text: 'Actualizaciones, respaldos, monitoreo de seguridad, DNS y hosting, sin que te preocupes.',
    },
  ],
  price: '$2,000',
  priceValue: 2000,
  period: 'MXN + IVA al mes',
  features: [
    'Auditoría y optimización SEO técnica',
    'Actualizaciones y mantenimiento del sitio',
    'Configuración y gestión de DNS',
    'Configuración y migración de hosting',
    'Monitoreo de seguridad y respaldos periódicos',
    'Auditorías de rendimiento (Core Web Vitals)',
    'Reporte mensual de avances',
    'Soporte técnico continuo',
  ],
  bridge: {
    before: 'Las reseñas también posicionan: activa ',
    anchor: 'reseñas automáticas en Google',
    after: ' y fortalece tu SEO local.',
    href: pwLinks.crm,
  } as PwBridge,
  cta: 'Cotizar plan de SEO',
};

export const pwProceso = {
  h2: 'Así es nuestro desarrollo web en Tijuana',
  intro: 'Un proceso claro, con avances en cada etapa y sin semanas de idas y vueltas.',
  steps: [
    {
      title: 'Cotiza y platiquemos',
      text: 'Usa el cotizador o escríbenos por WhatsApp. En una llamada o reunión en Tijuana definimos objetivos, secciones y contenido.',
    },
    {
      title: 'Diseño a tu medida',
      text: 'Creamos el diseño basado en tu marca y lo ajustamos contigo con 2 o 3 rondas de revisión, según tu paquete.',
    },
    {
      title: 'Desarrollo y SEO',
      text: 'Programamos tu página, la optimizamos para velocidad y configuramos SEO, Analytics, WhatsApp y formularios.',
    },
    {
      title: 'Lanzamiento y soporte',
      text: 'Publicamos tu sitio con hosting incluido y te acompañamos después del lanzamiento.',
    },
  ],
  note: 'Entrega en 5 a 7 días hábiles (tienda en línea: 7 a 10) a partir de que recibimos tu contenido.',
};

export const pwPortafolio = {
  label: 'Portafolio',
  h2: 'Páginas web que hemos creado para negocios como el tuyo',
  intro:
    'Una muestra de nuestros proyectos de diseño web para negocios de servicios, bienes raíces, industria y comercio en línea.',
  // IDs de src/data/projects.ts (vikingProjects), en el orden en que se muestran
  featured: ['favlash', 'altive', 'zactech', 'globalrecruiters', 'madeiras', 'gruascervantes'],
};

export const pwFaq = {
  title: 'Preguntas frecuentes sobre páginas web en Tijuana',
  subtitle: 'Precios, tiempos de entrega y lo que incluye cada paquete.',
  faqs: [
    {
      q: '¿Cuánto cuesta una página web en Tijuana?',
      a: 'Depende del tipo de página: una landing page cuesta $6,000 MXN + IVA, una página web completa $7,000 MXN + IVA y una tienda en línea $10,000 MXN + IVA, en pago único. Todos los paquetes incluyen diseño personalizado, SEO on-page y hosting por un año. Calcula tu inversión en el <a href="#cotizador">cotizador</a>.',
    },
    {
      q: '¿Cuánto tiempo tarda en estar lista mi página web?',
      a: 'Una landing page o una página web completa está lista en 5 a 7 días hábiles, y una tienda en línea en 7 a 10 días hábiles, a partir de que recibimos tu contenido.',
    },
    {
      q: '¿Qué diferencia hay entre una landing page y una página web completa?',
      a: 'Una landing page es una sola página con un objetivo concreto, como recibir mensajes de una campaña de anuncios. Una página web completa tiene de 5 a 8 secciones navegables y es mejor para presentar un negocio con varios servicios.',
    },
    {
      q: '¿Mi página web aparecerá en Google?',
      a: 'Todas incluyen SEO on-page desde el inicio: títulos, encabezados, velocidad y estructura para que Google la indexe. Posicionar en los primeros lugares de búsquedas competidas lleva tiempo y trabajo continuo; para eso está nuestro plan de <a href="#seo">consultoría SEO y mantenimiento</a>.',
    },
    {
      q: '¿Puedo actualizar mi página yo mismo?',
      a: 'Sí, podemos incluir un panel autogestionable para que edites textos e imágenes sin conocimientos técnicos. Si prefieres no hacerlo tú, el plan de mantenimiento cubre las actualizaciones.',
    },
    {
      q: '¿Cómo recibo los mensajes de mis clientes?',
      a: 'Cada página incluye botón flotante de WhatsApp y formularios de contacto. Si quieres dar seguimiento automático a cada prospecto, puedes <a href="/crm-gohighlevel/">conectar tus formularios a GoHighLevel</a>.',
    },
  ],
};
