/* ============================================
   MAIN JS — ESPANA LUXURY DECK
   ============================================ */

'use strict';

/* ---- GSAP SETUP ---- */
gsap.registerPlugin(ScrollTrigger);

/* ============================================
   INDEX PAGE ANIMATIONS
   ============================================ */
function initIndexPage() {
  if (!document.querySelector('.hero-section')) return;

  // Hero entrance
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 1, delay: 0.3 })
    .from('.hero-title span', {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1.2,
    }, '-=0.6')
    .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
    .from('.hero-scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.2');

  // Cards entrance
  gsap.from('.dest-card', {
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.destinations-grid',
      start: 'top 80%',
    }
  });

  // Intro text
  gsap.from('.intro-text', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.intro-text',
      start: 'top 85%',
    }
  });
}

/* ============================================
   DESTINATION PAGE ANIMATIONS
   ============================================ */
function initDestinationPage() {
  if (!document.querySelector('.dest-hero')) return;

  // Hero entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.dest-hero__accent-line', { scaleY: 0, transformOrigin: 'top', duration: 1, delay: 0.2 })
    .from('.dest-hero__eyebrow', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
    .from('.dest-hero__name', { opacity: 0, y: 60, duration: 1.1 }, '-=0.5')
    .from('.dest-hero__subtitle', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.dest-hero__quote', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
    .from('.dest-hero__number', { opacity: 0, x: 80, duration: 1.2 }, '-=1.2');

  // Parallax on dest number
  gsap.to('.dest-hero__number', {
    y: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.dest-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });

  // Section headers fade up
  gsap.utils.toArray('.section-label, .section-title').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 25,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      }
    });
  });

  // Detail items stagger
  gsap.utils.toArray('.detail-list').forEach(list => {
    gsap.from(list.querySelectorAll('.detail-item'), {
      opacity: 0,
      x: -20,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: list,
        start: 'top 85%',
      }
    });
  });

  // Category blocks
  gsap.utils.toArray('.category-block').forEach((block, i) => {
    gsap.from(block, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: block,
        start: 'top 88%',
      }
    });
  });

  // KPI numbers entrance
  gsap.utils.toArray('.kpi-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
      }
    });
  });

  // Pinned close section
  const closeSection = document.querySelector('.close-section');
  if (closeSection) {
    gsap.from(closeSection.querySelector('.close-title'), {
      opacity: 0,
      scale: 0.92,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: closeSection,
        start: 'top 70%',
      }
    });

    gsap.from(closeSection.querySelector('.close-subtitle'), {
      opacity: 0,
      y: 15,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: closeSection,
        start: 'top 70%',
      }
    });
  }

  // Gold line grow
  gsap.utils.toArray('.gold-line').forEach(line => {
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 90%',
      }
    });
  });
}

/* ---- TABS ---- */
function initTabs() {
  const tabHeaders = document.querySelectorAll('.tabs-header');
  tabHeaders.forEach(header => {
    const buttons = header.querySelectorAll('.tab-btn');
    const container = header.closest('[data-tabs]') || header.parentElement;
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

/* ---- CHART INIT ---- */
function initCharts() {
  const canvas = document.getElementById('growth-chart');
  if (!canvas) return;

  let chartInited = false;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !chartInited) {
      chartInited = true;
      buildChart(canvas);
    }
  }, { threshold: 0.3 });

  obs.observe(canvas);
}

function buildChart(canvas) {
  const ctx = canvas.getContext('2d');

  Chart.defaults.color = '#777';
  Chart.defaults.font.family = "'Montserrat', sans-serif";

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Luxury Travelers',
          data: [820, 940, 1050, 1200, 1380, 1620, 1850, 2100, 1950, 2200, 2450, 2800],
          borderColor: '#C9A84C',
          backgroundColor: 'rgba(201,168,76,0.04)',
          borderWidth: 1.5,
          pointBackgroundColor: '#C9A84C',
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: true,
          tension: 0.4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1800,
        easing: 'easeInOutQuart',
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(14,14,14,0.95)',
          borderColor: 'rgba(201,168,76,0.3)',
          borderWidth: 1,
          titleFont: { size: 10, weight: '400', family: "'Montserrat', sans-serif" },
          bodyFont: { size: 11, family: "'Cormorant Garamond', serif" },
          padding: 12,
          callbacks: {
            label: ctx => ' ' + ctx.raw.toLocaleString() + ' guests',
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(201,168,76,0.05)', },
          ticks: { font: { size: 9, letterSpacing: '0.1em' } }
        },
        y: {
          grid: { color: 'rgba(201,168,76,0.05)', },
          ticks: {
            font: { size: 9 },
            callback: v => v.toLocaleString(),
          }
        }
      }
    }
  });
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initIndexPage();
  initDestinationPage();
  initTabs();
  initCharts();
});
