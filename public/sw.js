// Service worker: offline reading and the optional daily study reminder.
// Pages: network first, falling back to the cached copy. Assets: cached copy first, refreshed in the background.
const CACHE = 'easy-review-v2';
const scope = new URL(self.registration.scope);
const isAsset = (url) => /\.(js|css|woff2?|webp|png|svg|ico|json|webmanifest)$/.test(url.pathname);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  event.respondWith(isAsset(url) ? staleWhileRevalidate(request, event) : networkFirst(request));
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) ?? (await cache.match(scope.pathname)) ?? Response.error();
  }
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const fresh = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });
  if (cached) {
    event.waitUntil(fresh.catch(() => undefined));
    return cached;
  }
  return fresh;
}

// Fired by Periodic Background Sync (installed app, Chromium) once a day when the reminder is on.
self.addEventListener('periodicsync', (event) => {
  if (event.tag !== 'study-reminder') return;
  event.waitUntil(
    self.registration.showNotification('Time for a quick review', {
      body: 'A few flashcards a day keep the exam close. Pick up where you left off.',
      icon: `${scope.pathname}icons/icon-192.png`,
      badge: `${scope.pathname}icons/icon-192.png`,
      tag: 'study-reminder',
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((windows) => {
      const open = windows.find((w) => w.url.startsWith(scope.href));
      return open ? open.focus() : self.clients.openWindow(scope.href);
    }),
  );
});
