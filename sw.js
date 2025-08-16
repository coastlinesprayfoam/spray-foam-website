// Enhanced Service Worker for Coastline Spray Foam - Performance Optimized
// Provides advanced caching strategies and performance improvements

const CACHE_VERSION = '2.1';
const CACHE_NAME = `coastline-static-v${CACHE_VERSION}`;

// Resources to cache during install
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/about/',
  '/services/',
  '/contact/',
  '/assets/css/critical.css',
  '/assets/css/style.css',
  '/assets/js/gallery.js'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache:', CACHE_NAME);
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(function(err) {
        console.error('Cache install failed', err);
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) return response;
        return fetch(event.request).catch(() => {
          // Fallback to offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
