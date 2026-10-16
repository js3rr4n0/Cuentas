/* Cuentas Claras — caché para abrir al instante y funcionar sin internet */
var VERSION = '4d9de5ef82';
var CORE = 'cc-core-' + VERSION, RUNTIME = 'cc-runtime-v1';
var ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'fonts/archivo.woff2', 'fonts/spline-mono.woff2', 'icons/icon-192.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CORE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('cc-core-') === 0 && k !== CORE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function isPage(req) { return req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(req.url).pathname); }
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin === location.origin && isPage(req)) {
    /* La página sale de la caché al instante; en segundo plano se busca la versión nueva */
    e.respondWith(caches.open(CORE).then(function (c) {
      return c.match('index.html').then(function (hit) {
        var net = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            Promise.all([copy.text(), hit ? hit.clone().text() : Promise.resolve('')]).then(function (t) {
              if (t[0] && t[0] !== t[1]) {
                c.put('index.html', new Response(t[0], { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
                if (hit) self.clients.matchAll().then(function (cl) { cl.forEach(function (x) { x.postMessage({ type: 'cc-update' }); }); });
              }
            });
          }
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      });
    }));
    return;
  }
  if (url.origin === location.origin || url.hostname === 'cdn.jsdelivr.net') {
    /* Fuentes, íconos y el lector de facturas: de la caché si ya están */
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) { var copy = res.clone(); caches.open(url.origin === location.origin ? CORE : RUNTIME).then(function (c) { c.put(req, copy); }); }
        return res;
      });
    }));
  }
});
