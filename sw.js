// Dark Lanterns offline (2026-10-24): lets the home-screen app open and play with no signal.
// Pages (and the manifests) come from the network first, so a new publish shows straight away, and from the cache when
// offline. Everything else (the hashed build files, pictures, fonts, icons) never changes under its name, so it comes
// from the cache first and is stored the first time it's fetched.
const PAGES = 'dl-pages-v1', FILES = 'dl-files-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
    e.waitUntil((async () => {
        for (const k of await caches.keys()) if (k !== PAGES && k !== FILES) await caches.delete(k);
        await self.clients.claim();
    })());
});

// on the first visit the page loads before this worker takes over, so it sends itself and the files it already loaded
// to be kept
self.addEventListener('message', (e) => {
    const urls = (e.data?.keep ?? []).filter((u) => new URL(u).origin === self.location.origin && !/\.(html|webmanifest)$/.test(new URL(u).pathname));
    const page = e.data?.page;
    e.waitUntil(Promise.all([
        caches.open(FILES).then((c) => Promise.all(urls.map((u) => c.match(u).then((hit) => hit ?? c.add(u).catch(() => undefined))))),
        page && new URL(page).origin === self.location.origin ? caches.open(PAGES).then((c) => c.add(page).catch(() => undefined)) : null,
    ]));
});

self.addEventListener('fetch', (e) => {
    const req = e.request, url = new URL(req.url);
    if (req.method !== 'GET' || url.origin !== self.location.origin) return;
    const page = req.mode === 'navigate' || url.pathname.endsWith('/') || /\.(html|webmanifest)$/.test(url.pathname);
    e.respondWith(page ? networkFirst(req) : cacheFirst(req));
});

async function networkFirst(req) {
    const cache = await caches.open(PAGES);
    try {
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
    } catch {
        return (await cache.match(req, { ignoreSearch: true })) ?? Response.error();
    }
}

async function cacheFirst(req) {
    const cache = await caches.open(FILES), hit = await cache.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
}
