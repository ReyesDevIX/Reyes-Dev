import { useEffect } from 'react';
import { Github, Youtube } from 'lucide-react';
import { profile } from '../data/cv';
import { ContactEmail } from '../components/ContactEmail';
import { Hero } from '../sections/Hero';
import { Projects } from '../sections/Projects';
import { About } from '../sections/About';
import { Experience } from '../sections/Experience';

export const HomePage = () => {
  useEffect(() => { document.title = 'Reyes-Dev · Ismael Reyes, desarrollador web'; }, []);
  return <><Hero/><Projects/><About/><Experience/>
    <section className="wrap section contact" id="contacto"><div><p className="eyebrow"><span className="line"/> Contacto</p><h2>¿Hablamos<em>?</em></h2></div>
    <div className="actions"><ContactEmail/><a className="text-action" href={profile.github}><Github size={16}/>GitHub</a><a className="text-action" href="https://www.youtube.com/@Reyes-Dev"><Youtube size={17}/>YouTube</a></div></section>
  </>;
};
