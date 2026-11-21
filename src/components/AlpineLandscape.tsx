import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { RotateCcw, MountainSnow } from 'lucide-react';
import { createTerrain, drawTerrain } from './terrain';

const initialAngle = 28;
const normalize = (degrees:number) => ((Math.round(degrees)%360)+360)%360;

export const AlpineLandscape = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const repaint = useRef<() => void>(()=>{});
  const currentAngle = useRef(initialAngle);
  const drag = useRef<{id:number; x:number; angle:number} | null>(null);
  const [angle,setAngle] = useState(initialAngle);
  const [available,setAvailable] = useState(true);
  const rotate = (value:number) => {
    currentAngle.current = normalize(value);
    setAngle(currentAngle.current);
    repaint.current();
  };

  useLayoutEffect(()=>{
    const element=canvas.current;
    const ctx=element?.getContext('2d');
    if(!element || !ctx){setAvailable(false);return;}
    const mesh=createTerrain();
    let frame=0;
    let width=0, height=0;
    const paint=()=>{
      frame=0;
      if(width && height) drawTerrain(ctx,mesh,width,height,currentAngle.current);
    };
    repaint.current=()=>{if(!frame) frame=requestAnimationFrame(paint);};
    const resize=()=>{
      width=element.clientWidth;
      height=element.clientHeight;
      const ratio=Math.min(window.devicePixelRatio || 1,2);
      element.width=Math.round(width*ratio);
      element.height=Math.round(height*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);
      repaint.current();
    };
    const observer=new ResizeObserver(resize);
    observer.observe(element);
    resize();
    return ()=>{observer.disconnect();cancelAnimationFrame(frame);repaint.current=()=>{};};
  },[]);

  const startDrag=(event:PointerEvent<HTMLCanvasElement>)=>{
    if(!event.isPrimary || event.button!==0) return;
    drag.current={id:event.pointerId,x:event.clientX,angle:currentAngle.current};
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag=(event:PointerEvent<HTMLCanvasElement>)=>{
    const start=drag.current;
    if(start?.id===event.pointerId) rotate(start.angle+(event.clientX-start.x)*.65);
  };
  return <figure className="massif">
    <span className="massif-title"><MountainSnow size={17} aria-hidden="true"/> Relieve alpino</span>
    {available ? <>
      <canvas ref={canvas} role="img" aria-label="Maqueta tridimensional de un macizo con crestas nevadas y estratos de roca"
        onPointerDown={startDrag} onPointerMove={moveDrag} onLostPointerCapture={()=>{drag.current=null;}}/>
      <figcaption className="massif-controls">
        <label htmlFor="mountain-angle">Girar montaña <span>{angle}°</span></label>
        <input id="mountain-angle" type="range" min="0" max="359" value={angle} aria-valuetext={angle+' grados'} onChange={event=>rotate(Number(event.target.value))}/>
        <button type="button" onClick={()=>rotate(initialAngle)} aria-label="Restablecer vista de la montaña" title="Restablecer vista"><RotateCcw size={17}/></button>
      </figcaption>
    </> : <img className="massif-fallback" src="/cumbre.jpg" alt="Cumbre alpina entre nubes"/>}
  </figure>;
};
