# Liquid Pour Intro Animation — Design Spec

## Context

The Christina Hernandez is a single-page cocktail landing site with a gold/black luxury aesthetic (Playfair Display + Lato typography, `#C9A84C` gold, `#000` black). Currently the site is pure HTML/CSS with no JavaScript or animations. The user wants a dramatic page-load animation where the screen starts black and gold liquid fills up like a cocktail being poured into a glass, revealing the page content underneath.

## Requirements

- **Trigger:** Plays on page load, first visit only (sessionStorage)
- **Duration:** 8-second pour + 1.5-second settle = 9.5s total animation
- **Liquid style:** Gold/amber (`#C9A84C`) with wavy, ripply, bubbly surface
- **Wave behavior:** Pronounced sloshing during pour (5 overlapping sine waves with opposing directions), gradually settling to calm
- **Content reveal:** Real page loads behind the animation; content fades in slowly starting at ~40% fill
- **Cleanup:** Canvas and overlay fade out after settle, then removed from DOM
- **Returning visitors:** Skip animation entirely via `sessionStorage` check

## Architecture

### Approach: Canvas Overlay (vanilla JS, no dependencies)

A full-screen canvas element + black overlay div sit on top of the page at `z-index: 9999`. The canvas draws the liquid simulation (waves, bubbles, highlights). The black overlay is progressively clipped via `clip-path` to reveal the real page beneath the liquid. After completion, both are faded out and removed.

### Files

| File | Action | Purpose |
|------|--------|---------|
| `index.html` | Modify | Add overlay/canvas wrapper div, link `pour-animation.js` |
| `styles.css` | Modify | Add overlay styles, content fade-in transitions |
| `pour-animation.js` | Create | All animation logic |

## Detailed Design

### 1. HTML Changes (`index.html`)

Add before `</body>`:
```html
<div id="pourOverlay" class="pour-overlay">
  <div class="pour-overlay__black"></div>
  <canvas id="pourCanvas"></canvas>
</div>
<script src="pour-animation.js"></script>
```

### 2. CSS Changes (`styles.css`)

**Overlay styles:**
```css
.pour-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  transition: opacity 1s ease-out;
}

.pour-overlay__black {
  position: absolute;
  inset: 0;
  background: #000;
}

.pour-overlay canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
```

**Content fade-in transitions** — key page elements start at `opacity: 0` and transition in when a `.content-revealed` class is added to `<body>`:
- `.hero__title` — 3s ease-out fade + 15px upward drift
- `.hero__label` — 2.5s ease-out fade + 10px upward drift
- `.hero__ingredients` — 2.5s ease-out fade, 0.3s delay
- `.hero__right img` — 3s ease-out fade
- `.christina` section — 2s ease-out fade, 0.5s delay

When `body` does NOT have `.content-revealed`, these elements have `opacity: 0`. When it does, they transition to `opacity: 1`.

### 3. Animation Logic (`pour-animation.js`)

**Session check:**
```
if sessionStorage.getItem('pourPlayed'):
  remove overlay immediately
  add .content-revealed to body
  return
```

**Constants:**
- `POUR_DURATION = 8000` (8 seconds)
- `SETTLE_DURATION = 1500` (1.5 seconds)
- `TITLE_TRIGGER = 0.4` (40% fill triggers content fade-in)

**Wave system** — 5 overlapping sine waves:
| Wave | Amplitude | Frequency | Speed | Purpose |
|------|-----------|-----------|-------|---------|
| 1 | 45px | 0.003 | 2.2 | Big slow swell |
| 2 | 30px | 0.006 | -3.5 | Medium counter-wave |
| 3 | 20px | 0.011 | 4.0 | Faster chop |
| 4 | 12px | 0.018 | -5.5 | Fine ripple |
| 5 | 8px | 0.025 | 6.0 | Surface texture |

**Wave intensity:**
- During pour: ramps up quickly (`min(pourPhase * 3, 1.0)`), with extra turbulence modulation (`0.7 + 0.3 * sin(elapsed * 0.005)`)
- After pour: decays quadratically to 0.05 minimum

**Fill curve:** Ease-out power curve — `fillLevel = 1 - pow(1 - pourProgress, 2.5)` — liquid rises quickly at first, slows as it approaches the top.

**Liquid rendering (per frame):**
1. Draw wavy liquid body (gold gradient, `rgba(201,168,76, 0.40)` at surface to `0.05` at bottom)
2. Draw bright surface highlight line (2px, follows wave contour)
3. Draw secondary highlight (1px, offset, dimmer)
4. Spawn and animate bubbles (radial gradient circles, 2-8px, rise with wobble, pop at surface)

**Black overlay clipping:** `clip-path: inset(0 0 ${100 - clipPercent}% 0)` — clips from bottom up, accounting for wave peaks

**Content reveal:** At 40% fill, add `.content-revealed` class to `<body>`, triggering CSS transitions on page elements

**Cleanup sequence:**
1. After `POUR_DURATION + SETTLE_DURATION`: set `pourOverlay.style.opacity = 0`
2. After the 1s fade transition ends: remove overlay from DOM
3. Set `sessionStorage.setItem('pourPlayed', 'true')`

**Bubble system:**
- During pour: ~40% chance per frame of spawning a bubble
- After pour: ~5% chance per frame
- Each bubble: random size (2-8px), random horizontal position, rises at 0.5-2px/frame with sinusoidal wobble
- Removed when rising above the wave surface
- Rendered with radial gradient (warm gold center, transparent edge) + thin stroke + highlight dot

## Verification

1. Open `index.html` in a browser — should see 8s gold liquid pour with pronounced waves, bubbles, and slow content fade-in
2. Refresh the page — animation should NOT play again (sessionStorage skip)
3. Clear sessionStorage or open in incognito — animation should play again
4. Test on mobile viewport (< 768px) — canvas should resize correctly
5. Check that after animation completes, all page content is fully visible and interactive
6. Verify the overlay div is removed from the DOM after cleanup
