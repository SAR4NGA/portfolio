# Portfolio — Build Log

## Stack
- React 19 + TypeScript + Vite 8
- Tailwind CSS v4 + Framer Motion + React Router v7
- Markdown blog (react-markdown + rehype-highlight)

## What was built

| Route | Page | Sections |
|---|---|---|
| `/` | Home | Hero, About, Skills, Experience, Projects, Contact |
| `/blog` | Blog List | Cards with date/tags from markdown frontmatter |
| `/blog/:slug` | Blog Post | Markdown rendered with code syntax highlighting |

## Features
- **Dark/Light theme** toggle persisted in localStorage
- **Animations**: gradient hero bg, scroll-reveal sections, staggered skill badges
- **Responsive** layout with mobile hamburger menu
- **Blog** via local `.md` files with frontmatter (title, date, tags, slug)
- **Google Fonts**: Plus Jakarta Sans (sans), Lora (serif), JetBrains Mono (mono)

## To customize
1. **Personal info** — edit `src/data/skills.ts`, `projects.ts`, `experience.ts`
2. **Blog** — add `.md` files to `src/content/blog/` with frontmatter
3. **Favicon** — replace `public/favicon.svg`
4. **Profile photo** — add image to `public/` and update `Home.tsx`

## Commands
```bash
npm run dev      # dev server at localhost:5173
npm run build    # production build → dist/
```
