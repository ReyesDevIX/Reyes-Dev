import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CodeIntro } from '../components/CodeIntro';
import { profile } from '../data/cv';

export const Hero = () => (
  <section id="inicio" className="wrap hero" aria-labelledby="nombre">
    <div className="hero-meta"><span className="hero-signature"><CodeIntro />Diseño de interfaces / Frontend</span><span>{profile.location}</span></div>
    <h1 id="nombre" aria-label={profile.shortName}>
      {profile.shortName.split(' ').map(word => (
        <span className="word-mask" aria-hidden="true" key={word}><span className="hero-word">{Array.from(word, (letter, index) => <span className="hero-letter" key={index}>{letter}</span>)}</span></span>
      ))}
    </h1>
    <div className="hero-bottom">
      <div className="hero-copy">
        <p className="lead">Diseño <strong>interfaces.</strong><br />Las convierto en <em className="editorial-italic">código.</em></p>
        <p className="hero-summary">Estudio Desarrollo de Aplicaciones Web. Trabajo la interfaz, la interacción y el frontend de cada proyecto.</p>
        <div className="actions">
          <Link className="pill" to="/#proyectos">Ver proyectos <ArrowDown size={16} aria-hidden="true" /></Link>
          <Link className="text-action" to="/#contacto">Hablemos <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="hero-art"><img className="hero-portrait" src="/ismael-ilustracion.webp" width="680" height="848" alt="Retrato ilustrado de Ismael Reyes" fetchPriority="high" /></div>
    </div>
  </section>
);
