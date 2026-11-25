import { TechnologyList } from '../components/TechnologyIcon';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/cv';
import { Board } from '../components/Board';

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
            <TechnologyList names={project.stack} />
            <Link className="pill" to={'/proyectos/' + project.slug}>Explorar proyecto <ArrowUpRight size={17} /></Link>
          </div>
          <div className="board-frame"><Board /></div>
        </div>
      </article>
    ))}
    <article className="portfolio-case wrap">
      <div className="case-poster"><img className="career-shot" src="/careermanager.webp" alt="Panel de CareerManager con la carrera de demostración Puerto Norte CF" loading="lazy" width="1200" height="800" /></div>
      <div className="feature-copy">
        <p className="eyebrow">Aplicación web / En desarrollo</p>
        <h3>CareerManager</h3>
        <p className="career-subtitle">Gestor de Modo Carrera de EA SPORTS FC 27</p>
        <p>Consulta plantillas, fichajes, estadísticas, economía y cantera, y conserva el historial de cada temporada. La aplicación publicada está conectada a Supabase y ya muestra datos reales extraídos del juego. La sincronización automática completa sigue en pruebas.</p>
        <p>Participo en el diseño de funcionalidades y en las decisiones técnicas y visuales. Pruebo mis propias partidas, contrasto los datos extraídos, detecto errores y propongo mejoras.</p>
        <div className="actions"><a className="pill" href="https://career-manager-ten.vercel.app/">Ver proyecto <ArrowUpRight size={16}/></a><a className="text-action" href="https://github.com/ReyesDevIX/CareerManager">Ver código en GitHub</a></div>
        <details><summary>Tecnologías y herramientas</summary><TechnologyList names={['React','Vite','TypeScript','HTML5','CSS3','Barlow','Barlow Condensed','CSS Modules','Lucide','Node.js','Supabase','PostgreSQL','Autenticación','RLS','SQLite','Lectura de partidas FC 27','Vitest','Playwright','ESLint','Pruebas de navegador','Git','GitHub','Vercel','ChatGPT','Codex','Skills personalizadas']}/></details>
      </div>
    </article>
  </section>
);

