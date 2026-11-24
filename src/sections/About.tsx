import { profile, technologies, softSkills, languages } from '../data/cv';
import { ProfileImage } from '../components/ProfileImage';
import { SectionHeading } from '../components/SectionHeading';
export const About = () => <section id="sobre-mi" className="wrap section about reveal">
  <ProfileImage/><div><p className="eyebrow">Ismael Reyes Pérez</p><SectionHeading title="Sobre mí"/><p className="body-lead">{profile.bio}</p>
  <p className="about-stack">Creo interfaces con React y aplicaciones web con PHP.</p><h3 id="habilidades">Herramientas y tecnologías</h3><div className="tags">{technologies.map(item => <span key={item.name}>{item.name}</span>)}</div>
  <details><summary>Cómo trabajo e idiomas</summary>{softSkills.map(skill => <p key={skill.title}><strong>{skill.title}.</strong> {skill.description}</p>)}<p>{languages.map(l => l.name+' · '+l.level).join(' / ')}</p></details></div>
</section>;
