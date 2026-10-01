/* =====================================================================
   Mein Gebet – App-Logik
   ===================================================================== */

const state = {
  view: 'home',       // 'home' | 'prayer'
  prayerId: null,
  step: 0,
  theme: localStorage.getItem('gb-theme') || 'men'
};

let deferredInstall = null;

const app = document.getElementById('app');

/* ---------- Positions-Grafiken (SVG-Platzhalter) ---------- */
const POSES = {
  takbir: '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="80" cy="30" r="14" fill="currentColor" stroke="none"/><path d="M80 46 V112"/><path d="M78 60 L42 38"/><path d="M82 60 L118 38"/><circle cx="40" cy="35" r="6" fill="currentColor" stroke="none"/><circle cx="120" cy="35" r="6" fill="currentColor" stroke="none"/><path d="M80 112 L52 186"/><path d="M80 112 L108 186"/></svg>',
  standing: '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="80" cy="30" r="14" fill="currentColor" stroke="none"/><path d="M80 46 V112"/><path d="M76 62 L100 90"/><path d="M84 62 L60 90"/><path d="M80 112 L52 186"/><path d="M80 112 L108 186"/></svg>',
  ruku: '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="147" cy="99" r="14" fill="currentColor" stroke="none"/><path d="M133 104 L140 99"/><path d="M62 112 L50 186"/><path d="M62 112 L76 186"/><path d="M62 112 L132 104"/><path d="M132 104 L48 118"/><path d="M132 104 L88 118"/><circle cx="46" cy="119" r="6" fill="currentColor" stroke="none"/><circle cx="90" cy="119" r="6" fill="currentColor" stroke="none"/></svg>',
  sujud: '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="40" cy="178" r="7" fill="currentColor" stroke="none"/><circle cx="74" cy="178" r="7" fill="currentColor" stroke="none"/><path d="M40 178 L62 166"/><path d="M74 178 L62 166"/><path d="M62 166 L110 164"/><path d="M110 164 L124 172"/><circle cx="138" cy="176" r="13" fill="currentColor" stroke="none"/><circle cx="102" cy="176" r="5.5" fill="currentColor" stroke="none"/><circle cx="153" cy="176" r="5.5" fill="currentColor" stroke="none"/></svg>',
  sitting: '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="80" cy="34" r="14" fill="currentColor" stroke="none"/><path d="M80 48 V126"/><path d="M76 62 L58 138"/><path d="M84 62 L102 138"/><circle cx="56" cy="142" r="6" fill="currentColor" stroke="none"/><circle cx="104" cy="142" r="6" fill="currentColor" stroke="none"/><path d="M80 126 L58 178"/><path d="M80 126 L102 178"/><circle cx="56" cy="180" r="6.5" fill="currentColor" stroke="none"/><circle cx="104" cy="180" r="6.5" fill="currentColor" stroke="none"/></svg>',
  'salam-right': '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="80" cy="34" r="14" fill="currentColor" stroke="none"/><path d="M80 48 V126"/><path d="M76 62 L58 138"/><path d="M84 62 L102 138"/><circle cx="56" cy="142" r="6" fill="currentColor" stroke="none"/><circle cx="104" cy="142" r="6" fill="currentColor" stroke="none"/><path d="M80 126 L58 178"/><path d="M80 126 L102 178"/><circle cx="56" cy="180" r="6.5" fill="currentColor" stroke="none"/><circle cx="104" cy="180" r="6.5" fill="currentColor" stroke="none"/><path d="M88 28 L98 26"/><path d="M100 22 H136" stroke-width="5" stroke-dasharray="1 9"/><path d="M136 14 L150 22 L136 30 Z" fill="currentColor" stroke="none"/></svg>',
  'salam-left': '<svg viewBox="0 0 160 200" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="80" cy="34" r="14" fill="currentColor" stroke="none"/><path d="M80 48 V126"/><path d="M76 62 L58 138"/><path d="M84 62 L102 138"/><circle cx="56" cy="142" r="6" fill="currentColor" stroke="none"/><circle cx="104" cy="142" r="6" fill="currentColor" stroke="none"/><path d="M80 126 L58 178"/><path d="M80 126 L102 178"/><circle cx="56" cy="180" r="6.5" fill="currentColor" stroke="none"/><circle cx="104" cy="180" r="6.5" fill="currentColor" stroke="none"/><path d="M72 28 L62 26"/><path d="M60 22 H24" stroke-width="5" stroke-dasharray="1 9"/><path d="M24 14 L10 22 L24 30 Z" fill="currentColor" stroke="none"/></svg>'
};

const POSE_LABELS = {
  takbir: 'Stehen',
  standing: 'Stehen',
  ruku: 'Verbeugung',
  sujud: 'Niederwerfung',
  sitting: 'Sitzen',
  'salam-right': 'Gruß rechts',
  'salam-left': 'Gruß links',
  end: ''
};

/* ---------- Helfer ---------- */
function lines(t) { return String(t || '').split('\n').join('<br>'); }

function introOf(s) {
  return (state.theme === 'women' && s.introWomen) ? s.introWomen : s.intro;
}

function chipsOf(s) {
  let c = '';
  if (s.repeat > 1) c += '<span class="chip">' + s.repeat + '× sprechen</span>';
  if (s.loud === true) c += '<span class="chip loud">🔊 laut sprechen</span>';
  if (s.loud === false) c += '<span class="chip silent">🔇 leise sprechen</span>';
  if (s.note) c += '<span class="chip">' + s.note + '</span>';
  return c ? '<div class="chips">' + c + '</div>' : '';
}

function themeToggleHtml() {
  return '<div class="theme-toggle" role="group" aria-label="Darstellung">' +
    '<button data-theme="men" class="' + (state.theme === 'men' ? 'active' : '') + '">👨 Männer</button>' +
    '<button data-theme="women" class="' + (state.theme === 'women' ? 'active' : '') + '">👩 Frauen</button>' +
    '</div>';
}

function applyTheme() {
  document.body.className = 'theme-' + state.theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.theme === 'women' ? '#9333ea' : '#2563eb');
  localStorage.setItem('gb-theme', state.theme);
}

/* ---------- Ansichten ---------- */
function render() {
  stopWbw();
  stopPhrase();
  applyTheme();
  if (state.view === 'home') renderHome();
  else renderPrayer();
}

function renderHome() {
  const cards = PRAYERS.map(p =>
    '<button class="prayer-card" data-id="' + p.id + '">' +
      '<span class="icon">' + p.icon + '</span>' +
      '<span class="name">' + p.name + '</span>' +
      '<span class="sub">' + p.subtitle + ' · ' + p.time + '</span>' +
      '<span class="meta">' + p.rakahs + ' Rakʿa · ' + p.loudText + '</span>' +
    '</button>'
  ).join('');

  app.innerHTML =
    '<header class="topbar">' +
      '<div class="brand"><span class="logo">🕌</span> Mein Gebet</div>' +
      '<button class="icon-btn" id="btn-settings" aria-label="Einstellungen">⚙️</button>' +
      themeToggleHtml() +
    '</header>' +
    '<main class="wrap">' +
      '<section class="hero">' +
        '<div class="emoji">🤲</div>' +
        '<h1>So verrichtest du das Gebet</h1>' +
        '<p>Wähle ein Gebet – und folge einfach Schritt für Schritt.</p>' +
      '</section>' +
      '<div class="section-title">Gebet auswählen</div>' +
      '<section class="prayer-grid">' + cards + '</section>' +
      (location.protocol === 'file:'
        ? '<div class="hint-box notice">🔊 <strong>Audio-Hinweis:</strong> Öffne die App über den lokalen Server, damit die Audios zuverlässig abspielen: <code>start-server.bat</code> starten und dann <code>http://localhost:8000</code> im Browser öffnen. Beim direkten Öffnen der Datei können manche Browser Audios blockieren.</div>'
        : '') +
      '<div class="hint-box">💧 Vor dem Gebet: <strong>Wudūʾ</strong> (Gebetswaschung), ein sauberer Ort und die Blickrichtung <strong>Qibla</strong> (Mekka).</div>' +
      '<footer class="home-footer">' +
        (deferredInstall ? '<p><button class="btn btn-primary" id="btn-install" style="margin:8px 0;">📲 Als App installieren</button></p>' : '') +
        '<p>Gebetsablauf angelehnt an <a href="https://www.howdoipray.com/howdoipray/Home/" target="_blank" rel="noopener">howdoipray.com</a></p>' +
      '</footer>' +
    '</main>';

  app.querySelectorAll('.prayer-card').forEach(b => {
    b.addEventListener('click', () => openPrayer(b.dataset.id));
  });
  bindThemeToggle();
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  const inst = document.getElementById('btn-install');
  if (inst) inst.addEventListener('click', () => {
    if (deferredInstall) { deferredInstall.prompt(); deferredInstall = null; render(); }
  });
}

function openPrayer(id) {
  state.view = 'prayer';
  state.prayerId = id;
  state.step = 0;
  render();
}

function prayer() { return PRAYERS.find(p => p.id === state.prayerId); }

function renderPrayer() {
  const p = prayer();
  const groups = groupsOf(p);
  const g = groups[state.step];
  const first = g.steps[0];
  const isEnd = first.pose === 'end';
  const total = groups.length;
  const pct = Math.round(((state.step + 1) / total) * 100);

  app.innerHTML =
    '<header class="topbar">' +
      '<button class="icon-btn" id="btn-back" aria-label="Zur Startseite">←</button>' +
      '<div class="top-title"><strong>' + p.name + ' · ' + p.subtitle + '</strong><span>' + p.rakahs + ' Rakʿa · ' + p.loudText + '</span></div>' +
      themeToggleHtml() +
    '</header>' +
    '<div class="progress"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
    (isEnd ? '' : '<div class="rakah-badge"><span>Rakʿa ' + first.rakah + ' von ' + first.total + '</span></div>') +
    '<main class="wrap">' +
      (isEnd ? endCardHtml(p) : groupHtml(g)) +
    '</main>' +
    (isEnd ? '' : navHtml(p, total));

  document.getElementById('btn-back').addEventListener('click', goHome);
  bindThemeToggle();
  if (!isEnd) {
    document.getElementById('btn-next').addEventListener('click', nextStep);
    const prev = document.getElementById('btn-prev');
    if (prev) prev.addEventListener('click', prevStep);
  } else {
    document.getElementById('btn-restart').addEventListener('click', () => { state.step = 0; render(); });
    document.getElementById('btn-home').addEventListener('click', goHome);
  }
  bindAudioControls();
  window.scrollTo(0, 0);
}

function imageOf(s) {
  const explicit = state.theme === 'women' ? s.imageWomen : s.imageMen;
  if (explicit) return explicit;
  const map = state.theme === 'women' ? POSE_IMAGES_WOMEN : POSE_IMAGES_MEN;
  return (map && map[s.pose]) || s.image || '';
}

function poseBlock(s) {
  const img = imageOf(s);
  if (img) {
    return '<img class="pose-img" src="' + img + '" alt="' + s.title + '" />';
  }
  return '<div class="pose-svg">' + (POSES[s.pose] || '') + '</div>' +
         '<div class="img-note">🖼️ Bild folgt</div>';
}

/* ---------- Seiten gruppieren: neue Seite nur bei Positionswechsel ---------- */
function groupsOf(p) {
  const gs = [];
  for (const s of p.steps) {
    const last = gs[gs.length - 1];
    if (last && last.steps[last.steps.length - 1].pose === s.pose) {
      last.steps.push(s);
    } else {
      gs.push({ pose: s.pose, steps: [s] });
    }
  }
  return gs;
}

function groupHtml(g) {
  const first = g.steps[0];
  const blocks = g.steps.map(s =>
    '<section class="text-card">' +
      '<h2>' + s.title + '</h2>' +
      (s.intro || s.introWomen ? '<p class="intro">' + introOf(s) + '</p>' : '') +
      (s.say ? '<div class="say">💭 ' + s.say + '</div>' : '') +
      (s.arabic && showBool('gb-show-arabic') ? '<div class="arabic" dir="rtl" lang="ar">' + lines(s.arabic) + '</div>' : '') +
      (s.translit && showBool('gb-show-translit') ? '<p class="translit">' + lines(s.translit) + '</p>' : '') +
      (s.translation && showBool('gb-show-german') ? '<p class="translation">' + lines(s.translation) + '</p>' : '') +
      chipsOf(s) +
    '</section>' +
    ((s.arabic || s.translit)
      ? '<section class="audio-card">' +
          '<div class="audio-title">' + (s.wbw ? '🎧 Wort für Wort anhören' : '🎧 Audio zum Nachsprechen') + '</div>' +
          audioBlock(s) +
        '</section>'
      : '')
  );
  return '<section class="step-main">' +
    '<section class="pose-card">' +
      '<span class="pose-label">' + POSE_LABELS[first.pose] + '</span>' +
      poseBlock(first) +
    '</section>' +
    blocks.join('<div class="flow-divider">↓</div>') +
  '</section>';
}

/* ---------- Audio-Wiedergabe ---------- */
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];

function getSetting(key, def) {
  const v = localStorage.getItem(key);
  if (v === null || v === '') return def;
  const n = parseFloat(v);
  return isNaN(n) ? def : n;
}
function setSetting(key, val) { localStorage.setItem(key, String(val)); }

function speedBarHtml(storageKey, active) {
  return '<div class="speed-bar" data-key="' + storageKey + '">' +
    '<span class="speed-label">Geschwindigkeit</span>' +
    SPEEDS.map(sp =>
      '<button type="button" class="speed-btn' + (Math.abs(sp - active) < 0.001 ? ' active' : '') + '" data-speed="' + sp + '">' + sp + '×</button>'
    ).join('') +
    '</div>';
}

function fullAudioHtml(label, file) {
  const key = 'gb-speed-audio-' + file;
  const speed = getSetting(key, 1);
  return '<div class="audio-real" data-file="' + file + '">' +
    (label ? '<div class="audio-label">' + label + '</div>' : '') +
    '<button type="button" class="phrase-play">▶ Anhören</button>' +
    (showBool('gb-show-advanced-audio') ? speedBarHtml(key, speed) : '') +
    '</div>';
}

/* Tap-to-Play-Wiedergabe für vollständige Phrasen */
const phraseAudio = new Audio();
let phraseFile = null;

function updatePhraseButton(file, playing, error) {
  document.querySelectorAll('.audio-real[data-file="' + file + '"] .phrase-play').forEach(b => {
    b.classList.toggle('playing', playing && !error);
    b.textContent = error ? '⚠️ Nicht abspielbar' : (playing ? '⏸ Stopp' : '▶ Anhören');
  });
}

function stopPhrase() {
  if (phraseFile) { updatePhraseButton(phraseFile, false, false); phraseFile = null; }
  try { phraseAudio.pause(); } catch (e) {}
}

function playPhrase(file) {
  if (phraseFile === file && !phraseAudio.paused && !phraseAudio.ended) { stopPhrase(); return; }
  stopPhrase();
  phraseFile = file;
  phraseAudio.src = file;
  phraseAudio.playbackRate = getSetting('gb-speed-audio-' + file, 1);
  phraseAudio.onended = () => { updatePhraseButton(file, false, false); phraseFile = null; };
  phraseAudio.onerror = () => { updatePhraseButton(file, false, true); setTimeout(() => updatePhraseButton(file, false, false), 1500); phraseFile = null; };
  phraseAudio.play().then(() => {
    updatePhraseButton(file, true, false);
  }).catch(() => {
    updatePhraseButton(file, false, true);
    setTimeout(() => updatePhraseButton(file, false, false), 1500);
    phraseFile = null;
  });
}

function audioBlock(s) {
  if (s.wbw) return wbwPlayerHtml(s.wbw);
  if (s.audios && s.audios.length) return s.audios.map(a => fullAudioHtml(a.label, a.file)).join('');
  if (s.audio) return fullAudioHtml('', s.audio);
  return '<div class="audio-placeholder">' +
    '<span class="a-icon">🎧</span>' +
    '<span><strong>Audio folgt</strong><small>Hier kannst du später die Rezitation (z. B. eines Koranrezitators) zum Nachsprechen einfügen.</small></span>' +
    '</div>';
}

/* ---------- Wort-für-Wort-Player ---------- */
function wbwPlayerHtml(key) {
  const w = WBW[key];
  const speedKey = 'gb-speed-wbw-' + key;
  const repeatKey = 'gb-repeat-wbw-' + key;
  const speed = getSetting(speedKey, 1);
  const repeat = Math.round(getSetting(repeatKey, 1));

  const ayahs = w.ayahs.map((words, ai) =>
    '<div class="wbw-ayah">' +
      '<div class="wbw-words">' +
        words.map((wd, wi) =>
          '<button type="button" class="wbw-word" data-ayah="' + ai + '" data-word="' + wi + '">' + wd + '</button>'
        ).join('') +
      '</div>' +
    '</div>'
  ).join('');

  return '<div class="wbw" data-key="' + key + '">' +
    (w.bismillah ? '<div class="wbw-bismillah" dir="rtl" lang="ar">بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ</div>' : '') +
    (showBool('gb-show-advanced-audio')
      ? '<div class="wbw-controls">' +
          speedBarHtml(speedKey, speed) +
          '<div class="repeat-bar">' +
            '<span class="speed-label">Wiederholung pro Wort</span>' +
            [1, 2, 3].map(r =>
              '<button type="button" class="repeat-btn' + (r === repeat ? ' active' : '') + '" data-repeat="' + r + '">' + r + '×</button>'
            ).join('') +
          '</div>' +
        '</div>'
      : '') +
    '<div class="wbw-ayahs">' + ayahs + '</div>' +
    '<div class="wbw-hint">Tippe ein Wort an, um es einzeln zu hören.</div>' +
    '</div>';
}

const wbwEngine = { key: null, queue: [], pos: 0, audio: null, speed: 1, repeat: 2, playing: false };

function wbwSrc(key, ai, wi) {
  const w = WBW[key];
  const pad = n => String(n).padStart(3, '0');
  return 'audio/wbw/' + pad(w.surah) + '_' + pad(ai + 1) + '_' + pad(wi + 1) + '.mp3';
}

function stopWbw() {
  const e = wbwEngine;
  e.playing = false;
  if (e.audio) { e.audio.pause(); e.audio = null; }
  document.querySelectorAll('.wbw-word.playing').forEach(el => el.classList.remove('playing'));
}

function markWbwWord(ai, wi) {
  document.querySelectorAll('.wbw-word.playing').forEach(el => el.classList.remove('playing'));
  const word = document.querySelector('.wbw-word[data-ayah="' + ai + '"][data-word="' + wi + '"]');
  if (word) word.classList.add('playing');
}

function startWbw(key, queue) {
  stopWbw();
  wbwEngine.key = key;
  wbwEngine.queue = queue;
  wbwEngine.pos = 0;
  wbwEngine.playing = true;
  nextWbwWord();
}

function nextWbwWord() {
  const e = wbwEngine;
  if (!e.playing || e.pos >= e.queue.length) { stopWbw(); return; }
  const item = e.queue[e.pos++];
  markWbwWord(item.ai, item.wi);
  const a = new Audio(wbwSrc(e.key, item.ai, item.wi));
  a.playbackRate = e.speed;
  e.audio = a;
  a.onended = () => nextWbwWord();
  a.onerror = () => {
    const el = document.querySelector('.wbw-word[data-ayah="' + item.ai + '"][data-word="' + item.wi + '"]');
    if (el) { el.classList.add('unavailable'); setTimeout(() => el.classList.remove('unavailable'), 1200); }
    nextWbwWord();
  };
  a.play().catch(() => nextWbwWord());
}

function bindAudioControls() {
  // Geschwindigkeit (Phrasen + Wort-für-Wort)
  document.querySelectorAll('.speed-bar[data-key]').forEach(bar => {
    const key = bar.dataset.key;
    bar.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sp = parseFloat(btn.dataset.speed);
        setSetting(key, sp);
        bar.querySelectorAll('.speed-btn').forEach(b => b.classList.toggle('active', b === btn));
        if (key.indexOf('gb-speed-wbw-') === 0) {
          wbwEngine.speed = sp;
          if (wbwEngine.audio) wbwEngine.audio.playbackRate = sp;
        } else {
          const real = bar.closest('.audio-real');
          const file = real ? real.dataset.file : null;
          if (file && phraseFile === file) phraseAudio.playbackRate = sp;
        }
      });
    });
  });

  // Tap-to-Play für vollständige Phrasen
  document.querySelectorAll('.phrase-play').forEach(btn => {
    btn.addEventListener('click', () => {
      playPhrase(btn.closest('.audio-real').dataset.file);
    });
  });

  // Wort-für-Wort: Wiederholung pro Wort
  document.querySelectorAll('.repeat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const root = btn.closest('.wbw');
      const key = root.dataset.key;
      const r = parseInt(btn.dataset.repeat, 10);
      setSetting('gb-repeat-wbw-' + key, r);
      wbwEngine.repeat = r;
      root.querySelectorAll('.repeat-btn').forEach(b => b.classList.toggle('active', b === btn));
    });
  });

  // Wort-für-Wort: einzelnes Wort abspielen (mit eingestellter Wiederholung)
  document.querySelectorAll('.wbw-word').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.closest('.wbw').dataset.key;
      wbwEngine.speed = getSetting('gb-speed-wbw-' + key, 1);
      const repeat = Math.max(1, Math.round(getSetting('gb-repeat-wbw-' + key, 1)));
      const ai = parseInt(el.dataset.ayah, 10);
      const wi = parseInt(el.dataset.word, 10);
      const queue = [];
      for (let r = 0; r < repeat; r++) queue.push({ ai, wi });
      startWbw(key, queue);
    });
  });
}

function endCardHtml(p) {
  return '<section class="end-card">' +
    '<div class="end-emoji">🤲</div>' +
    '<h2>Das Gebet ist beendet</h2>' +
    '<p>MāschāʾAllāh – möge Allah dein ' + p.subtitle + ' annehmen.</p>' +
    '<button class="btn btn-primary" id="btn-restart">🔁 Nochmal beten</button>' +
    '<button class="btn btn-ghost" id="btn-home">🏠 Zur Startseite</button>' +
  '</section>';
}

function navHtml(p, total) {
  const isLast = state.step === total - 2;
  return '<footer class="nav">' +
    (state.step > 0
      ? '<button class="btn btn-ghost" id="btn-prev">← Zurück</button>'
      : '<span class="spacer"></span>') +
    '<div class="counter">Schritt ' + (state.step + 1) + ' von ' + total + '</div>' +
    '<button class="btn btn-primary" id="btn-next">' + (isLast ? 'Fertig ✓' : 'Weiter →') + '</button>' +
  '</footer>';
}

/* ---------- Navigation ---------- */
function nextStep() {
  const p = prayer();
  if (state.step < groupsOf(p).length - 1) { state.step++; render(); }
}
function prevStep() {
  if (state.step > 0) { state.step--; render(); }
}
function goHome() { state.view = 'home'; state.prayerId = null; state.step = 0; render(); }

function bindThemeToggle() {
  app.querySelectorAll('.theme-toggle button').forEach(b => {
    b.addEventListener('click', () => {
      state.theme = b.dataset.theme;
      render();
    });
  });
}

/* ---------- Einstellungen ---------- */
function showBool(key) { return localStorage.getItem(key) !== '0'; }
function setShow(key, val) { localStorage.setItem(key, val ? '1' : '0'); }

const SETTING_KEYS = ['gb-show-arabic', 'gb-show-translit', 'gb-show-german', 'gb-show-advanced-audio'];

function allSettingsOn() {
  return SETTING_KEYS.every(k => showBool(k));
}

function settingsHtml() {
  const textRows = [
    { key: 'gb-show-arabic', label: 'Arabischer Text' },
    { key: 'gb-show-translit', label: 'Umschrift (Umlautschrift)' },
    { key: 'gb-show-german', label: 'Deutsche Übersetzung' }
  ].map(it =>
    '<label class="setting-row">' +
      '<span>' + it.label + '</span>' +
      '<input type="checkbox" class="setting-check" data-key="' + it.key + '"' + (showBool(it.key) ? ' checked' : '') + '>' +
      '<span class="switch"></span>' +
    '</label>'
  ).join('');

  return '<div class="settings-backdrop" id="settings-backdrop">' +
    '<div class="settings-panel">' +
      '<div class="settings-head">' +
        '<h2>Einstellungen</h2>' +
        '<button class="icon-btn" id="settings-close" aria-label="Schließen">✕</button>' +
      '</div>' +
      '<div class="settings-group">Anzeige</div>' +
      textRows +
      '<div class="settings-group">Audio</div>' +
      '<label class="setting-row">' +
        '<span>Erweiterte Audio-Optionen<span class="setting-sub">Geschwindigkeit & Wiederholung pro Wort</span></span>' +
        '<input type="checkbox" class="setting-check" data-key="gb-show-advanced-audio"' + (showBool('gb-show-advanced-audio') ? ' checked' : '') + '>' +
        '<span class="switch"></span>' +
      '</label>' +
      '<button class="btn btn-ghost settings-all" id="settings-all">' + (allSettingsOn() ? 'Alle abwählen' : 'Alle auswählen') + '</button>' +
    '</div>' +
  '</div>';
}

function openSettings() {
  closeSettings();
  const overlay = document.createElement('div');
  overlay.id = 'settings-overlay';
  overlay.innerHTML = settingsHtml();
  document.body.appendChild(overlay);

  document.getElementById('settings-close').addEventListener('click', closeSettings);
  document.getElementById('settings-backdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSettings();
  });
  document.querySelectorAll('#settings-overlay .setting-check').forEach(cb => {
    cb.addEventListener('change', () => {
      setShow(cb.dataset.key, cb.checked);
      render();
      const all = document.getElementById('settings-all');
      if (all) all.textContent = allSettingsOn() ? 'Alle abwählen' : 'Alle auswählen';
    });
  });
  document.getElementById('settings-all').addEventListener('click', () => {
    const target = !allSettingsOn();
    SETTING_KEYS.forEach(k => setShow(k, target));
    render();
    openSettings();
  });
}

function closeSettings() {
  const o = document.getElementById('settings-overlay');
  if (o) o.remove();
}

/* ---------- Tastatur ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('settings-overlay')) { closeSettings(); return; }
    if (state.view === 'prayer') goHome();
    return;
  }
  if (state.view !== 'prayer') return;
  if (e.key === 'ArrowRight') nextStep();
  if (e.key === 'ArrowLeft') prevStep();
});

/* ---------- PWA ---------- */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstall = e;
  if (state.view === 'home') render();
});

function registerSW() {
  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

/* ---------- Start ---------- */
applyTheme();
render();
registerSW();
