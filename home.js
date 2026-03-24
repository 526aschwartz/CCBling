/* sparkle.js — Custom College Bling
   Shared sparkle cursor effect for all pages.
   Include at the bottom of every HTML file:
   <script src="sparkle.js"></script>
*/

const canvas = document.getElementById('sparkle-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const sparks = [];

document.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r     = Math.random() * 12;
    sparks.push({
      x:     e.clientX + Math.cos(angle) * r,
      y:     e.clientY + Math.sin(angle) * r,
      size:  Math.random() * 3 + 1.5,
      alpha: 1,
      vy:    -(Math.random() * 1.5 + 0.5),
      vx:    (Math.random() - 0.5) * 1.5,
      color: `hsl(${230 + Math.random() * 60}, 65%, 72%)`
    });
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparks.forEach(s => {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle   = s.color;
    ctx.beginPath();

    /* 4-pointed star shape */
    const pts = 4, outer = s.size, inner = s.size * 0.4;
    for (let i = 0; i < pts * 2; i++) {
      const a   = (i * Math.PI) / pts - Math.PI / 2;
      const rad = i % 2 === 0 ? outer : inner;
      i === 0
        ? ctx.moveTo(s.x + rad * Math.cos(a), s.y + rad * Math.sin(a))
        : ctx.lineTo(s.x + rad * Math.cos(a), s.y + rad * Math.sin(a));
    }

    ctx.closePath();
    ctx.fill();
    ctx.restore();

    s.x    += s.vx;
    s.y    += s.vy;
    s.alpha -= 0.022;
  });

  /* Remove faded sparks */
  for (let i = sparks.length - 1; i >= 0; i--) {
    if (sparks[i].alpha <= 0) sparks.splice(i, 1);
  }

  requestAnimationFrame(draw);
}

draw();