// src/data/agenda-ia.ts
// Contenido de /agenda-con-ia/ (servicio CodiceAgents provisto por VikingDev).
// Edita textos, precios y enlaces aquí, no en los componentes.

export const iaMeta = {
  title: 'Agenda con IA para Negocios en Tijuana | VikingDev',
  description:
    'Agenda citas, cobra y revisa tus finanzas hablando con un agente de IA en español. Para barberías, estéticas y spas. Desde $899 al mes, IVA incluido.',
  url: 'https://vikingdevtj.com/agenda-con-ia/',
  image: 'https://vikingdevtj.com/og-image.jpg',
};

// AJUSTA: rutas reales de tus otras páginas (deben coincidir con las publicadas)
export const iaLinks = {
  web: '/paginas-web-tijuana/',
  ads: '/publicidad-google-facebook-tijuana/',
};

// COMPLETA: tu código de referido de CodiceAgents (déjalo vacío si no tienes)
const REF = '';
const trial = (plan: string) =>
  `https://app.codiceagents.com/?plan=${plan}${REF ? `&ref=${REF}` : ''}`;

export const iaHero = {
  kicker: 'Agenda con IA · Powered by CodiceAgents',
  h1Main: 'Agenda con IA para negocios:',
  h1Accent: 'organiza tu día solo con pedirlo',
  intro:
    'La app para agendar citas que se maneja hablando: un asistente con inteligencia artificial para negocios que agenda, registra cobros, lleva tus finanzas y mantiene al día a tus clientes. Tú le escribes en español, como a una persona, y él lo hace. Nosotros lo instalamos en tu negocio en Tijuana.',
  chips: ['Desde $899 al mes, IVA incluido', '7 días de prueba gratis', 'Funciona con WhatsApp Business'],
  // Conversación animada del hero (decorativa)
  chat: [
    { from: 'you', text: 'Agéndale a Laura un corte mañana a las 5' },
    { from: 'agent', text: 'Listo. Laura · Corte · mañana 5:00 p.m. Le envío recordatorio un día antes.' },
    { from: 'you', text: '¿Cuánto vendí hoy?' },
    { from: 'agent', text: 'Hoy llevas $2,350 en 7 citas. Tu servicio más vendido fue Corte + barba.' },
  ],
};

export const iaSubnav = [
  { id: 'demo', label: 'Pruébalo' },
  { id: 'problema', label: 'Antes y después' },
  { id: 'agentes', label: 'Qué hace' },
  { id: 'giros', label: 'Para quién es' },
  { id: 'planes', label: 'Planes' },
  { id: 'proceso', label: 'Cómo empezar' },
  { id: 'faq', label: 'Preguntas' },
];

/* ── Simulador ─────────────────────────────────────────────
   Estado inicial del negocio de ejemplo y las acciones que entiende.
   Cada acción tiene: ejemplo (chip), palabras clave para texto libre,
   respuesta del agente y efectos sobre el panel. */
export const iaDemo = {
  label: 'Pruébalo',
  h2: 'Así funciona tu asistente con inteligencia artificial',
  intro:
    'Esta es una barbería de ejemplo. Elige una instrucción o escribe la tuya y mira cómo el agente actualiza la agenda y las finanzas al instante.',
  note: 'Simulación con datos de ejemplo. En tu cuenta real, el agente trabaja con tu agenda, tus servicios y tus clientes.',
  business: 'Barbería Norte · Tijuana',
  state: {
    appointments: [
      { id: 'carlos', day: 'Hoy', time: '10:00', client: 'Carlos M.', service: 'Corte', status: 'Pagada' },
      { id: 'sofia', day: 'Hoy', time: '12:30', client: 'Sofía R.', service: 'Barba', status: 'Confirmada' },
      { id: 'pedro', day: 'Hoy', time: '18:00', client: 'Pedro G.', service: 'Corte + barba', status: 'Confirmada' },
    ],
    income: { total: 2350, cash: 1450, card: 900, count: 7 },
    clients: 128,
    services: 6,
  },
  actions: [
    {
      id: 'agendar',
      chip: 'Agéndale a Laura corte mañana a las 5, dejó $100 de anticipo',
      keywords: ['agend', 'cita', 'apart', 'reserv'],
      reply:
        'Listo ✓ Agendé a Laura Pérez mañana a las 5:00 p.m. para Corte ($250). Registré un anticipo de $100; queda un saldo de $150. Le enviaré recordatorio por WhatsApp un día antes.',
      effects: {
        add: { id: 'laura', day: 'Mañana', time: '17:00', client: 'Laura P.', service: 'Corte', status: 'Anticipo $100' },
        clients: 1,
        flash: ['agenda', 'clients'],
      },
    },
    {
      id: 'ventas',
      chip: '¿Cuánto vendí hoy?',
      keywords: ['vend', 'venta', 'ingres', 'gan', 'dinero', 'cuánto', 'cuanto'],
      reply:
        'Hoy llevas $2,350 en 7 citas: $1,450 en efectivo y $900 con tarjeta. Tu servicio más rentable fue Corte + barba.',
      effects: { flash: ['income'] },
    },
    {
      id: 'mover',
      chip: 'Pasa la cita de Pedro de las 6 a las 7',
      keywords: ['pasa', 'mueve', 'cambia', 'reprogram', 'recorre'],
      reply: 'Hecho ✓ Moví la cita de Pedro G. a las 7:00 p.m. y le avisé del cambio por WhatsApp.',
      effects: { move: { id: 'pedro', time: '19:00' }, flash: ['agenda'] },
    },
    {
      id: 'inasistencia',
      chip: 'Sofía no vino, márcala como inasistencia',
      keywords: ['no vino', 'inasist', 'falt', 'no lleg'],
      reply: 'Registrado ✓ Marqué la cita de Sofía R. como inasistencia. Ya van 2 este mes; lo verás en su historial.',
      effects: { status: { id: 'sofia', status: 'Inasistencia' }, flash: ['agenda'] },
    },
    {
      id: 'servicio',
      chip: 'Agrega el servicio Tinte, 90 minutos, $650',
      keywords: ['servicio', 'minutos', 'precio'],
      reply: 'Listo ✓ Agregué Tinte: 90 minutos, $650. Ya lo pueden reservar tus clientes.',
      effects: { services: 1, flash: ['services'] },
    },
    {
      id: 'clientes',
      chip: '¿Qué clientes no vienen desde hace un mes?',
      keywords: ['client', 'vienen', 'regres', 'perdid'],
      reply: 'Tienes 3 clientes sin visita en más de 30 días: Ana L., Luis C. y Marco T. ¿Quieres ver su historial?',
      effects: { flash: ['clients'] },
    },
  ],
  fallback:
    'En esta demo entiendo instrucciones sobre citas, cobros, ventas, clientes y servicios. Prueba con uno de los ejemplos de abajo.',
  repeated: 'Eso ya quedó hecho en la demo. Prueba otra instrucción o reinicia la simulación.',
};

export const iaAntesDespues = {
  label: 'El problema',
  h2: 'Si tu negocio vive entre WhatsApp, libreta y capturas, esto es para ti',
  intro: 'Llevar un negocio pequeño no debería sentirse como tener dos trabajos.',
  antes: [
    'Citas regadas entre WhatsApp, llamadas y una libreta',
    'Anticipos y saldos que se te olvidan cobrar',
    'Clientes que no llegan y nadie les recordó',
    'Las cuentas del día hechas a mano al cerrar',
    'Software que nunca terminaste de configurar',
  ],
  despues: [
    'Una sola agenda que manejas escribiéndole',
    'Cada anticipo, pago y saldo registrado al momento',
    'Recordatorios automáticos por WhatsApp',
    'Tus números del día con solo preguntar',
    'Horarios, equipo y servicios configurados en minutos',
  ],
};

export type IaIcon = 'calendar' | 'chart' | 'users' | 'settings' | 'whatsapp';

export const iaAgentes = {
  label: 'Qué hace',
  h2: 'Cuatro agentes de IA que trabajan por ti',
  intro: 'Cada agente se especializa en una parte de tu negocio. Tú solo le dices qué necesitas.',
  items: [
    {
      icon: 'calendar' as IaIcon,
      title: 'Agenda de citas y control de pagos',
      text: 'Crea, cancela y reprograma citas; registra anticipos, pagos y propinas; marca inasistencias y te dice qué saldos quedan pendientes.',
      command: 'Agéndale a Laura mañana a las 5, dejó $100',
    },
    {
      icon: 'chart' as IaIcon,
      title: 'Finanzas para negocios pequeños, sin Excel',
      text: 'Resumen del día, la semana o el mes, cobros por método de pago y tus servicios más rentables.',
      command: '¿Cuánto vendí esta semana?',
    },
    {
      icon: 'users' as IaIcon,
      title: 'Clientes siempre al día',
      text: 'Historial de cada cliente, última visita y datos de contacto actualizados, sin planillas.',
      command: '¿Cuándo vino Carlos por última vez?',
    },
    {
      icon: 'settings' as IaIcon,
      title: 'Configuración en minutos',
      text: 'Horarios, colaboradores, servicios, precios y duraciones configurados con una conversación.',
      command: 'Abro los sábados de 9 a 3',
    },
    {
      icon: 'whatsapp' as IaIcon,
      title: 'Recordatorios de citas por WhatsApp',
      text: 'Funciona junto con tu WhatsApp Business: mensajes y recordatorios incluidos según tu plan.',
      command: 'Recuérdale su cita a Pedro',
    },
  ],
};

export const iaGiros = {
  label: 'Para quién es',
  h2: 'Agenda para barberías, estéticas, spas y consultorios',
  intro: 'Pensada para emprendedores y negocios pequeños que trabajan con citas.',
  tabs: [
    {
      id: 'barberias',
      tab: 'Barberías',
      title: 'Agenda para barberías',
      text: 'Lleva las citas de cada barbero, los cobros del día y las propinas sin soltar las tijeras.',
      bullets: [
        'Agenda por barbero',
        'Cobros en efectivo y tarjeta separados',
        'Propinas registradas al momento',
        'Recordatorios para reducir inasistencias',
      ],
    },
    {
      id: 'esteticas',
      tab: 'Estéticas y salones',
      title: 'Agenda para estéticas y salones de belleza',
      text: 'Servicios de distinta duración, anticipos y clientas frecuentes, todo en un mismo lugar.',
      bullets: [
        'Servicios con duración y precio propios',
        'Anticipos y saldos pendientes',
        'Historial de cada clienta',
        'Tus servicios más rentables del mes',
      ],
    },
    {
      id: 'spas',
      tab: 'Spas',
      title: 'Agenda para spas y centros de bienestar',
      text: 'Organiza cabinas, terapeutas y paquetes sin perder el control de tu caja.',
      bullets: [
        'Agenda por terapeuta',
        'Registro de paquetes y pagos',
        'Recordatorios por WhatsApp',
        'Resumen semanal de ingresos',
      ],
    },
    {
      id: 'consultorios',
      tab: 'Consultorios',
      title: 'Agenda para consultorios pequeños',
      text: 'Para nutriólogos, psicólogos, fisioterapeutas y profesionales que atienden por cita.',
      bullets: [
        'Citas y reprogramaciones en segundos',
        'Pagos y saldos por paciente',
        'Historial de visitas',
        'Recordatorios antes de cada consulta',
      ],
    },
  ],
};

export const iaPlanes = {
  label: 'Planes',
  h2: 'Planes de la agenda con IA, con IVA incluido',
  intro: 'Precios en pesos, sin plazos forzosos. Prueba 7 días gratis y cancela cuando quieras.',
  plans: [
    {
      id: 'solo',
      name: 'Solo',
      tag: 'Para emprendedores',
      price: '$899',
      priceValue: 899,
      features: ['1 colaborador', '1,000 interacciones con el agente', '800 mensajes de WhatsApp', '50 recordatorios', 'Soporte por WhatsApp y correo'],
      href: trial('solo'),
    },
    {
      id: 'pro',
      name: 'Pro',
      tag: 'Recomendado',
      price: '$1,299',
      priceValue: 1299,
      highlight: true,
      features: ['2 colaboradores', '2,500 interacciones con el agente', '1,500 mensajes de WhatsApp', '100 recordatorios', 'Roles y permisos', 'Soporte prioritario'],
      href: trial('pro'),
    },
    {
      id: 'negocio',
      name: 'Negocio',
      tag: 'Para equipos',
      price: '$2,699',
      priceValue: 2699,
      features: ['6 colaboradores', '4,000 interacciones con el agente', '3,000 mensajes de WhatsApp', '250 recordatorios', 'Roles y permisos', 'Soporte prioritario'],
      href: trial('negocio'),
    },
  ],
  period: 'al mes · IVA incluido',
  included: [
    'Agenda con agente de IA',
    'Historial y conciliación de clientes',
    'Finanzas: ingresos, saldos y métodos de pago',
    'Funciona junto con WhatsApp Business',
    'Onboarding 1:1',
    'Perfil en el directorio público',
  ],
  // CONFIRMA: lo que VikingDev agrega como proveedor
  vikingdev: {
    title: 'Con VikingDev en Tijuana',
    items: [
      'Te ayudamos con el alta y la configuración inicial',
      'Cargamos tus servicios, horarios y equipo',
      'Te acompañamos en la conexión de WhatsApp Business',
      'Capacitación en persona en Tijuana o en línea',
    ],
  },
  trialNote: 'Prueba de 7 días: se registra una tarjeta, sin cargo al inicio. Con pago anual obtienes 2 meses gratis.',
  ctaTrial: 'Probar 7 días gratis',
  ctaHelp: 'Quiero que me ayuden a instalarla',
};

export const iaProceso = {
  label: 'Cómo empezar',
  h2: 'Instala tu sistema de citas para negocios en Tijuana',
  intro: 'Te acompañamos de principio a fin para dejar lista tu agenda con IA, en persona en Tijuana o en línea.',
  steps: [
    { title: 'Platiquemos', text: 'Nos cuentas cómo agendas hoy y elegimos el plan para tu negocio.' },
    { title: 'Prueba gratis', text: 'Activas tus 7 días de prueba, sin cargo al inicio.' },
    { title: 'Configuración', text: 'Cargamos tus servicios, horarios, equipo y clientes actuales.' },
    { title: 'WhatsApp', text: 'Conectamos tu WhatsApp Business. Meta pide una verificación de tu número y te guiamos en ella.' },
    { title: 'A trabajar', text: 'Te enseñamos a pedirle cosas a tu agente y empiezas a usarlo con tus clientes reales.' },
  ],
  note: 'La mayoría de los negocios empieza con el plan Solo o Pro y cambia de plan cuando crece.',
};

export const iaFaq = {
  title: 'Preguntas frecuentes sobre la agenda con IA',
  subtitle: 'Precios, WhatsApp y cómo empezar.',
  faqs: [
    {
      q: '¿Qué es una agenda con inteligencia artificial?',
      a: 'Es una agenda digital que manejas escribiéndole en español, como a un asistente. Le pides "agéndale a Laura mañana a las 5" o "¿cuánto vendí hoy?" y el agente de IA hace el cambio o te da la respuesta. Además de las citas, lleva tus cobros, tus finanzas y el historial de tus clientes.',
    },
    {
      q: '¿Cómo puedo organizar las citas de mi negocio y reducir las inasistencias?',
      a: 'Lo más efectivo es tener todas las citas en un solo sistema de citas, en lugar de repartirlas entre WhatsApp y una libreta, y enviar recordatorios antes de cada cita. Con la agenda con IA haces las dos cosas: le pides al agente que agende, mueva o cancele, y él envía recordatorios por WhatsApp. Pruébalo en el <a href="#demo">simulador</a>.',
    },
    {
      q: '¿Necesito saber de tecnología para usarla?',
      a: 'No. Esa es la idea: en lugar de aprender menús y configuraciones, le dices al agente lo que necesitas. Nosotros te ayudamos a dejarla lista y te enseñamos a usarla.',
    },
    {
      q: '¿Funciona con mi WhatsApp Business?',
      a: 'Sí, funciona junto con WhatsApp Business y cada plan incluye mensajes y recordatorios. Para conectarlo, Meta pide una verificación de tu número; te acompañamos en ese proceso.',
    },
    {
      q: '¿Cuánto cuesta?',
      a: 'Hay tres planes con IVA incluido: Solo $899, Pro $1,299 y Negocio $2,699 al mes. Puedes probarla 7 días gratis y, con pago anual, obtienes 2 meses gratis. Compara los planes en <a href="#planes">planes</a>.',
    },
    {
      q: '¿Para qué negocios funciona mejor?',
      a: 'Para negocios pequeños que trabajan con citas: barberías, estéticas, salones de belleza, spas y consultorios de profesionales independientes.',
    },
    {
      q: '¿Puedo cancelar cuando quiera?',
      a: 'Sí. Es una suscripción mensual sin plazos forzosos; la cancelas en cualquier momento desde tu portal de cliente.',
    },
    {
      q: '¿Dónde contrato una app para agendar citas en Tijuana con soporte local?',
      a: 'Con nosotros. VikingDev es proveedor de CodiceAgents en Tijuana: te ayudamos a elegir el plan, configurar tu agenda, conectar WhatsApp y capacitar a tu equipo. Si además quieres atraer más clientes, podemos crear <a href="/paginas-web-tijuana/">la página web de tu negocio</a>.',
    },
  ],
};
