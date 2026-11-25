import { profile, technologies, softSkills, languages } from '../data/cv';
import { ProfileImage } from '../components/ProfileImage';
import { SectionHeading } from '../components/SectionHeading';

const skills = [
  { title: 'Diseño de interfaces', description: 'Organizo pantallas, jerarquía visual y estados de interfaz. Lo he aplicado al acceso a salas del Parchís y a una primera tienda con WordPress y Elementor.' },
  { title: 'Desarrollo frontend', description: 'Construyo interfaces con React, HTML, CSS y JavaScript. En este portfolio se puede ver cómo adapto la composición, las animaciones y los controles a distintos dispositivos.' },
  { title: 'Herramientas y desarrollo web', description: 'Trabajo con Git y GitHub para compartir cambios y con Vite para desarrollar y compilar. Mi formación incluye PHP con MVC, Node.js y redes locales.' },
  { title: 'Colaboración y depuración', description: 'Comparto propuestas, reviso cambios en equipo y reproduzco problemas visuales. En Joseda Education lo apliqué a fallos de animación y posicionamiento.' },
];

export const About = () => (
  <section id="sobre-mi" className="wrap section about">
    <ProfileImage />
    <div>
      <p className="eyebrow">Perfil</p>
      <SectionHeading title="Sobre mí" />
      <p className="body-lead">{profile.bio}</p>
      <details>
        <summary>Cómo trabajo e idiomas</summary>
        {softSkills.map(skill => <p key={skill.title}><strong>{skill.title}.</strong> {skill.description}</p>)}
        <p>{languages.map(lang => lang.name + ' · ' + lang.level).join(' / ')}</p>
      </details>
    </div>
    <div className="competencies" id="habilidades">
      <h3>Diseño y desarrollo</h3>
      <dl className="skill-grid">
        {skills.map(skill => <div key={skill.title}><dt>{skill.title}</dt><dd>{skill.description}</dd></div>)}
      </dl>
      <p className="eyebrow">Tecnologías y herramientas</p>
      <div className="tags">{technologies.map(item => <span key={item.name}>{item.name}</span>)}</div>
    </div>
  </section>
);
