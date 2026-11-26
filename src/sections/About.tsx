import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';
import './Studio.css';
import GravityLetters from '../components/GravityLetters';
import { PenTool, Code2, Terminal, GitPullRequest } from 'lucide-react';
import { TechnologyList } from '../components/TechnologyIcon';
import { profile, technologies, softSkills, languages } from '../data/cv';
import { ProfileImage } from '../components/ProfileImage';


const skills = [
  { title: 'Diseño de interfaces', description: 'Organizo pantallas, jerarquía visual y estados de interfaz. Lo he aplicado al acceso a salas del Parchís y a una primera tienda con WordPress y Elementor.' },
  { title: 'Desarrollo frontend', description: 'Construyo interfaces con React, HTML, CSS y JavaScript. En este portfolio se puede ver cómo adapto la composición, las animaciones y los controles a distintos dispositivos.' },
  { title: 'Herramientas y desarrollo web', description: 'Trabajo con Git y GitHub para compartir cambios y con Vite para desarrollar y compilar. Mi formación incluye PHP con MVC, Node.js y redes locales.' },
  { title: 'Colaboración y depuración', description: 'Comparto propuestas, reviso cambios en equipo y reproduzco problemas visuales. En Joseda Education lo apliqué a fallos de animación y posicionamiento.' },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

const icons = [PenTool, Code2, Terminal, GitPullRequest];
const keywords = /(sistemas y redes|propuesta de interfaz|depuración de interfaces|desarrollar en equipo)/g;

function Presentation() {
  return <p className="about-copy">{profile.bio.split(keywords).map((part, i) =>
    i % 2 ? <strong key={part}>{part}</strong> : part
  )}</p>;
}
export const About = () => {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const root = section.current!;
    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.process-line', {
        scaleX: 0, transformOrigin: 'left', stagger: .45, duration: .6,
        scrollTrigger: { trigger: '.process', start: 'top 80%', once: true },
      });
      const reveal = (trigger: Element, targets: NodeListOf<Element>, title: boolean) => {
        if (trigger.getBoundingClientRect().top <= window.innerHeight * .8) return;
        gsap.from(targets, {
          y: title ? '0.55em' : 16, opacity: 0,
          ...(title && { clipPath: 'inset(100% -5% -10%)' }),
          duration: .65, stagger: .09, ease: 'power3.out', clearProps: 'all',
          scrollTrigger: { trigger, start: 'top 80%', once: true },
        });
      };
      reveal(root.querySelector('.about-title')!, root.querySelectorAll('.about-title span'), true);
      reveal(root.querySelector('.about-notes')!, root.querySelectorAll('.about-note'), false);
    });
    media.add('(min-width: 641px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const controller = new AbortController();
      const options = { signal: controller.signal };
      root.querySelectorAll<HTMLElement>('.about-note').forEach(note => {
        const panel = note.firstElementChild!;
        const turn = gsap.quickTo(panel, 'rotationY', { duration: .35 });
        const tip = gsap.quickTo(panel, 'rotationX', { duration: .35 });
        note.addEventListener('pointermove', event => {
          if (event.pointerType !== 'mouse') return;
          const box = note.getBoundingClientRect();
          turn(5 * ((event.clientX - box.left) / box.width - .5));
          tip(-5 * ((event.clientY - box.top) / box.height - .5));
        }, options);
        const reset = () => { turn(0); tip(0); };
        note.addEventListener('pointerleave', reset, options);
        note.addEventListener('pointercancel', reset, options);
      });
      root.querySelectorAll<HTMLElement>('.tech-item').forEach(item => {
        const button = item.querySelector('button')!;
        const shift = (axis: 'x' | 'y') => gsap.quickTo(button, axis, { duration: .45, ease: 'elastic.out(1,.55)' });
        const mx = shift('x'), my = shift('y');
        item.addEventListener('pointermove', event => {
          if (event.pointerType !== 'mouse') return;
          const box = item.getBoundingClientRect();
          mx(gsap.utils.clamp(-4, 4, (event.clientX - box.left - box.width / 2) * .17));
          my(gsap.utils.clamp(-4, 4, (event.clientY - box.top - box.height / 2) * .17));
        }, options);
        const reset = () => { mx(0); my(0); };
        item.addEventListener('pointerleave', reset, options);
        item.addEventListener('pointercancel', reset, options);
      });
      return () => { controller.abort(); };
    });
    return () => media.revert();
  }, { scope: section });
  return (
  <section ref={section} id="sobre-mi" className="wrap section about">
    <ProfileImage />
    <div>
      <p className="eyebrow">Perfil</p>
      <div role="heading" aria-level={2} className="about-title"><span>Sobre</span>{' '}<span className="editorial-italic">mí</span></div>
      <Presentation />
    </div>
    <div className="about-notes">
      {['Cómo trabajo', 'Aprendizaje', 'Idiomas'].map((title, index) =>
        <article className="about-note" key={title}><div className="about-panel">
          <h3>{title}</h3>
          {index === 2 ? languages.map(lang => <p key={lang.name}><strong>{lang.name}</strong> · {lang.level}</p>) :
            softSkills.filter(skill => (skill.title === 'Aprendizaje continuo') === (index === 1)).map(skill =>
              <p key={skill.title}><strong>{skill.title}.</strong> {skill.description}</p>)}
        </div></article>)}
    </div>
    <div className="competencies" id="habilidades">
      <h3>Diseño <span className="type-bridge">y</span> <em className="editorial-italic">desarrollo</em></h3>
      <div className="process" aria-label="Proceso de trabajo">
        <span>Idea</span><i aria-hidden="true" className="process-line" />
        <span>Diseño</span><i aria-hidden="true" className="process-line" /><span>Código</span>
      </div>
      <dl className="studio-grid">
        {skills.map((skill, i) => {
          const Icon = icons[i];
          return <div key={skill.title} className="studio-card" onPointerMove={event => {
            if (event.pointerType !== 'mouse' || !matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
            const card = event.currentTarget;
            const box = card.getBoundingClientRect();
            card.style.setProperty('--spot-x', (event.clientX - box.left) + 'px');
            card.style.setProperty('--spot-y', (event.clientY - box.top) + 'px');
          }}>
            <dt><Icon aria-hidden="true" /><span>{skill.title}</span></dt><dd>{skill.description}</dd>
          </div>;
        })}
      </dl>
      <aside className="glyph-lab">
        <GravityLetters items={['<>', '{}', '#', 'A', '→', '/']} maxGlyphs={18} deviceTilt={false} aria-label="Soltar símbolos">
          <span className="glyph-label">Soltar símbolos ↓</span>
        </GravityLetters>
        <a href="https://rareui.com">Gravity Letters · Rare UI ↗</a>
      </aside>
      <p className="eyebrow">Tecnologías y herramientas</p>
      <TechnologyList names={technologies.map(item => item.name)} />
    </div>
  </section>
);
};
