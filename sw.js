var CACHE = "kanakku-v1";
var ASSETS = ["./kanakku.html", "./manifest.webmanifest",
              "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE)
      .then(function(c){ return Promise.all(ASSETS.map(function(a){
        return c.add(a).catch(function(){}); })); })
      .then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys()
      .then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== CACHE; })
        .map(function(k){ return caches["delete"](k); })); })
      .then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  if(new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit){
        fetch(e.request).then(function(fresh){
          if(fresh && fresh.ok) caches.open(CACHE).then(function(c){ c.put(e.request, fresh); });
        }).catch(function(){});
        return hit;
      }
      return fetch(e.request).then(function(resp){
        if(resp && resp.ok){
          var copy = resp.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return resp;
      }).catch(function(){ return caches.match("./kanakku.html"); });
    })
  );
});
