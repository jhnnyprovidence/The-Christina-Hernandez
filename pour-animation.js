(function () {
  var overlay = document.getElementById('pourOverlay');
  if (!overlay) return;

  var canvas = document.getElementById('pourCanvas');
  var ctx = canvas.getContext('2d');

  var W, H;
  var animationId;
  var startTime = null;
  var bubbles = [];

  var POUR_DURATION = 12000;
  var SETTLE_DURATION = 1500;

  // Wave system — 5 overlapping sine waves for organic sloshing
  var waves = [
    { amp: 45, freq: 0.003, speed: 2.2, phase: 0 },
    { amp: 30, freq: 0.006, speed: -3.5, phase: 1.2 },
    { amp: 20, freq: 0.011, speed: 4.0, phase: 2.8 },
    { amp: 12, freq: 0.018, speed: -5.5, phase: 0.5 },
    { amp: 8, freq: 0.025, speed: 6.0, phase: 3.7 }
  ];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createBubble(fillLevel) {
    var surfaceY = H - fillLevel * H;
    return {
      x: Math.random() * W,
      y: surfaceY + Math.random() * (H - surfaceY),
      r: 1 + Math.random() * 3,
      speed: 3 + Math.random() * 5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.04,
      opacity: 0.3 + Math.random() * 0.5
    };
  }

  function getWaveHeight(x, time, intensity) {
    var y = 0;
    for (var i = 0; i < waves.length; i++) {
      var w = waves[i];
      y += w.amp * intensity * Math.sin(x * w.freq + time * w.speed * 0.001 + w.phase);
    }
    return y;
  }

  function drawFrame(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;

    ctx.clearRect(0, 0, W, H);

    // Fill progress with ease-out curve
    var pourProgress = Math.min(elapsed / POUR_DURATION, 1);
    var fillLevel = 1 - Math.pow(1 - pourProgress, 2.5);

    // Wave intensity: strong during pour, decays after
    var waveIntensity;
    if (elapsed < POUR_DURATION) {
      var pourPhase = elapsed / POUR_DURATION;
      // Ramp to full immediately, extra sloshy in the first half
      waveIntensity = Math.min(pourPhase * 8, 1.0);
      var earlyBoost = Math.max(1.0 - pourPhase * 2, 0); // extra 60% in first half, fades out
      waveIntensity *= (1.0 + earlyBoost * 0.6);
      waveIntensity *= 0.7 + 0.3 * Math.sin(elapsed * 0.005);
    } else {
      var settleProgress = (elapsed - POUR_DURATION) / SETTLE_DURATION;
      waveIntensity = Math.max(1.0 - settleProgress * settleProgress, 0.05);
    }

    var baseSurfaceY = H - fillLevel * H;

    // 1. Draw opaque black above the wave line — hides unrevealed content
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(W + 10, -10);
    ctx.lineTo(W + 10, baseSurfaceY + getWaveHeight(W + 10, elapsed, waveIntensity));
    for (var x = W + 10; x >= -10; x -= 2) {
      var waveY = getWaveHeight(x, elapsed, waveIntensity);
      ctx.lineTo(x, baseSurfaceY + waveY);
    }
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();

    // 2. Draw semi-transparent gold liquid body below the wave line
    ctx.beginPath();
    ctx.moveTo(-10, H + 10);
    for (var x = -10; x <= W + 10; x += 2) {
      var waveY = getWaveHeight(x, elapsed, waveIntensity);
      ctx.lineTo(x, baseSurfaceY + waveY);
    }
    ctx.lineTo(W + 10, H + 10);
    ctx.closePath();

    var gradient = ctx.createLinearGradient(0, baseSurfaceY, 0, H);
    gradient.addColorStop(0, 'rgba(201, 168, 76, 0.40)');
    gradient.addColorStop(0.15, 'rgba(201, 168, 76, 0.30)');
    gradient.addColorStop(0.5, 'rgba(201, 168, 76, 0.15)');
    gradient.addColorStop(1, 'rgba(201, 168, 76, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // 3. Primary surface highlight
    ctx.beginPath();
    for (var x = -10; x <= W + 10; x += 2) {
      var waveY = getWaveHeight(x, elapsed, waveIntensity);
      var sy = baseSurfaceY + waveY;
      if (x === -10) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = 'rgba(201, 168, 76, ' + (0.4 + waveIntensity * 0.3) + ')';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 4. Secondary surface highlight
    ctx.beginPath();
    for (var x = -10; x <= W + 10; x += 2) {
      var waveY = getWaveHeight(x, elapsed + 200, waveIntensity * 0.7);
      var sy = baseSurfaceY + waveY + 4;
      if (x === -10) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = 'rgba(201, 168, 76, ' + (0.15 + waveIntensity * 0.15) + ')';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 5. Bubbles
    if (fillLevel > 0.02) {
      if (elapsed < 10000) {
        for (var b = 0; b < 20; b++) {
          bubbles.push(createBubble(fillLevel));
        }
      }

      for (var i = bubbles.length - 1; i >= 0; i--) {
        var b = bubbles[i];
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        b.x += Math.sin(b.wobble) * 0.3;

        var surfaceAtBubble = baseSurfaceY + getWaveHeight(b.x, elapsed, waveIntensity);
        if (b.y < surfaceAtBubble - 5) {
          bubbles.splice(i, 1);
          continue;
        }

        var distToSurface = (b.y - surfaceAtBubble) / (H - surfaceAtBubble);
        var alpha = b.opacity * Math.max(0.1, distToSurface);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 235, 180, ' + (alpha * 0.3) + ')';
        ctx.fill();
        ctx.strokeStyle = 'rgba(201, 168, 76, ' + (alpha * 0.5) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 245, 210, ' + (alpha * 0.4) + ')';
        ctx.fill();
      }
    }

    // Keep animating until pour + settle is done AND all bubbles have cleared
    var settledDone = elapsed >= POUR_DURATION + SETTLE_DURATION;
    if (!settledDone || bubbles.length > 0) {
      animationId = requestAnimationFrame(drawFrame);
    } else {
      // All bubbles gone — fade out overlay and clean up
      overlay.style.opacity = '0';
      overlay.addEventListener('transitionend', function () {
        overlay.remove();
      }, { once: true });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  // Start animation after a brief delay for page to render
  setTimeout(function () {
    animationId = requestAnimationFrame(drawFrame);
  }, 100);
})();
