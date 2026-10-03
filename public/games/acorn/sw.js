// Offline cache: app shell is precached, three.js (CDN) is cached on first successful load.
const VER = 'acorn-gp-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './vendor/three.min.js'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VER).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VER).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const isThree = /three(\.min)?\.js/.test(url.pathname);
  if (!sameOrigin && !isThree) return;
  if (req.mode === 'navigate' || (sameOrigin && url.pathname.endsWith('index.html'))) {
    // network first so updates arrive, cache as fallback
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(VER).then((c) => c.put('./index.html', cp)); return r; })
      .catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r && (r.ok || r.type === 'opaque')) { const cp = r.clone(); caches.open(VER).then((c) => c.put(req, cp)); }
    return r;
  })));
});
