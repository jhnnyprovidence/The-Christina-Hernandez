# The Christina Hernandez Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a sultry, luxurious single-page landing site for "The Christina Hernandez" cocktail with a split-screen hero, scroll animation container, and a closing portrait section.

**Architecture:** Single `index.html` + `styles.css`, no build tools. Google Fonts loaded via `<link>`. Stock video placeholder in the hero. Empty animation container for user's scroll animation drop-in. Christina's photo displayed as a circular portrait at the bottom.

**Tech Stack:** HTML5, CSS3, Google Fonts (Playfair Display + Lato)

---

## File Structure

```
/The Christina Hernandez/
├── index.html          # Single HTML file — all three sections
├── styles.css          # All styling — design system, layout, responsive
├── Christina.jpg       # Already exists
└── assets/
    └── (bar-video.mp4) # User will add stock video here
```

- `index.html` — Semantic markup for hero, animation container, and Christina sections. Links to `styles.css` and Google Fonts.
- `styles.css` — CSS custom properties for the design system, section layouts, responsive breakpoints, video styling, circular photo crop.

---

### Task 1: Project Setup and HTML Structure

**Files:**
- Create: `index.html`
- Create: `assets/` directory

- [ ] **Step 1: Create the assets directory**

```bash
mkdir -p assets
```

- [ ] **Step 2: Create `index.html` with full semantic structure**

Create `index.html` with this content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Christina Hernandez</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- SECTION 1: HERO — Split Screen -->
  <section class="hero" id="hero">
    <!-- Left Panel: Drink Info -->
    <div class="hero__left">
      <span class="hero__label">The Cocktail</span>
      <h1 class="hero__title">The Christina<br>Hernandez</h1>
      <div class="hero__divider"></div>
      <span class="hero__label">Ingredients</span>
      <ul class="hero__ingredients">
        <li>Ginger Beer</li>
        <li>Pineapple Juice</li>
        <li>Vodka <span class="hero__or">or</span> Tequila</li>
      </ul>
      <span class="hero__scroll-hint">Scroll to experience ↓</span>
    </div>

    <!-- Right Panel: Video -->
    <div class="hero__right">
      <div class="hero__video-overlay"></div>
      <!-- Replace src with your stock video file -->
      <video class="hero__video" autoplay muted loop playsinline>
        <source src="assets/bar-video.mp4" type="video/mp4">
      </video>
      <!-- Placeholder shown when no video file is present -->
      <div class="hero__video-placeholder">
        <div class="hero__play-icon">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path d="M24 14L0 28V0L24 14Z" fill="#555"/>
          </svg>
        </div>
        <span>Drop your stock video into assets/bar-video.mp4</span>
      </div>
    </div>
  </section>

  <!-- SECTION 2: SCROLL ANIMATION -->
  <section class="animation" id="scroll-animation">
    <div class="animation-container">
      <!-- Drop your scroll-driven animation here (Lottie, GSAP, canvas, etc.) -->
    </div>
  </section>

  <!-- SECTION 3: CHRISTINA -->
  <section class="christina" id="christina">
    <div class="christina__portrait">
      <img src="Christina.jpg" alt="Christina Hernandez" class="christina__photo">
    </div>
    <h2 class="christina__name">Christina Hernandez</h2>
    <div class="christina__line"></div>
  </section>

</body>
</html>
```

- [ ] **Step 3: Open in browser to verify structure loads**

```bash
open index.html
```

Expected: A blank/unstyled page with the text content visible — "The Cocktail", "The Christina Hernandez", ingredients, and "Christina Hernandez" at the bottom. The photo should show (unstyled). No console errors.

- [ ] **Step 4: Commit**

```bash
git init
git add index.html assets/
git commit -m "feat: add HTML structure for landing page"
```

---

### Task 2: CSS Design System and Base Styles

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Create `styles.css` with custom properties and reset**

Create `styles.css` with this content:

```css
/* ============================================
   THE CHRISTINA HERNANDEZ — Design System
   ============================================ */

:root {
  /* Colors */
  --color-black: #0A0A0A;
  --color-gold: #C9A84C;
  --color-cream: #F5F0E8;
  --color-warm-gray: #A89070;
  --color-dark-gold: #3D2E0A;
  --color-muted-brown: #665540;
  --color-panel-gradient-end: #1A1208;
  --color-panel-border: #2A1F0A;

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Lato', 'Helvetica Neue', Arial, sans-serif;
}

/* Reset */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-black);
  color: var(--color-cream);
  font-family: var(--font-sans);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul {
  list-style: none;
}
```

- [ ] **Step 2: Refresh browser to verify base styles**

Expected: Page background is near-black (#0A0A0A), text is cream-colored, default margins/padding stripped. Fonts may still be loading from Google.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add CSS design system and base reset"
```

---

### Task 3: Hero Section Styling

**Files:**
- Modify: `styles.css` (append)

- [ ] **Step 1: Add hero layout styles to `styles.css`**

Append the following to the end of `styles.css`:

```css
/* ============================================
   SECTION 1: HERO
   ============================================ */

.hero {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Left Panel */
.hero__left {
  width: 33.333%;
  background: linear-gradient(180deg, var(--color-black) 0%, var(--color-panel-gradient-end) 100%);
  border-right: 1px solid var(--color-panel-border);
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero__label {
  display: block;
  color: var(--color-gold);
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.hero__title {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  font-size: 2.5rem;
  line-height: 1.2;
  color: var(--color-cream);
  margin-bottom: 28px;
}

.hero__divider {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, var(--color-gold), transparent);
  margin-bottom: 28px;
}

.hero__ingredients {
  margin-bottom: 0;
}

.hero__ingredients li {
  color: var(--color-warm-gray);
  font-size: 1rem;
  line-height: 2.4;
}

.hero__ingredients li::before {
  content: '◆ ';
  color: var(--color-gold);
  font-size: 0.5rem;
  vertical-align: middle;
  margin-right: 8px;
}

.hero__or {
  color: var(--color-muted-brown);
  font-style: italic;
}

.hero__scroll-hint {
  display: block;
  margin-top: auto;
  padding-top: 40px;
  color: var(--color-gold);
  font-family: var(--font-sans);
  font-size: 0.625rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.6;
}

/* Right Panel */
.hero__right {
  width: 66.667%;
  position: relative;
  overflow: hidden;
  background: #070707;
}

.hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--color-black) 0%, transparent 15%);
  z-index: 2;
  pointer-events: none;
}

/* Placeholder shown when video hasn't loaded */
.hero__video-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 1;
}

.hero__play-icon {
  width: 80px;
  height: 80px;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
}

.hero__video-placeholder span {
  color: #444;
  font-size: 0.75rem;
  letter-spacing: 1px;
}

/* Hide placeholder when video is playing */
.hero__video:not([src=""]) ~ .hero__video-placeholder {
  /* Placeholder stays visible until JS hides it or video loads */
}
```

- [ ] **Step 2: Refresh browser to verify hero layout**

Expected: Full-viewport hero. Left 1/3 has warm dark gradient, gold "THE COCKTAIL" label, italic title, divider, ingredient list with gold diamond bullets, and scroll hint at the bottom. Right 2/3 shows the video placeholder with a play icon circle and instruction text. A subtle gradient bleeds from the left into the right panel.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: style hero section with split layout and video placeholder"
```

---

### Task 4: Scroll Animation Container Styling

**Files:**
- Modify: `styles.css` (append)

- [ ] **Step 1: Add animation section styles to `styles.css`**

Append the following to the end of `styles.css`:

```css
/* ============================================
   SECTION 2: SCROLL ANIMATION
   ============================================ */

.animation {
  width: 100%;
  background: var(--color-black);
}

.animation-container {
  width: 100%;
  min-height: 200vh;
  position: relative;
}
```

- [ ] **Step 2: Refresh browser and scroll past the hero**

Expected: A large empty black section below the hero. No visible content — just black space. This is the animation container waiting for the user's drop-in.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add scroll animation container section"
```

---

### Task 5: Christina Portrait Section Styling

**Files:**
- Modify: `styles.css` (append)

- [ ] **Step 1: Add Christina section styles to `styles.css`**

Append the following to the end of `styles.css`:

```css
/* ============================================
   SECTION 3: CHRISTINA
   ============================================ */

.christina {
  width: 100%;
  background: var(--color-black);
  padding: 120px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.christina__portrait {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 2px solid var(--color-gold);
  overflow: hidden;
  margin-bottom: 24px;
}

.christina__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.christina__name {
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: italic;
  font-size: 1.25rem;
  color: var(--color-gold);
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.christina__line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}
```

- [ ] **Step 2: Refresh browser and scroll to the bottom**

Expected: Christina's photo displayed as a circular portrait (~280px), centered on black, with a thin gold border. Her name "Christina Hernandez" in gold italic serif below. A small gold gradient line centered beneath the name. Generous padding above and below.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: style Christina portrait section with circular crop and gold name"
```

---

### Task 6: Responsive Styles

**Files:**
- Modify: `styles.css` (append)

- [ ] **Step 1: Add responsive breakpoints to `styles.css`**

Append the following to the end of `styles.css`:

```css
/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }

  .hero__left {
    width: 100%;
    padding: 48px 32px;
    min-height: 60vh;
    border-right: none;
    border-bottom: 1px solid var(--color-panel-border);
  }

  .hero__title {
    font-size: 2rem;
  }

  .hero__right {
    width: 100%;
    min-height: 50vh;
  }

  .hero__scroll-hint {
    padding-top: 24px;
  }

  .christina__portrait {
    width: 220px;
    height: 220px;
  }

  .christina {
    padding: 80px 24px;
  }
}

@media (max-width: 480px) {
  .hero__left {
    padding: 36px 24px;
  }

  .hero__title {
    font-size: 1.625rem;
  }

  .christina__portrait {
    width: 180px;
    height: 180px;
  }

  .christina__name {
    font-size: 1rem;
  }
}
```

- [ ] **Step 2: Test responsive behavior**

Open browser dev tools, toggle device toolbar (Cmd+Shift+M in Chrome). Check at:
- **768px wide:** Hero should stack vertically — left panel full width on top, video below.
- **480px wide:** Title and portrait should be smaller, padding tighter.
- **Full desktop:** Should match the original split-screen layout.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add responsive breakpoints for mobile and tablet"
```

---

### Task 7: Final Polish and Verification

**Files:**
- Verify: `index.html`, `styles.css`

- [ ] **Step 1: Open the site and verify the full flow**

```bash
open index.html
```

Verify all three sections top to bottom:
1. **Hero:** Split layout, gold accents, ingredient list, video placeholder, gradient overlay
2. **Animation container:** Empty black space, scrolls smoothly
3. **Christina:** Circular photo, gold name, decorative line

- [ ] **Step 2: Check the photo loads correctly**

Christina's photo should appear circular, well-cropped, with the gold border. If the face isn't centered well, we may need to adjust `object-position` on `.christina__photo`.

- [ ] **Step 3: Verify no console errors**

Open browser dev tools (Cmd+Option+I), check the Console tab. The only expected warning is the video 404 (since `bar-video.mp4` doesn't exist yet). No other errors should appear.

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: complete The Christina Hernandez landing page"
```
