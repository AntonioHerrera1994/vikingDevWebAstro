// src/data/crm-gohighlevel.ts
// Contenido de /crm-gohighlevel/. Edita textos y precios aquí, no en los componentes.

export const hlMeta = {
  title: 'GoHighLevel en Español: CRM para tu Negocio | VikingDev',
  description:
    'Implementamos y administramos HighLevel en español: pipeline, seguimiento automático, recordatorios y reseñas en Google. Suscripción incluida.',
  url: 'https://vikingdevtj.com/crm-gohighlevel/',
  image: 'https://vikingdevtj.com/og-image.jpg',
};

// Rutas de los otros pilares (enlaces puente)
export const hlLinks = {
  web: '/paginas-web-tijuana/',
  ads: '/publicidad-google-facebook-tijuana/',
};

export interface HlBridge {
  before: string;
  anchor: string;
  after: string;
  href: string;
}

export const hlHero = {
  h1Main: 'GoHighLevel en español,',
  h1Accent: 'configurado y administrado por nosotros',
  intro:
    'Implementamos HighLevel en México para negocios que pierden prospectos entre mensajes de WhatsApp, llamadas y hojas de cálculo. Configuramos tu CRM en español, automatizamos el seguimiento de cada prospecto y lo administramos cada mes, con la suscripción incluida.',
  chips: ['Suscripción incluida', 'Configuración en español', 'Atención en todo México'],
  proof: 'Soporte y capacitación en español · Respuesta en menos de 24 hrs',
};

export const hlSubnav = [
  { id: 'problema', label: 'Antes y después' },
  { id: 'incluye', label: 'Qué incluye' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'automatizacion', label: 'Automatización' },
  { id: 'industrias', label: 'Para quién es' },
  { id: 'precio', label: 'Precio' },
  { id: 'proceso', label: 'Implementación' },
  { id: 'faq', label: 'Preguntas' },
];

export const hlAntesDespues = {
  label: 'El problema',
  h2: 'Deja de perder prospectos por falta de seguimiento',
  intro:
    'La mayoría de los negocios no tiene un problema de clientes, sino de seguimiento. Así cambia tu operación con HighLevel.',
  antes: [
    'Mensajes de WhatsApp, Facebook e Instagram en apps distintas',
    'Prospectos que escriben y nadie les responde a tiempo',
    'Citas que nadie confirma y clientes que no llegan',
    'Cotizaciones enviadas sin seguimiento',
    'Sin datos claros de cuántos prospectos se vuelven clientes',
  ],
  despues: [
    'Todas las conversaciones en una sola bandeja',
    'Respuesta automática en minutos, de día o de noche',
    'Recordatorios automáticos antes de cada cita',
    'Seguimiento automático a cada cotización',
    'Reportes con el avance de cada prospecto en tu pipeline',
  ],
};

export type HlIcon = 'shield' | 'pipeline' | 'inbox' | 'calendar' | 'form' | 'star' | 'funnel' | 'chart' | 'users';

export const hlIncluye = {
  label: 'Qué incluye',
  h2: 'GoHighLevel CRM: todo lo que incluye tu servicio',
  intro:
    'HighLevel CRM reúne en una sola plataforma las herramientas que hoy tienes dispersas. Nosotros lo configuramos, lo conectamos y lo administramos.',
  items: [
    {
      icon: 'shield' as HlIcon,
      title: 'Suscripción y administración incluidas',
      text: 'Un solo pago mensual en pesos: la plataforma, la configuración, los ajustes y el soporte. Tú te enfocas en vender.',
    },
    { icon: 'pipeline' as HlIcon, title: 'Pipeline de ventas', text: 'Tablero visual (Kanban) para ver en qué etapa está cada prospecto.' },
    { icon: 'inbox' as HlIcon, title: 'Bandeja unificada', text: 'WhatsApp, SMS, correo, Facebook e Instagram en un mismo lugar.' },
    { icon: 'calendar' as HlIcon, title: 'Agenda con recordatorios', text: 'Citas en línea con confirmación y recordatorios automáticos.' },
    { icon: 'form' as HlIcon, title: 'Captación de leads', text: 'Formularios y landings que envían cada prospecto directo al CRM.' },
    { icon: 'star' as HlIcon, title: 'Reseñas en Google', text: 'Solicitud automática de reseñas al terminar cada servicio.' },
    { icon: 'chart' as HlIcon, title: 'Reportes y capacitación', text: 'Reporte mensual de resultados y capacitación práctica para tu equipo.' },
  ],
};

export const hlWhatsapp = {
  label: 'Seguimiento por WhatsApp',
  h2: 'CRM para WhatsApp: responde y da seguimiento en automático',
  lead:
    'Conectamos tu WhatsApp Business a HighLevel para automatizar mensajes en WhatsApp: bienvenida, respuestas a preguntas frecuentes, recordatorios de cita y seguimiento a cotizaciones. Cuando tu equipo toma la conversación, el trato sigue siendo personal.',
  bullets: [
    'Mensaje de bienvenida en cuanto llega un prospecto',
    'Recordatorios de cita con confirmación por respuesta',
    'Seguimiento automático a cotizaciones sin respuesta',
    'Historial de cada cliente visible para todo tu equipo',
  ],
  bridge: {
    before: 'Si inviertes en publicidad, cada prospecto de tus ',
    anchor: 'campañas en Google y Facebook',
    after: ' entra directo al CRM y recibe respuesta en minutos.',
    href: hlLinks.ads,
  } as HlBridge,
  chat: {
    business: 'Clínica Sonrisa',
    messages: [
      { from: 'client', text: 'Hola, ¿qué precio tiene la limpieza dental?', time: '9:41 p.m.' },
      { from: 'auto', text: '¡Hola, María! Gracias por escribir a Clínica Sonrisa. La limpieza dental tiene un costo de $800. ¿Te gustaría agendar una cita?', time: '9:41 p.m.' },
      { from: 'client', text: 'Sí, el jueves por la mañana', time: '9:43 p.m.' },
      { from: 'auto', text: 'Listo, tu cita quedó el jueves a las 10:00 a.m. Te enviaremos un recordatorio un día antes.', time: '9:43 p.m.' },
      { from: 'auto', text: 'Recordatorio: tu cita es mañana a las 10:00 a.m. Responde 1 para confirmar o 2 para reprogramar.', time: 'Miércoles' },
      { from: 'client', text: '1', time: 'Miércoles' },
    ],
    note: 'Ejemplo ilustrativo. Los mensajes se configuran según tu negocio y las políticas de WhatsApp.',
  },
};

export const hlAutomatizacion = {
  label: 'Automatización',
  h2: 'Automatiza procesos de venta, citas y reseñas',
  lead: 'Diseñamos flujos que trabajan por ti las 24 horas. Este es un ejemplo para un negocio de servicios:',
  nodes: [
    { kind: 'Disparador', title: 'Llega un nuevo prospecto', text: 'Desde tu página web, un anuncio o WhatsApp.' },
    { kind: 'Acción', title: 'Mensaje de bienvenida', text: 'Por WhatsApp o SMS en menos de un minuto.' },
    { kind: 'Acción', title: 'Asignación a tu equipo', text: 'Con una tarea y una alerta en el celular del vendedor.' },
    { kind: 'Espera', title: 'Recordatorio de cita', text: '24 horas y 2 horas antes de la cita.' },
    { kind: 'Acción', title: 'Solicitud de reseña', text: 'Al terminar el servicio, una invitación a calificarte en Google.' },
  ],
  bridge: {
    before: 'También creamos ',
    anchor: 'landing pages y embudos',
    after: ' conectados al CRM, para que cada formulario inicie un flujo como este.',
    href: hlLinks.web,
  } as HlBridge,
};

export const hlIndustrias = {
  label: 'Para quién es',
  h2: 'CRM para pymes, inmobiliarias y empresas de servicios',
  intro: 'HighLevel se adapta a tu forma de vender. Así lo configuramos según tu giro:',
  tabs: [
    {
      id: 'pymes',
      tab: 'Pymes',
      title: 'CRM para pymes y equipos de ventas',
      text: 'Ordena prospectos, cotizaciones y clientes en un pipeline visual y deja que el sistema dé seguimiento por ti.',
      bullets: [
        'Pipeline con las etapas reales de tu venta',
        'Seguimiento automático a cotizaciones',
        'Recordatorios de pago y renovación',
        'Reportes de ventas por vendedor',
      ],
    },
    {
      id: 'inmobiliarias',
      tab: 'Inmobiliarias',
      title: 'CRM para inmobiliarias',
      text: 'Cada prospecto de portales, anuncios o tu sitio llega al asesor correcto y recibe seguimiento hasta cerrar.',
      bullets: [
        'Captura de leads de anuncios y de tu sitio web',
        'Asignación automática de prospectos a asesores',
        'Agenda de visitas con recordatorios',
        'Seguimiento a largo plazo para quien aún no decide',
      ],
    },
    {
      id: 'clinicas',
      tab: 'Clínicas',
      title: 'CRM para clínicas y consultorios',
      text: 'Llena tu agenda, confirma cada cita y convierte a tus pacientes satisfechos en reseñas en Google.',
      bullets: [
        'Agenda en línea y confirmación de citas',
        'Recordatorios automáticos antes de cada consulta',
        'Seguimiento después de la consulta',
        'Solicitud automática de reseñas en Google',
      ],
    },
    {
      id: 'belleza',
      tab: 'Salones y estéticas',
      title: 'CRM para salones de belleza y estéticas',
      text: 'Reservas, recordatorios y promociones en automático para que tus clientas regresen.',
      bullets: [
        'Reservas en línea conectadas a tu agenda',
        'Recordatorios y reprogramación por WhatsApp',
        'Campañas para recuperar clientas inactivas',
        'Promociones de temporada por WhatsApp o SMS',
      ],
    },
  ],
};

export const hlPrecio = {
  label: 'Precio',
  h2: 'GoHighLevel con precio fijo en pesos',
  intro: 'Un solo pago mensual, sin cargos sorpresa en dólares.',
  price: '$6,000',
  priceValue: 6000,
  period: 'MXN + IVA al mes',
  note: 'Este precio ya incluye la suscripción mensual de la plataforma HighLevel, sin costos aparte.',
  features: [
    'Suscripción de HighLevel incluida',
    'Configuración de pipeline comercial (Kanban)',
    'Automatización de flujos y seguimiento de leads',
    'Agenda con recordatorios automáticos',
    'Captación de leads desde formularios y landings',
    'Migración de tus contactos y datos actuales',
    'Plantillas de embudos y páginas de aterrizaje',
    'Gestión de reputación (reseñas automáticas en Google)',
    'Capacitación práctica para tu equipo',
    'Soporte prioritario y ajustes continuos',
    'Reportes de rendimiento mensuales',
  ],
  compare: {
    head: ['', 'Por tu cuenta', 'Con VikingDev'],
    rows: [
      ['Suscripción de la plataforma', 'La pagas aparte, en dólares', 'Incluida, en pesos'],
      ['Configuración inicial', 'La haces tú', 'La hacemos nosotros'],
      ['Automatizaciones y WhatsApp', 'Aprender y configurar', 'Diseñadas para tu proceso'],
      ['Migración de contactos', 'Manual', 'Incluida'],
      ['Capacitación y soporte', 'Documentación y comunidad', 'Práctica y en español'],
      ['Ajustes y mejoras', 'Por tu cuenta', 'Continuos, cada mes'],
    ],
  },
  cta: 'Cotizar CRM GoHighLevel',
  quoterLabel: 'CRM GoHighLevel',
};

export const hlProceso = {
  label: 'Implementación',
  h2: 'Cómo implementamos HighLevel en tu negocio',
  intro: 'Un proceso guiado de principio a fin, en español y sin que tengas que aprender la plataforma desde cero.',
  steps: [
    {
      title: 'Diagnóstico de tu proceso de ventas',
      text: 'Revisamos cómo llegan tus prospectos, cómo les das seguimiento y dónde se pierden.',
    },
    {
      title: 'Configuración y migración',
      text: 'Creamos tu pipeline, calendarios y formularios, y migramos tus contactos actuales.',
    },
    {
      title: 'Automatizaciones y conexiones',
      text: 'Conectamos WhatsApp, tu página web y tus campañas, y activamos los flujos de seguimiento.',
    },
    {
      title: 'Capacitación y lanzamiento',
      text: 'Capacitamos a tu equipo con casos reales de tu negocio y arrancamos.',
    },
    {
      title: 'Administración mensual',
      text: 'Ajustamos flujos, revisamos resultados y te entregamos un reporte cada mes.',
    },
  ],
  note: 'El tiempo de implementación depende del tamaño de tu operación; te lo confirmamos en la primera llamada.',
};

export const hlFaq = {
  title: 'Preguntas frecuentes sobre GoHighLevel',
  subtitle: 'Precio, idioma, WhatsApp y lo que incluye el servicio.',
  faqs: [
    {
      q: '¿Qué es GoHighLevel y para qué sirve?',
      a: 'GoHighLevel (también conocido como HighLevel) es un CRM todo en uno: reúne tus prospectos, conversaciones de WhatsApp, SMS y correo, agenda, formularios, embudos y reseñas en una sola plataforma. Sirve para que ningún prospecto se quede sin seguimiento y para automatizar tareas repetitivas de tu proceso de venta.',
    },
    {
      q: '¿Cuánto cuesta GoHighLevel?',
      a: 'Con VikingDev pagas $6,000 MXN + IVA al mes, con la suscripción de la plataforma incluida, además de la configuración, las automatizaciones, la capacitación y el soporte. Si contratas por tu cuenta, la suscripción se paga directo a HighLevel en dólares y la configuración corre por tu cuenta. Revisa el detalle en <a href="#precio">precio</a>.',
    },
    {
      q: '¿GoHighLevel está en español?',
      a: 'Tus clientes ven todo en español: mensajes, formularios, calendarios y páginas. Nosotros configuramos tu cuenta, capacitamos a tu equipo y damos soporte en español, para que no tengas que lidiar con la plataforma por tu cuenta.',
    },
    {
      q: '¿Se puede conectar con WhatsApp?',
      a: 'Sí. HighLevel se integra con WhatsApp Business para centralizar tus conversaciones y enviar mensajes automáticos de bienvenida, recordatorios y seguimiento. Te ayudamos a conectar tu número siguiendo los requisitos de Meta.',
    },
    {
      q: '¿Puedo migrar mis contactos actuales?',
      a: 'Sí, la migración de tus contactos y datos actuales está incluida. Los importamos desde tu hoja de cálculo o CRM anterior y los organizamos en tu pipeline.',
    },
    {
      q: '¿Necesito una página web para usar HighLevel?',
      a: 'No es obligatorio, pero funciona mejor con una página que capte prospectos. Podemos crear <a href="/paginas-web-tijuana/">landing pages y embudos</a> conectados directo a tu CRM.',
    },
    {
      q: '¿Atienden negocios fuera de Tijuana?',
      a: 'Sí. Implementamos HighLevel para negocios en todo México. La implementación, la capacitación y el soporte se hacen en línea; si estás en Tijuana, también podemos reunirnos en persona.',
    },
  ],
};
