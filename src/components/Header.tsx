import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  ['Proyectos', 'proyectos'],
  ['Sobre mí', 'sobre-mi'],
  ['Trayectoria', 'experiencia'],
];

export const Header = () => {
  const [open, setOpen] = useState(false);
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
        <div className="tools">
          <Link className="nav-contact" to="/#contacto" onClick={() => setOpen(false)}>Contacto <ArrowUpRight size={16} /></Link>
          <button className="menu" ref={toggle} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
};
