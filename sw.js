// Enhanced Service Worker for Coastline Spray Foam - Performance Optimized
// Provides advanced caching strategies and performance improvements

const CACHE_VERSION = '2.1';
const STATIC_CACHE = `coastline-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `coastline-dynamic-v${CACHE_VERSION}`;
const IMAGE_CACHE = `coastline-images-v${CACHE_VERSION}`;

// Critical resources for immediate caching
const CRITICAL_URLS = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/assets/css/critical.css',
  '/assets/css/style.css',
  '/assets/js/gallery.js'
];

// Static resources
const STATIC_URLS = [
  '/gallery',
  '/blog',
  '/service-areas',
  '/privacy-policy',
  '/terms-of-service',
  '/warranty',
  '/sitemap.xml',
  '/site.webmanifest',
  '/robots.txt'
];

// External resources
const EXTERNAL_URLS = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /\/assets\/images\/.+\.(jpg|jpeg|png|webp|gif|svg)$/,
  /\.(?:jpg|jpeg|png|webp|gif|svg)$/
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
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
