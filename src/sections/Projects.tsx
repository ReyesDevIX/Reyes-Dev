import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/cv';
import { Board } from '../components/Board';

export const Projects = () => (
  <section id="proyectos" className="project-scene">
    {projects.map((project) => (
      <article className="project-stage wrap" key={project.slug}>
        <div className="project-caption">
          <span>Proyecto seleccionado</span>
          <span>{project.status}</span>
        </div>
        <div className="project-spread">
          <div className="feature-copy">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p className="stack-line">{project.stack.join(' / ')}</p>
            <Link className="pill" to={'/proyectos/' + project.slug}>
              Explorar proyecto <ArrowUpRight size={17} />
            </Link>
          </div>
          <Board />
        </div>
      </article>
    ))}
    <article className="portfolio-case wrap">
      <div><p className="eyebrow">Caso de estudio</p><h2>Reyes Dev</h2></div>
      <div>
        <p>Quería que el mismo sitio mostrara cómo diseño una interfaz y cómo la construyo. Organicé la portada para que los proyectos y el contacto se encuentren enseguida. El relieve 2D utiliza una malla generada en código y se puede explorar con puntero o teclado.</p>
        <p className="stack-line">React / TypeScript / Vite / GSAP / Canvas</p>
        <div className="actions">
          <a className="text-action" href="#relieve">Probar el relieve</a>
          <a className="text-action" href="https://github.com/ReyesDevIX/Reyes-Dev">Ver código <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </article>
  </section>
);
