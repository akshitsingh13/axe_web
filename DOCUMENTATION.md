# Team Axe v2 — Project Documentation

> Generated from the uploaded project source. This document describes the code as it currently exists in the project.

## 1. Tech Stack

The project is a React single-page application built with Vite and deployed as a static site.

### Runtime dependencies

| Package | Version in `package.json` | Purpose |
|---|---:|---|
| React | `^19.2.7` | Component/UI framework |
| React DOM | `^19.2.7` | Browser rendering |
| react-router-dom | `^7.18.1` | Client-side routing with `HashRouter` |
| GSAP | `^3.15.0` | Animation system |
| Lenis | `^1.3.25` | Smooth scrolling |
| react-icons | `^5.7.0` | UI/social icons |

### Development dependencies

| Package | Version |
|---|---:|
| Vite | `^8.1.1` |
| `@vitejs/plugin-react` | `^6.0.3` |
| ESLint | `^10.6.0` |
| `@eslint/js` | `^10.0.1` |
| `eslint-plugin-react-hooks` | `^7.1.1` |
| `eslint-plugin-react-refresh` | `^0.5.3` |
| `@types/react` | `^19.2.17` |
| `@types/react-dom` | `^19.2.3` |
| `globals` | `^17.7.0` |
| `gh-pages` | `^6.3.0` |

The project uses JavaScript/JSX rather than TypeScript.

---

## 2. Project Structure

```text
src/
├── App.jsx
├── main.jsx
├── index.css
│
├── assets/
│   ├── projects/
│   │   └── solar-system.png
│   ├── teams/
│   │   └── akshit-pfp.jpeg
│   └── timeline/
│       ├── mgm-photo-1.png
│       ├── sih-photo-1.jpeg
│       └── sih-photo-2.jpeg
│
├── components/
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.css
│   ├── Achievements/
│   │   ├── Achievements.jsx
│   │   └── Achievements.css
│   ├── ContactUs/
│   │   ├── ContactUs.jsx
│   │   └── ContactUs.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── HighlightsPanel/
│   │   ├── HighlightsPanel.jsx
│   │   └── HighlightsPanel.css
│   ├── JoinTeam/
│   │   ├── JoinTeam.jsx
│   │   └── JoinTeam.css
│   ├── Journey/
│   │   ├── Journey.jsx
│   │   ├── Journey.css
│   │   ├── Timeline.jsx
│   │   ├── Timeline.css
│   │   ├── TimelineEvent.jsx
│   │   ├── TimelineEvent.css
│   │   ├── Lightbox.jsx
│   │   ├── Lightbox.css
│   │   └── youtube.js
│   ├── NavBar/
│   │   ├── NavBar.jsx
│   │   └── NavBar.css
│   ├── Projects/
│   │   ├── Projects.jsx
│   │   └── Projects.css
│   ├── TeamMembers/
│   │   ├── TeamMembers.jsx
│   │   ├── TeamMembers.css
│   │   ├── TeamNav.jsx
│   │   ├── TeamNav.css
│   │   ├── Teammembermodal.jsx
│   │   └── Teammembermodal.css
│   └── ScrollManager.jsx
│
├── data/
│   ├── achievementData.js
│   ├── projectData.js
│   ├── teamDetail.js
│   ├── teamNames.js
│   └── timelineData.js
│
├── hooks/
│   └── useSectionReveal.js
│
└── utils/
    └── assetPath.js
```

The repository also contains public documents:

```text
public/
└── documents/
    ├── AXE.pdf
    ├── KPIT SPARKLE.pdf
    └── SIH2025-IDEA-Presentation.final2nd.pdf
```

### Top-level source folders

**`components/`** contains all visual sections, route-level UI, navigation, modals, and scroll-management code.

**`data/`** separates editable project/team/achievement/timeline content from the rendering components.

**`hooks/`** currently contains the reusable GSAP section-reveal hook.

**`utils/`** contains asset/path helpers, currently `publicAsset()`.

**`assets/`** contains files that are part of Vite's module graph. These assets are imported from JavaScript rather than addressed by raw source paths.

### Component responsibilities

- **Header** — renders the Team Axe header/wordmark and inline Axe SVG logo. It also applies a scrubbed fade/upward motion while scrolling away from the header.
- **NavBar** — renders Home, About, Projects, Achievements, Team, and Join Us navigation buttons. Navigation uses `scrollIntoView()`.
- **HighlightsPanel** — renders the featured carousel with automatic cycling, keyboard navigation, arrows, dots/progress, hover pause, and pinned/parallax GSAP behavior.
- **About** — renders the About content and the button that navigates to `/journey`.
- **Projects** — renders project cards from `projectData.js` and drives their pinned horizontal assembly animation.
- **Achievements** — renders achievement/statistic cards from `achievementData.js`.
- **TeamMembers** — filters members by team category, renders a horizontally scrollable member row, and opens member details in a modal.
- **TeamNav** — renders the team category selector using `teamNames.js`.
- **Teammembermodal** — renders the selected member's detailed profile, resume controls, contributions, work links, and social links.
- **JoinTeam** — renders the recruitment/CTA section and scrolls to Contact when its action is used.
- **ContactUs** — renders the contact section/form.
- **Journey** — route-level Journey page with a Back action and the timeline.
- **Timeline** — renders `timelineData.js`, controls the scroll-scrubbed timeline progress/reveal, and manages the active lightbox item.
- **TimelineEvent** — renders one timeline event and its image/PDF/YouTube media thumbnails.
- **Lightbox** — modal viewer for timeline images, PDFs, and YouTube embeds.
- **Footer** — renders footer navigation/social content and uses section scrolling for internal homepage navigation.
- **ScrollManager** — resets Lenis/native scroll and refreshes ScrollTrigger whenever the route pathname changes.

---

## 3. Routing

Routing is initialized in `src/main.jsx`:

```jsx
<HashRouter>
  <App />
</HashRouter>
```

The application deliberately uses **`HashRouter`**, not `BrowserRouter`.

This is appropriate for a static GitHub Pages deployment because route state is stored after the URL hash. GitHub Pages therefore does not need server-side rewrite rules for client routes such as the Journey page.

### Routes

`App.jsx` currently defines two routes:

| Route | Rendered content |
|---|---|
| `/` | `HomePage` |
| `/journey` | `Journey` |

`HomePage` renders, in order:

1. `HighlightsPanel`
2. `About`
3. `Projects`
4. `Achievements`
5. `TeamMembers`
6. `JoinTeam`
7. `ContactUs`

`Header`, `NavBar`, `ScrollManager`, and `Footer` live outside `<Routes>`, so they remain part of the application shell on both routes.

### Journey navigation

The About component calls:

```js
navigate("/journey");
```

The Journey page returns with:

```js
navigate("/");
```

### Route scroll reset

`ScrollManager.jsx` watches:

```js
location.pathname
```

with `useLayoutEffect`.

On every pathname change it:

1. calls `lenis.stop()`;
2. calls `lenis.scrollTo(0, { immediate: true })`;
3. calls `window.scrollTo(0, 0)` as a browser fallback;
4. calls `lenis.start()`;
5. schedules `ScrollTrigger.refresh()` on the next animation frame.

This prevents `/journey` from inheriting the homepage's previous scroll position and likewise ensures Back navigation returns the homepage to its top.

### In-page navigation

`NavBar.jsx` does **not** use raw hash links. It resolves a section by ID and calls:

```js
target.scrollIntoView({
  behavior: "smooth",
  block: "start",
});
```

This matters because the URL hash is already being used by `HashRouter`.

---

## 4. Data Layer

### `src/data/achievementData.js`

Default export: an array of achievement/stat objects.

Object shape:

```js
{
  id,
  value,
  label
}
```

Current examples include Projects, Hackathons, Members, and Hours Built.

**Consumed by:** `components/Achievements/Achievements.jsx`.

---

### `src/data/projectData.js`

Default export: `projects`, an array of project objects.

Object shape:

```js
{
  id,
  title,
  imgSrc,
  shortDescription,
  tech,
  githubLink,
  liveDemo
}
```

The file imports:

```js
import solarSystem from "../assets/projects/solar-system.png";
```

and assigns that imported module to `imgSrc`.

At present, `Projects.jsx` renders the project textual content and links but does **not** render `imgSrc`; the image field remains in the data model.

**Consumed by:** `components/Projects/Projects.jsx`.

> Current data note: all five project entries use the same `id` (`"p-1"`) and placeholder-like repeated content. The component avoids duplicate React keys by combining `project.id` with the array index, but unique data IDs would be preferable when the real project data is filled in.

---

### `src/data/teamNames.js`

Default export: an array of team categories.

Object shape:

```js
{
  id,
  name
}
```

Current categories are:

- `01` — CORE
- `02` — FRONTEND
- `03` — BACKEND
- `04` — AI/ML
- `05` — DESIGN

**Consumed by:** `TeamMembers.jsx` and `TeamNav.jsx`.

`TeamMembers` initially selects the first team and filters `teamDetail` according to whether the member's `team` array contains the active team ID.

---

### `src/data/teamDetail.js`

Default export: an array of full team-member objects.

Current object shape:

```js
{
  id,
  team: [],
  name,
  role,
  shortDescription,
  longDescription,
  photoPath,
  resumePath,
  contributions: [],
  workLinks: [
    {
      label,
      src
    }
  ],
  social: [
    {
      type,
      icon,
      src
    }
  ]
}
```

The member photo is imported through Vite:

```js
import akshitPhoto from "../assets/teams/akshit-pfp.jpeg";
```

The resume is a public asset:

```js
resumePath: publicAsset("documents/AXE.pdf")
```

**Consumed by:** `components/TeamMembers/TeamMembers.jsx`; the selected object is then passed into `Teammembermodal.jsx`.

---

### `src/data/timelineData.js`

Default export: an array of Journey timeline events.

Event shape:

```js
{
  id,
  title,
  month,
  year,
  description,
  side?,       // optional
  media: []
}
```

Media supports three shapes.

Image:

```js
{
  type: "image",
  src,
  alt,
  label?       // optional
}
```

PDF:

```js
{
  type: "pdf",
  src,
  label
}
```

YouTube:

```js
{
  type: "youtube",
  url,
  label
}
```

If `side` is not provided, `Timeline.jsx` alternates events automatically: even indexes appear on the right and odd indexes on the left.

**Consumed by:** `components/Journey/Timeline.jsx`, with individual media rendered by `TimelineEvent.jsx` and opened through `Lightbox.jsx`.

---

### Asset strategy

The project intentionally uses two different asset patterns.

#### A. Source assets: import them

Files in `src/assets/` are imported into JavaScript:

```js
import sihPhoto1 from "../assets/timeline/sih-photo-1.jpeg";
```

Then:

```js
src: sihPhoto1
```

This lets Vite hash and relocate the asset correctly during production builds.

Do not write paths such as:

```js
"src/assets/timeline/sih-photo-1.jpeg"
```

in data objects or JSX.

#### B. Public assets: use `publicAsset()`

`src/utils/assetPath.js` exports:

```js
export function publicAsset(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}
```

This is used for PDFs/documents stored under `public/`, for example:

```js
publicAsset("documents/AXE.pdf")
```

Because `BASE_URL` is included, the resulting URL works when the site is deployed below a repository subdirectory rather than at the domain root.

---

## 5. Animation System

The animation system combines **Lenis** for smooth scrolling and **GSAP ScrollTrigger** for scroll-driven motion.

### Lenis + GSAP integration

`main.jsx` creates one global Lenis instance:

```js
export const lenis = new Lenis({
  autoRaf: false,
  smoothWheel: true,
});
```

`autoRaf` is disabled because GSAP's ticker drives Lenis instead.

ScrollTrigger is synchronized with Lenis through:

```js
lenis.on("scroll", ScrollTrigger.update);
```

GSAP then advances Lenis on its own ticker:

```js
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
```

Finally:

```js
gsap.ticker.lagSmoothing(0);
```

prevents GSAP lag smoothing from interfering with the Lenis timing.

This gives Lenis and GSAP one animation clock rather than two competing request-animation-frame loops.

### `useSectionReveal.js`

The reusable reveal hook accepts:

```js
useSectionReveal(sectionRef, selector, options)
```

Default settings are:

```js
y = 36
stagger = 0.1
duration = 0.8
start = "top 78%"
```

It finds matching descendants and animates them from:

```js
{
  autoAlpha: 0,
  y
}
```

to:

```js
{
  autoAlpha: 1,
  y: 0
}
```

using `power2.out`.

Its ScrollTrigger uses:

```js
{
  trigger: sectionRef.current,
  start,
  once: true
}
```

The GSAP work is scoped with `gsap.context()`, and cleanup calls:

```js
ctx.revert();
```

Components currently using the hook include:

- About
- Achievements
- TeamMembers
- JoinTeam
- ContactUs

Projects and Highlights use their own specialized animation timelines instead.

### Header

`Header.jsx` applies a scrubbed animation to the header itself:

```js
start: "top top"
end: "bottom top"
scrub: true
```

The header moves upward (`yPercent: -12`) and fades to `autoAlpha: 0.65` as it scrolls away.

### HighlightsPanel

Highlights has two ScrollTrigger behaviors.

The image parallax uses:

```js
start: "top top"
end: "+=55%"
scrub: 0.6
```

The active image moves from approximately:

```js
scale: 1.06
yPercent: -3
```

to:

```js
scale: 1.14
yPercent: 6
```

A second ScrollTrigger pins the section:

```js
start: "top top"
end: "+=35%"
pin: true
pinSpacing: true
anticipatePin: 1
```

The carousel itself is not driven by ScrollTrigger. It uses React state plus `requestAnimationFrame` for its roughly four-second (`CYCLE_MS = 4000`) slide cycle, with hover pause, keyboard arrows, clickable arrows, and clickable dot indicators.

### NavBar reveal

`NavBar.jsx` initially hides the nav using GSAP and creates a ScrollTrigger relative to the hero.

Its configured trigger lookup is:

```js
document.querySelector(".highlights-panel")
```

and its trigger start is:

```js
start: "bottom 75%"
```

`onEnter` fades/slides the nav into view; `onLeaveBack` hides it again.

**Important current-code issue:** the actual Highlights `<section>` in `HighlightsPanel.jsx` uses `className="section-00"`, not `highlights-panel`. Unless that class exists elsewhere dynamically, `document.querySelector(".highlights-panel")` returns `null`, causing the NavBar animation effect to return early. This is a real selector mismatch in the uploaded source.

### Projects signature sequence

Projects has the site's strongest pinned/scrubbed card assembly sequence.

Each project card is initially offset:

- even cards: `x: -120`
- odd cards: `x: 120`
- all cards: `y: 35`, `autoAlpha: 0`, `scale: 0.94`

The main timeline uses:

```js
start: "top top"
end: "+=140%"
pin: true
pinSpacing: true
scrub: 0.8
anticipatePin: 1
invalidateOnRefresh: true
```

The heading reveals first. Cards then assemble into place with a `0.16` stagger and finally settle upward by `6px`.

`Projects.jsx` also schedules `ScrollTrigger.refresh()` on the next animation frame after mounting.

### Journey timeline

`Timeline.jsx` uses one scrubbed timeline to synchronize the green progress spine with sequential event reveals.

The ScrollTrigger is:

```js
start: "top 35%"
end: "bottom 65%"
scrub: 0.7
invalidateOnRefresh: true
```

Initial event state:

```js
y: 55
autoAlpha: 0.18
scale: 0.975
```

As the timeline progresses, the spine scales from `scaleY: 0` to `scaleY: 1`, while events sequentially move to:

```js
y: 0
autoAlpha: 1
scale: 1
```

The Journey timeline also performs an animation-frame `ScrollTrigger.refresh()` after mounting.

### Cleanup conventions

Component-local GSAP animation code is generally scoped with:

```js
const ctx = gsap.context(...);
```

and cleaned with:

```js
ctx.revert();
```

This is especially important because the app can navigate between `/` and `/journey`, changing which ScrollTriggers exist.

`ScrollManager` then refreshes global ScrollTrigger measurements after route transitions.

---

## 6. Theme

The global theme tokens are defined in `src/index.css`:

```css
:root {
  --bg: #0d0d0d;
  --accent: #39ff14;

  --font-mono: "Space Mono", monospace;
  --font-body: "Manrope", sans-serif;
}
```

### Visual language

The interface uses a dark, terminal/developer-oriented visual system:

- near-black background;
- neon green (`#39ff14`) accent;
- monospaced headings and labels;
- restrained grey/white body text;
- uppercase section labels;
- numbered section conventions such as `02 — PROJECTS` and `04 — THE TEAM`;
- thin dark borders;
- terminal-like details such as the Highlights caption cursor;
- scroll-driven motion rather than unrelated autoplay animation for major page transitions.

`index.css` also contains Lenis-specific global rules so native CSS smooth scrolling does not compete with Lenis while Lenis is active.

---

## 7. Deployment

### Vite base path

`vite.config.js` currently contains:

```js
export default defineConfig({
  plugins: [react()],
  base: "/axe_web/",
});
```

This means built asset URLs are generated assuming the application is served from:

```text
/axe_web/
```

rather than `/`.

### npm deployment scripts

`package.json` contains:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Running:

```bash
npm run deploy
```

automatically runs `predeploy` first, which executes `npm run build`, and then publishes `dist/` through the `gh-pages` package.

### GitHub repository/base-path verification

The uploaded ZIP does **not** contain `.git` metadata, and the included README is still the default Vite README, so the repository name cannot be independently derived from the uploaded codebase alone.

The code itself is configured for a GitHub Pages repository named:

```text
axe_web
```

Therefore:

- if the actual GitHub repository is `axe_web`, `base: "/axe_web/"` is correct;
- if the repository has another name, the Vite base path is a deployment bug and must be changed to `"/<actual-repo-name>/"`.

This setting is particularly important for generated JS/CSS asset URLs and for `publicAsset()`.

### Why `publicAsset()` matters in deployment

Given:

```js
publicAsset("documents/AXE.pdf")
```

and:

```js
base: "/axe_web/"
```

the helper produces a deployment-aware path beginning with `/axe_web/`, instead of incorrectly requesting `/documents/AXE.pdf` from the GitHub Pages domain root.

---

## 8. Known Gotchas and Contributor Rules

### 1. Never use raw source-image string paths

Images under `src/assets/` should be imported:

```js
import photo from "../assets/example.jpeg";
```

and then used as:

```js
src: photo
```

Do not use:

```js
src: "src/assets/example.jpeg"
```

or equivalent raw strings.

Vite needs imported source assets in its module graph so production paths can be generated correctly.

### 2. Use `publicAsset()` for public documents

Files that intentionally remain in `public/` should be referenced with:

```js
publicAsset("documents/file.pdf")
```

not:

```js
"/documents/file.pdf"
```

A leading-root path ignores the GitHub Pages repository base and can work locally while returning a 404 after deployment.

### 3. Do not use raw `href="#about"` navigation

The application uses `HashRouter`, which already owns the URL hash.

Homepage section navigation should use section IDs plus:

```js
document.getElementById(targetId)?.scrollIntoView(...)
```

as `NavBar`, Footer, and JoinTeam already do.

### 4. Keep Lenis and ScrollTrigger synchronized

The global Lenis instance is intentionally driven through `gsap.ticker`.

Do not introduce a second Lenis RAF loop while `autoRaf: false` and the GSAP ticker integration are active.

### 5. Route transitions must reset both Lenis and native scroll

Changing only `window.scrollTo()` is not sufficient when Lenis has its own internal scroll state.

`ScrollManager.jsx` deliberately resets both systems before refreshing ScrollTrigger.

### 6. Scope GSAP component animations and clean them up

For route-safe animation code, follow the existing pattern:

```js
const ctx = gsap.context(() => {
  // animations / ScrollTriggers
}, ref);

return () => {
  ctx.revert();
};
```

This prevents old page triggers from surviving after components unmount.

### 7. Refresh ScrollTrigger after meaningful layout changes

The project refreshes ScrollTrigger after route changes and after mounting layout-sensitive pinned/scrubbed sections such as Projects and Journey.

Avoid refreshing it continuously for unrelated UI state changes, because unnecessary refreshes force layout recalculation and can interfere with CSS transitions.

### 8. Be careful when changing pinned section dimensions

Projects uses:

```js
end: "+=140%"
pin: true
scrub: 0.8
```

Highlights uses a separate pin plus image scrub.

Large changes to section/card dimensions can change the perceived timing even when the ScrollTrigger configuration remains unchanged.

### 9. Team membership is category-ID based

A member can belong to multiple categories:

```js
team: ["02", "01"]
```

Filtering works through:

```js
member.team.includes(activeTeamId)
```

Team IDs in `teamDetail.js` must therefore match IDs declared in `teamNames.js`.

### 10. Timeline media is type-sensitive

`TimelineEvent` and `Lightbox` branch on:

```js
item.type
```

Supported values in the current implementation are:

```text
image
pdf
youtube
```

New timeline entries should follow the existing media shape.

### 11. External URLs and internal assets are different concerns

External GitHub, LinkedIn, Instagram, YouTube, and demo URLs remain normal absolute URLs.

`publicAsset()` is specifically for files served from this application's `public/` directory.

### 12. Current NavBar animation selector mismatch

`NavBar.jsx` searches for:

```js
document.querySelector(".highlights-panel")
```

but the Highlights root currently renders:

```jsx
<section className="section-00">
```

The nav animation therefore cannot find its hero trigger in the uploaded source. Future work should make those selectors agree without changing the intended layout.

### 13. Current project IDs are duplicated

All entries in `projectData.js` currently use:

```js
id: "p-1"
```

`Projects.jsx` works around this for React rendering by creating keys from the ID plus index, but real project entries should ideally receive unique IDs.

### 14. The README is still the Vite starter README

`README.md` currently documents the generic Vite React template rather than Team Axe. Contributors should use this `DOCUMENTATION.md` for architecture details until the README is replaced or expanded.

---

## Development Commands

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Serve the production build locally:

```bash
npm run preview
```

Deploy `dist/` to the `gh-pages` branch:

```bash
npm run deploy
```

---

## Architecture Summary

The application follows a relatively simple component/data split:

```text
data
  ↓
React components
  ↓
GSAP / ScrollTrigger interaction
  ↕
Lenis smooth scrolling
  ↓
Vite production build
  ↓
gh-pages / GitHub Pages
```

`App.jsx` defines the page composition and routes. `main.jsx` owns global browser infrastructure such as HashRouter, Lenis, and GSAP synchronization. Content-heavy sections read from `src/data/`, source-controlled images are bundled through `src/assets/`, and large/static public documents are addressed through `publicAsset()` so they respect Vite's deployment base path.

The main architectural constraint for future contributors is that **routing, scrolling, animation, and deployment paths are connected**: HashRouter owns the hash, Lenis owns smooth scroll state, ScrollTrigger measures scroll-driven animations, and Vite's `BASE_URL` determines production asset locations. Changes to one of these systems should be checked against the others before deployment.
