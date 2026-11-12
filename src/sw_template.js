/* 오프라인 저장 — 한 번 받은 파일은 휴대폰에 저장해 두고 인터넷 없이도 열어요.
   게임 화면·아이콘·이름표는 인터넷에서 새것을 먼저 받아요 (업데이트가 바로 보이게). 큰 파일만 저장본을 먼저 써요. */
const PFX='__PFX__',C=PFX+'__PATCH__';
const FILES=__FILES__;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(['./',...FILES].map(f=>c.add(new Request(f,{cache:'reload'})).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PFX)&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const fresh=p=>p.endsWith('/')||/\.(html|webmanifest|png|js)$/.test(p)&&!p.includes('/vendor/');
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const save=res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res};
  if(fresh(u.pathname)){e.respondWith(fetch(e.request,{cache:'no-cache'}).then(save).catch(()=>caches.match(e.request,{ignoreSearch:true})));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(save)))});
