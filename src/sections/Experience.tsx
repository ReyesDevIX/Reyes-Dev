import { FileBadge } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, courses, experiences } from '../data/cv';
import { SectionHeading } from '../components/SectionHeading';
import './Studio.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Experience() {
  const history = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.history-progress', { scaleY: 0, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { trigger: history.current, start: 'top 80%', end: 'bottom 60%', scrub: true } });
      history.current?.querySelectorAll('.milestone').forEach(stage => {
        gsap.from(stage, { y: 14, opacity: .2, duration: .48,
          scrollTrigger: { trigger: stage, start: 'top 80%', once: true } });
      });
    });
    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(history.current!);
    return () => { observer.disconnect(); media.revert(); };
  }, { scope: history });
  return <section id="experiencia" className="paper"><div className="wrap section">
    <SectionHeading title="Trayectoria" />
    <div className="career-history" ref={history}>
      <div className="history-track" aria-hidden="true"><div className="history-progress" /></div>
      <h3>Experiencia</h3>
      {experiences.map(job => <article className="milestone" key={job.role}>
        <small>{job.period}</small><div><h4>{job.role}</h4><p>{job.company}</p>
          <details><summary>Ver funciones</summary><ul>{job.description.map(point => <li key={point}>{point}</li>)}</ul>
            {'link' in job && <a className="text-action" href={job.link}>{job.linkText} ↗</a>}
          </details>
        </div></article>)}
      <h3 id="formacion">Formación</h3>
      {education.map(item => <article className="milestone" key={item.degree}><small>{item.period}</small>
        <div><h4>{item.degree}</h4><p>{item.school} · {item.level}</p></div></article>)}
      <details><summary>Formación complementaria</summary>{courses.map(course => <p key={course.title}>
        <strong>{course.title}</strong><br />{course.provider} · {course.detail}<br /><a className="diploma-link" href={course.diploma} target="_blank" rel="noopener noreferrer" aria-label={`Ver diploma: ${course.title}`}><FileBadge size={16} aria-hidden="true" /> Ver diploma</a></p>)}</details>
    </div>
  </div></section>;
}
