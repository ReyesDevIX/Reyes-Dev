import { ArrowDown, ArrowDownRight, Download, MapPin } from 'lucide-react';
import { AlpineLandscape } from '../components/AlpineLandscape';
import { profile } from '../data/cv';

export const Hero = () => <section id="inicio" className="hero wrap">
  <div className="intro">
    <p className="eyebrow"><span className="line"/> Portfolio de desarrollo web</p>
    <h1 aria-label="Ismael Reyes"><span className="name-mask"><span>Ismael</span></span><span className="name-mask"><em>Reyes.</em></span></h1>
    <p className="lead">Desarrollador web en formación.</p>
    <p className="summary">Estudio 2.º de DAW en Alicante. Creo interfaces con React y aplicaciones web con PHP.</p>
    <div className="actions"><a className="pill" href="#proyectos">Ver proyectos <ArrowDownRight size={17}/></a><a className="text-action" href="/CV-Ismael-Reyes.pdf" download><Download size={15}/> Descargar CV (PDF)</a></div>
  </div>
  <AlpineLandscape/>
  <div className="hero-foot"><span><MapPin size={14}/> {profile.location}</span><a href="#proyectos">Explorar <ArrowDown size={14}/></a></div>
</section>;
