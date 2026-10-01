/* Service Worker – Offline-Cache für die Gebets-App */
const CACHE = 'mein-gebet-v4';
const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(async cache => {
      await cache.addAll(SHELL);
      // Alle Audios & Bilder vorab cachen (Liste aus media.json)
      try {
        const res = await fetch('./media.json', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const files = (data && data.files) || [];
          await Promise.all(files.map(f => cache.add(f).catch(() => {})));
        }
      } catch (err) { /* media.json nicht verfügbar → nur App-Shell cachen */ }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        // Nur vollständige Antworten cachen (keine Range-/Teilantworten)
        if (res.ok && !e.request.headers.has('range')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => {
        // Offline: Navigation → App-Shell, sonst Fehler
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 503, statusText: 'offline' });
      });
    })
  );
});
