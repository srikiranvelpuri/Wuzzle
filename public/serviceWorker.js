let CACHE_NAME = 'wuzzle'
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'assets/icons/favicon.ico',
  'static/js/main.cfbdf8de.js',
  'static/css/main.8d8e76a6.css',
]

self.addEventListener('install', (e) => {
  // console.log('installed');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache)
    })
  )
})
self.addEventListener('activate', (e) => {
  // console.log('activated')
  e.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            caches.delete(key)
          })
      )
    })
  )
})
self.addEventListener('fetch', (event) => {
  // console.log(event)
  event.respondWith(
    caches
      .match(event.request)
      .then((res) => {
        return res || fetch(event.request).catch(() => caches.match('/error'))
      })
      .catch(() => {
        caches.match('/error')
      })
  )
})
