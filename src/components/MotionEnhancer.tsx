import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import developPicture from '../../.agents/skills/design-taste-frontend/assets/moments/picture-develops/moment.js';
import * as momentLib from '../../.agents/skills/design-taste-frontend/assets/moments/lib.js';
import '../../.agents/skills/design-taste-frontend/assets/moments/picture-develops/moment.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionEnhancer() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (!document.querySelector('.cover')) return;
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.vista img', {
          scale: 1.09,
          clipPath: 'inset(0 0 16% 0)',
          duration: 1.35,
        })
        .from(
          '.name-mask > span',
          { yPercent: 112, stagger: 0.13, duration: 0.92 },
          0.12,
        );
      const portrait = document.querySelector('.portrait-frame');
      const picture: { destroy?: () => void } | null = portrait
        ? developPicture(portrait, { look: 'film' }, momentLib)
        : null;
      gsap.from('.contact h2 span', {
        yPercent: 106,
        rotation: 3,
        transformOrigin: 'left bottom',
        scrollTrigger: {
          trigger: '.contact',
          start: 'top 92%',
          end: 'top 65%',
          scrub: true,
        },
      });
      return () => picture?.destroy?.();
    });
    media.add(
      '(min-width: 900px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)',
      () => {
        const stage = document.querySelector<HTMLElement>('.project-stage');
        if (!stage || stage.offsetHeight > innerHeight - 60) return;
        const sequence = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top 64px',
            end: '+=65%',
            pin: true,
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });
        sequence
          .fromTo(
            stage.querySelector('.board'),
            { rotation: -18, scale: 0.85 },
            { rotation: 0, scale: 1.12, ease: 'none' },
          )
          .from(
            stage.querySelectorAll('.yard i'),
            { y: -25, scale: 0.72, stagger: 0.018, ease: 'power2.out' },
            0,
          );
      },
    );
    const details = document.querySelectorAll('details');
    const refresh = () => ScrollTrigger.refresh();
    details.forEach((item) => item.addEventListener('toggle', refresh));
    return () => {
      details.forEach((item) => item.removeEventListener('toggle', refresh));
      media.revert();
    };
  });
  return null;
}
