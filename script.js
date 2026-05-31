/* =====================================================
   nano4M Project Website - script.js
   ===================================================== */

/* ---------- Nav toggle (mobile) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Mark active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Show team email on click
  document.querySelectorAll('.team-pill[data-email]').forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.querySelector('.team-pill-text');
      if (!text) return;

      const isShowingEmail = pill.classList.toggle('is-showing-email');
      text.textContent = isShowingEmail ? pill.dataset.email : pill.dataset.name;
    });
  });

  // Floating particles for inner-page title headers
  document.querySelectorAll('.page-hero').forEach((hero, index) => {
    if (hero.querySelector('.page-hero-canvas')) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'page-hero-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    hero.prepend(canvas);
    initFloatingParticles(canvas, 46, index * 200);
  });

  document.querySelectorAll('.github-section').forEach((section, index) => {
    if (section.querySelector('.page-hero-canvas')) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'page-hero-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    section.prepend(canvas);
    initFloatingParticles(canvas, 46, index * 200);
  });
});

function initFloatingParticles(canvas, count = 40, startOffset = 0) {
  const ctx = canvas.getContext('2d');
  const colors = ['#6b7280', '#2563eb', '#16a34a', '#ea580c', '#7c3aed'];
  const particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticle() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: rand(0, width || 1),
      y: rand(0, height || 1),
      size: rand(4, 8),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      opacity: rand(0.14, 0.34),
      color,
      maskUntil: 0
    };
  }

  function seedParticles() {
    particles.length = 0;
    for (let i = 0; i < count; i++) particles.push(makeParticle());
  }

  function flashMaskedParticles() {
    const flashCount = Math.floor(rand(3, 6));
    const used = new Set();
    while (used.size < flashCount && used.size < particles.length) {
      used.add(Math.floor(Math.random() * particles.length));
    }
    const until = performance.now() + 600;
    used.forEach(i => {
      particles[i].maskUntil = until;
    });
  }

  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x > width + p.size) p.x = -p.size;
      if (p.x < -p.size) p.x = width + p.size;
      if (p.y > height + p.size) p.y = -p.size;
      if (p.y < -p.size) p.y = height + p.size;

      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = now < p.maskUntil ? '#ef4444' : p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resizeCanvas();
  seedParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    seedParticles();
  });
  setTimeout(() => {
    flashMaskedParticles();
    setInterval(flashMaskedParticles, 3000);
  }, startOffset);
  requestAnimationFrame(draw);
}

/* ---------- Data loading ---------- */
async function loadData() {
  try {
    const res = await fetch('data.json');
    return await res.json();
  } catch (e) {
    console.warn('Could not load data.json:', e);
    return null;
  }
}

/* ---------- Render model cards ---------- */
function renderModelCards(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  const colorMap = {
    'baseline': 'baseline',
    'v1': 'v1', 'v2': 'v2', 'v3': 'v3', 'v4': 'v4'
  };

  container.innerHTML = data.models.map(m => {
    const colorClass = colorMap[m.id] || 'baseline';
    return `
    <div class="model-card">
      <div class="model-card-header">
        <span class="model-badge model-color-${colorClass}">${m.name}</span>
        <span class="model-codename">${m.codename}</span>
      </div>
      <div class="model-card-body">
        <p>${m.description}</p>
        <div class="model-masks">
          <span class="mask-tag">
            <span class="dot" style="background:${m.accent}"></span>
            Text: ${m.textMask}
          </span>
          <span class="mask-tag">
            <span class="dot" style="background:${m.accent}"></span>
            Image: ${m.imageMask}
          </span>
        </div>
        <div class="img-placeholder">
          <!-- Replace with: <img src="${m.image}" alt="${m.name} masking visualization"> -->
          <span>Masking visualization &middot; ${m.name}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ---------- Render image-to-text table ---------- */
function renderI2TTable(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  const colorNames = ['baseline', 'v1', 'v2', 'v3', 'v4'];

  const rows = data.imageToText.map((r, i) => `
    <tr>
      <td class="model-name model-text-${colorNames[i]}">${r.model}</td>
      <td class="${r.bestBleu ? 'best' : ''}">${r.bleu4.toFixed(2)}</td>
      <td class="${r.bestCider ? 'best' : ''}">${r.cider.toFixed(2)}</td>
      <td class="${r.bestRouge ? 'best' : ''}">${r.rougeL.toFixed(2)}</td>
      <td class="${r.bestEM ? 'best' : ''}">${r.exactMatch.toFixed(2)}</td>
    </tr>`).join('');

  container.innerHTML = `
    <table class="results-table">
      <thead>
        <tr>
          <th>Model</th><th>BLEU-4</th><th>CIDEr</th><th>ROUGE-L</th><th>Exact Match</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/* ---------- Render text-to-image table ---------- */
function renderT2ITable(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  const colorNames = ['baseline', 'v1', 'v2', 'v3', 'v4'];

  const rows = data.textToImage.map((r, i) => `
    <tr>
      <td class="model-name model-text-${colorNames[i]}">${r.model}</td>
      <td class="${r.best ? 'best' : ''}">${r.clevr.toFixed(4)}</td>
      <td class="${r.best ? 'best' : ''}">${r.clip.toFixed(4)}</td>
      <td>${r.stdClevr.toFixed(3)}</td>
    </tr>`).join('');

  container.innerHTML = `
    <table class="results-table">
      <thead>
        <tr>
          <th>Model</th><th>CLEVR &uarr;</th><th>CLIP &uarr;</th><th>Std (CLEVR)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

/* ---------- Render conclusions ---------- */
function renderConclusions(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;
  container.innerHTML = data.conclusions
    .map(c => `<li>${c}</li>`)
    .join('');
}

/* ---------- Render team (GitHub page) ---------- */
function renderGithubCards(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  container.innerHTML = data.team.map(m => {
    const initials = m.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
    return `
    <div class="github-card">
      <div class="github-avatar">${initials}</div>
      <h3>${m.name}</h3>
      <span class="text-mono text-muted">SCIPER: ${m.sciper}</span>
      <a href="${m.github}" target="_blank" class="btn-github">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        Open GitHub profile
      </a>
    </div>`;
  }).join('');
}

/* ---------- Init per page ---------- */
loadData().then(data => {
  // Index page
  renderModelCards(data, 'model-cards-container');
  renderI2TTable(data, 'i2t-table-container');
  renderT2ITable(data, 't2i-table-container');
  renderConclusions(data, 'conclusions-list');

  // Code page
  renderGithubCards(data, 'github-cards-container');
});

