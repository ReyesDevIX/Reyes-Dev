import { profile, technologies, softSkills, languages } from '../data/cv';
import { ProfileImage } from '../components/ProfileImage';
import { SectionHeading } from '../components/SectionHeading';
export const About = () => <section id="sobre-mi" className="wrap section about reveal">
  <ProfileImage/><div><SectionHeading title="Sobre mí"/><p className="body-lead">{profile.bio}</p>
  <h3 id="habilidades">Herramientas y tecnologías</h3><div className="tags">{technologies.map(item => <span key={item.name}>{item.name}</span>)}</div>
  <details><summary>Cómo trabajo e idiomas</summary>{softSkills.map(skill => <p key={skill.title}><strong>{skill.title}.</strong> {skill.description}</p>)}<p>{languages.map(l => l.name+' · '+l.level).join(' / ')}</p></details></div>
</section>;
