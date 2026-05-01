<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>4 Million Words with Gary Angell</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink: #0d1f2d;
      --paper: #eef3f8;
      --aged: #d4e2ee;
      --accent: #2a5f8b;
      --accent-light: #4a85b8;
      --rule: #9ab8d4;
      --muted: #5a7a96;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--paper);
      color: var(--ink);
      font-family: 'Source Serif 4', Georgia, serif;
      min-height: 100vh;
      background-image:
        radial-gradient(ellipse at 20% 0%, rgba(42,95,139,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 100%, rgba(42,95,139,0.04) 0%, transparent 50%);
    }

    /* ── LOGIN GATE ── */
    #login-gate {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      text-align: center;
    }

    #login-gate .gate-eyebrow {
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 1.5rem;
    }

    #login-gate h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(2rem, 6vw, 3.5rem);
      font-weight: 700;
      line-height: 1.1;
      max-width: 600px;
      margin-bottom: 0.5rem;
    }

    #login-gate h1 em { font-style: italic; color: var(--accent); }

    .gate-rule {
      width: 60px;
      height: 2px;
      background: var(--accent);
      margin: 1.5rem auto;
    }

    #login-gate p {
      color: var(--muted);
      font-size: 1rem;
      margin-bottom: 2.5rem;
      font-style: italic;
    }

    #login-btn {
      background: var(--accent);
      color: var(--paper);
      border: none;
      padding: 0.85rem 2.5rem;
      font-family: 'Source Serif 4', serif;
      font-size: 0.9rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s;
    }
    #login-btn:hover { background: var(--accent-light); }

    /* ── MAIN SITE ── */
    #site { display: none; }

    header {
      border-bottom: 1px solid var(--rule);
      padding: 2.5rem 2rem 2rem;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      max-width: 860px;
      margin: 0 auto;
    }

    .masthead-label {
      font-size: 0.7rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.5rem;
    }

    .masthead-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.6rem, 4vw, 2.6rem);
      font-weight: 700;
      line-height: 1.1;
    }

    .masthead-title em { font-style: italic; color: var(--accent); }

    .masthead-sub {
      font-style: italic;
      color: var(--muted);
      font-size: 0.9rem;
      margin-top: 0.35rem;
    }

    #logout-btn {
      background: none;
      border: 1px solid var(--rule);
      color: var(--muted);
      padding: 0.45rem 1rem;
      font-family: 'Source Serif 4', serif;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    #logout-btn:hover { border-color: var(--accent); color: var(--accent); }

    main {
      max-width: 860px;
      margin: 0 auto;
      padding: 3rem 2rem 5rem;
    }

    .section-label {
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
      border-bottom: 1px solid var(--rule);
      padding-bottom: 0.6rem;
      margin-bottom: 2rem;
    }

    /* ── EPISODE CARD ── */
    .episode {
      display: grid;
      grid-template-columns: 56px 1fr;
      gap: 0 1.5rem;
      padding: 1.75rem 0;
      border-bottom: 1px solid var(--aged);
      animation: fadeUp 0.5s ease both;
    }

    .episode:first-of-type { border-top: 1px solid var(--aged); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .ep-number {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--rule);
      line-height: 1;
      padding-top: 4px;
      text-align: right;
    }

    .ep-meta {
      font-size: 0.72rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 0.35rem;
    }

    .ep-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.3;
    }

    .ep-desc {
      font-size: 0.92rem;
      color: var(--muted);
      line-height: 1.65;
      margin-bottom: 1rem;
      font-style: italic;
    }

    audio {
      width: 100%;
      height: 36px;
      accent-color: var(--accent);
      outline: none;
    }

    audio::-webkit-media-controls-panel { background: var(--aged); }

    /* ── EMPTY STATE ── */
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--muted);
      font-style: italic;
    }

    .empty-state .big-num {
      font-family: 'Playfair Display', serif;
      font-size: 5rem;
      color: var(--aged);
      line-height: 1;
      margin-bottom: 1rem;
    }

    footer {
      text-align: center;
      padding: 2rem;
      color: var(--rule);
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      border-top: 1px solid var(--aged);
      max-width: 860px;
      margin: 0 auto;
    }
  </style>
</head>
<body>

<!-- LOGIN GATE -->
<div id="login-gate">
  <div class="gate-eyebrow">A Family Podcast</div>
  <h1>4 Million Words<br>with <em>Gary Angell</em></h1>
  <div class="gate-rule"></div>
  <p>This is a private, family podcast. Please sign in to listen.</p>
  <button id="login-btn">Sign In</button>
</div>

<!-- MAIN SITE -->
<div id="site">
  <header>
    <div>
      <div class="masthead-label">A Family Podcast</div>
      <div class="masthead-title">4 Million Words with <em>Gary Angell</em></div>
      <div class="masthead-sub">The Life of Gary Angell in his own words.</div>
    </div>
    <button id="logout-btn">Sign Out</button>
  </header>

  <main>
    <div class="section-label">Episodes</div>
    <div id="episode-list"></div>
  </main>

  <footer>4 Million Words with Gary Angell &nbsp;·&nbsp; Family Only</footer>
</div>

<script>
  // ── Auth ──
  const gate = document.getElementById('login-gate');
  const site = document.getElementById('site');

  function showSite() {
    gate.style.display = 'none';
    site.style.display = 'block';
    loadEpisodes();
  }
  function showGate() {
    gate.style.display = 'flex';
    site.style.display = 'none';
  }

  document.getElementById('login-btn').addEventListener('click', () => netlifyIdentity.open());
  document.getElementById('logout-btn').addEventListener('click', () => netlifyIdentity.logout());

  netlifyIdentity.on('login', () => { netlifyIdentity.close(); showSite(); });
  netlifyIdentity.on('logout', showGate);
  netlifyIdentity.on('init', user => { user ? showSite() : showGate(); });

  // ── Load Episodes ──
  async function loadEpisodes() {
    const list = document.getElementById('episode-list');

    try {
      const res = await fetch('/episodes.json?t=' + Date.now());
      const episodes = await res.json();

      if (!episodes.length) {
        list.innerHTML = `
          <div class="empty-state">
            <div class="big-num">∞</div>
            No episodes yet — the first one is coming soon.
          </div>`;
        return;
      }

      list.innerHTML = episodes.map((ep, i) => {
        const num = String(ep.number).padStart(2, '0');
        return `
          <div class="episode" style="animation-delay: ${i * 0.08}s">
            <div class="ep-number">${num}</div>
            <div class="ep-body">
              <div class="ep-meta">Episode ${num} &nbsp;·&nbsp; ${ep.date}</div>
              <div class="ep-title">${ep.title}</div>
              <div class="ep-desc">${ep.description}</div>
              <audio controls src="${ep.audioUrl}"></audio>
            </div>
          </div>`;
      }).join('');

    } catch (e) {
      list.innerHTML = `<div class="empty-state">Could not load episodes. Please try refreshing.</div>`;
    }
  }
</script>

</body>
</html>
