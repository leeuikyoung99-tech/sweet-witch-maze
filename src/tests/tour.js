(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const o=[];const vis=()=>[...document.querySelectorAll('.scr')].filter(s=>!s.hidden).map(s=>s.id).join(',');
const clk=async id=>{const b=$(id);if(!b){o.push('no '+id);return}b.click();await w(700);o.push(id+'→'+vis());const bk=[...document.querySelectorAll('.scr:not([hidden]) button')].find(x=>/뒤로|닫기|✕|×/.test(x.textContent)||/Back|bRoleBack|X$/.test(x.id));try{titleScreen()}catch(e){o.push('ts err '+e)}await w(300)};
for(const id of ['bAI','bStage','bRandT','bOnline','bShop','bDeck','bPass','bMis','bAugDex','bProf','tRank','bSnd'])await clk(id);
try{ROLECTX='ai';showRole('main');await w(400);o.push('tabs:'+[...$('roleTabs').children].map(b=>b.dataset.t+':'+b.textContent).join('/'))}catch(e){o.push('role err '+e)}
return o.join('\n')})()
