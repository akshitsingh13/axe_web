# Team Axe

Team Axe is a college development team's interactive website for showcasing the team, projects, achievements, and journey. It combines a dark terminal-inspired interface with smooth, scroll-driven motion, a featured highlights carousel, team profiles, and a dedicated timeline page.

**Live:** https://akshitsingh13.github.io/axe_web/

## Tech Stack

![React](https://img.shields.io/badge/React-19-20232A?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-0AE448?logo=greensock&logoColor=black)
![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-111111)
![React Router](https://img.shields.io/badge/React%20Router-HashRouter-CA4245?logo=reactrouter&logoColor=white)

- React `^19.2.7`
- Vite `^8.1.1`
- GSAP `^3.15.0` + ScrollTrigger
- Lenis `^1.3.25`
- React Router DOM `^7.18.1`
- React Icons `^5.7.0`

## Features

- Scroll-driven animations powered by GSAP ScrollTrigger and Lenis
- Pinned and scrubbed hero/highlights experience
- Auto-advancing Highlights carousel with arrows, keyboard controls, dots, and hover pause
- Pinned Projects card assembly animation
- Reusable staggered section reveals
- Hash-based routing designed for GitHub Pages
- Homepage sections for:
  - Highlights
  - About
  - Projects
  - Achievements
  - Team
  - Join
  - Contact
- Filterable Team section with horizontally scrollable member cards
- Animated team-member profile modal with resume, work, and social links
- `/journey` route with a scroll-scrubbed vertical timeline
- Timeline lightbox supporting images, PDFs, and YouTube media
- Route-aware scroll reset so navigation starts each page from the top
- GitHub Pages deployment through `gh-pages`

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/akshitsingh13/axe_web.git
cd axe_web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will print the local development URL in your terminal.

## Build & Deploy

### Production build

```bash
npm run build
```

The generated production files are written to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

The project defines:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

so `npm run deploy` builds the project first and then publishes `dist/` to the `gh-pages` branch.

### Important: Vite base path

The current `vite.config.js` contains:

```js
base: "/axe_web/",
```

That matches the current GitHub Pages repository path. If the repository is renamed or forked under a different repository name, update `base` before deploying:

```js
base: "/YOUR_REPO_NAME/",
```

An incorrect base path will commonly cause built JavaScript, CSS, images, PDFs, or other assets to return `404` on GitHub Pages even when the site works locally.

## Project Structure

```text
.
├── public/
│   └── documents/           # PDFs and other public documents
│
├── src/
│   ├── assets/              # Images bundled by Vite
│   │   ├── projects/
│   │   ├── teams/
│   │   └── timeline/
│   │
│   ├── components/
│   │   ├── About/
│   │   ├── Achievements/
│   │   ├── ContactUs/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── HighlightsPanel/
│   │   ├── JoinTeam/
│   │   ├── Journey/
│   │   ├── NavBar/
│   │   ├── Projects/
│   │   ├── TeamMembers/
│   │   └── ScrollManager.jsx
│   │
│   ├── data/                # Projects, team, achievements, timeline data
│   ├── hooks/               # Reusable GSAP section reveal hook
│   ├── utils/               # Public asset path helper
│   ├── App.jsx              # Routes and page composition
│   ├── main.jsx             # React, HashRouter, Lenis + GSAP setup
│   └── index.css            # Global theme and styles
│
├── package.json
└── vite.config.js
```

For a deeper architecture breakdown, see [`DOCUMENTATION.md`](./DOCUMENTATION.md).

## Routing

The site uses `HashRouter` rather than `BrowserRouter`, which allows client-side routes to work on GitHub Pages without server rewrite configuration.

Current routes:

```text
/          Homepage
/journey   Team journey / timeline
```

Homepage navigation uses `scrollIntoView()` rather than raw `href="#..."` links because the URL hash is reserved for `HashRouter`.

## Working With Assets

### Images inside `src/assets/`

Import them into JavaScript/JSX:

```js
import photo from "../assets/example.jpeg";
```

Do not reference source images with raw strings such as:

```js
"src/assets/example.jpeg";
```

### Files inside `public/`

Public PDFs and similar files use the project's `publicAsset()` helper so URLs respect Vite's GitHub Pages base path:

```js
publicAsset("documents/AXE.pdf");
```

Avoid hardcoded root paths such as `/documents/AXE.pdf`.

## Contributing

This repository is structured to support team development through feature branches.

1. Make sure `main` is current:

```bash
git checkout main
git pull origin main
```

2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes, then commit and push:

```bash
git add .
git commit -m "Add your feature"
git push -u origin feature/your-feature-name
```

4. Open a Pull Request from the feature branch into `main`.

5. After review, merge the PR into `main`.

6. Pull the merged `main` locally and deploy separately:

```bash
git checkout main
git pull origin main
npm run deploy
```

The `gh-pages` branch is deployment output; feature development should happen on normal branches and be merged into `main` first.

## License

No license file is currently included in the repository.

If the project is intended for public reuse or contribution, add a `LICENSE` file and update this section with the chosen license.

## Credits

Built and maintained by **Team Axe**.
