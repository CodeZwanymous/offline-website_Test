const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = 'index.html';
const ASSETS = [
    '/',
    'index.html',
    'styles.css',
    'script.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(ASSETS))
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME)
          .then(cache => cache.match(OFFLINE_URL));
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
    );
  }
});