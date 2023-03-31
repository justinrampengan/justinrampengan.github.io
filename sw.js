const CACHE_NAME = 'portofolio'
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.addAll([
            '/',
            '/index.html',
            '/about.html',
            '/blog.html',
            '/contact.html',
            '/portofolio-example01.html',
            '/style.css',
            'sw.js',
            'src/js/app.js',
            '/images/*',
          ])
        })
    );
    return self.clients.claim();
  });
  
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(res) {
          if (res) 
            return res;
          return fetch(event.request)
            .then(function (res) {
              if (!res || res.status !== 200 || res.type !== 'basic') {
                return res;
              }
              const responseToCache = res.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return res;
            });
        })
    );
  });