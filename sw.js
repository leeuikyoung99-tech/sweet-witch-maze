/* 과자 마녀의 미로 — 한 번 받은 파일은 휴대폰에 저장해 두고 인터넷 없이도 열어요 */
const C='sweet-witch-v25';
const FILES=["apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "index.html", "manifest.webmanifest", "models/anim.glb", "models/hero.glb", "music/design.mp3", "music/game.mp3", "music/title.mp3", "vendor/GLTFLoader.js", "vendor/peerjs.min.js", "vendor/three.min.js"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./',...FILES])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res})))});
