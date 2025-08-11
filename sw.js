const CACHE_NAME = 'islamic-solo-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (ev)=>{
  ev.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (ev)=>{
  ev.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (ev)=>{
  ev.respondWith(
    caches.match(ev.request).then(cached => cached || fetch(ev.request).catch(()=>{
      if(ev.request.mode === 'navigate') return caches.match('./index.html');
    }))
  );
});
