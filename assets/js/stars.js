(function () {
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function noise(x) {
    const X = Math.floor(x) & 255;
    x -= Math.floor(x);
    const u = x * x * x * (x * (x * 6 - 15) + 10);
    return lerp(u, grad(X, x), grad(X + 1, x - 1));
  }
  function lerp(t, a, b) { return a + t * (b - a); }
  function grad(hash, x) { return (hash & 1) === 0 ? x : -x; }

  function initStars() {
    stars = [];
    const count = Math.floor((W * H) / 1800);
    for (let i = 0; i < count; i++) {
      const rnd = Math.random();
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: rnd < 0.7  ? Math.random() * 0.8 + 0.2
         : rnd < 0.92 ? Math.random() * 0.8 + 0.9
         :               Math.random() * 0.6 + 1.6,
        f1: Math.random() * 0.4 + 0.05,
        f2: Math.random() * 2.0 + 0.8,
        f3: Math.random() * 5.0 + 2.0,
        p1: Math.random() * 100,
        p2: Math.random() * 100,
        p3: Math.random() * 100,
        a1: Math.random() * 0.3  + 0.1,
        a2: Math.random() * 0.25 + 0.05,
        a3: Math.random() * 0.12,
        base:       Math.random() * 0.25 + 0.05,
        flashTimer: Math.random() * 800,
        flashDur:   Math.random() * 60 + 20,
        flashInt:   0,
        gold:   Math.random() < 0.07,
        bright: rnd > 0.88,
      });
    }
  }

  function drawStars(t) {
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const slow  = Math.sin(t * s.f1 + s.p1) * s.a1;
      const fast  = Math.sin(t * s.f2 + s.p2) * s.a2;
      const micro = Math.sin(t * s.f3 + s.p3) * s.a3;

      s.flashTimer -= 1;
      if (s.flashTimer <= 0) {
        s.flashTimer = Math.random() * 600 + 200;
        s.flashInt   = s.bright ? 0.7 : 0.4;
        s.flashDur   = Math.random() * 40 + 10;
      }
      let flash = 0;
      if (s.flashInt > 0) {
        flash = s.flashInt;
        s.flashInt -= s.flashInt / s.flashDur;
        if (s.flashInt < 0.01) s.flashInt = 0;
      }

      const a = Math.max(0, Math.min(1, s.base + slow + fast + micro + flash));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

      if (s.gold) {
        ctx.fillStyle = `rgba(201,168,76,${a})`;
        ctx.fill();
        if (a > 0.55 && s.r > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,${(a - 0.55) * 0.15})`;
          ctx.fill();
        }
      } else {
        ctx.fillStyle = `rgba(240,238,230,${a})`;
        ctx.fill();
        if (a > 0.65 && s.r > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,238,230,${(a - 0.65) * 0.12})`;
          ctx.fill();
        }
      }
    }
  }

  function loop(ts) {
    drawStars(ts * 0.001);
    requestAnimationFrame(loop);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => { resize(); initStars(); });
  requestAnimationFrame(loop);
})();
