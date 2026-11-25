import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  ['Proyectos', 'proyectos'],
  ['Sobre mí', 'sobre-mi'],
  ['Trayectoria', 'experiencia'],
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme !== 'light');
  const toggleTheme = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('reyes-theme', next); } catch { /* Session-only theme. */ }
    setDark(!dark);
  };
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) nav.current?.querySelector('a')?.focus();
  }, [open]);

  return (
    <header className="top" onKeyDown={event => {
      if (open && event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <div className="bar wrap">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>Reyes Dev<span aria-hidden="true">.</span></Link>
        <nav ref={nav} id="nav" className={open ? 'nav open' : 'nav'} aria-label="Navegación principal">
          {links.map(([label, id]) => <Link key={id} to={'/#' + id} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <div className="tools"><button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <Link className="nav-contact" to="/#contacto" onClick={() => setOpen(false)}>Contacto <ArrowUpRight size={16} /></Link>
          <button className="menu" ref={toggle} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
};
