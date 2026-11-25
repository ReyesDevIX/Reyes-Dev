import { useId, useState } from 'react';
import paths from '../data/technologyPaths.json';

const marks: Record<string, string> = paths;
const initials: Record<string, string> = {
  'Redes locales': 'LAN', 'Lectura de partidas FC 27': 'FC', 'CSS Modules': 'CM',
  'Pruebas de navegador': 'QA', 'Autenticación': 'Auth', 'Skills personalizadas': 'Sk',
  'Barlow Condensed': 'Bc', Barlow: 'Ba', ChatGPT: 'GPT', Codex: 'Cx', Playwright: 'Pw',
};

export function TechnologyIcon({ name, size = 23 }: { name: string; size?: number }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return <li className="tech-item">
    <button type="button" aria-label={name} aria-describedby={open ? id : undefined}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') setOpen(false); }}
      onClick={() => setOpen(true)} onKeyDown={e => { if (e.key === 'Escape') setOpen(false); }}>
      {name === "Playwright" ? <img src="/playwright.svg" alt="" width={size} height={size}/> : marks[name] ? <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true"><path d={marks[name]} /></svg>
        : <span aria-hidden="true">{initials[name] || name}</span>}
    </button>
    <span role="tooltip" id={id} className={'tech-tip' + (open ? ' visible' : '')}>{name}</span>
  </li>;
}

export function TechnologyList({ names }: { names: readonly string[] }) {
  return <ul className="tech-list" aria-label="Tecnologías">{names.map(name => <TechnologyIcon key={name} name={name} />)}</ul>;
}

