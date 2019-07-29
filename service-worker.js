var filesToCache = [
  '.',
  '/',
  'index.html',
  'manifest.json',
  'service-worker.js',
  'javascript/chui-3.9.2.min.js',
  'javascript/jquery-2.2.0.min.js',
  'styles/chui-ios-3.9.2.min.css',
  'styles/reset.css',
  'styles/styles.css',
  'bilder/back_32.png',
  'bilder/minus_32.png',
  'bilder/next_32.png',
  'bilder/plus_32.png',
  'bilder/time_57.png',
  'bilder/time_72.png',
  'bilder/time_114.png',
  'bilder/time_120.png',
  'bilder/time_180.png',
  'bilder/time_144.png',
  'text/beidou.txt',
  'text/galileo.txt',
  'text/glonass.txt',
  'text/gps.txt',
  'text/local.txt',
  'text/mjd.txt',
  'text/stt1.txt',
  'text/stt2.txt',
  'text/utc.txt'
];

	latestCacheName = 'App-Shell-v1';
	self.addEventListener('install', function (event) {
	  event.waitUntil(
		caches.open(latestCacheName)
		  .then(function (cache) {
			return cache.addAll(filesToCache)
			.then(() => self.skipWaiting());
		  })
	  );
	});

	self.addEventListener('activate', event => {
	  event.waitUntil(
		caches.keys().then(allCaches => {
			allCaches.forEach(cache => {
			  if (cache !== latestCacheName) {
				  caches.delete(cache);
			  }
			})
		})
	  );
	});

	self.addEventListener('fetch', function (event) {
	  event.respondWith(
		caches.match(event.request)
		.then(function (response) {
		  if (response) {
			return response;
		  } else {
			return fetch(event.request);
		  }
		})
	  );
   });

