import { ArrowDown, Download, Maximize } from 'lucide-react';
import { profile } from '../data/cv';

export const Hero = () => (
  <section id="inicio" className="hero wrap" aria-labelledby="nombre">
    <div className="hero-meta">
      <span>Portfolio de desarrollo web</span>
      <span>2.º de DAW · {profile.location}</span>
    </div>
    <div className="cover">
      <picture className="vista">
        <source media="(max-width:680px)" srcSet="/cumbre-mobile.webp" />
        <img
          src="/cumbre.webp"
          alt="Crestas de montaña entre nubes"
          fetchPriority="high"
          width="1536"
          height="1024"
        />
      </picture>
      <a className="view-relief" href="#relieve">
        <Maximize size={17} /> Explorar relieve
      </a>
      <div className="intro">
        <h1 id="nombre">
          <span className="name-mask">
            <span>Ismael</span>
          </span>
          <span className="name-mask">
            <span>
              Reyes<span className="period">.</span>
            </span>
          </span>
        </h1>
        <p className="lead">{profile.role}.</p>
        <div className="actions">
          <a className="pill" href="#proyectos">
            Ver proyecto <ArrowDown size={16} />
          </a>
          <a className="text-action" href="/CV-Ismael-Reyes.pdf" download>
            <Download size={16} /> Descargar CV
          </a>
        </div>
      </div>
    </div>
  </section>
);
