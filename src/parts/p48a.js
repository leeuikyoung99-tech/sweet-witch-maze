/* ================= 48차: 벽 돌리기 — 고르자마자 추천 3곳 · 돌릴 수 있는 벽 민트빛 · 벽을 끌어서 돌리기 / 프리즘 '두 수 앞 보기' ================= */
// ----- 돌릴 수 있는 벽은 민트빛으로 -----
const TMK={set:new Map(),key:'',mat:null};
function turnMarkOff(){for(const[w,mat]of TMK.set){const m=WORLD.wallMeshes.get(w);if(m&&m.children[0])m.children[0].material=mat}TMK.set.clear();TMK.key=''}
function turnMarkOn(){const key=B.ver+':'+cellOf(G.hero.x,G.hero.z).join(',');if(key===TMK.key)return;turnMarkOff();
  if(!TMK.mat){const f=new THREE.MeshLambertMaterial({map:MAT.crackerFace.map,color:'#b8ffe6',emissive:new THREE.Color('#3fdc9e'),emissiveIntensity:.3});TMK.mat=[f,f,f,f,f,f]}
  for(const w of B.walls){if(w.temp||w.anim||!turnOptsOf(w).length)continue;const m=WORLD.wallMeshes.get(w);if(!m||!m.children[0])continue;TMK.set.set(w,m.children[0].material);m.children[0].material=TMK.mat}
  TMK.key=B.ver+':'+cellOf(G.hero.x,G.hero.z).join(',')}
// ----- 추천: 벽을 고르지 않아도 가장 유리한 3곳 (늘어나는 곳이 없으면 그래도 가장 나은 3곳) -----
{const wu=wcUpdate;wcUpdate=function(){const D=G.devil,h=G.hero;const k=D&&D.sel!=null?D.hand[D.sel]:null;const on=G.mode==='devil'&&screen==='play'&&!G.over&&h&&k==='turn';
  if(on){try{turnMarkOn()}catch(e){}}else if(TMK.set.size)turnMarkOff();return wu.apply(this,arguments)}}
// ----- 벽을 누르고 끌면 그 방향으로 돌아가요 (짧게 누르면 그 벽의 돌아갈 자리만 보여요) -----
const TSW={p:null};
function turnPickAt(cx,cy){let w=null;try{w=wallPick(cx,cy)}catch(e){}if(w&&(w.temp||w.half))w=null;
  if(!w){const g=groundAt(cx,cy);if(g){const gx=g.x,gz=g.z;let bd=C*.55;for(const q of B.walls){if(q.temp||q.half)continue;const d=wallDist(gx,gz,q.o,q.x,q.z);if(d<bd){bd=d;w=q}}}}return w}
function scr(x,z){const v=new THREE.Vector3(x,WH/2,z).project(camera);return[(v.x+1)/2*innerWidth,(1-v.y)/2*innerHeight]}
document.addEventListener('pointerdown',e=>{const D=G.devil;if(e.target.id!=='cv'||!isPlaying()||G.mode!=='devil'||!D||D.sel==null||D.hand[D.sel]!=='turn'||!e.isPrimary)return;
  // 추천 자리(반투명 벽) 위를 누른 거면 그냥 '누르기'로 넘겨요
  const g=groundAt(e.clientX,e.clientY);if(g){const gx=g.x,gz=g.z;const spots=(TURN46.w?turnOptsOf(TURN46.w):(WC46.top||[])).concat(PLAN2.on&&PLAN2.steps[PLAN2.i]&&PLAN2.steps[PLAN2.i].k==='turn'?[PLAN2.steps[PLAN2.i]]:[]);
    for(const c of spots){const[x,z]=wallPos(c);if(Math.hypot(x-gx,z-gz)<C*.75)return}}
  const w=turnPickAt(e.clientX,e.clientY);if(!w)return;e.stopPropagation();e.preventDefault();TSW.p={id:e.pointerId,w,x:e.clientX,y:e.clientY};try{markWall(w,true)}catch(err){}},true);
document.addEventListener('pointermove',e=>{if(TSW.p&&e.pointerId===TSW.p.id){e.stopPropagation()}},true);
function tswEnd(e,cancel){const p=TSW.p;if(!p||e.pointerId!==p.id)return;TSW.p=null;e.stopPropagation();const w=p.w;try{markWall(w,false)}catch(err){}TMK.key='';if(cancel)return;
  const opts=turnOptsOf(w);if(!opts.length){say('이 벽은 지금 돌릴 수 없어요',false,1.2);SFX.deny();return}
  const dx=e.clientX-p.x,dy=e.clientY-p.y,L=Math.hypot(dx,dy);
  if(L<14){TURN46.w=w;WC46.key='';SFX.card();$('dhint').textContent='노란 자리를 누르거나, 벽을 그쪽으로 끌어요';return}
  const[sx,sy]=scr(...wallPos(w));let best=null,bs=-2;for(const c of opts){const[cx,cy]=scr(...wallPos(c));const vx=cx-sx,vy=cy-sy,vl=Math.hypot(vx,vy)||1;const s=(vx*dx+vy*dy)/(vl*L);if(s>bs){bs=s;best=c}}
  if(best)turnDo(best)}
document.addEventListener('pointerup',e=>tswEnd(e,false),true);document.addEventListener('pointercancel',e=>tswEnd(e,true),true);
{const sc=selectCard;selectCard=function(i){const r=sc.apply(this,arguments);const D=G.devil;if(D&&D.sel!=null&&D.hand[D.sel]==='turn')$('dhint').textContent='민트빛 벽을 끌어서 돌려요 · 금색 자리를 눌러도 돼요';return r}}

// ----- 마녀 프리즘 증강체: 황금 소다통 → 두 수 앞 보기 (판마다 한 번, 벽 스킬 두 번의 최적 자리) -----
{const i=AUGW2.findIndex(q=>q[0]==='w_goldsoda');if(i>=0)AUGW2.splice(i,1)}
{const q=['w_plan2','p','두 수 앞 보기','판마다 한 번 벽 스킬을 고르면|두 번 쓸 최적 자리를 알려줘요','target'];AUGW2.push(q);AUGI2[q[0]]={id:q[0],side:'w',tier:q[1],n:q[2],d:q[3],ic:q[4],need:null,minR:0}}
const PLAN2={on:false,used:false,steps:[],i:0,gain:[],tot:0,mt:-1};
function p2Cands(kind,ex){const out=[];const h=G.hero,[hx,hz]=cellOf(h.x,h.z);
  if(kind==='move'){for(const w of B.walls){if(w.temp||w.anim||ex.includes(w))continue;for(const q of wallShifts(w))out.push({k:'move',w,o:w.o,x:q.x,z:q.z})}}
  else if(kind==='turn'){for(const w of B.walls){if(w.temp||w.anim||ex.includes(w))continue;for(const q of turnOptsOf(w))out.push({k:'turn',w,o:q.o,x:q.x,z:q.z})}}
  else if(kind==='choco'){if(B.walls.filter(w=>w.temp).length>=2)return out;const hc=[[hx,hz]];if(G.decoy)hc.push(cellOf(G.decoy.x,G.decoy.z));
    for(let gx=1;gx<N;gx++)for(let gz=1;gz<N;gz++)for(const o of['H','V']){if(wallDist(h.x,h.z,o,gx,gz)<WALL_NEAR)continue;if(tryWall(o,gx,gz,null,hc)!=='ok')continue;out.push({k:'choco',o,x:gx,z:gz})}}
  return out}
function p2Do(c){if(c.k==='choco'){const w={o:c.o,x:c.x,z:c.z,temp:1e9};B.walls.push(w);rebuildEdges();return()=>{B.walls.splice(B.walls.indexOf(w),1)}}
  const w=c.w,o={o:w.o,x:w.x,z:w.z};w.o=c.o;w.x=c.x;w.z=c.z;rebuildEdges();return()=>{w.o=o.o;w.x=o.x;w.z=o.z}}
function p2Plan(kind){const h=G.hero,[hx,hz]=cellOf(h.x,h.z),I=idx(hx,hz);const base=exitField()[I];let best=null;
  try{const first=p2Cands(kind,[]).map(c=>{const u=p2Do(c);const L=exitField()[I];u();rebuildEdges();return Object.assign(c,{L})}).filter(c=>c.L>0).sort((a,b)=>b.L-a.L).slice(0,14);
    for(const c1 of first){const u1=p2Do(c1);for(const c2 of p2Cands(kind,c1.w?[c1.w]:[])){if(c2.k==='choco'&&c2.x===c1.x&&c2.z===c1.z)continue;const u2=p2Do(c2);const L=exitField()[I];u2();rebuildEdges();if(L>0&&(!best||L>best.L))best={c1,c2,L,L1:c1.L}}u1();rebuildEdges()}}
  finally{rebuildEdges();try{FIELD.clear()}catch(e){}}
  if(!best||best.L<=base)return null;return{steps:[best.c1,best.c2],gain:[best.L1-base,best.L-best.L1],tot:best.L-base}}
function p2Same(c,k,extra,x,z){if(!c||c.k!==k)return false;if(k==='choco'){const gx=clamp(Math.round(x/C),1,N-1),gz=clamp(Math.round(z/C),1,N-1);return gx===c.x&&gz===c.z}return extra&&extra.w===c.w&&extra.o===c.o&&extra.nx===c.x&&extra.nz===c.z}
// 매 판 새로 (판마다 한 번)
{const bm=beginMatch;beginMatch=function(){PLAN2.on=false;PLAN2.used=false;PLAN2.steps=[];PLAN2.i=0;return bm.apply(this,arguments)}}
// 벽 스킬을 처음 고를 때 계산해서 보여 줘요
{const sc=selectCard;selectCard=function(i){const r=sc.apply(this,arguments);const D=G.devil;const k=D&&D.sel!=null?D.hand[D.sel]:null;
  if(k&&WALLC.includes(k)&&AG().w_plan2&&!PLAN2.used&&G.mode==='devil'&&G.hero){PLAN2.used=true;let p=null;try{p=p2Plan(k)}catch(e){p=null}
    if(p){Object.assign(PLAN2,{on:true,steps:p.steps,gain:p.gain,tot:p.tot,i:0});say(`두 수 앞 보기 · ①→② 순서로 쓰면 길 +${p.tot}칸`,false,2.4)}else say('두 수 앞 보기 · 지금은 길을 늘릴 자리가 없어요',false,1.8)}
  return r}}
// 계획대로 썼는지 확인: 맞으면 다음 수, 다르면 끝
{const ac=applyCard;applyCard=function(k,x,z,extra){const st=PLAN2.on?PLAN2.steps[PLAN2.i]:null;const same=st?p2Same(st,k,extra,x,z):false;const r=ac.apply(this,arguments);
  if(r==='ok'&&PLAN2.on&&WALLC.includes(k)){if(same){PLAN2.i++;if(PLAN2.i>=PLAN2.steps.length){PLAN2.on=false;if(G.mode==='devil')say('두 수 앞 보기 완료!',false,1.3)}}else PLAN2.on=false}return r}}
// 표시: 지금 둘 수는 금색 ①, 그다음은 주황 ②
const P2M={g:[],glow:null};
function p2Mesh(i,col){let m=P2M.g[i];if(!m){m=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT,WH,WT),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.45,depthWrite:false}));m.renderOrder=4;P2M.g[i]=m}if(m.parent!==scene)scene.add(m);return m}
function p2Hide(){for(const m of P2M.g)if(m)m.visible=false;if(P2M.glow)P2M.glow.visible=false}
function p2Draw(){const box=$('wcLab');p2Hide();const pul=.5+.5*Math.sin(performance.now()/1000*6);let html='';
  PLAN2.steps.forEach((c,j)=>{if(j<PLAN2.i)return;const now=j===PLAN2.i;const m=p2Mesh(j,now?0xffc400:0xff8a3a);const[x,z,ry]=wallPos(c);m.position.set(x,WH/2,z);m.rotation.y=ry;m.material.opacity=now?.3+.35*pul:.25;m.visible=true;
    const v=new THREE.Vector3(x,WH+.6,z).project(camera);let lx=(v.x+1)/2*innerWidth,ly=(1-v.y)/2*innerHeight;if(p2Draw.L&&j>PLAN2.i&&Math.abs(lx-p2Draw.L[0])<130&&Math.abs(ly-p2Draw.L[1])<34)ly=p2Draw.L[1]+(ly>=p2Draw.L[1]?36:-36);if(now)p2Draw.L=[lx,ly];if(v.z<=1)html+=`<span class="${now?'top':'p2n'}" style="left:${lx.toFixed(0)}px;top:${ly.toFixed(0)}px">${j===0?'①':'②'} +${PLAN2.gain[j]}${j===1?` · 합 +${PLAN2.tot}`:''}</span>`;
    if(now&&c.w&&B.walls.includes(c.w)){if(!P2M.glow){P2M.glow=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT+.5,WH+.5,WT+.5),new THREE.MeshBasicMaterial({color:0xff9a00,transparent:true,opacity:.5,depthWrite:false}));P2M.glow.renderOrder=4}
      if(P2M.glow.parent!==scene)scene.add(P2M.glow);const[gx,gz,gr]=wallPos(c.w);P2M.glow.position.set(gx,WH/2,gz);P2M.glow.rotation.y=gr;P2M.glow.material.opacity=.35+.3*pul;P2M.glow.visible=true}});
  if(box.innerHTML!==html)box.innerHTML=html}
{const wu=wcUpdate;wcUpdate=function(){const D=G.devil,h=G.hero;const k=D&&D.sel!=null?D.hand[D.sel]:null;const on=PLAN2.on&&G.mode==='devil'&&screen==='play'&&!G.over&&h&&k&&WALLC.includes(k)&&PLAN2.steps[PLAN2.i]&&PLAN2.steps[PLAN2.i].k===k;
  if(!on){p2Hide();return wu.apply(this,arguments)}try{wc45Hide()}catch(e){}try{wc46Hide()}catch(e){}if(k==='turn')try{turnMarkOn()}catch(e){}p2Draw()}}
// 계획 자리를 누르면 그대로: 돌리기는 바로 돌리고, 초코 벽은 그 방향으로 놓을 준비
{const dt=devilTap;devilTap=function(x,z,picked){const D=G.devil;const k=D&&D.sel!=null?D.hand[D.sel]:null;const c=PLAN2.on?PLAN2.steps[PLAN2.i]:null;
  if(c&&c.k===k){const[cx,cz]=wallPos(c);if(Math.hypot(cx-x,cz-z)<C*.8){if(k==='turn'){turnDo(c);return}if(k==='choco'){const r=dt.call(this,c.x*C,c.z*C,picked);CHB.o=c.o;try{chocoPrev();chocoBarSync()}catch(e){}return r}}}
  return dt.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent='#wcLab span.p2n{background:#ff8a3a;opacity:.95}';document.head.appendChild(st)}
// ----- 마녀 실버 증강체: 소다 저금통 → 몬스터 한 마리 더 -----
{const i=AUGW2.findIndex(q=>q[0]==='wn_piggy');const q=['wn_moncap','s','몬스터 한 마리 더','몬스터를 동시에|1마리 더 부를 수 있어요','monplus'];if(i>=0)AUGW2.splice(i,1,q);else AUGW2.push(q);AUGI2[q[0]]={id:q[0],side:'w',tier:q[1],n:q[2],d:q[3],ic:q[4],need:'M',minR:0}}
{const sk=skelCap;skelCap=function(){return sk.apply(this,arguments)+(AG().wn_moncap?1:0)}}
// ----- 마녀 골드 증강체: 벽 계산 자리 → 빠른 손놀림 (밀기·돌리기 대기 5→2초, 옮긴 벽 잠금 25→15초) -----
{const q=['w_quick','g','빠른 손놀림','벽 밀기·돌리기 대기 5초→2초|옮긴 벽 잠금 25초→15초','movewall',['move','turn']];AUGW2.push(q);AUGI2[q[0]]={id:q[0],side:'w',tier:q[1],n:q[2],d:q[3],ic:q[4],need:q[5],minR:0}}
{const ac=applyCard;applyCard=function(k,x,z,extra){const r=ac.apply(this,arguments);
  if(r==='ok'&&(k==='move'||k==='turn')&&AG().w_quick&&G.devil){G.devil.lastMove=(G.devil.lastMove||G.t)-(MOVE_CD-2);const w=extra&&extra.w;if(w&&w.lockUntil)w.lockUntil-=10}return r}}
