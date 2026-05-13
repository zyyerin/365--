const REPO_URL = 'https://github.com/zyyerin/365--';
const UNMOUNT_DELAY_MS = 1200;

document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('gallery');
  const progress = document.getElementById('scroll-progress');
  const player = document.getElementById('player');
  const playerFrame = document.getElementById('player-frame');
  const playerTitle = document.getElementById('player-title');
  const playerSource = document.getElementById('player-source');
  const playerClose = document.getElementById('player-close');
  const playerHint = document.getElementById('player-hint');

  // scroll progress bar
  const onScroll = () => {
    const top = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = `${height > 0 ? (top / height) * 100 : 0}%`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  let entries = [];
  let hints = {};
  try {
    const res = await fetch('assets/sketches.json');
    const all = await res.json();
    entries = all.filter((e) => e.health !== 'broken');
  } catch (err) {
    gallery.textContent = 'Failed to load gallery manifest.';
    console.error(err);
    return;
  }
  try {
    hints = await fetch('assets/hints.json').then((r) => r.json());
  } catch (_) {
    // hints are optional — gallery still works without them
  }

  // per-cell unmount timers
  const unmountTimers = new WeakMap();

  function mountCell(cell, entry) {
    if (cell.classList.contains('is-mounted')) return;
    clearTimeout(unmountTimers.get(cell));

    const frame = document.createElement('iframe');
    frame.className = 'cell-frame';
    frame.title = `Sketch ${entry.id}`;
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-pointer-lock');
    frame.setAttribute('tabindex', '-1');
    frame.addEventListener('load', () => cell.classList.add('frame-loaded'));
    frame.src = entry.dir + 'index.html';

    cell.appendChild(frame);
    cell.classList.add('is-mounted');
  }

  function unmountCell(cell) {
    if (!cell.classList.contains('is-mounted')) return;
    const frame = cell.querySelector('.cell-frame');
    if (frame) {
      frame.src = '';
      frame.remove();
    }
    cell.classList.remove('is-mounted', 'frame-loaded');
  }

  // mount when near viewport, unmount with delay when far away
  const observer = new IntersectionObserver(
    (entries_) => {
      for (const obs of entries_) {
        const cell = obs.target;
        const entry = JSON.parse(cell.dataset.entry);
        if (obs.isIntersecting) {
          clearTimeout(unmountTimers.get(cell));
          mountCell(cell, entry);
        } else {
          const t = setTimeout(() => unmountCell(cell), UNMOUNT_DELAY_MS);
          unmountTimers.set(cell, t);
        }
      }
    },
    { rootMargin: '20% 0px' }
  );

  // fade-in observer (visual entrance)
  const fadeObserver = new IntersectionObserver(
    (rows) => {
      for (const row of rows) {
        if (row.isIntersecting) {
          row.target.classList.add('is-visible');
          fadeObserver.unobserve(row.target);
        }
      }
    },
    { rootMargin: '0px 0px -5% 0px' }
  );

  for (const entry of entries) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'cell';
    cell.setAttribute('aria-label', `Open sketch ${entry.id}`);
    cell.dataset.entry = JSON.stringify(entry);

    cell.addEventListener('click', () => openPlayer(entry));

    gallery.appendChild(cell);
    observer.observe(cell);
    fadeObserver.observe(cell);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePlayer();
  });

  function openPlayer(entry) {
    playerTitle.textContent = entry.id;
    playerSource.href = `${REPO_URL}/tree/master/${entry.dir}`;
    const hint = hints[entry.id];
    if (hint) {
      playerHint.textContent = hint;
      playerHint.hidden = false;
    } else {
      playerHint.textContent = '';
      playerHint.hidden = true;
    }
    playerFrame.src = entry.dir + 'index.html';
    player.hidden = false;
    document.body.classList.add('player-open');
  }

  function closePlayer() {
    if (player.hidden) return;
    player.hidden = true;
    playerFrame.src = '';
    playerHint.hidden = true;
    playerHint.textContent = '';
    document.body.classList.remove('player-open');
  }

  playerClose.addEventListener('click', closePlayer);
});
