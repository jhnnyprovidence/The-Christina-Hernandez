# The Christina Hernandez — Landing Page Design Spec

## Overview

A single-page landing site for "The Christina Hernandez," an alcoholic cocktail made with Ginger Beer, Pineapple Juice, and Vodka or Tequila. The site is a sultry, luxurious showcase — all black with gold accents — designed to present the drink and the person it's named after.

## Tech Stack

- **Single `index.html`** — no framework, no build tools
- **`styles.css`** — external stylesheet
- **Google Fonts** — Playfair Display (headings, italic serif) + Lato (labels, body, uppercase tracking)
- **Stock video** — embedded via `<video>` tag, looping, muted, autoplaying
- **Scroll animation** — empty container `<div>` for user to drop in their own animation (Lottie, GSAP, canvas, etc.)
- **`Christina.jpg`** — provided photo, used in the closing section

## Design System

### Colors

| Token         | Hex       | Usage                              |
|---------------|-----------|-------------------------------------|
| Black         | `#0A0A0A` | Page background, primary surface    |
| Gold          | `#C9A84C` | Accents, labels, borders, highlights|
| Cream         | `#F5F0E8` | Heading text, primary readable text |
| Warm Gray     | `#A89070` | Secondary text, ingredient list     |
| Dark Gold     | `#3D2E0A` | Divider lines, subtle borders       |
| Muted Brown   | `#665540` | Tertiary text ("or", subtitles)     |

### Typography

- **Playfair Display** (Google Fonts) — drink name, section headings. Used in italic, light weight (300), with generous letter-spacing.
- **Lato** (Google Fonts) — labels, ingredient names, body text. Used in uppercase with wide letter-spacing for labels, regular weight for body.

### Design Language

- Sultry and luxurious — high-end cocktail bar aesthetic
- Gold on black throughout, no other accent colors
- Serif italic for elegance, sans-serif uppercase for structure
- Generous whitespace, no clutter
- Subtle gradients (warm dark tones) rather than flat surfaces

## Page Structure

The page has exactly three sections, stacked vertically.

### Section 1: Hero (100vh)

**Layout:** Split screen — left 1/3, right 2/3.

**Left Panel (33% width):**
- Background: subtle warm gradient (`#0A0A0A` → `#1A1208`)
- Right border: thin line in dark gold (`#2A1F0A`)
- Content, top to bottom:
  - Small gold uppercase label: "THE COCKTAIL" (Lato, 9px equivalent, letter-spacing 3px)
  - Drink name: "The Christina Hernandez" in cream italic serif (Playfair Display, large size ~2.5rem)
  - Gold divider line
  - "INGREDIENTS" label in gold uppercase
  - Ingredient list in warm gray with gold diamond bullets (◆):
    - Ginger Beer
    - Pineapple Juice
    - Vodka _or_ Tequila (the "or" in muted brown)
  - At the bottom: "SCROLL TO EXPERIENCE ↓" in gold, reduced opacity (~0.6)

**Right Panel (67% width):**
- A looping, muted, autoplaying `<video>` element filling the entire panel
- Video: stock footage of a bartender making drinks in moody bar lighting
- A subtle gradient overlay bleeding from the left panel (linear-gradient from `#0A0A0A` to transparent, ~15% width) to create a seamless transition between panels
- Video should use `object-fit: cover` to fill the space without distortion

**Responsive note:** On mobile (< 768px), the hero should stack vertically — left panel on top (full width), video below.

### Section 2: Scroll Animation Container

**Layout:** Full-width, centered.

- Background: pure black (`#0A0A0A`) — nothing competes with the animation
- Contains a single empty `<div>` with a clear class name (e.g., `.animation-container`) and an `id` (e.g., `#scroll-animation`)
- Default height: `200vh` (adjustable by user based on their animation's scroll length)
- No other content in this section — the animation is the sole focus
- The user will drop in their own scroll-driven animation that:
  1. Shows an empty cup
  2. Fills it with the ingredients
  3. Shakes it
  4. Presents/serves it to the viewer

### Section 3: Christina (The Closer)

**Layout:** Centered, vertical stack.

- Background: black (`#0A0A0A`)
- Generous vertical padding (120px+ top and bottom)
- Content, centered:
  - **Photo:** `Christina.jpg`, cropped to a circle, ~250-300px diameter
    - Thin gold border (2px solid `#C9A84C`)
    - `object-fit: cover` for clean cropping
  - **Name:** "Christina Hernandez" in gold italic serif (Playfair Display), letter-spacing 2px
    - Positioned below the photo with ~20px gap
  - **Decorative line:** Small horizontal gold gradient line (transparent → gold → transparent, ~60px wide) centered below the name

## Files to Create

```
/The Christina Hernandez/
├── index.html          # Single HTML file, all sections
├── styles.css          # External stylesheet
├── Christina.jpg       # Already exists — portrait photo
└── assets/
    └── bar-video.mp4   # Stock video (user will provide or we use a placeholder)
```

## What the User Provides

1. **Stock video** — bartender making drinks in moody lighting (to replace placeholder)
2. **Scroll animation** — the cup-filling, shaking, serving animation (to drop into `.animation-container`)

## What We Build

1. Complete `index.html` with semantic structure and all three sections
2. Complete `styles.css` with the full design system, responsive breakpoints, and all styling
3. A working placeholder for the video (dark area with play icon until real video is added)
4. A clearly marked, empty animation container ready for the user's drop-in
5. The Christina photo section using the provided `Christina.jpg`
