import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './Parchis.css';
import { TechnologyList } from '../components/TechnologyIcon';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Board } from '../components/Board';
import { projects } from '../data/cv';

export const MissingPage = () => {
  useEffect(() => { document.title = 'Página no encontrada · Reyes-Dev'; }, []);
  return <section className="wrap section detail"><p className="eyebrow">404</p><h1>Página no encontrada.</h1><Link className="text-action" to="/">Volver al inicio <ArrowUpRight size={16}/></Link></section>;
};
export const ProjectPage = () => {
  const {slug} = useParams();
  const project = projects.find(item => item.slug === slug);
  useEffect(() => { if (project) document.title = project.title+' · Reyes-Dev'; }, [project]);
  const page = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (!project) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.parchis-intro h1 > *', { y: 22, opacity: 0, duration: .65, stagger: .13 });
      gsap.from('.parchis-diagram', { clipPath: 'inset(0 0 34% 0)', duration: .85,
        scrollTrigger: { trigger: '.parchis-diagram', start: 'top 88%', once: true } });
      gsap.from('.parchis-shot img', { clipPath: 'inset(0 8% 12% 8%)', duration: .8,
        scrollTrigger: { trigger: '.parchis-shot', start: 'top 80%', once: true } });
      gsap.from('.story-progress', { scaleY: 0, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { trigger: '.project-story', start: 'top 80%', end: 'bottom 52%', scrub: true } });
      page.current?.querySelectorAll('.story-step').forEach((step, index) => {
        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' },
          scrollTrigger: { trigger: step, start: 'top 82%', once: true } });
        timeline.from(step.querySelector('.story-rule'), { scaleX: 0, duration: .6 })
          .from(step.querySelector('.step-number'), { scale: .94, opacity: .15, duration: .55 }, 0)
          .from(step.querySelectorAll('h2, p'), { x: index % 2 ? -10 : 10, y: 8, opacity: .15, stagger: .09, duration: .5 }, .08);
      });
    });
    return () => media.revert();
  }, { scope: page, dependencies: [project], revertOnUpdate: true });
  if (!project) return <MissingPage/>;
  return <article ref={page} className="wrap section detail parchis-case"><Link className="text-action" to="/#proyectos"><ArrowLeft size={16}/> Volver a proyectos</Link>
    <div className="parchis-intro"><header><p className="eyebrow">{project.category} / {project.status}</p><h1><strong>Parchís</strong> <em>multijugador.</em></h1>
    <p className="body-lead">{project.description}</p></header><div className="parchis-diagram" onPointerMove={event => {
      if (event.pointerType !== 'mouse') return;
      const el = event.currentTarget;
      const box = el.getBoundingClientRect();
      el.style.setProperty('--orbit', ((event.clientX - box.left) / box.width * 16 - 8) + 'deg');
    }} onPointerLeave={event => event.currentTarget.style.removeProperty('--orbit')}><Board /></div></div>
    <figure className="parchis-shot"><img src="/parchis-acceso.webp" alt="Interfaz de acceso con nombre del jugador, creación de sala y código de invitación" width="1080" height="800" loading="lazy" /><figcaption>Interfaz de acceso · Cliente web</figcaption></figure>
    <div className="project-story">
      <span className="story-progress" aria-hidden="true" />
      {project.sections.map((section, index) => {
        const words = section.title.split(' ');
        const emphasis = words.pop();
        return <section className="story-step" key={section.title}>
          <span className="story-rule" aria-hidden="true" />
          <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="step-copy"><h2>{words.join(' ')} <em>{emphasis}</em></h2><p>{section.text}</p></div>
        </section>;
      })}
    </div>
    <div className="story-tools">
      <div><h2 className="case-stack">Tecnologías del proyecto</h2><TechnologyList names={project.stack} /></div>
      <a className="pill repo-link" href={project.link}>{project.linkText} <ArrowUpRight size={18}/></a>
    </div>  </article>;
};
