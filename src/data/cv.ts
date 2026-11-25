/** Información centralizada para actualizar el portfolio sin tocar los componentes. */
export const profile = {
  name: 'Ismael Reyes Pérez',
  shortName: 'Ismael Reyes',
  location: 'Elda, Alicante',
  email: 'ismaelreyeselda@gmail.com',
  github: 'https://github.com/ReyesDevIX',
  bio: 'Estudio 2.º de Desarrollo de Aplicaciones Web y tengo formación previa en sistemas y redes. Me gusta pasar de una propuesta de interfaz a una web que se pueda probar. He trabajado en propuestas de diseño, catálogos y depuración de interfaces, y ahora sigo aprendiendo a desarrollar en equipo.',
};

export const technologies = [
  { name: 'HTML5', group: 'Frontend' },
  { name: 'CSS3', group: 'Frontend' },
  { name: 'JavaScript', group: 'Frontend' },
  { name: 'React', group: 'Frontend' },
  { name: 'PHP', group: 'Backend' },
  { name: 'MVC', group: 'Backend' },
  { name: 'Node.js', group: 'Backend' },
  { name: 'Git', group: 'Herramientas' },
  { name: 'GitHub', group: 'Herramientas' },
  { name: 'WordPress', group: 'Herramientas' },
  { name: 'Elementor', group: 'Herramientas' },
  { name: 'Vite', group: 'Herramientas' },
  { name: 'Redes locales', group: 'Sistemas' },
] as const;

export const projects = [
  {
    slug: 'parchis-multijugador',
    title: 'Parchís multijugador',
    category: 'Proyecto colaborativo',
    status: 'En desarrollo',
    description: 'Un proyecto colaborativo para llevar el parchís al navegador. Mi aportación se centró en la interfaz inicial y en el flujo para crear una sala o unirse con un código.',
    sections: [
      { title: 'Qué queríamos resolver', text: 'Reunir a un grupo de amigos en una partida desde el navegador, con un código de invitación y sin registro.' },
      { title: 'Diseño de interfaz', text: 'Separé el acceso y la sala de espera en dos pantallas. La primera ofrece crear una sala o entrar con un código. La segunda destaca el código y distingue al anfitrión de los demás jugadores.' },
      { title: 'Desarrollo y colaboración', text: 'Preparé la interfaz inicial mediante una pull request. El monorepo separa el cliente, el servidor y las reglas para que el equipo pueda trabajar en cada parte. Express y Socket.IO forman parte de la arquitectura prevista.' },
      { title: 'Estado actual', text: 'El cliente permite recorrer el flujo de acceso y probar una sala con jugadores simulados. El multijugador en tiempo real sigue en desarrollo.' },
    ],
    stack: ['JavaScript', 'Vite', 'Node.js', 'Express', 'Socket.IO', 'SVG'],
    link: 'https://github.com/ReyesDevIX/Parchis',
    linkText: 'Ver repositorio',
  },
] as const;

export const experiences = [
  {
    company: 'Serendipium',
    role: 'Desarrollo web · Joseda Education',
    period: 'Experiencia en desarrollo web',
    description: [
      'Revisé y corregí fallos en animaciones y posicionamiento de elementos mediante depuración visual, edición de código y herramientas de asistencia al desarrollo.',
      'Creé una propuesta de web siguiendo las indicaciones del responsable, presenté avances en reuniones y colaboré en la integración de propuestas del equipo.',
    ],
    link: 'https://joseda.education/',
    linkText: 'Visitar Joseda Education',
  },
  {
    company: 'Vinalopó Parques Infantiles',
    role: 'Prácticas de diseño web · SMR',
    period: '3 meses de prácticas',
    description: [
      'Creé junto a un compañero una primera versión de tienda online utilizando WordPress y Elementor.',
      'Participé en el diseño del logotipo, las fotografías de producto y la preparación del catálogo.',
      'Configuramos equipos conectados en una red local y comparamos opciones de alojamiento web.',
    ],
    link: 'https://vinalopoparquesinfantiles.es/',
    linkText: 'Visitar Vinalopó Parques Infantiles',
  },
  {
    company: 'Vinalopó Parques Infantiles',
    role: 'Montaje y mantenimiento',
    period: 'Experiencia presencial',
    description: [
      'Colaboré en el montaje y mantenimiento de parques infantiles y en el transporte de materiales para distintos proyectos.',
    ],
  },
] as const;

export const education = [
  { degree: 'Desarrollo de Aplicaciones Web (DAW)', level: 'Grado Superior', school: 'IES Poeta Paco Mollà', period: '2025 — actualidad', note: 'Actualmente en 2.º curso' },
  { degree: 'Sistemas Microinformáticos y Redes (SMR)', level: 'Grado Medio', school: 'IES Poeta Paco Mollà', period: '2023 — 2025', note: 'Formación en equipos y redes' },
] as const;

export const softSkills = [
  { title: 'Trabajo en equipo', description: 'Coordinación, revisión de propuestas y aportaciones compartidas.' },
  { title: 'Aprendizaje continuo', description: 'Autonomía para descubrir herramientas y aplicarlas a proyectos reales.' },
  { title: 'Resolución de problemas', description: 'Depuración de interfaces y comparación razonada de alternativas.' },
] as const;

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Valenciano', level: 'Buen dominio' },
  { name: 'Inglés', level: 'Básico' },
] as const;

export const courses = [
  { title: 'Prompting responsable: maximiza la IA en tu negocio', provider: 'Santander Open Academy · Microsoft · Founderz', detail: 'Mayo 2025 · 8 h' },
  { title: 'Google: Inteligencia Artificial y productividad', provider: 'Santander Open Academy · Google', detail: 'Mayo 2025 · 2 h' },
] as const;
