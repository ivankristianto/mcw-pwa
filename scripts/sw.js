self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

const workboxSW = new WorkboxSW();

workboxSW.router.registerRoute(/wp-admin(.*)|(.*)preview=true(.*)/,
    workboxSW.strategies.networkOnly()
);

// Cache for static assets. We check using a cache first strategy
workboxSW.router.registerRoute(/\.(?:css|js)$/,
workboxSW.strategies.cacheFirst({
cacheName: 'static-cache',
cacheExpiration: {
        maxEntries: 50
        }
    })
);

// We want no more than 50 images in the cache. We check using a cache first strategy
workboxSW.router.registerRoute(/\.(?:png|gif|jpg)$/,
    workboxSW.strategies.cacheFirst({
    cacheName: 'images-cache',
    cacheExpiration: {
            maxEntries: 50
        }
    })
);

// We need cache fonts if any
workboxSW.router.registerRoute(/(.*)\.(?:woff|eot|woff2|ttf|svg)$/,
    workboxSW.strategies.cacheFirst({
    cacheName: 'fonts-cache',
    cacheExpiration: {
            maxEntries: 20
        },
    cacheableResponse: {
        statuses: [0, 200]
        }
    })
);

workboxSW.router.registerRoute(/https:\/\/fonts.googleapis.com\/(.*)/,
workboxSW.strategies.cacheFirst({
  cacheName: 'fonts-cache',
    cacheExpiration: {
        maxEntries: 20
    },
    cacheableResponse: {statuses: [0, 200]}
    })
);

