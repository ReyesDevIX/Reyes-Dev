import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, MountainSnow, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const systemTheme = () => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const savedTheme = () => {
  try { return localStorage.getItem('reyes-theme'); } catch { return null; }
};
export const Header = () => {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || systemTheme());
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    const query = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => { if (!savedTheme()) setTheme(systemTheme()); };
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const switchTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('reyes-theme', next); } catch { /* The current session still uses the selected theme. */ }
  };
  return <header className="top" onKeyDown={event => {
    if (open && event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
  }}><div className="wrap bar">
    <Link className="brand" to="/" onClick={() => setOpen(false)}><MountainSnow aria-hidden="true" />Reyes-Dev<span>.</span></Link>
    <nav id="nav" className={open ? 'nav open' : 'nav'} aria-label="Navegación principal">
      {[['Proyectos','proyectos'], ['Sobre mí','sobre-mi'], ['Trayectoria','experiencia']].map(([label,id]) =>
        <Link key={id} to={'/#'+id} onClick={() => setOpen(false)}>{label}</Link>)}
    </nav>
    <div className="tools"><button className="switch" aria-label={'Activar modo '+(theme === 'dark' ? 'claro' : 'oscuro')} onClick={switchTheme}>{theme === 'dark' ? <Sun/> : <Moon/>}</button>
    <Link className="pill small" to="/#contacto" onClick={() => setOpen(false)}>Contacto <ArrowUpRight size={15}/></Link>
    <button className="menu" ref={toggle} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
  </div></header>;
};
