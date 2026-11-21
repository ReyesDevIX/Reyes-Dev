import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const MotionEnhancer = () => {
  const cursor = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = document.querySelector('.intro');
      if (intro) {
        const opening = gsap.timeline({ defaults: { ease: 'power3.out' } });
        opening.from(intro.querySelector('.line'), { scaleX: 0, transformOrigin: 'left', duration: .5 })
          .from(intro.querySelectorAll('.name-mask > *'), {
            yPercent: 112, rotation: 5, transformOrigin: 'left bottom', stagger: .17, duration: 1.0,
            clearProps: 'transform'
          }, .06)
          .from(intro.querySelectorAll('.lead,.summary,.actions'), {
            y: 22, opacity: .25, stagger: .09, duration: .65, clearProps: 'transform,opacity'
          }, .32);
      }
      document.querySelectorAll<HTMLElement>('.section-title,.contact h2,.detail h1').forEach(title => {
        gsap.from(title, {
          x: -40, opacity: .35, duration: .8, ease: 'power3.out', clearProps:'transform,opacity',
          scrollTrigger: { trigger: title, start: 'top 94%', once: true }
        });
      });
      document.querySelectorAll<HTMLElement>('.board').forEach(board => {
        const pieces = board.querySelectorAll('.yard i');
        const sequence = gsap.timeline({
          scrollTrigger: { trigger: board.parentElement, start: 'top 90%', once: true }
        });
        sequence.from(board, {
          rotation: -32, scale: .74, y: 45, duration: 1, ease: 'power3.out', clearProps: 'transform'
        }).from(pieces, {
          y: -28, scale: 1.35, opacity: 0, stagger: .055, duration: .5,
          ease: 'bounce.out', clearProps: 'transform,opacity'
        }, .24);
      });
      document.querySelectorAll<HTMLElement>('.feature-copy,.history,.about').forEach(group => {
        gsap.from(group.children, {
          y: 28, opacity: .35, duration: .7, stagger: .09, ease: 'power2.out', clearProps:'transform,opacity',
          scrollTrigger: { trigger: group, start: 'top 94%', once: true }
        });
      });
    });
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const ring = cursor.current;
      if (!ring) return;
      const move = (event: PointerEvent) => {
        const link = (event.target as Element).closest('a,button,summary');
        gsap.set(ring, { x:event.clientX, y:event.clientY, opacity:link ? 0 : .8 });
      };
      const hide = () => gsap.set(ring, {opacity:0});
      const card = document.querySelector<HTMLElement>('.project-visual');
      const tilt = (event: PointerEvent) => {
        if (!card) return;
        const box = card.getBoundingClientRect();
        gsap.to(card, { rotationY: ((event.clientX-box.left)/box.width-.5)*8, rotationX: (.5-(event.clientY-box.top)/box.height)*8, transformPerspective:900, duration:.25, overwrite:true });
      };
      const reset = () => gsap.to(card, { rotationX:0, rotationY:0, duration:.4, overwrite:true });
      document.addEventListener('pointermove', move);
      document.documentElement.addEventListener('pointerleave', hide);
      card?.addEventListener('pointermove',tilt);
      card?.addEventListener('pointerleave',reset);
      return () => {
        document.removeEventListener('pointermove',move);
        document.documentElement.removeEventListener('pointerleave',hide);
        card?.removeEventListener('pointermove',tilt);
        card?.removeEventListener('pointerleave',reset);
        if (card) { gsap.killTweensOf(card); card.style.removeProperty('transform'); }
        ring.style.opacity='0';
      };
    });
    return () => media.revert();
  }, []);
  return <div ref={cursor} className="cursor" aria-hidden="true"/>;
};

