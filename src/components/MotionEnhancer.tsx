import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionEnhancer({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(() => {
    const root = scope.current;
    if (!root?.querySelector('.hero')) return;
    const media = gsap.matchMedia(root);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-word', { yPercent: 117, skewY: 5, stagger: .13, duration: .92 })
        .from('.hero-art .signal > span', { xPercent: -100, scaleX: .2, transformOrigin: 'left center', stagger: .075, duration: .65 }, .15);

      gsap.from('.case-poster .poster-type', {
        xPercent: -36, scale: .82, clipPath: 'inset(0 100% 0 0)', duration: 1,
        scrollTrigger: { trigger: '.case-poster', start: 'top 88%', once: true },
      });
      gsap.from('.contact h2 span', {
        yPercent: 70, duration: .75, ease: 'power4.out',
        scrollTrigger: { trigger: '.contact h2', start: 'top 92%', once: true },
      });

      const refresh = () => ScrollTrigger.refresh();
      const details = root.querySelectorAll('details');
      details.forEach(detail => detail.addEventListener('toggle', refresh));
      return () => details.forEach(detail => detail.removeEventListener('toggle', refresh));
    });

    media.add('(min-width: 960px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
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

    return () => media.revert();
  }, { scope });
  return null;
}
