# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers evaluating candidates for software engineering internships. They visit to assess technical breadth, project quality, and professional readiness. Primary audience is Sri Lanka-based but the site is globally accessible.

## Product Purpose

A personal portfolio that showcases Pasindu Saranga's full-stack software engineering skills, projects, and GitHub activity. The goal is to transition from undergraduate to a professional internship opportunity.

## Positioning

_Undecided._ Not yet articulated — to be established when a surface or visual world is designed.

## Operating Context

- Viewed on desktop and mobile web by recruiters scanning multiple portfolios
- Must load quickly on variable bandwidth common in Sri Lanka
- GitHub profile and contribution graph provide third-party verification of activity
- Projects are fetched live from GitHub API at build time (via prebuild script)

## Capabilities and Constraints

- Single-page application with six sections: hero, about, skills, certifications, projects/GitHub status (tabbed), contact
- 32 skills across frontend, backend, and tools categories
- 8 projects displayed (manual curation + auto-fetch from GitHub)
- 4 professional certifications with PDF/PNG evidence
- Dark/light theme toggle with system preference detection
- GitHub contribution calendar (react-github-calendar)
- GitHub stats and streak images
- Blog section planned but not yet implemented

## Brand Commitments

- Name: **Pasindu Saranga**
- GitHub: [SAR4NGA](https://github.com/SAR4NGA)
- LinkedIn: [sar4nga](https://linkedin.com/in/sar4nga)
- Email: swpsaranga@students.nsbm.ac.lk
- Accent color: #3B82F6 (blue-500)
- Fonts: Plus Jakarta Sans (body), Lora (serif), JetBrains Mono (mono), Syne + Unbounded (display)
- Favicon uses generic "YN" placeholder — acknowledged, kept as-is per owner preference

## Evidence on Hand

- GitHub profile with public repos and contribution history (username: SAR4NGA)
- 8 project repositories with language breakdowns
- 4 certification PDFs and PNGs in `public/certs/`
- Profile photo at `public/profile.png`
- No testimonials, case studies, or press mentions

## Product Principles

1. **Show, don't just tell.** GitHub activity, live stats, and real repos provide third-party proof over self-reported claims.
2. **Breadth with depth.** Demonstrate versatility across web, mobile, and desktop without appearing unfocused.
3. **Clean and professional.** The interface should feel polished and competent — reflecting the code quality claimed.
4. **Fast and accessible.** Respect variable bandwidth and diverse viewing devices.
5. **Honest and current.** Auto-fetched data and clear status ("Available for internships") build trust through transparency.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility best practices.
