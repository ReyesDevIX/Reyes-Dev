import { ContactForm } from '../components/ContactForm';
import { useEffect } from 'react';
import { Download, Github, Youtube } from 'lucide-react';
import { profile } from '../data/cv';
import { ContactEmail } from '../components/ContactEmail';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Reyes Dev · Ismael Reyes, diseño de interfaces y frontend';
  }, []);
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <section className="contact" id="contacto">
        <div className="wrap section contact-layout">
          <div className="contact-copy">
          <h2>
            <span>¿Hablamos?</span>
          </h2>
          <p className="contact-lead">Busco mi próxima oportunidad en desarrollo web. Si estás incorporando a alguien junior, ofreces prácticas o tienes una web en mente, cuéntame qué necesitas.</p>
          <div className="actions">
            <ContactEmail />
            <a className="text-action" href="/CV-Ismael-Reyes.pdf" download><Download size={16} /> Descargar CV</a>
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
          <ContactForm />
        </div>
      </section>
    </>
  );
};
