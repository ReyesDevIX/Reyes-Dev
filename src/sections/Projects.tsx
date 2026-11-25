import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/cv';
import { Board } from '../components/Board';
import { Signal } from '../components/Signal';

export const Projects = () => (
  <section id="proyectos" className="project-scene" aria-labelledby="work-title">
    <div className="wrap work-heading">
      <h2 id="work-title">Proyectos<span>.</span></h2>
    </div>
    {projects.map(project => (
      <article className="project-stage wrap" key={project.slug}>
        <div className="project-spread">
          <div className="feature-copy">
            <p className="eyebrow">{project.category} / {project.status}</p>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p className="stack-line">{project.stack.join(' / ')}</p>
            <Link className="pill" to={'/proyectos/' + project.slug}>Explorar proyecto <ArrowUpRight size={17} /></Link>
          </div>
          <div className="board-frame"><Board /></div>
        </div>
      </article>
    ))}
    <article className="portfolio-case wrap">
      <div className="case-poster" aria-hidden="true">
        <span className="poster-type">R<span>D</span></span>
        <Signal />
      </div>
      <div className="feature-copy">
        <p className="eyebrow">Portfolio personal</p>
        <h3>Reyes Dev</h3>
        <p>Construí este portfolio como una muestra de mi trabajo. La identidad se basa en tipografía y geometría, con escenas que se sincronizan con el desplazamiento y composiciones pensadas para pantallas táctiles.</p>
        <p className="stack-line">React / TypeScript / Vite / GSAP</p>
        <a className="text-action" href="https://github.com/ReyesDevIX/Reyes-Dev">Ver código <ArrowUpRight size={16} /></a>
      </div>
    </article>
  </section>
);
