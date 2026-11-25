import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';
import { TechnologyList } from '../components/TechnologyIcon';
import { profile, technologies, softSkills, languages } from '../data/cv';
import { ProfileImage } from '../components/ProfileImage';
import { SectionHeading } from '../components/SectionHeading';

const skills = [
  { title: 'Diseño de interfaces', description: 'Organizo pantallas, jerarquía visual y estados de interfaz. Lo he aplicado al acceso a salas del Parchís y a una primera tienda con WordPress y Elementor.' },
  { title: 'Desarrollo frontend', description: 'Construyo interfaces con React, HTML, CSS y JavaScript. En este portfolio se puede ver cómo adapto la composición, las animaciones y los controles a distintos dispositivos.' },
  { title: 'Herramientas y desarrollo web', description: 'Trabajo con Git y GitHub para compartir cambios y con Vite para desarrollar y compilar. Mi formación incluye PHP con MVC, Node.js y redes locales.' },
  { title: 'Colaboración y depuración', description: 'Comparto propuestas, reviso cambios en equipo y reproduzco problemas visuales. En Joseda Education lo apliqué a fallos de animación y posicionamiento.' },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sentences = profile.bio.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚ])/u);
const keywords = /(Desarrollo de Aplicaciones Web|sistemas y redes|propuesta de interfaz|depuración de interfaces|desarrollar en equipo)/g;

function Presentation() {
  return <div className="body-lead about-bio">
    <p>{sentences.map((sentence, i) => <span className="bio-sentence" key={sentence}>{sentence}{i < sentences.length - 1 ? ' ' : ''}</span>)}</p>
    <p className="bio-scan" aria-hidden="true">{sentences.map(sentence => <span className="scan-line" key={sentence}>{sentence.split(keywords).map((part, i) => i % 2 ? <mark key={i}>{part}</mark> : part)}</span>)}</p>
  </div>;
}

export const About = () => {
  const section = useRef<HTMLElement>(null);
  useGSAP(() => {
    const root = section.current!;
    const media = gsap.matchMedia(root);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.bio-sentence', {
        opacity: .35, y: 7, duration: .6, stagger: .17, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-bio', start: 'top 90%', once: true },
      });
    });
    media.add('(min-width: 641px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const bio = root.querySelector<HTMLElement>('.about-bio')!;
      const scan = root.querySelector<HTMLElement>('.bio-scan')!;
      const controller = new AbortController();
      const options = { signal: controller.signal };
      const x = gsap.quickTo(scan, '--scan-x', { duration: .16, ease: 'power2.out' });
      const y = gsap.quickTo(scan, '--scan-y', { duration: .16, ease: 'power2.out' });
      const track = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = bio.getBoundingClientRect();
        const dx = event.clientX - bounds.left, dy = event.clientY - bounds.top;
        if (!bio.classList.contains('scanning')) {
          x(dx, dx); y(dy, dy);
          bio.classList.add('scanning');
        } else { x(dx); y(dy); }
      };
      const hide = () => bio.classList.remove('scanning');
      bio.addEventListener('pointermove', track, options);
      bio.addEventListener('pointerleave', hide, options);
      bio.addEventListener('pointercancel', hide, options);
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
      return () => { controller.abort(); hide(); };
    });
    return () => media.revert();
  }, { scope: section });
  return (
  <section ref={section} id="sobre-mi" className="wrap section about">
    <ProfileImage />
    <div>
      <p className="eyebrow">Perfil</p>
      <SectionHeading title="Sobre mí" />
      <Presentation />
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
      <TechnologyList names={technologies.map(item => item.name)} />
    </div>
  </section>
);
};
