// src/data/publicidad.ts
// Contenido de /publicidad-google-facebook-tijuana/. Edita textos y precios aquí, no en los componentes.

export const adMeta = {
  title: 'Publicidad en Google y Facebook en Tijuana | VikingDev',
  description:
    'Campañas de Google Ads y Meta Ads en Facebook e Instagram para negocios en Tijuana. Reporte y reunión mensual. Desde $1,500 MXN + IVA al mes.',
  url: 'https://vikingdevtj.com/publicidad-google-facebook-tijuana/',
  image: 'https://vikingdevtj.com/og-image.jpg',
};

export const adLinks = {
  web: '/paginas-web-tijuana/',
  crm: '/crm-gohighlevel/',
};

// data-label exacto de cada checkbox del cotizador
export const quoterLabels = {
  meta: 'Meta Ads (no incluye inversión)',
  google: 'Google Ads (no incluye inversión)',
  combo: 'Meta Ads + Google Ads (no incluye inversión)',
};

export interface AdBridge {
  before: string;
  anchor: string;
  after: string;
  href: string;
}

export const adHero = {
  h1Main: 'Publicidad en Google y Facebook',
  h1Accent: 'para negocios en Tijuana',
  intro:
    'Somos una agencia de publicidad en Tijuana especializada en Google Ads y Meta Ads. Creamos, segmentamos y optimizamos tus campañas en Google, Facebook e Instagram para que lleguen a tus clientes ideales y se conviertan en mensajes, citas y ventas.',
  chips: ['Desde $1,500 MXN + IVA al mes', 'Reporte y reunión mensual', 'Google, Facebook e Instagram'],
  proof: 'Respuesta en menos de 24 hrs · Tijuana, Baja California',
};

export const adSubnav = [
  { id: 'canales', label: '¿Google o Meta?' },
  { id: 'google-ads', label: 'Google Ads' },
  { id: 'meta-ads', label: 'Facebook e Instagram' },
  { id: 'combo', label: 'Meta + Google' },
  { id: 'inversion', label: 'Inversión' },
  { id: 'proceso', label: 'Método' },
  { id: 'faq', label: 'Preguntas' },
];

export const adCanales = {
  label: '¿Google o Meta?',
  h2: 'Publicidad en Google y en redes sociales: cómo se complementan',
  intro: 'No compiten entre sí: cada plataforma llega a tu cliente en un momento distinto de su decisión.',
  cards: [
    {
      id: 'google',
      kicker: 'Te encuentran',
      title: 'Google Ads',
      text: 'Apareces cuando alguien ya está buscando tu servicio, por ejemplo "dentista en Tijuana". Es ideal para captar la demanda que ya existe.',
      best: [
        'Servicios que la gente busca con urgencia',
        'Clínicas, talleres, despachos y servicios locales',
        'Tiendas en línea con productos que se buscan',
      ],
      href: '#google-ads',
    },
    {
      id: 'meta',
      kicker: 'Te descubren',
      title: 'Meta Ads',
      text: 'Llegas a personas por su ubicación, intereses y comportamiento mientras navegan en Facebook e Instagram. Es ideal para crear demanda y dar a conocer tu marca.',
      best: [
        'Productos y servicios muy visuales',
        'Lanzamientos, promociones y eventos',
        'Negocios que quieren crecer su comunidad',
      ],
      href: '#meta-ads',
    },
  ],
  together: '¿Por qué no las dos? Combínalas y ahorra',
};

export interface PlatformData {
  id: string;
  key: 'google' | 'meta';
  label: string;
  h2: string;
  lead: string;
  formats: string[];
  price: string;
  priceValue: number;
  period: string;
  note: string;
  features: string[];
  bridge: AdBridge;
  cta: string;
  quoterLabel: string;
}

export const adGoogle: PlatformData = {
  id: 'google-ads',
  key: 'google',
  label: 'Google Ads',
  h2: 'Google Ads en Tijuana: aparece cuando te buscan',
  lead:
    'Como agencia de Google Ads en Tijuana, investigamos las palabras que usan tus clientes y creamos campañas de publicidad en Google que aparecen justo cuando buscan tu servicio. Pagas por clic, y nosotros cuidamos que cada clic tenga sentido para tu negocio.',
  formats: ['Búsqueda', 'Display', 'Shopping', 'YouTube'],
  price: '$1,500',
  priceValue: 1500,
  period: 'MXN + IVA al mes',
  note: 'No incluye presupuesto de inversión publicitaria.',
  features: [
    'Configuración y auditoría de cuenta',
    'Campañas de búsqueda, Display, Shopping y YouTube',
    'Investigación y segmentación de palabras clave',
    'Optimización continua de pujas',
    'Extensiones de anuncio y remarketing',
    'Reporte mensual con métricas clave',
    'Reunión de seguimiento mensual',
  ],
  bridge: {
    before: 'Un anuncio solo convierte si la página a la que llega está a la altura: también diseñamos ',
    anchor: 'páginas web en Tijuana',
    after: ' y landing pages pensadas para campañas.',
    href: adLinks.web,
  },
  cta: 'Cotizar Google Ads',
  quoterLabel: quoterLabels.google,
};

export const adMetaAds: PlatformData = {
  id: 'meta-ads',
  key: 'meta',
  label: 'Meta Ads',
  h2: 'Publicidad en Facebook e Instagram en Tijuana',
  lead:
    'Gestionamos tu publicidad en redes sociales con segmentación por ubicación, intereses y comportamiento. Creamos anuncios para el feed, Stories y Reels de Facebook e Instagram, y volvemos a mostrarle tu marca a quien ya mostró interés.',
  formats: ['Feed', 'Stories', 'Reels', 'Mensajes a WhatsApp'],
  price: '$1,500',
  priceValue: 1500,
  period: 'MXN + IVA al mes',
  note: 'No incluye presupuesto de inversión publicitaria.',
  features: [
    'Configuración y auditoría de cuenta',
    'Campañas en Facebook, Instagram y Reels',
    'Segmentación por ubicación e intereses',
    'Retargeting y audiencias personalizadas',
    'Creatividades diseñadas para conversión',
    'Reporte mensual con métricas clave',
    'Reunión de seguimiento mensual',
  ],
  bridge: {
    before: 'Cuando un anuncio genera un mensaje, no dejes que se enfríe: activa el ',
    anchor: 'seguimiento automático de prospectos',
    after: ' con GoHighLevel.',
    href: adLinks.crm,
  },
  cta: 'Cotizar Meta Ads',
  quoterLabel: quoterLabels.meta,
};

export const adCombo = {
  label: 'Paquete combinado',
  h2: 'Meta + Google Ads: una sola estrategia',
  lead:
    'Gestionamos ambas plataformas como una sola campaña: el presupuesto se reparte donde mejor funciona y quien te conoció en Instagram vuelve a verte cuando te busca en Google.',
  price: '$2,500',
  priceValue: 2500,
  compareAt: '$3,000',
  period: 'MXN + IVA al mes',
  savings: 'Ahorras $500 al mes frente a contratarlas por separado.',
  note: 'No incluye presupuesto de inversión publicitaria.',
  features: [
    'Todo lo incluido en Meta Ads y Google Ads',
    'Estrategia unificada entre plataformas',
    'Distribución de presupuesto por canal',
    'Retargeting cruzado entre plataformas',
    'Un solo reporte mensual consolidado',
    'Reunión de seguimiento mensual',
  ],
  cta: 'Cotizar Meta + Google Ads',
  quoterLabel: quoterLabels.combo,
};

export const adInversion = {
  label: 'Inversión',
  h2: '¿Cuánto cuesta anunciarse en Google y Facebook?',
  intro: 'Tu inversión tiene dos partes, y siempre sabrás a dónde va cada peso.',
  parts: [
    {
      title: 'Gestión de VikingDev',
      text: 'Pago mensual fijo por la estrategia, la creación de anuncios, la optimización y los reportes.',
    },
    {
      title: 'Presupuesto publicitario',
      text: 'Lo que pagas directo a Google o Meta para mostrar tus anuncios. Tú decides cuánto invertir y no pasa por nosotros.',
    },
  ],
  plans: [
    { id: 'meta', label: 'Meta Ads', fee: 1500 },
    { id: 'google', label: 'Google Ads', fee: 1500 },
    { id: 'combo', label: 'Meta + Google', fee: 2500 },
  ],
  budget: { min: 3000, max: 30000, step: 500, value: 6000 },
  disclaimer:
    'Estimación mensual antes de IVA. Los resultados dependen de tu giro, tu oferta y la competencia; definimos contigo el presupuesto recomendado en la primera llamada.',
};

export const adProceso = {
  label: 'Método',
  h2: 'Cómo gestionamos tus campañas mes con mes',
  intro: 'Un método claro: medimos todo, optimizamos con datos y te explicamos los resultados en lenguaje sencillo.',
  steps: [
    {
      title: 'Diagnóstico y objetivos',
      text: 'Definimos qué cuenta como resultado para tu negocio (mensajes, llamadas, citas o ventas) y el presupuesto inicial.',
    },
    {
      title: 'Configuración y medición',
      text: 'Configuramos o auditamos tus cuentas, Meta Pixel, Google Analytics y el seguimiento de conversiones.',
    },
    {
      title: 'Anuncios y lanzamiento',
      text: 'Creamos los anuncios, escribimos los textos, definimos la segmentación y lanzamos las campañas.',
    },
    {
      title: 'Optimización continua',
      text: 'Ajustamos pujas, audiencias y anuncios, y hacemos pruebas A/B para mejorar el costo por resultado.',
    },
    {
      title: 'Reporte y reunión mensual',
      text: 'Te entregamos un reporte con métricas clave y nos reunimos contigo para definir el siguiente paso.',
    },
  ],
  note: 'Puedes empezar con una plataforma y sumar la otra cuando lo necesites.',
};

export const adFaq = {
  title: 'Preguntas frecuentes sobre publicidad en Google y Facebook',
  subtitle: 'Costos, presupuesto, tiempos y qué incluye la gestión de tus campañas.',
  faqs: [
    {
      q: '¿Cuánto cuesta la publicidad en Facebook?',
      a: 'Tiene dos partes: la gestión de VikingDev, que cuesta $1,500 MXN + IVA al mes, y el presupuesto publicitario que pagas directo a Meta. Meta permite empezar con presupuestos diarios bajos; te recomendamos un monto según tu objetivo y tu giro. Calcula tu inversión en la sección de <a href="#inversion">inversión</a>.',
    },
    {
      q: '¿Cuál es el precio de Google Ads?',
      a: 'La gestión cuesta $1,500 MXN + IVA al mes. Aparte, pagas a Google por cada clic en tus anuncios. El costo por clic cambia según la competencia de cada palabra clave, por eso investigamos las palabras de tu giro antes de lanzar la campaña.',
    },
    {
      q: '¿Qué conviene más: Google Ads o Facebook Ads?',
      a: 'Depende de cómo te busca tu cliente. Google Ads funciona mejor cuando la gente ya busca tu servicio; Meta Ads, cuando necesitas que te descubran. Para muchos negocios lo mejor es combinarlas. Te explicamos la diferencia en <a href="#canales">Google o Meta</a>.',
    },
    {
      q: '¿El presupuesto de los anuncios está incluido?',
      a: 'No. El precio de VikingDev es solo por la gestión. El presupuesto de anuncios se paga directo a Google o Meta, así que siempre tienes control y transparencia sobre cuánto se invierte.',
    },
    {
      q: '¿En cuánto tiempo veo resultados?',
      a: 'Los anuncios empiezan a mostrarse en cuanto las plataformas los aprueban. Las primeras semanas sirven para que las campañas aprendan y para optimizar con datos reales; por eso evaluamos el avance cada mes en el reporte y la reunión de seguimiento.',
    },
    {
      q: '¿Necesito una página web para anunciarme?',
      a: 'No siempre: en Facebook e Instagram puedes dirigir los anuncios a WhatsApp o a formularios. Para Google Ads sí recomendamos una página de destino rápida y clara. Si no tienes una, diseñamos <a href="/paginas-web-tijuana/">páginas web y landing pages en Tijuana</a>.',
    },
    {
      q: '¿Quién crea los anuncios?',
      a: 'Nosotros diseñamos los anuncios y escribimos los textos. Si tienes fotos o videos de tu negocio, los usamos para que los anuncios se vean auténticos.',
    },
  ],
};
