import { useRef, useState, type FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { profile } from '../data/cv';
import './ContactForm.css';

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'accepted' | 'error'>('idle');
  const pending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return;
    for (const name of ['_subject', 'message']) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      if (!field.value.trim()) {
        field.setCustomValidity('Completa este campo.');
        field.reportValidity();
        return;
      }
    }
    pending.current = true;
    setState('sending');
    try {
      const id = import.meta.env.VITE_FORMSUBMIT_ID || profile.email;
      const response = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(id), {
        method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || ![true, 'true'].includes(result?.success)) throw new Error();
      form.reset();
      setState('accepted');
    } catch {
      setState('error');
    } finally { pending.current = false; }
  }
  return <form className="contact-form" aria-label="Formulario de contacto" onSubmit={submit}
    onInput={event => {
      (event.target as HTMLInputElement).setCustomValidity('');
      if (!pending.current) setState('idle');
    }} onPointerMove={event => {
      if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const box = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--glow-x', (event.clientX - box.left) + 'px');
      event.currentTarget.style.setProperty('--glow-y', (event.clientY - box.top) + 'px');
    }}>
    <fieldset disabled={state === 'sending'}>
      <label>Tu correo electrónico<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label>Asunto<input name="_subject" maxLength={150} required /></label>
      <label>Mensaje<textarea name="message" rows={3} maxLength={5000} required /></label>
      <input hidden name="_honey" tabIndex={-1} autoComplete="off" aria-label="Dejar vacío" />
      <small>FormSubmit tratará estos datos para gestionar tu mensaje de contacto.</small>
      <button type="submit">{state === 'sending' ? <><LoaderCircle size={16} /> Enviando…</> : 'Enviar mensaje'}</button>
    </fieldset>
    <p role="status" aria-live="polite">{state === 'accepted' ? '¡Gracias! FormSubmit ha aceptado tu solicitud.' :
      state === 'error' ? 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme directamente por correo.' : ''}</p>
  </form>;
}
