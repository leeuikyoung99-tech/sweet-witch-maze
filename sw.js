/* 과자 마녀의 미로 — 한 번 받은 파일은 휴대폰에 저장해 두고 인터넷 없이도 열어요.
   게임 화면·아이콘·이름표는 인터넷에서 새것을 먼저 받아요 (업데이트가 바로 보이게). 큰 파일만 저장본을 먼저 써요. */
const C='sweet-witch-v35';
const FILES=["apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "index.html", "manifest.webmanifest", "models/anim.glb", "models/hero.glb", "music/design.mp3", "music/game.mp3", "music/title.mp3", "vendor/GLTFLoader.js", "vendor/peerjs.min.js", "vendor/three.min.js"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./',...FILES].map(f=>new Request(f,{cache:'reload'})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const fresh=p=>p.endsWith('/')||/\.(html|webmanifest|png|js)$/.test(p)&&!p.includes('/vendor/');
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const save=res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res};
  if(fresh(u.pathname)){e.respondWith(fetch(e.request,{cache:'no-cache'}).then(save).catch(()=>caches.match(e.request,{ignoreSearch:true})));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(save)))});
