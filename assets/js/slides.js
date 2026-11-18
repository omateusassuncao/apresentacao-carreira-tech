/* ==========================================================================
   Motor de slides — sem dependências
   Teclas: ← → / PageUp PageDown / Espaço / Home End · F tela cheia ·
           T tema · P notas do apresentador
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var total = slides.length;
  var current = 0;

  var $ = function (id) { return document.getElementById(id); };
  var counter = $('counter');
  var progress = $('progress');
  var btnPrev = $('prev');
  var btnNext = $('next');
  var btnTheme = $('theme');
  var btnFull = $('fullscreen');
  var notesWin = null;

  if (!total) return;

  /* ---------- Navegação ---------- */
  function indexFromHash() {
    var m = /^#\/(\d+)$/.exec(location.hash);
    var n = m ? parseInt(m[1], 10) - 1 : 0;
    return clamp(n);
  }

  function clamp(n) { return Math.max(0, Math.min(total - 1, n)); }

  function go(n) {
    current = clamp(n);
    slides.forEach(function (s, i) {
      var active = i === current;
      s.classList.toggle('is-active', active);
      s.classList.toggle('is-past', i < current);
      s.setAttribute('aria-hidden', active ? 'false' : 'true');
      if ('inert' in s) s.inert = !active;
    });

    counter.textContent = (current + 1) + ' / ' + total;
    progress.style.width = (total > 1 ? (current / (total - 1)) * 100 : 100) + '%';
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;

    var hash = '#/' + (current + 1);
    if (location.hash !== hash) history.replaceState(null, '', hash);

    updateNotes();
  }

  var next = function () { go(current + 1); };
  var prev = function () { go(current - 1); };

  /* ---------- Tema ---------- */
  function setTheme(theme) {
    root.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f8fb' : '#0b0f14');
    try { localStorage.setItem('slides-theme', theme); } catch (e) {}
  }
  function toggleTheme() {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  }

  /* ---------- Tela cheia ---------- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (root.requestFullscreen) root.requestFullscreen().catch(function () {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /* ---------- Notas do apresentador (janela separada) ---------- */
  function openNotes() {
    if (notesWin && !notesWin.closed) { notesWin.focus(); return; }
    notesWin = window.open('', 'slides-notes', 'width=520,height=640');
    if (!notesWin) return;
    notesWin.document.write(
      '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Notas</title>' +
      '<style>body{margin:0;padding:24px;font:18px/1.5 system-ui,sans-serif;background:#0b0f14;color:#e6edf3}' +
      'h1{font:600 14px ui-monospace,monospace;color:#22d3ee;margin:0 0 8px}' +
      '#t{font-size:22px;font-weight:700;margin:0 0 16px}#n{white-space:pre-wrap}' +
      '#x{margin-top:24px;padding-top:16px;border-top:1px solid #233042;color:#8b9bb0;font-size:15px}</style>' +
      '</head><body><h1 id="c"></h1><p id="t"></p><div id="n"></div><div id="x"></div></body></html>'
    );
    notesWin.document.close();
    updateNotes();
  }

  function slideTitle(s) {
    var h = s && s.querySelector('h1, h2, blockquote p');
    return h ? h.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function updateNotes() {
    if (!notesWin || notesWin.closed) return;
    var d = notesWin.document;
    var s = slides[current];
    var note = s.querySelector('.notes');
    d.getElementById('c').textContent = 'SLIDE ' + (current + 1) + ' / ' + total;
    d.getElementById('t').textContent = slideTitle(s);
    d.getElementById('n').textContent = note ? note.textContent.trim() : '(sem notas)';
    d.getElementById('x').textContent = current < total - 1
      ? 'Próximo: ' + slideTitle(slides[current + 1])
      : 'Último slide';
  }

  /* ---------- Eventos ---------- */
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  btnTheme.addEventListener('click', toggleTheme);
  btnFull.addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;

    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case 'Enter':
        next(); break;
      case ' ':
        if (tag === 'BUTTON') return; // espaço em botão = clique
        e.shiftKey ? prev() : next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace':
        prev(); break;
      case 'Home': go(0); break;
      case 'End': go(total - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 't': case 'T': toggleTheme(); break;
      case 'p': case 'P': openNotes(); break;
      default: return;
    }
    e.preventDefault();
  });

  // Swipe em telas de toque
  var startX = null, startY = null;
  var deck = document.querySelector('.deck');
  deck.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  deck.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dx < 0 ? next() : prev();
    }
    startX = startY = null;
  }, { passive: true });

  window.addEventListener('hashchange', function () { go(indexFromHash()); });

  go(indexFromHash());
})();
