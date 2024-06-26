const cacheName = 'v1';

// Install service worker
self.addEventListener('install', () => {
  console.log('service worker: Installed');
});

// Activate service worker
self.addEventListener('activate', e => {
  console.log('service worker: Activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('service worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call fetch event
self.addEventListener('fetch', e => {
  console.log('service worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone the response
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName).then(cache => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
