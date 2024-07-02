const CACHE_NAME = 'app';

const urlsToCache = [
  '/',
  '../infra/connection-factory.js',
  '../user/user.model.js',
  '../user/user.dao.js',
  '../note/note.dao.js',
  '../note/note.model.js',
  '../note/note.view.js',
  '../note/note.controller.js',
  '../auth/auth.view.js',
  '../auth/auth.controller.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Saving URLs in Cache');
        return cache.addAll(urlsToCache);
      }).then(self.skipWaiting())
  );
});

/** Intercpeting any fetch request and verifying if the requested resource is present in the cache  */
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
