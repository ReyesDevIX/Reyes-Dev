import { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import './CodeIntro.css';

const sessionKey = 'reyes-code-intro-v1';
let seen = false;
const fragments = ['</', '{', '/>', '[', '}', '=>', ']', '::'];
const vectors = [[-.35,-.3],[.22,-.38],[-.44,.09],[.38,.22],[-.16,.33],[.4,-.17],[.17,.37],[-.32,.22]];
const mark = [[0,0],[.28,0],[.52,.55],[.76,0],[1,0],[.51,1]];
const points = (shape: number[][], x: number, y: number, w: number, h: number) =>
  shape.map(([u,v]) => [x+u*w,y+v*h].join(',')).join(' ');

export function CodeIntro() {
  const dialog = useRef<HTMLDialogElement>(null);
  const target = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const layer = dialog.current!;
    const anchor = target.current!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (seen || location.hash || scrollY > 2 || reduced.matches) return;
    try { if (sessionStorage.getItem(sessionKey)) return; } catch { /* Memory fallback. */ }
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousFocus = document.activeElement;
    const events = new AbortController();
    const timeline = gsap.timeline({ paused: true });
    let watchdog = 0;
    let active = true;
    function close(remember: boolean) {
      if (!active) return;
      active = false;
      events.abort();
      clearTimeout(watchdog);
      timeline.kill();
      anchor.style.visibility = '';
      root.style.overflow = previousOverflow;
      if (layer.open) layer.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({preventScroll:true});
      if (remember) {
        seen = true;
        try { sessionStorage.setItem(sessionKey,'1'); } catch { /* Memory fallback. */ }
      }
    }
    const finish = () => close(true);
    try {
      root.style.overflow = 'hidden';
      layer.showModal();
      const bounds = layer.getBoundingClientRect();
      const slot = layer.querySelector('.intro-slot')!.getBoundingClientRect();
      const end = anchor.getBoundingClientRect();
      const polygon = layer.querySelector('polygon')!;
      const surface = layer.querySelector('.intro-surface')!;
      const letters = layer.querySelectorAll('.intro-word b');
      anchor.style.visibility = 'hidden';
      const letter = points(mark,slot.x,slot.y,slot.width,slot.height);
      const full = points([[0,0],[.3,0],[.55,0],[1,0],[1,1],[0,1]],-2,-2,bounds.width+4,bounds.height+4);
      const parked = points(mark,end.x,end.y,end.width,end.height);
      polygon.setAttribute('points',letter);
      const pieces = layer.querySelectorAll('.intro-fragment');
      pieces.forEach((piece,i) => {
        const [u,v] = vectors[i];
        timeline.fromTo(piece,{ x:u*bounds.width,y:v*bounds.height,opacity:0,rotation:u*60 },
          {opacity:1,duration:.14},i*.022)
          .to(piece,{ x:slot.x-bounds.width/2-(7-i)*slot.width*.94,y:0,rotation:0,scale:.55,opacity:0,duration:.55,ease:'power2.inOut'},.27+i*.035);
      });
      timeline.fromTo(letters,{yPercent:60,clipPath:'inset(90% 0 0 0)'},{yPercent:0,clipPath:'inset(0% 0 0 0)',duration:.38,stagger:.042},.45)
        .fromTo(polygon,{opacity:0},{opacity:1,duration:.14},.78)
        .to(polygon,{attr:{points:points(mark,slot.x+slot.width*.16,slot.y-slot.height*.12,slot.width,slot.height)},duration:.17},1.06)
        .to(polygon,{attr:{points:full},duration:.54,ease:'power3.inOut'},1.23)
        .set(surface,{visibility:'hidden'},1.77)
        .to(polygon,{attr:{points:parked},duration:.83,ease:'power3.inOut'},1.77)
        .eventCallback('onComplete',finish);
      const options = {signal:events.signal};
      layer.addEventListener('click',finish,options);
      layer.addEventListener('keydown',e=>{
        if (['Escape','Enter',' '].includes(e.key)) { e.preventDefault(); finish(); }
      },options);
      window.addEventListener('resize',finish,options);
      reduced.addEventListener('change',finish,options);
      watchdog = window.setTimeout(finish,3300);
      timeline.play(0);
    } catch { finish(); }
    return () => close(false);
  }, []);
  return <><svg className="hero-v" ref={target} viewBox="0 0 100 100" aria-hidden="true">
    <polygon points={points(mark,0,0,100,100)} /></svg>
    {createPortal(<dialog className="code-intro" ref={dialog} aria-label="Introducción de Reyes Dev">
      <div className="intro-surface" aria-hidden="true">
        {fragments.map(char=><i className="intro-fragment" key={char}>{char}</i>)}
        <div className="intro-word">{'REYES DE'.split('').map((letter,i)=><b key={i}>{letter===' ' ? '\u00a0' : letter}</b>)}<span className="intro-slot" /></div>
      </div>
      <svg className="intro-geometry" aria-hidden="true"><polygon /></svg>
      <button type="button" className="intro-skip">Saltar intro ↗</button>
    </dialog>,document.body)}</>;
}
