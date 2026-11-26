import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function MotionEnhancer({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const media = gsap.matchMedia(root);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (!root.querySelector('.hero')) return;
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: { trigger: '.hero h1', start: 'top 95%', once: true } })
        .from('.hero-word', { yPercent: 117, skewY: 5, stagger: .13, duration: .92 })
        .from('.hero-art .signal > span', { xPercent: -100, scaleX: .2, transformOrigin: 'left center', stagger: .075, duration: .65 }, .15);

      gsap.from('.case-poster .career-shot', {
        xPercent: -36, scale: .82, clipPath: 'inset(0 100% 0 0)', duration: 1,
        scrollTrigger: { trigger: '.case-poster', start: 'top 88%', once: true },
      });
      const signal = root.querySelector('.hero-art .signal');
      if (signal) {
        const float = gsap.fromTo(signal, { '--float-y': '0px' }, { '--float-y': '-6px', duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, paused: true });
        ScrollTrigger.create({
          trigger: signal.parentElement, start: 'top bottom', end: 'bottom top',
          onToggle: self => { float.paused(!self.isActive); },
        });
      }
      root.querySelectorAll('.feature-copy').forEach(copy => {
        gsap.from(copy, { y: 18, opacity: .35, duration: .65, ease: 'power2.out',
          scrollTrigger: { trigger: copy, start: 'top 82%', once: true } });
      });
      const portrait = root.querySelector('.portrait-frame');
      if (portrait) gsap.from(portrait, {
        clipPath: 'inset(0 0 15% 0)', y: 12, duration: .75, ease: 'power2.out',
        scrollTrigger: { trigger: portrait, start: 'top 85%', once: true },
      });
      const headings = [...root.querySelectorAll('h2')].map(heading => {
        const split = SplitText.create(heading, { type: 'chars', charsClass: 'heading-glyph', aria: 'auto' });
        gsap.from(split.chars, {
          yPercent: 45, opacity: 0, stagger: .026, duration: .48, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 94%', once: true },
        });
        return split;
      });

      const refresh = () => ScrollTrigger.refresh();
      const details = root.querySelectorAll('details');
      details.forEach(detail => detail.addEventListener('toggle', refresh));
      return () => {
        details.forEach(detail => detail.removeEventListener('toggle', refresh));
        headings.forEach(split => split.revert());
      };
    });

    media.add('(min-width: 960px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
      if (!root.querySelector('.hero')) return;
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.hero', start: 'top 65px', end: '40% 65px', scrub: true },
      })
        .to('.hero h1', { xPercent: 2, scale: .94, transformOrigin: 'left center' }, 0)
        .to('.hero-art', { y: -24 }, 0);

      root.querySelectorAll<HTMLElement>('.project-stage').forEach(stage => {
        const visual = stage.querySelector('.project-visual');
        const board = stage.querySelector('.board');
        if (!visual || !board || stage.offsetHeight >= innerHeight - 68) return;
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
          trigger: stage, start: 'top 65px', end: () => '+=' + Math.round(innerHeight * .45),
          pin: true, scrub: .3, invalidateOnRefresh: true,
        } })
          .fromTo(visual, { clipPath: 'inset(6% 0 6% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
          .fromTo(board, { rotation: -23, scale: .78 }, { rotation: 0, scale: 1.06 }, 0);
      });
    });

    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const targets = root.querySelectorAll<HTMLElement>('.board-frame, .case-poster, .pill');
      const cleanups = Array.from(targets, el => {
        const button = el.matches('.pill');
        const options = { duration: .28, ease: 'power3.out' };
        const x = gsap.quickTo(el, button ? 'x' : 'rotationY', options);
        const y = gsap.quickTo(el, button ? 'y' : 'rotationX', options);
        if (!button) gsap.set(el, { transformPerspective: 950 });
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          const box = el.getBoundingClientRect();
          const u = (event.clientX - box.left) / box.width;
          const v = (event.clientY - box.top) / box.height;
          x((u - .5) * (button ? 8 : 5));
          y((v - .5) * (button ? 6 : -5));
          if (!button) {
            el.style.setProperty('--shine-x', u * 100 + '%');
            el.style.setProperty('--shine-y', v * 100 + '%');
          }
        };
        const reset = () => { x(0); y(0); };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', reset);
        el.addEventListener('pointercancel', reset);
        return () => {
          el.removeEventListener('pointermove', move);
          el.removeEventListener('pointerleave', reset);
          el.removeEventListener('pointercancel', reset);
          el.style.removeProperty('--shine-x');
          el.style.removeProperty('--shine-y');
        };
      });
      return () => cleanups.forEach(cleanup => cleanup());
    });
    return () => media.revert();
  }, { scope });
  return null;
}
