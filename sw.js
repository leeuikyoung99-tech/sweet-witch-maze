// 웹 게임을 내렸어요. 예전에 깔린 서비스 워커를 지우고 안내 페이지로 다시 열어요.
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil((async function(){
  try{var ks=await caches.keys();await Promise.all(ks.filter(function(k){return /^sweet-witch-v/.test(k)}).map(function(k){return caches.delete(k)}))}catch(_){}
  try{await self.registration.unregister()}catch(_){}
  try{var cs=await self.clients.matchAll({type:'window'});cs.forEach(function(c){try{c.navigate(c.url)}catch(_){}})}catch(_){}
})())});
