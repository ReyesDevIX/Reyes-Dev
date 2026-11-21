import { education, courses, experiences } from '../data/cv';
import { SectionHeading } from '../components/SectionHeading';
export const Experience = () => <section id="experiencia" className="paper"><div className="wrap section"><SectionHeading title="Trayectoria"/>
  <div className="history"><div><h3>Experiencia</h3>{experiences.map(job => <details key={job.role}><summary><small>{job.company}</small>{job.role}</summary><p>{job.period}</p><ul>{job.description.map(point => <li key={point}>{point}</li>)}</ul>{'link' in job && <a className="text-action" href={job.link}>{job.linkText} ↗</a>}</details>)}</div>
  <div id="formacion"><h3>Formación</h3>{education.map(item => <article key={item.degree}><small>{item.period}</small><h4>{item.degree}</h4><p>{item.school} · {item.level}</p></article>)}<details><summary>Formación complementaria</summary>{courses.map(course => <p key={course.title}><strong>{course.title}</strong><br/>{course.provider} · {course.detail}</p>)}</details></div></div>
</div></section>;
