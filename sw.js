const CACHE_NAME = 'voice-reverser-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css', // si séparé
  './script.js', // si séparé
  './image/fond-grunge.png',
  './image/bouton-rec.png',
  './image/bouton-play.png',
  './image/cadre-magneto.png',
  './image/micro-vintage.png',
  './image/glitch-overlay.png',
  './image/bande-loop.gif',
  'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k)))
    )
  );
});
