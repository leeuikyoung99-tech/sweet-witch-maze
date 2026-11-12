/* ================= 새 카드: 초코 벽 · 회오리 사탕 ================= */
const CHOCO_T=12;
// 그 홈에 가로/세로 중 도둑을 더 멀리 돌게 하는 쪽으로 세워요 (도둑 근처·길 완전히 막기는 안 돼요)
function chocoBest(gx,gz){const h=G.hero,[hx,hz]=cellOf(h.x,h.z),hc=[[hx,hz]];if(G.decoy)hc.push(cellOf(G.decoy.x,G.decoy.z));let best=null,bs=-1,r='block';
  for(const o of['H','V']){if(wallDist(h.x,h.z,o,gx,gz)<WALL_NEAR){r='near';continue}const q=tryWall(o,gx,gz,null,hc);if(q!=='ok'){if(r!=='near')r=q;continue}
    B.walls.push({o,x:gx,z:gz});rebuildEdges();const L=exitField()[idx(hx,hz)];B.walls.pop();rebuildEdges();if(L>bs){bs=L;best=o}}
  return{o:best,r,L:bs}}
let CHOCOM=null;function chocoMat(){if(CHOCOM)return CHOCOM;const f=keepM(new THREE.MeshLambertMaterial({map:keepTex(wallTex({style:'chocobar',face:['#8a5030','#5e3220'],frame:'#3a1d10',rim:'#a8693d'},512,270,6,2))}));
  const s=keepM(new THREE.MeshLambertMaterial({color:'#5e3220'})),t=keepM(new THREE.MeshLambertMaterial({color:'#c98d5f'}));CHOCOM=[s,s,t,s,f,f];return CHOCOM}
function placeChoco(x,z){if(B.walls.filter(w=>w.temp).length>=2)return 'cap';const gx=clamp(Math.round(x/C),1,N-1),gz=clamp(Math.round(z/C),1,N-1);const b=chocoBest(gx,gz);if(!b.o)return b.r;
  const w={o:b.o,x:gx,z:gz,temp:G.t+CHOCO_T,anim:{t:0,from:null}};B.walls.push(w);rebuildEdges();syncWallMeshes();SFX.crunch();netEv('choco');
  if(G.mode==='hero')say('🍫 초코 벽이 솟았어요!',true,1.3);else say('초코 벽을 세웠어요 · 20초',false,1.2);return 'ok'}
function updTemp(){let ch=false;for(let i=B.walls.length-1;i>=0;i--){const w=B.walls[i];if(w.temp&&G.t>=w.temp){B.walls.splice(i,1);ch=true;burstFx(w.x*C,w.z*C,'ginger')}}
  if(ch){rebuildEdges();syncWallMeshes();if(G.mode==='devil')rebuildPathLines();if(G.mode==='hero')say('초코 벽이 녹았어요',false,1,true)}}
// AI 마녀: 도둑이 갈 길 몇 칸 앞에 초코 벽
function chocoPlan(path){const h=G.hero,[hx,hz]=cellOf(h.x,h.z),base=exitField()[idx(hx,hz)];let best=null,bg=2;
  for(let j=2;j<Math.min(path.length-1,9);j++){const[x,z]=path[j],[a,b]=path[j+1],dx=a-x,dz=b-z;
    const gs=dz===1?[[x,z+1],[x+1,z+1]]:dz===-1?[[x,z],[x+1,z]]:dx===1?[[x+1,z],[x+1,z+1]]:[[x,z],[x,z+1]];
    for(const[gx,gz]of gs){if(gx<1||gz<1||gx>N-1||gz>N-1)continue;const r=chocoBest(gx,gz);if(r.o&&r.L-base>bg){bg=r.L-base;best=[gx*C,gz*C]}}}
  return best}
// 회오리 사탕: 보이는 도둑을 출구에서 3칸쯤 더 먼 칸으로 날려요 (몬스터 바로 옆은 피해서)
function doWhirl(){const h=G.hero;if(!(h.cloak<=0||h.reveal>0))return 'hidden';const[hx,hz]=cellOf(h.x,h.z),f=exitField(),base=f[idx(hx,hz)];
  const seen=new Map([[idx(hx,hz),0]]),q=[[hx,hz]];let best=null,bv=-1e9;
  for(let i=0;i<q.length;i++){const[x,z]=q[i],d=seen.get(idx(x,z));if(d>=6)continue;for(const[dx,dz]of DIRS){const a=x+dx,b=z+dz;if(!inM(a,b)||!canStep(x,z,dx,dz))continue;const j=idx(a,b);if(seen.has(j))continue;seen.set(j,d+1);q.push([a,b]);
    const v=f[j];if(v<0||v-base<2)continue;if(G.ents.some(e=>isMon(e)&&!e.dead&&Math.hypot(e.x-cx2x(a),e.z-cx2x(b))<5))continue;const sc=-Math.abs(v-base-3)*2-(d+1)*.1;if(sc>bv){bv=sc;best=[a,b]}}}
  if(!best)return 'nowhere';burstFx(h.x,h.z);h.x=cx2x(best[0]);h.z=cx2x(best[1]);h.slide=null;h.kx=h.kz=0;h.dashT=0;h.inv=Math.max(h.inv,.8);burstFx(h.x,h.z);
  G.stats.whirls=(G.stats.whirls||0)+1;SFX.magic();netEv('whirl');say(G.mode==='hero'?'🌪️ 회오리에 휩쓸려 뒤로 날아갔어요!':'회오리로 도둑을 날려 보냈어요',G.mode==='hero',1.6);return 'ok'}

/* ================= 덱 (마녀 카드 8장) ================= */
function aiDeck(){const rest=shuffle(CPOOL.filter(k=>!['skel','tower','move'].includes(k)));return['skel','tower','move',...rest.slice(0,5)]}
// 포도 슬라임·벽 밀기는 마녀의 기본 카드라 고르면 2장씩 들어가요 (8장 고르면 덱은 최대 10장)
const DOUBLE=['skel','move'];const withPairs=d=>d.concat(d.filter(k=>DOUBLE.includes(k)));
function matchDeck(){if(window.__deck)return withPairs(window.__deck);if(G.mode==='devil')return withPairs(SAVE.deck);return withPairs(NET.on?cleanDeck(NET.peerDeck):aiDeck())}
const CARD_DESC={skel:'도둑을 쫓아가 부딪혀요',tower:'보이는 도둑에게 사탕을 쏴요',move:'쿠키 벽 하나를 옆 홈으로 밀어요',fake:'먹으면 들키고 인간쿠키가 나와요',slip:'밟으면 미끄러져 밀려나요',rev:'밟으면 잠깐 방향이 거꾸로',trap:'밟으면 잠깐 꼼짝 못 해요',fog:'도둑의 지도를 5초 가려요',jelly:'밟으면 느려지는 끈적 껌',bell:'건드리면 딸랑! 위치가 들켜요',choco:'20초 동안 벽을 하나 더 세워요',whirl:'보이는 도둑을 3칸 뒤로 날려요'};

/* ================= 도둑 스킬 (대시 + 2개) ================= */
const SKB={decoy:'bDecoy',cloak:'bCloak',map:'bMapS',shield:'bShield'};
const SKN={decoy:['분신','몬스터가 분신을 쫓아가요',2],cloak:['망토','5초 동안 투명해져요',3],map:['지도 조각','주변 7×7 칸 벽이 지도에 보여요',2],shield:['사탕 방패','10초 안에 받는 공격을 한 번 막아요',2]};
function aiSkills(){if(window.__skills)return window.__skills.slice();return shuffle(['decoy','cloak','shield']).slice(0,2)}
function useSkill(k){if(k==='decoy')doDecoy();else if(k==='cloak')doCloak();else if(k==='map')doMapS();else if(k==='shield')doShield()}
function doMapS(ai){const h=G.hero;if(G.over||h.cdMap>0)return;if(h.mana<SK.map.cost){if(!ai)say('사탕이 모자라요 (2개 필요)',true,1.1);return}h.mana-=SK.map.cost;h.cdMap=SK.map.cd;h.skills++;
  const[cx,cz]=cellOf(h.x,h.z);for(let z=cz-3;z<=cz+3;z++)for(let x=cx-3;x<=cx+3;x++){if(x<0||z<0||x>=N||z>=N)continue;const i=idx(x,z);G.seen[i]=1;G.memE[i]=x<N-1?(B.E[i]?1:0):1;G.memS[i]=z<N-1?(B.S[i]?1:0):1}
  SFX.magic();if(G.mode==='hero'){say('🗺️ 주변 지도가 밝혀졌어요',false,1.3);$('bigmap').hidden=false;setTimeout(()=>{if(screen==='play')$('bigmap').hidden=true},1600)}}
function doShield(ai){const h=G.hero;if(G.over||h.cdShield>0||h.shield>0)return;if(h.mana<SK.shield.cost){if(!ai)say('사탕이 모자라요 (2개 필요)',true,1.1);return}h.mana-=SK.shield.cost;h.cdShield=SK.shield.cd;h.shield=SK.shield.dur;h.skills++;SFX.magic();if(G.mode==='hero')say('🛡️ 10초 동안 한 번 막아 줘요',false,1.3)}
function shieldBubble(h,on){if(!h.m)return;if(!h.bub){const m=new THREE.Mesh(new THREE.SphereGeometry(1.25,20,14),new THREE.MeshLambertMaterial({color:'#9fd8ff',emissive:new THREE.Color('#4a9be8'),emissiveIntensity:.35,transparent:true,opacity:.35,depthWrite:false}));m.position.y=1;h.m.g.add(m);h.bub=m}h.bub.visible=!!on;if(on)h.bub.scale.setScalar(1+Math.sin(performance.now()/180)*.04)}
function setupSkillBtns(){const S=G.heroSkills||['decoy','cloak'];for(const k in SKB){const b=$(SKB[k]);if(!b)continue;const i=S.indexOf(k);b.hidden=i<0;b.classList.toggle('slA',i===0);b.classList.toggle('slB',i===1)}}

/* ================= 스테이지 30단계 ================= */
const STG=Array.from({length:30},(_,i)=>{const n=i+1,witch=n%5===0,th=n<=7?'candy':n<=15?'ice':n<=22?'pumpkin':'xmas',ai=n<=8?0:n<=19?1:2,walls=Math.min(60,30+Math.round(i*1.15));
  return{n,witch,th,ai,walls,g3:witch?'catch':['candy','nohit','hp','noskill'][i%4],fast:witch?0:Math.max(70,130-i*2),seed:1000+n*7919}});
const G3T={candy:'사탕 8개 넘게 줍고 탈출',nohit:'한 대도 안 맞고 탈출',hp:'체력 60 넘게 남기고 탈출',noskill:'스킬 없이 탈출 (대시는 돼요)',catch:'도둑 붙잡기 (체력 0)'};
const stGoals=st=>st.witch?['도둑 막아내기','출구 12칸 밖에서 막거나 붙잡기',G3T.catch]:['탈출하기',`${st.fast}초 안에 탈출`,G3T[st.g3]];
const stBits=n=>SAVE.stg[n]|0,stStars=n=>{const b=stBits(n);return(b&1)+((b>>1)&1)+((b>>2)&1)},stOpen=n=>n===1||(stBits(n-1)&1)===1;
const totStars=()=>STG.reduce((a,s)=>a+stStars(s.n),0);
let STG_SAVE=null,STGSEL=1;
function withSeed(seed,fn){const r=Math.random;let s=seed>>>0;Math.random=()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296};try{fn()}finally{Math.random=r}}
function restoreStage(){if(STG_SAVE){AIL=STG_SAVE.AIL;PT_SEC=STG_SAVE.PT;STG_SAVE=null}}
function startStage(n){const st=STG[n-1];if(!st||!stOpen(n))return;if(!STG_SAVE)STG_SAVE={AIL,PT:PT_SEC};AIL=st.ai;PT_SEC=4;G.stage=st;G.chal=null;G.bonus=0;netLeave();
  clearWorld();applyTheme(st.th);withSeed(st.seed,()=>autoWalls(st.walls));rebuildEdges();FIELD.clear();syncWallMeshes();if(!isFull())goFull(true);beginMatch(st.witch?'devil':'hero',true)}
function stageEnd(win,why,t){const st=G.stage,h=G.hero;let b=0;
  if(!st.witch){if(win){b|=1;if(t<=st.fast)b|=2;const g=st.g3;if((g==='candy'&&h.manaGot>=8)||(g==='nohit'&&!G.stats.hits)||(g==='hp'&&h.hp>60)||(g==='noskill'&&!h.skills))b|=4}}
  else{if(!win){b|=1;const ef=exitField(),[cx,cz]=cellOf(h.x,h.z);if(why==='caught'||ef[idx(cx,cz)]>=12)b|=2;if(why==='caught')b|=4}}
  const old=stBits(st.n),nb=b&~old,news=(nb&1)+((nb>>1)&1)+((nb>>2)&1);SAVE.stg[st.n]=old|b;const coins=news*15;if(coins){SAVE.coins+=coins;syncCoins()}saveGame();if(news)misAdd('stage',news);
  return{b,news,coins}}
function openStages(){restoreStage();G.stage=null;G.chal=null;titleBoardIfNeeded();show('stages');STGSEL=Math.max(1,...STG.filter(s=>stOpen(s.n)).map(s=>s.n).filter(n=>!(stBits(n)&1)),1);if(!stOpen(STGSEL))STGSEL=1;
  const last=STG.filter(s=>stOpen(s.n)).pop();STGSEL=last?last.n:1;renderStages()}
function titleBoardIfNeeded(){$('revealBar').hidden=true;if(G.reveal){G.reveal=false;for(const l of G.pathLines||[])drop(l);G.pathLines=[]}camPreview=true}
const THC={candy:'#c98d5f',ice:'#ff8fb8',pumpkin:'#ef8634',xmas:'#2fae6a'},THN={candy:'과자 마을',ice:'아이스크림 왕국',pumpkin:'할로윈 마을',xmas:'크리스마스 마을'};
const HAT_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19 h18 M6 18 L11 3 L17 18Z" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>';
const starRow=(b,cls)=>[0,1,2].map(i=>`<i class="${cls||''}${(b>>i)&1?' on':''}">★</i>`).join('');
function renderStages(){$('stgTot').innerHTML=`★ ${totStars()} / 90`;
  $('stgGrid').innerHTML=STG.map(s=>{const open=stOpen(s.n);return`<button class="st${open?'':' lock'}${s.n===STGSEL?' sel':''}" data-n="${s.n}" style="background:${THC[s.th]}" aria-label="${s.n}단계">${s.witch?'<span class="wh">'+HAT_SVG+'</span>':''}<b>${s.n}</b><span class="ss">${starRow(stBits(s.n))}</span></button>`}).join('');
  const st=STG[STGSEL-1],b=stBits(st.n),gs=stGoals(st);
  $('stgInfo').innerHTML=`<div class="si-h"><b>${st.n}단계</b><span>${THN[st.th]} · ${st.witch?'과자 마녀로 막기':'쿠키 도둑으로 탈출'}</span></div><div class="si-sub">AI ${AIL_N[st.ai]} · 쿠키 벽 ${st.walls}개</div>`+
    `<ul class="si-g">${gs.map((g,i)=>`<li class="${(b>>i)&1?'ok':''}"><i>★</i>${g}</li>`).join('')}</ul><div class="si-rw">${COIN_SVG}처음 받는 별마다 15코인</div>`+
    `<button class="mbtn berry small" id="bStgGo"${stOpen(st.n)?'':' disabled'}><span class="mt"><b>${stOpen(st.n)?'시작!':'앞 단계를 깨요'}</b></span></button>`;
  const go=$('bStgGo');if(go)go.onclick=async()=>{await initAudio();startStage(st.n)}}

/* ================= 매일 미션 ================= */
const MPOOL={play:{t:n=>`아무 대전이나 ${n}판 하기`,n:3,r:20},winH:{t:n=>`도둑으로 ${n}번 이기기`,n:2,r:30},winD:{t:n=>`마녀로 ${n}번 이기기`,n:2,r:30},candy:{t:n=>`사탕 ${n}개 줍기`,n:15,r:25},
  push:{t:n=>`벽 밀기 ${n}번 하기`,n:4,r:25},cards:{t:n=>`마녀 카드 ${n}장 쓰기`,n:12,r:25},skill:{t:n=>`도둑 스킬 ${n}번 쓰기`,n:5,r:25},stage:{t:n=>`스테이지 별 ${n}개 새로 얻기`,n:3,r:30},
  online:{t:n=>`온라인으로 ${n}판 하기`,n:1,r:40},fast:{t:n=>`${n}초 안에 탈출하기`,n:100,r:40}};
const MIS_BONUS=30;
function dayKey(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function ensureMis(){const day=dayKey();if(SAVE.mis&&SAVE.mis.day===day&&Array.isArray(SAVE.mis.list))return SAVE.mis;let s=0;for(const ch of day)s=(Math.imul(s,31)+ch.charCodeAt(0))>>>0;
  let keys=Object.keys(MPOOL);withSeed(s,()=>{keys=shuffle(keys)});SAVE.mis={day,list:keys.slice(0,3).map(k=>({k,p:0,c:0})),b:0};saveGame();return SAVE.mis}
function misAdd(k,v,set){if(window.__aiBoth)return;const M=ensureMis();const e=M.list.find(q=>q.k===k);if(!e||e.c)return;const goal=k==='fast'?1:MPOOL[k].n,was=e.p>=goal;e.p=set?Math.max(e.p,v):Math.min(goal,e.p+v);if(e.p>=goal&&!was)G.misDone=(G.misDone||[]).concat(MPOOL[k].t(MPOOL[k].n));saveGame();syncMisBadge()}
function misClaimable(){const M=ensureMis();let n=0;for(const e of M.list){const goal=e.k==='fast'?1:MPOOL[e.k].n;if(e.p>=goal&&!e.c)n++}if(!M.b&&M.list.every(e=>e.c))n++;return n}
function syncMisBadge(){const b=$('misBdg');if(b)b.textContent=misClaimable()||''}
function misOnEnd(win,t){if(window.__aiBoth)return;const h=G.hero,iWon=G.mode==='hero'?win:!win;misAdd('play',1);if(NET.on)misAdd('online',1);
  if(G.mode==='hero'){misAdd('candy',h.manaGot||0);misAdd('skill',h.skills||0);if(win){misAdd('winH',1);if(t<=MPOOL.fast.n)misAdd('fast',1,true)}}
  else{if(iWon)misAdd('winD',1);misAdd('push',G.stats.wallMoves||0);misAdd('cards',Object.values(G.devil.played||{}).reduce((a,b)=>a+b,0))}}
function renderMis(){const M=ensureMis();const until=(()=>{const d=new Date(),m=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);const s=Math.max(0,(m-d)/1000|0);return Math.floor(s/3600)+'시간 '+Math.floor(s%3600/60)+'분'})();
  $('misNote').textContent=`새 미션까지 ${until}`;
  $('misList').innerHTML=M.list.map((e,i)=>{const P=MPOOL[e.k],goal=e.k==='fast'?1:P.n,done=e.p>=goal;return`<div class="ms-row${e.c?' got':''}"><div class="ms-t">${P.t(P.n)}<div class="ms-bar"><i style="width:${Math.round(Math.min(1,e.p/goal)*100)}%"></i></div><small>${e.k==='fast'?(done?'완료':'아직'):Math.min(e.p,goal)+' / '+goal}</small></div><span class="ms-rw">${COIN_SVG}${P.r}</span><button class="sbtn ms-b" data-i="${i}"${done&&!e.c?'':' disabled'}>${e.c?'받았어요':done?'받기':'진행 중'}</button></div>`}).join('')+
    `<div class="ms-row bonus${M.b?' got':''}"><div class="ms-t">세 미션 모두 받기<div class="ms-bar"><i style="width:${Math.round(M.list.filter(e=>e.c).length/3*100)}%"></i></div><small>${M.list.filter(e=>e.c).length} / 3</small></div><span class="ms-rw">${COIN_SVG}${MIS_BONUS}</span><button class="sbtn ms-b" data-i="b"${M.list.every(e=>e.c)&&!M.b?'':' disabled'}>${M.b?'받았어요':M.list.every(e=>e.c)?'받기':'진행 중'}</button></div>`;
  syncCoins();$('misCoin').innerHTML=COIN_SVG+'<em>'+SAVE.coins+'</em>'}
function misClaim(i){const M=ensureMis();if(i==='b'){if(M.b||!M.list.every(e=>e.c))return;M.b=1;SAVE.coins+=MIS_BONUS}else{const e=M.list[+i];if(!e||e.c)return;const goal=e.k==='fast'?1:MPOOL[e.k].n;if(e.p<goal)return;e.c=1;SAVE.coins+=MPOOL[e.k].r}saveGame();SFX.win();renderMis();syncMisBadge();syncCoins()}

/* ================= 등급 (아무나와 하기에서만) ================= */
const TIERS=[['쿠키','#e3a659'],['마카롱','#ff9ec7'],['컵케이크','#b98cff'],['케이크','#7cc6ff'],['왕관','#ffd35f']],TIER_REW=[0,50,100,150,200];
const tierOf=s=>Math.min(4,Math.floor((s|0)/5)),tierStars=s=>tierOf(s)===4?s-20:s%5;
const rankTxt=s=>TIERS[tierOf(s)][0]+' ★'+tierStars(s|0);
function tierIcon(t){const c=TIERS[t][1];const g=['<circle cx="12" cy="12" r="6" fill="#fff8ee" opacity=".55"/><circle cx="10" cy="10" r="1.4" fill="#4a2a1a"/><circle cx="14" cy="13" r="1.4" fill="#4a2a1a"/>',
  '<rect x="5" y="8" width="14" height="3.5" rx="1.7" fill="#fff8ee"/><rect x="5" y="13" width="14" height="3.5" rx="1.7" fill="#fff8ee" opacity=".7"/>',
  '<path d="M7 13 h10 l-1.5 6 h-7z" fill="#fff8ee"/><path d="M6.5 13 q0-6 5.5-6 q5.5 0 5.5 6z" fill="#fff8ee" opacity=".75"/>',
  '<rect x="6" y="11" width="12" height="7" rx="1.5" fill="#fff8ee"/><path d="M12 7 v4" stroke="#ff5f9e" stroke-width="2"/><circle cx="12" cy="6" r="1.6" fill="#ffd35f"/>',
  '<path d="M5.5 17 l1.2-8 3.4 3.6 1.9-5.4 1.9 5.4 3.4-3.6 1.2 8z" fill="#fff8ee"/>'][t];
  return`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="${c}" stroke="#4a2a1a" stroke-width="2"/>${g}</svg>`}
function rankUpdate(win){if(window.__aiBoth)return null;const R=SAVE.rank,old=R.s|0,ot=tierOf(old);if(win)R.s=old+1;else if(old>0&&!(old%5===0&&old<=20))R.s=old-1;
  const nt=tierOf(R.s);let rew=0;if(nt>(R.best|0)){R.best=nt;rew=TIER_REW[nt];SAVE.coins+=rew;syncCoins()}saveGame();syncRank();return{d:R.s-old,up:nt>ot,down:nt<ot,rew,s:R.s}}
function syncRank(){const el=$('tRank');if(el){const s=SAVE.rank.s|0;el.innerHTML=tierIcon(tierOf(s))+`<span>${rankTxt(s)}</span><small>아무나와 하기 등급</small>`}}

/* ================= 미로 코드 (공유·도전) ================= */
const B64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',THL=['candy','ice','pumpkin','xmas'];
function mazeEncode(){const bits=[],put=(v,n)=>{for(let i=n-1;i>=0;i--)bits.push((v>>i)&1)};const ws=B.walls.filter(w=>!w.temp&&!w.gone);put(1,2);put(Math.max(0,THL.indexOf(THEMEID)),2);put(Math.min(127,ws.length),7);
  for(const w of ws.slice(0,127)){put(w.o==='H'?0:1,1);put(w.x,4);put(w.z,4)}let sum=0;for(const b of bits)sum=(sum*2+b)%61;put(sum,6);while(bits.length%6)bits.push(0);
  let s='';for(let i=0;i<bits.length;i+=6){let v=0;for(let j=0;j<6;j++)v=v*2+bits[i+j];s+=B64[v]}return s}
function mazeDecode(raw){raw=String(raw||'');const hm=raw.match(/maze=([A-Za-z0-9_-]+)/);let s=hm?hm[1]:((raw.match(/[A-Za-z0-9_-]{12,}/g)||[]).sort((a,b)=>b.length-a.length)[0]||'');if(!s)return null;
  const bits=[];for(const ch of s){const v=B64.indexOf(ch);if(v<0)return null;for(let j=5;j>=0;j--)bits.push((v>>j)&1)}let p=0;const get=n=>{let v=0;for(let i=0;i<n;i++){if(p>=bits.length)throw 0;v=v*2+bits[p++]}return v};
  try{if(get(2)!==1)return null;const th=THL[get(2)],n=get(7),walls=[];for(let i=0;i<n;i++){const o=get(1)?'V':'H',x=get(4),z=get(4);walls.push({o,x,z})}const end=p;let sum=0;for(let i=0;i<end;i++)sum=(sum*2+bits[i])%61;if(get(6)!==sum)return null;return{th,walls}}catch(e){return null}}
function openCodeBox(){const code=mazeEncode();$('codeOut').value=code;$('codeM').hidden=false;$('codeShare').hidden=!navigator.share;$('codeMsg').textContent='이 코드를 친구에게 보내면 "미로 도전"에서 이 미로를 깰 수 있어요.'}
async function shareCode(){const code=$('codeOut').value;const web=/^https?:/.test(location.protocol)&&!/claude|usercontent|sandbox/.test(location.host);const text=`과자 마녀의 미로 - 내 미로를 깨 봐!\n미로 코드: ${code}`;
  try{await navigator.share(web?{title:'과자 마녀의 미로',text,url:location.href.split('#')[0]+'#maze='+code}:{title:'과자 마녀의 미로',text})}catch(e){}}
async function copyCode(){const t=$('codeOut');t.focus();t.select();let ok=false;try{await navigator.clipboard.writeText(t.value);ok=true}catch(e){try{ok=document.execCommand('copy')}catch(_){}}$('codeMsg').textContent=ok?'복사했어요! 친구에게 붙여 넣어 보내요.':'길게 눌러 코드를 복사해 주세요.'}
function openChal(prefill){restoreStage();titleBoardIfNeeded();show('chal');$('chalIn').value=prefill||'';$('chalMsg').textContent=''}
function startChal(raw){const d=mazeDecode(raw);if(!d){$('chalMsg').textContent='코드가 맞지 않아요. 다시 확인해 주세요.';SFX.deny();return}
  netLeave();if(!STG_SAVE)STG_SAVE={AIL,PT:PT_SEC};AIL=1;PT_SEC=4;G.stage=null;G.chal={raw};G.bonus=0;clearWorld();applyTheme(d.th);
  const bad=d.walls.some(w=>w.x<1||w.z<1||w.x>N-1||w.z>N-1||!wallOK(w.x,w.z));B.walls=d.walls;rebuildEdges();FIELD.clear();
  if(bad||exitField()[idx(...START)]<0){restoreStage();G.chal=null;B.walls=[];autoWalls(WMAX());syncWallMeshes();$('chalMsg').textContent='이 미로는 열 수 없어요. 코드가 잘렸는지 확인해 주세요.';SFX.deny();return}
  syncWallMeshes();if(!isFull())goFull(true);beginMatch('hero',true)}

/* ================= 카드·스킬 고르기 화면 ================= */
const DECKV={tab:'witch',deck:null,skills:null,info:''};
function openDeck(){DECKV.deck=SAVE.deck.slice();DECKV.skills=SAVE.skills.slice();DECKV.info='';show('deckS');renderDeck()}
function renderDeck(){for(const b of $('deckTabs').children)b.classList.toggle('on',b.dataset.t===DECKV.tab);const W=DECKV.tab==='witch';
  $('deckN').textContent=W?`덱 ${DECKV.deck.length} / 8`:`스킬 ${DECKV.skills.length} / 2 · 대시는 늘 있어요`;
  $('deckList').className='dk-grid'+(W?'':' sk4');
  $('deckList').innerHTML=W?CPOOL.map(k=>{const c=CARDS[k],on=DECKV.deck.includes(k);return`<button class="dk k-${KIND[k]}${on?' on':''}" data-k="${k}"><span class="cs">${c.cost}</span>${DOUBLE.includes(k)?'<span class="x2">×2</span>':''}<span class="dk-art">${ART[k]||''}</span><span class="nm">${c.n}</span><span class="ds">${CARD_DESC[k]}</span></button>`}).join('')
   :Object.keys(SKN).map(k=>{const[n,d,c]=SKN[k],on=DECKV.skills.includes(k);const sv=($(SKB[k])||{}).querySelector?$(SKB[k]).querySelector('svg').outerHTML:'';return`<button class="dk sk-${k}${on?' on':''}" data-k="${k}"><span class="cs candy">${c}</span><span class="dk-art">${sv}</span><span class="nm">${n}</span><span class="ds">${d}</span></button>`}).join('');
  $('deckSel').textContent=DECKV.info||(W?'8장을 골라요 · 포도 슬라임·벽 밀기는 2장씩 들어가요':'스킬 2개를 골라요 · 사탕을 모아 써요');$('deckSel').classList.toggle('warn',/모자|만/.test(DECKV.info))}
function deckPick(k){const W=DECKV.tab==='witch',L=W?DECKV.deck:DECKV.skills,max=W?8:2,i=L.indexOf(k);
  if(i>=0){L.splice(i,1);DECKV.info='';SFX.card()}else if(L.length>=max){DECKV.info=W?'8장까지만 넣을 수 있어요. 먼저 한 장을 빼요':'2개까지만 고를 수 있어요. 먼저 하나를 빼요';SFX.deny()}else{L.push(k);DECKV.info='';SFX.card()}
  if(DECKV.deck.length===8)SAVE.deck=DECKV.deck.slice();if(DECKV.skills.length===2)SAVE.skills=DECKV.skills.slice();saveGame();renderDeck()}
function closeDeck(){if(DECKV.deck.length!==8){DECKV.tab='witch';DECKV.info=`카드가 모자라요. 8장을 골라 주세요 (지금 ${DECKV.deck.length}장)`;SFX.deny();renderDeck();return}
  if(DECKV.skills.length!==2){DECKV.tab='thief';DECKV.info='스킬이 모자라요. 2개를 골라 주세요';SFX.deny();renderDeck();return}titleScreen()}

/* ================= 경기가 끝난 뒤: 스테이지 별 · 등급 · 미션 ================= */
function afterMatch(win,why,t){const x={};G.misDone=[];if(G.stage)x.stage=stageEnd(win,why,t);
  if(NET.on&&NET.rand)x.rank=rankUpdate(G.mode==='hero'?win:!win);misOnEnd(win,t);return x}
function resExtra(win,why,t){const x=G.extra||{};let html='';
  if(G.stage){const st=G.stage,r=x.stage||{b:0,news:0,coins:0},all=stBits(st.n);html=`<span class="rs-stars">${starRow(all,'big')}</span>`+(r.news?`새 별 ${r.news}개 · ${COIN_SVG}+${r.coins}`:(r.b?'이미 받은 별이에요':'별을 못 받았어요'));
    $('resCoin').innerHTML=html;$('bHome').textContent='목록';$('bAgain').querySelector('b').textContent='다시 하기';$('bAgain').disabled=false;const nx=STG[st.n];$('bNext').hidden=!(nx&&stOpen(nx.n));
    $('resLede').textContent=(st.n+'단계 · ')+$('resLede').textContent}
  else $('bNext').hidden=true;
  if(G.chal){$('resCoin').innerHTML=COIN_SVG+'미로 도전은 코인 없이 해요';$('bAgain').querySelector('b').textContent='다시 도전';$('bAgain').disabled=false;$('resKick').textContent=win?'친구 미로 탈출!':$('resKick').textContent}
  if(x.rank){const r=x.rank;$('resCoin').innerHTML+=`<span class="rs-rank">${tierIcon(tierOf(r.s))}${r.d>0?'등급 별 +1':r.d<0?'등급 별 -1':'등급 그대로'} · ${rankTxt(r.s)}${r.up?` · 올랐어요! ${COIN_SVG}+${r.rew}`:''}</span>`}
  $('bShareR').hidden=!(G.mode==='devil'&&!G.stage);
  if(G.misDone&&G.misDone.length){$('resMis').hidden=false;$('resMis').textContent='🎉 미션 완료: '+G.misDone.join(', ')}else $('resMis').hidden=true}
