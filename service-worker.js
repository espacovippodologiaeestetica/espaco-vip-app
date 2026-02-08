/* service-worker.js */
const VERSION = "20260208-1";
const CACHE_NAME = espaco-vip-${VERSION};

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// instala e já ativa
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
});

// limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
      await self.clients.claim();
    })()
  );
});

/**
 * Estratégia:
 * - Para app.js e index.html: NETWORK FIRST (sempre tenta pegar novo)
 * - Para o resto: CACHE FIRST (rápido)
 */
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // só controla o próprio domínio
  if (url.origin !== self.location.origin) return;

  const isCritical =
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/index.html") ||
    url.pathname === "/" ||
    url.pathname.endsWith("/");

  if (isCritical) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(cacheFirst(req));
  }
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const fresh = await fetch(req, { cache: "no-store" });
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached || new Response("Offline", { status: 503 });
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const fresh = await fetch(req);
    cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    return new Response("Offline", { status: 503 });
  }
}
