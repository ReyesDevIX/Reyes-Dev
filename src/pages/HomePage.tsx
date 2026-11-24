import { useEffect } from 'react';
import { Github, Youtube } from 'lucide-react';
import { profile } from '../data/cv';
import { ContactEmail } from '../components/ContactEmail';
import { AlpineLandscape } from '../components/AlpineLandscape';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Reyes-Dev · Ismael Reyes, desarrollador web';
  }, []);
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <section className="wrap section relief" id="relieve">
        <div>
          <p className="eyebrow">Estudio interactivo</p>
          <h2 className="section-title">Relieve alpino.</h2>
          <p>
            Arrastra el terreno o utiliza el control de giro para recorrer sus
            crestas.
          </p>
        </div>
        <AlpineLandscape />
      </section>
      <section className="contact" id="contacto">
        <div className="wrap section">
          <p className="eyebrow">Contacto</p>
          <h2>
            <span>¿Hablamos?</span>
          </h2>
          <div className="actions">
            <ContactEmail />
            <a className="text-action" href={profile.github}>
              <Github size={16} />
              GitHub
            </a>
            <a
              className="text-action"
              href="https://www.youtube.com/@Reyes-Dev"
            >
              <Youtube size={17} />
              YouTube
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
