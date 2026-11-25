import { useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { Header } from './components/Header';
import { MotionEnhancer } from './components/MotionEnhancer';
import { HomePage } from './pages/HomePage';
import { ProjectPage, MissingPage } from './pages/ProjectPage';

const Layout = () => {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef(pathname);
  useLayoutEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else if (navigationType !== 'POP' || previous.current !== pathname) window.scrollTo(0, 0);
    if (target) {
      if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
      target.focus({ preventScroll: true });
    } else if (previous.current !== pathname) {
      document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
    }
    previous.current = pathname;
  }, [pathname, hash, key, navigationType]);
  return <>
    <a className="skip" href="#contenido">Saltar al contenido</a>
    <Header />
    <main id="contenido" tabIndex={-1}><Routes>
      <Route index element={<HomePage />} />
      <Route path="/index.html" element={<HomePage />} />
      <Route path="/proyectos/:slug" element={<ProjectPage />} />
      <Route path="*" element={<MissingPage />} />
    </Routes></main>
    <footer className="wrap footer"><Link to="/">Reyes-Dev<span>.</span></Link><small>© {new Date().getFullYear()} Ismael Reyes Pérez</small><a href="#contenido">Volver arriba ↑</a></footer>
    <MotionEnhancer key={pathname} />
  </>;
};
export default function App() { return <BrowserRouter><Layout /></BrowserRouter>; }
