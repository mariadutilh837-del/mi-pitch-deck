/* ============================================
   SHARED CORE JS — ESPANA LUXURY DECK
   ============================================ */

'use strict';

/* ---- PROGRESS BAR ---- */
function initProgressBar() {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;

  function updateBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

/* ---- NAV SCROLL STATE ---- */
function initNav() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ---- ANIMATED COUNTER ---- */
function animateCounter(el, targetVal, duration = 1800, prefix = '', suffix = '') {
  const start = performance.now();
  const isFloat = targetVal % 1 !== 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const eased = 1 - Math.pow(2, -10 * progress);
    const current = eased * targetVal;
    const display = isFloat ? current.toFixed(1) : Math.round(current);
    el.textContent = prefix + display + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/* ---- COUNTER OBSERVER ---- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = '1';
        const target = parseFloat(entry.target.dataset.count);
        const prefix = entry.target.dataset.prefix || '';
        const suffix = entry.target.dataset.suffix || '';
        const duration = parseInt(entry.target.dataset.duration || '1800');
        animateCounter(entry.target, target, duration, prefix, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
}

/* ---- VIDEO AUTOPLAY ON VIEWPORT ---- */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('.phone__screen video, [data-autoplay]');
  if (!videos.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.4 });

  videos.forEach(v => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    obs.observe(v);
  });
}

/* ---- VIDEO HOVER (cards) ---- */
function initVideoHover() {
  document.querySelectorAll('[data-hover-video]').forEach(card => {
    const v = card.querySelector('video');
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    card.addEventListener('mouseenter', () => v.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  });
}

/* ---- SMOOTH SCROLL TO SECTION ---- */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- NAV DOTS ACTIVE STATE ---- */
function initNavDots() {
  const dots = document.querySelectorAll('.dest-nav__dot');
  const sections = document.querySelectorAll('[data-section]');
  if (!dots.length || !sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.section;
        dots.forEach(d => {
          d.classList.toggle('active', d.dataset.target === id);
        });
        // Update nav counter
        const counter = document.querySelector('.nav-counter');
        if (counter) {
          const idx = Array.from(sections).indexOf(entry.target);
          if (idx >= 0) counter.textContent = `0${idx + 1} / 0${sections.length}`;
        }
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));

  dots.forEach(dot => {
    dot.addEventListener('click', () => scrollToSection(dot.dataset.target));
  });
}

/* ---- INIT ALL ---- */
function initCore() {
  initProgressBar();
  initNav();
  initCounters();
  initVideoAutoplay();
  initVideoHover();
  initNavDots();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCore);
} else {
  initCore();
}
