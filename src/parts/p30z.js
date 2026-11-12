/* ================= 31차 (라): 새 증강체 36개 (마녀 19 · 도둑 17) · 체력 숫자 ================= */
// [id, 등급, 이름, 설명, 아이콘, 필요한 카드, 나오는 판]
const AUGN_W=[
 ['w_redraw','s','손 바꾸기','판마다 한 번|손패 4장을 새로 뽑아요','cardplus'],
 ['w_walls3','s','벽 셋 더','미로를 지을 때|쿠키 벽 +3','movewall'],
 ['w_lateburn','s','늦은 버닝','버닝 타임이|10초 늦게 와요','flame'],
 ['w_sticky','g','끈적 포탄','사탕 대포에 맞으면|1초 느려져요','turfire',['tower']],
 ['w_twin','g','쌍둥이 슬라임','슬라임을 부르면|작은 슬라임이 하나 더','monplus',['skel']],
 ['w_roar','g','몬스터 함성','몬스터가 나올 때|2칸 안 도둑 1초 느리게','monbig','M'],
 ['w_double','g','두 발 대포','사탕 대포가 2발씩|쏘는 간격 +30%','turplus',['tower']],
 ['w_backflow','g','소다 역류','도둑이 스킬을 쓰면|소다 +0.5','soda'],
 ['w_thrift','g','알뜰 마녀','소다 4 이상 카드|소다 -1','coin'],
 ['w_trapmaster','g','덫 장인','덫·발판을|6개까지 놓아요','traptag',TRAPS],
 ['w_thinchoco','g','얇은 초코 벽','초코 벽을 한 칸으로|세울 수 있어요','choco',['choco']],
 ['w_fog2','g','짙은 안개','지도 가리기 강화|5초 · 소다 -1','cloud',['fog']],
 ['w_deckswap','g','덱 교체권','고르면 바로|덱 카드 1장을 바꿔요','cardplus',null,2],
 ['w_wall2','g','벽 두 번','한 벽은|두 번 옮길 수 있어요','movewall'],
 ['w_wallcalc','g','벽 계산','벽 밀기를 고르면|벽마다 늘어나는 칸 수가 보여요','target'],
 ['w_blockbonus','g','길 막기 보너스','벽을 밀어 길이 5칸 이상 늘면|소다 +2','target'],
 ['w_king','p','몬스터 왕','몬스터가 커지고 피해 +50%|대신 2마리까지','monbig','M',2],
 ['w_guard','p','출구 수비대','출구 앞 공짜 대포 2개|포탑 수에 안 세요','castle'],
 ['w_goldsoda','p','황금 소다통','소다 최대 +5|가득 찬 채 시작','cup']];
const AUGN_T=[
 ['t_smell','s','사탕 냄새','3칸 안의 사탕이|지도에 보여요','candy'],
 ['t_start3','s','든든한 출발','시작할 때|사탕 +3','candy2'],
 ['t_magnet','s','사탕 자석','가까운 사탕이|끌려와요','coin'],
 ['t_shield','g','젤리 보호막','20초마다 피해 10을|막는 보호막','shield'],
 ['t_iframe','g','긴 무적','대시 무적|+0.4초','star'],
 ['t_breath','g','숨 고르기','5초 동안 안 맞으면|초당 체력 2 회복','heartplus'],
 ['t_escape','g','위기 탈출','체력이 처음 30% 아래로|3초 투명','wings'],
 ['t_quick','g','빠른 충전','스킬을 쓰면|다음 사탕 2초 빨리','hourglass'],
 ['t_five','g','다섯 개 보너스','사탕 5개 먹을 때마다|다음 스킬 사탕 돌려받기','coinstack'],
 ['t_bigcandy','g','큰 사탕','판마다 미로에|3개짜리 큰 사탕 3개','gift'],
 ['t_skillswap','g','스킬 변경권','고르면 바로|내 스킬 1개를 바꿔요','tag',null,2],
 ['t_deadend','g','막다른 길 감지','2칸 안의 막다른 길이|지도에 ✕로','map'],
 ['t_wallsound','g','벽 소리','마녀가 벽을 밀면|그 벽이 지도에 보여요','movewall'],
 ['t_touch','g','벽 짚기','벽에 닿으면|주변 2칸이 지도에 그려져요','hand'],
 ['t_mapfix','g','지도 고쳐 그리기','4칸 안에서 밀린 벽은|지도에 바로 고쳐져요','map'],
 ['t_corner','g','코너 가속','갈림길을 지날 때마다|1초 속도 +15%','shoe'],
 ['t_rain','p','사탕 비','1분마다 내 주변에|사탕 3개가 떨어져요','cloud']];
{const i=AUGW2.findIndex(q=>q[0]==='wp_reuse');if(i>=0)AUGW2.splice(i,1)}
AUGT2.push(...AUGN_T);AUGW2.push(...AUGN_W);
for(const[a,side]of[[AUGN_T,'t'],[AUGN_W,'w']])for(const q of a)AUGI2[q[0]]={id:q[0],side,tier:q[1],n:q[2],d:q[3],ic:q[4],need:q[5]||null,minR:q[6]||0};
Object.assign(AUGMAP,{w_redraw:'redraw',w_wall2:'wall2',t_magnet:'cmag'});
// 나오는 판 조건 · 온라인에선 바꾸기 증강체 빼기
{const ac=augChoices3;augChoices3=function(side,tier,have,ctx){const S=curSer();const r=(S&&S.r)||1;
  const skip=(side==='t'?AUGT2:AUGW2).map(q=>AUGI2[q[0]]).filter(a=>a&&((a.minR&&a.minR>r)||(NET.on&&(a.id==='w_deckswap'||a.id==='t_skillswap'))||(window.__noNew&&/^[wt]_/.test(a.id)))).map(a=>a.id);
  return ac(side,tier,(have||[]).concat(skip),ctx)}}
const AG=()=>G.aug||{};

// ----- 판 시작 -----
{const as=augStart;augStart=function(){const r=as.apply(this,arguments);const A=AG(),h=G.hero,D=G.devil;if(!h)return r;
  h.__shT=0;h.jshield=0;h.__esc=0;h.__free=false;h.__five=Math.floor((h.manaGot||0)/5);h.__rainT=0;h.__lastHit=-99;h.__touched=new Set();G.bigC=[];G.wallPing=null;
  if(A.t_start3&&!h.remote)h.mana=Math.min(HERO.manaMax,h.mana+3);
  if(A.w_goldsoda&&D&&!G.mirror)D.pt=ptMax();
  if(A.t_bigcandy&&!G.mirror)setTimeout(()=>{try{bigCandies()}catch(e){}},200);
  if(A.w_guard&&!G.mirror)setTimeout(()=>{try{exitGuards()}catch(e){}},200);
  return r}}
function bigCandies(){const[sx,sz]=START;const cells=[];for(let z=0;z<N;z++)for(let x=0;x<N;x++){if(!MASK[idx(x,z)])continue;if(Math.abs(x-sx)+Math.abs(z-sz)<4)continue;cells.push([x,z])}
  for(const[x,z]of shuffle(cells).slice(0,3)){addCandy(cx2x(x),cx2x(z));const c=G.candies[G.candies.length-1];if(!c)continue;c.big=1;c.g.scale.multiplyScalar(1.7);G.bigC.push(c)}}
function exitGuards(){const[ex,ez]=EXIT;const cand=[];for(let z=0;z<N;z++)for(let x=0;x<N;x++){const d=Math.abs(x-ex)+Math.abs(z-ez);if(d<1||d>3||!MASK[idx(x,z)])continue;cand.push([d,x,z])}
  cand.sort((a,b)=>a[0]-b[0]||Math.abs(a[1]-ex)-Math.abs(b[1]-ex));let n=0;for(const[,x,z]of cand){if(n>=2)break;const px=cx2x(x),pz=cx2x(z);if(canPlaceAt(px,pz)!=='ok')continue;if(G.ents.some(e=>e.type==='tower'&&Math.hypot(e.x-px,e.z-pz)<C*1.5))continue;
    const e=spawnTower(px,pz,null);if(e){e.free=1;e.life=9999;n++}}}
const towerCount=()=>G.ents.filter(e=>e.type==='tower'&&!e.dead&&!e.free).length;
const trapCap=()=>AG().w_trapmaster?6:4;
{const bA=buildAug;buildAug=function(){const A=bA.apply(this,arguments);if(A.w_king)A.monCap=Math.min(A.monCap||3,2);return A}}

// ----- 마녀 효과 -----
{const ss=spawnSkel;spawnSkel=function(x,z){const e=ss.apply(this,arguments);const A=AG();if(!e)return e;if(A.w_king&&!e.twin){e.g.scale.multiplyScalar(1.4);e.r*=1.3}
  if(A.w_twin&&!spawnSkel.__in){spawnSkel.__in=1;try{const t=ss(x+1.3,z+.6);if(t){t.twin=1;t.g.scale.multiplyScalar(.7);t.r*=.7;t.dmgMul=.5;try{collide(t,t.r)}catch(err){}}}finally{spawnSkel.__in=0}}return e}}
{const sm=spawnMon;spawnMon=function(k,x,z){const e=sm.apply(this,arguments);if(e&&k!=='skel'&&AG().w_king){e.g.scale.multiplyScalar(1.4);e.r*=1.3}return e}}
{const hu=hurt;hurt=function(src,amount,why){const A=AG(),h=G.hero;if(!h||h.remote||h.isRival||G.duo)return hu.apply(this,arguments);
  if(src&&src.twin)amount=Math.round(amount*.5);if(A.w_king&&src&&isMon(src))amount=Math.round(amount*1.5);
  // 젤리 보호막
  if(A.t_shield&&h.jshield>0&&!(h.inv>0)&&!(h.dashT>0)&&!G.over){const a=Math.min(h.jshield,amount);h.jshield-=a;amount-=a;if(amount<=0){h.inv=.6;SFX.pop();if(G.mode==='hero')say('젤리 보호막이 막았어요',false,1);return false}}
  const r=hu.call(this,src,amount,why);
  if(r){h.__lastHit=G.t;if(A.w_sticky&&src&&src.vx!==undefined&&!src.ice)h.slowT=Math.max(h.slowT||0,1);
    if(A.t_escape&&!h.__esc&&h.hp>0&&h.hp<=(h.hpMax||100)*.3){h.__esc=1;h.cloak=Math.max(h.cloak||0,3);if(G.mode==='hero')say('위기 탈출! 3초 투명',false,1.3)}}
  return r}}
{const sh=shoot;shoot=function(e){sh.apply(this,arguments);if(AG().w_double&&!e.tk){setTimeout(()=>{if(!e.dead&&!G.over&&screen==='play')try{sh(e)}catch(err){}},220);e.cd*=1.3}}}
{const cd=cardDisc;cardDisc=function(k){const A=AG();let d=cd(k);if(A.w_thrift&&(CBASE[k]||CARDS[k].cost)>=4)d++;if(A.w_fog2&&k==='fog')d++;return d}}
{const ac=applyCard;applyCard=function(k,x,z,extra){const A=AG(),h=G.hero;let L0=null;
  if(k==='move'&&A.w_blockbonus&&h){try{L0=exitField()[idx(...cellOf(h.x,h.z))]}catch(e){}}
  const r=ac.apply(this,arguments);if(r!=='ok')return r;
  if(k==='fog'&&A.w_fog2)G.mapFog=Math.max(G.mapFog||0,5);
  if(k==='move'&&extra){if(L0!=null){try{const L1=exitField()[idx(...cellOf(h.x,h.z))];if(L1-L0>=5&&G.devil){G.devil.pt=Math.min(ptMax(),G.devil.pt+2);if(G.mode==='devil')say(`길이 ${L1-L0}칸 늘었어요! 소다 +2`,false,1.3)}}catch(e){}}
    G.wallPing={o:extra.o,x:extra.nx,z:extra.nz,t:G.t+4}}
  if(MONK.includes(k)&&A.w_roar){setTimeout(()=>{if(G.over||!G.hero)return;const hh=G.hero;if(Math.hypot(hh.x-x,hh.z-z)<=C*2.2){hh.slowT=Math.max(hh.slowT||0,1);if(G.mode==='hero')say('몬스터 함성! 느려졌어요',true,1)}},1200)}
  return r}}
{const sp=skPay;skPay=function(k){const h=G.hero,A=AG();const before=h.mana;sp.apply(this,arguments);
  if(A.w_backflow&&G.devil&&!h.isRival)G.devil.pt=Math.min(ptMax(),G.devil.pt+.5);
  if(A.t_quick)h.manaT=(h.manaT||0)+2;
  if(A.t_five&&h.__free&&before>h.mana){h.mana=Math.min(HERO.manaMax,h.mana+(before-h.mana));h.__free=false;if(meLoud())say('다섯 개 보너스! 사탕을 돌려받았어요',false,1.1)}}}
// 얇은 초코 벽: 한 칸짜리 (가로면 왼쪽·오른쪽, 세로면 위·아래 중 누른 쪽)
CHB.thin=false;
{const bar=$('chocoBar');const b=document.createElement('button');b.id='bChocoThin';b.textContent='한 칸';b.hidden=true;bar.insertBefore(b,$('bChocoGo'));b.onclick=e=>{e.stopPropagation();CHB.thin=!CHB.thin;SFX.click();chocoBarSync()}}
{const cs=chocoBarSync;chocoBarSync=function(){cs.apply(this,arguments);const b=$('bChocoThin');if(!b)return;const on=!!AG().w_thinchoco;b.hidden=!on;if(!on)CHB.thin=false;b.classList.toggle('on',CHB.thin)}}
{const dt=devilTap;devilTap=function(x,z,picked){const D=G.devil;if(D&&D.sel!=null&&D.hand[D.sel]==='choco')CHB.tap=[x,z];return dt.apply(this,arguments)}}
{const pc=placeChoco;placeChoco=function(x,z){const n=B.walls.length;const r=pc.apply(this,arguments);if(r==='ok'&&CHB.thin&&AG().w_thinchoco&&B.walls.length>n){const w=B.walls[B.walls.length-1];const[tx,tz]=CHB.tap||[x,z];
    w.half=w.o==='H'?(tx<w.x*C?'a':'b'):(tz<w.z*C?'a':'b');rebuildEdges();const m=WORLD.wallMeshes.get(w);if(m){scene.remove(m);WORLD.wallMeshes.delete(w)}syncWallMeshes();try{rebuildPathLines()}catch(e){}}return r}}
{const rb=rebuildEdges;rebuildEdges=function(){rb.apply(this,arguments);let ch=false;for(const w of B.walls){if(!w.half||w.gone)continue;
    if(w.o==='H'){const i=w.half==='a'?idx(w.x,w.z-1):idx(w.x-1,w.z-1);B.S[i]=0}else{const i=w.half==='a'?idx(w.x-1,w.z):idx(w.x-1,w.z-1);B.E[i]=0}ch=true}if(ch)B.ver++}}
{const wm=wallMesh;wallMesh=function(w){const g=wm.apply(this,arguments);if(w.half){const b=g.children[0];b.scale.x=(C-WT)/(2*C-WT);const off=C/2;b.position.x=w.o==='H'?(w.half==='a'?-off:off):(w.half==='a'?off:-off)}return g}}

// 벽 계산: 벽 밀기를 고르면 밀 수 있는 벽마다 "+칸"이 떠요
{const d=document.createElement('div');d.id='wcLab';document.body.appendChild(d)}
const WC={key:'',list:[]};
function wcUpdate(){const box=$('wcLab');const D=G.devil,h=G.hero;const on=AG().w_wallcalc&&G.mode==='devil'&&screen==='play'&&D&&D.sel!=null&&D.hand[D.sel]==='move'&&!G.over&&h;
  if(!on){if(box.innerHTML)box.innerHTML='';WC.key='';return}
  const[hx,hz]=cellOf(h.x,h.z);const key=B.ver+':'+hx+','+hz;
  if(key!==WC.key){WC.key=key;WC.list=[];try{const base=exitField()[idx(hx,hz)];
    for(const w of B.walls){if(w.temp||w.anim)continue;let best=0;for(const q of wallShifts(w)){const o={x:w.x,z:w.z};w.x=q.x;w.z=q.z;rebuildEdges();const L=exitField()[idx(hx,hz)];w.x=o.x;w.z=o.z;if(L>0&&L-base>best)best=L-base}
      if(best>0)WC.list.push([w,best])}rebuildEdges()}catch(e){rebuildEdges()}}
  let html='';for(const[w,n]of WC.list){const m=WORLD.wallMeshes.get(w);if(!m)continue;const v=m.getWorldPosition(new THREE.Vector3()).setY(WH+.6).project(camera);if(v.z>1)continue;
    html+=`<span style="left:${((v.x+1)/2*innerWidth).toFixed(0)}px;top:${((1-v.y)/2*innerHeight).toFixed(0)}px">+${n}</span>`}
  if(box.innerHTML!==html)box.innerHTML=html}
{const uh=updHero;updHero=function(dt){const r=uh.apply(this,arguments);try{wcUpdate()}catch(e){}return r}}
setInterval(()=>{if(screen!=='play'||G.over)wcUpdate()},300);

// ----- 도둑 효과 -----
function junction(cx,cz){let n=0;for(const[dx,dz]of DIRS){const nx=cx+dx,nz=cz+dz;if(nx<0||nz<0||nx>=N||nz>=N)continue;if(canStep(cx,cz,dx,dz)&&MASK[idx(nx,nz)])n++}return n>=3}
function markCell(x,z){if(x<0||z<0||x>=N||z>=N)return;const i=idx(x,z);G.seen[i]=1;G.memE[i]=x<N-1?(B.E[i]?1:0):1;G.memS[i]=z<N-1?(B.S[i]?1:0):1}
{const uh=updHero;updHero=function(dt){const h=G.hero;const dash0=h?h.dashT:0;const r=uh.apply(this,arguments);if(!h||G.over||h.remote||h.isRival)return r;const A=AG();
  if(A.t_iframe&&dash0>0&&!(h.dashT>0))h.inv=Math.max(h.inv||0,.8);
  if(A.t_shield){if(!(h.jshield>0)){h.__shT=(h.__shT||0)+dt;if(h.__shT>=20){h.__shT=0;h.jshield=10;if(G.mode==='hero')say('젤리 보호막이 생겼어요',false,1)}}}
  if(A.t_breath&&G.t-(h.__lastHit??-99)>5&&h.hp>0)h.hp=Math.min(h.hpMax||100,h.hp+2*dt);
  if(A.t_five){const k=Math.floor((h.manaGot||0)/5);if(k>(h.__five||0)){h.__five=k;h.__free=true}}
  if(G.bigC&&G.bigC.length){for(let i=G.bigC.length-1;i>=0;i--){const c=G.bigC[i];if(G.candies.includes(c))continue;G.bigC.splice(i,1);if(Math.hypot(c.x-h.x,c.z-h.z)<3){h.mana=Math.min(HERO.manaMax,h.mana+2);h.manaGot=(h.manaGot||0)+2;if(G.mode==='hero')say('큰 사탕! 사탕 +3',false,1)}}}
  const[cx,cz]=cellOf(h.x,h.z);
  if(A.t_corner){if(h.__cell!==cx+','+cz){h.__cell=cx+','+cz;if(junction(cx,cz))h.__cornerT=1}if(h.__cornerT>0)h.__cornerT-=dt}
  if(A.t_touch&&G.seen){const touching=nearWalls(h.x,h.z).some(w=>{const qx=clamp(h.x,w[0],w[2]),qz=clamp(h.z,w[1],w[3]);return Math.hypot(h.x-qx,h.z-qz)<HERO.r+.1});const key=idx(cx,cz);
    if(touching&&!h.__touched.has(key)){h.__touched.add(key);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)markCell(cx+dx,cz+dz)}}
  if(A.t_mapfix&&G.seen){h.__mfT=(h.__mfT||0)-dt;if(h.__mfT<=0){h.__mfT=.5;for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const x=cx+dx,z=cz+dz;if(x<0||z<0||x>=N||z>=N)continue;if(G.seen[idx(x,z)])markCell(x,z)}}}
  if(A.t_rain){h.__rainT=(h.__rainT||0)+dt;if(h.__rainT>=60){h.__rainT=0;const cells=[];for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const x=cx+dx,z=cz+dz;if(x<0||z<0||x>=N||z>=N||!MASK[idx(x,z)])continue;if(dx||dz)cells.push([x,z])}
    for(const[x,z]of shuffle(cells).slice(0,3))addCandy(cx2x(x)+(Math.random()-.5)*2,cx2x(z)+(Math.random()-.5)*2);G.candyVer=(G.candyVer||0)+1;if(G.mode==='hero'){SFX.candy();say('사탕 비가 내려요!',false,1.2)}}}
  return r}}
{const hs=heroStats;heroStats=function(){const s=hs.apply(this,arguments);const h=G.hero;if(h&&h.__cornerT>0&&AG().t_corner)s.speed*=1.15;return s}}
// 작은 지도: 사탕 냄새 · 막다른 길 · 벽 소리
{const dm=drawMap;drawMap=function(cv){dm.apply(this,arguments);const A=AG(),h=G.hero;if(!h||G.mode!=='hero'||!(A.t_smell||A.t_deadend||A.t_wallsound))return;
  const g=cv.getContext('2d'),W=cv.width,pad=W*.05,s=(W-pad*2)/N,X=v=>pad+v/C*s;
  if(A.t_smell){g.fillStyle='#ff5fa8';for(const c of G.candies){if(Math.hypot(c.x-h.x,c.z-h.z)>C*3)continue;g.beginPath();g.arc(X(c.x),X(c.z),Math.max(2.5,s*.16),0,7);g.fill()}}
  if(A.t_deadend){const[cx,cz]=cellOf(h.x,h.z);g.strokeStyle='#e8364f';g.lineWidth=Math.max(2,s*.12);g.lineCap='round';
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){if(Math.abs(dx)+Math.abs(dz)>2)continue;const x=cx+dx,z=cz+dz;if(x<0||z<0||x>=N||z>=N||!MASK[idx(x,z)])continue;if(x===EXIT[0]&&z===EXIT[1])continue;
      let open=0;for(const[ddx,ddz]of DIRS){const nx=x+ddx,nz=z+ddz;if(nx<0||nz<0||nx>=N||nz>=N)continue;if(canStep(x,z,ddx,ddz)&&MASK[idx(nx,nz)])open++}
      if(open===1&&!(dx===0&&dz===0)){const px=pad+x*s,pz=pad+z*s,m=s*.28;g.beginPath();g.moveTo(px+m,pz+m);g.lineTo(px+s-m,pz+s-m);g.moveTo(px+s-m,pz+m);g.lineTo(px+m,pz+s-m);g.stroke()}}}
  if(A.t_wallsound&&G.wallPing&&G.t<G.wallPing.t&&Math.sin(G.t*10)>-.3){const w=G.wallPing;g.strokeStyle='#b45cff';g.lineWidth=Math.max(3,s*.22);g.lineCap='round';g.beginPath();
    if(w.o==='H'){g.moveTo(pad+(w.x-1)*s,pad+w.z*s);g.lineTo(pad+(w.x+1)*s,pad+w.z*s)}else{g.moveTo(pad+w.x*s,pad+(w.z-1)*s);g.lineTo(pad+w.x*s,pad+(w.z+1)*s)}g.stroke()}}}

// ----- 덱 교체권 · 스킬 변경권: 고르는 즉시 이번 대결 동안만 바꿔요 -----
function swapUI(kind,next){const W=kind==='c';const cur=W?(SER.deckOv||SAVE.deck).filter(k=>k!=='move'):(SER.skOv||cleanSkills(SAVE.skills));
  const pool=W?CPOOL.filter(k=>k!=='move'&&cardOpen(k)&&!cur.includes(k)):SKP.filter(k=>skillOpen(k)&&!cur.includes(k));
  if(!pool.length){tMsg(W?'바꿀 수 있는 다른 카드가 없어요':'바꿀 수 있는 다른 스킬이 없어요');next();return}
  let out=null;const draw=()=>{$('pgM').hidden=false;$('pgBody').innerHTML=`<div class="kicker">${W?'덱 교체권':'스킬 변경권'}</div><h2>${out?'넣을 '+(W?'카드':'스킬')+'를 골라요':'뺄 '+(W?'카드':'스킬')+'를 골라요'}</h2>
    <div class="sw-grid">${(out?pool:cur).map(k=>`<div class="sw-c" data-k="${k}">${dkTile(k,W,'mini')}</div>`).join('')}</div><p class="note">이번 대결이 끝날 때까지만 바뀌어요</p>`;
    for(const c of $('pgBody').querySelectorAll('.sw-c'))c.onclick=()=>{SFX.card();if(!out){out=c.dataset.k;draw();return}const nw=cur.map(k=>k===out?c.dataset.k:k);
      if(W)SER.deckOv=['move'].concat(nw);else SER.skOv=nw;$('pgM').hidden=true;tMsg(`${W?CARDS[out].n:SKN[out][0]} → ${W?CARDS[c.dataset.k].n:SKN[c.dataset.k][0]}`);next()}};draw()}
{const an=augPickN;augPickN=function(side,tier,have,n,cb,...rest){return an.call(this,side,tier,have,n,ids=>{if(ids&&ids.includes('w_deckswap'))swapUI('c',()=>cb(ids));else if(ids&&ids.includes('t_skillswap'))swapUI('s',()=>cb(ids));else cb(ids)},...rest)}}
{const md=matchDeck;matchDeck=function(){if(SER.on&&SER.deckOv&&G.mode==='devil'&&!NET.on){const k=SAVE.deck;SAVE.deck=SER.deckOv.filter(q=>q!=='move');try{return md.apply(this,arguments)}finally{SAVE.deck=k}}return md.apply(this,arguments)}}
{const nm=newMatch;newMatch=function(mode){const r=nm.apply(this,arguments);if(SER.on&&SER.skOv&&G.mode==='hero'&&!NET.on){G.heroSkills=SER.skOv.slice();try{setupSkillBtns();teleFlag()}catch(e){}}return r}}
{const ss=serStart;serStart=function(){SER.deckOv=null;SER.skOv=null;return ss.apply(this,arguments)}}
// AI가 고르면: 자기 덱·스킬 하나를 무작위로 바꿔요
{const aa=aiAug;aiAug=function(S,role,tier){const id=aa.apply(this,arguments);try{
  if(id==='w_deckswap'){const d=(SER.fixDk||S.aiDk||[]).slice();const ch=d.map((k,i)=>[k,i]).filter(([k])=>!['move','skel','tower'].includes(k));const pool=CPOOL.filter(k=>k!=='move'&&!d.includes(k));if(ch.length&&pool.length){const[,i]=ch[Math.floor(Math.random()*ch.length)];d[i]=pool[Math.floor(Math.random()*pool.length)];SER.fixDk=d;S.aiDk=d.slice()}}
  if(id==='t_skillswap'){const d=(SER.fixSk||S.aiSk||[]).slice();const pool=SKP.filter(k=>!d.includes(k));if(d.length&&pool.length){d[Math.floor(Math.random()*d.length)]=pool[Math.floor(Math.random()*pool.length)];SER.fixSk=d;S.aiSk=d.slice()}}}catch(e){}return id}}

// ----- 체력 숫자 -----
{for(const id of['hp','ehp']){const e=$(id);if(e&&!e.querySelector('.hpn')){const b=document.createElement('b');b.className='hpn';e.appendChild(b)}}}
setInterval(()=>{const h=G.hero;if(!h||screen!=='play')return;const t=`${Math.ceil(Math.max(0,h.hp))}/${h.hpMax||100}`;for(const id of['hp','ehp']){const b=$(id)&&$(id).querySelector('.hpn');if(b&&b.textContent!==t)b.textContent=t}},150);

{const st=document.createElement('style');st.textContent=`
#hp,#ehp{position:relative}
.hpn{position:absolute;inset:0;display:grid;place-items:center;font:12px/1 var(--f-display);color:#fff;-webkit-text-stroke:3px #4a2a1a;paint-order:stroke fill;pointer-events:none;letter-spacing:.02em}
#bChocoThin.on{background:#ff7eb6;color:#fff}
#wcLab span{position:fixed;transform:translate(-50%,-100%);font:13px/1 var(--f-display);color:#fff;background:#b45cff;border:2px solid #fff;border-radius:9px;padding:2px 6px;pointer-events:none;z-index:5;white-space:nowrap}
.sw-grid{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:520px}
.sw-c{cursor:pointer;zoom:.62}.sw-c .dk{width:80px!important;height:92px!important;pointer-events:none}`;document.head.appendChild(st)}
