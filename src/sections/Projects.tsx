import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/cv';
import { Board } from '../components/Board';
import { SectionHeading } from '../components/SectionHeading';

export const Projects = () => <section id="proyectos" className="paper"><div className="wrap section">
  <SectionHeading title="Proyectos"/>{projects.map(project => <article className="feature reveal" key={project.slug}>
    <Board/><div className="feature-copy"><p className="eyebrow"><i className="dot"/>{project.status}</p>
    <h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
    <Link className="text-action" to={'/proyectos/'+project.slug}>Explorar proyecto <ArrowUpRight size={17}/></Link></div>
  </article>)}</div></section>;
