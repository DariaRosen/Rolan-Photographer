<div align="center">

# 📸 Photographer Landing Page

Boutique-grade landing page crafted for a luxury photographer brand. Built with **Next.js 15 App Router**, **React 19**, **TypeScript**, and a custom **Autumn Harvest** palette to celebrate warm storytelling visuals.

![Hero Screenshot](public/gallery/photo1.PNG)

🔗 **Live Demo:** https://photographer-landing-page.vercel.app/  
💻 **Repository:** https://github.com/DariaRosen/Photographer-landing-page

</div>

---

## ✨ Experience Highlights

### 🎯 Core Goals
- Hero carousel powered by **Swiper coverflow** with loop + autoplay to spotlight featured shoots.
- Fully responsive, **RTL-friendly** navigation with sticky translucent header and mobile drawer.
- Conversion-focused sections: about story, gallery filters, pricing tiers, print offerings, testimonials, and contact CTA.
- Brand-cohesive theme defined via centralized Sass variables + mixins for effortless updates.

### 🎨 UI & UX Touches
- Glassmorphism header plus transparent PNG logo to blend seamlessly with the gradient backdrop.
- Rounded section “cards” floating over a soft gradient canvas, reinforcing premium feel.
- Consistent typography rhythm, accessible contrast, and subtle drop shadows for depth.
- Hover micro-interactions on cards, pricing, and CTA buttons to guide user focus.

---

## 🧰 Tech Stack

| Layer        | Technologies |
| ------------ | ------------ |
| **Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript (strict) |
| **Styling**  | Sass Modules, custom variables & mixins |
| **UI Enhancements** | Swiper.js, Radix-ready structure |
| **Tooling**  | ESLint, Prettier, Supabase client scaffold |
| **Hosting**  | Vercel (`npm run build` → static export) |

> ⚠️ _Sass Note_: The codebase still uses `@import`, which triggers Dart Sass deprecation warnings during build. Migrating to `@use`/`@forward` is planned.

---

## 📂 Project Structure

```
Photographer-landing-page/
├── app/
│   ├── components/        # Section components + styles (hero, gallery, etc.)
│   ├── (routes)/          # Dedicated routes for SEO-friendly sections
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home entry assembling sections
│   └── globals.scss       # Gradient background & section shell styles
├── components/            # Shared pieces: Header, Footer, Carousel, Main
├── lib/supabase.ts        # Optional Supabase client hook-up
├── styles/_variables.scss # Palette, typography, spacing scale
├── styles/_mixins.scss    # Responsive helpers, animations
├── public/                # Logo (PNG + JPG), gallery assets, icons
└── types/                 # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

### Requirements
- Node.js 18+
- npm (bundled) or pnpm/yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure Supabase
cp .env.local.example .env.local
# Populate NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run locally
npm run dev
open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start   # serve optimized output
```

### Available Scripts

| Script          | Purpose |
| --------------- | ------- |
| `npm run dev`   | Next dev server with HMR |
| `npm run lint`  | ESLint + type checking |
| `npm run build` | Production build (Vercel) |
| `npm run start` | Serve compiled build locally |

---

## 🧱 Styling System

- **Variables** (`styles/_variables.scss`): Autumn Harvest palette, font stack, spacing, breakpoints.
- **Mixins** (`styles/_mixins.scss`): Responsive helpers, transitions, glass blur utilities.
- **Modules**: Every section/component owns a `.module.scss` for scoped styles.
- **Design Language**: Warm gradient background, rounded containers, gentle shadows, accessible color contrast.

---

## 🧭 Future Enhancements

- Migrate Sass `@import` statements to `@use` / `@forward`.
- Hook up Supabase to drive galleries, testimonials, and pricing dynamically.
- Add bilingual toggle (Hebrew ↔ English) with localized copy.
- Integrate contact form submissions via Resend/Formspree.

---

## 🏆 Credits

Created as part of my front-end portfolio to highlight premium landing page execution, responsive RTL patterns, and polished CSS architecture.

---

## 📄 License

[MIT](LICENSE)


