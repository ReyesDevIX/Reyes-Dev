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
  if (!project) return <MissingPage/>;
  return <article className="wrap section detail"><Link className="text-action" to="/#proyectos"><ArrowLeft size={16}/> Volver a proyectos</Link>
    <p className="eyebrow">{project.category} / {project.status}</p><h1>{project.title}<em>.</em></h1>
    <p className="body-lead">{project.description}</p><Board/>
    <div className="case-notes">
      {project.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    </div>
    <h2 className="case-stack">Tecnologías del proyecto</h2>
    <TechnologyList names={project.stack} />
    <a className="pill" href={project.link}>{project.linkText} <ArrowUpRight size={16}/></a>
  </article>;
};
