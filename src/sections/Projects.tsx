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
            <p className="eyebrow">{project.category}</p>
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
  </section>
);
