# Escapadas de Lujo — Spain's Finest Weekends

Luxury pitch deck presentation site. Static HTML, no build step required.

## Structure

```
/
├── index.html                          → Landing page (destination grid)
├── vercel.json                         → Vercel static config + rewrites
├── shared/
│   ├── css/base.css                    → CSS variables, reset, shared components
│   └── js/core.js                      → Progress bar, nav, counters, video autoplay
├── data/
│   └── espana-luxury.json             → All destination data (reference only)
└── brands/
    └── espana-luxury/
        ├── andalucia.html
        ├── mallorca.html
        ├── ibiza.html
        ├── cataluna.html
        ├── costa-brava.html
        ├── la-rioja.html
        ├── css/theme.css               → Brand theme (overrides CSS variables)
        └── js/main.js                  → GSAP animations, chart, tabs
```

## Deploy to Vercel

1. Upload this folder to a GitHub repository
2. Connect the repo to Vercel
3. Set framework preset: **Other**
4. Output directory: leave blank (or `/`)
5. Deploy — no build commands needed

## CDN Dependencies (loaded at runtime)

- GSAP 3.12.5 + ScrollTrigger — scroll animations
- Chart.js — growth chart (loaded on index page)
- Google Fonts — Cormorant Garamond, Montserrat, Playfair Display

## Adding a New Destination

1. Copy any destination `.html` file
2. Update: title, number, name, subtitle, quote, all content sections, prev/next links
3. Add a card in `index.html`
4. Add a rewrite in `vercel.json`

## Customising the Theme

All visual variables live in `shared/css/base.css` under `:root`.  
Override any variable in `brands/espana-luxury/css/theme.css`.

Key variables:
- `--color-gold` — accent color throughout
- `--font-display` — serif display font
- `--font-body` — sans-serif body font
- `--color-bg` — page background
