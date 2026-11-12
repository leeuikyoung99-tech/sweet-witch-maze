/* ================= 46차: 벽 스킬 칸 — 초코 벽 · 벽 돌리기 · 벽 밀기 중 하나만 / 벽 돌리기 새 카드 / 모든 벽 스킬에 +칸 표시 ================= */
const WALLC=['choco','turn','move'];
CARDS.turn={n:'벽 돌리기',ic:'',cost:2};KIND.turn='wall';
CARD_DESC.turn='벽 한쪽 끝을 잡고 90도 꺾어요 · 밀기로는 못 만드는 ㄱ자 막힘';
ART.turn='<svg viewBox="0 0 64 64"><rect x="9" y="39" width="46" height="15" rx="4" fill="#f1cf8c" stroke="#4a2a1a" stroke-width="2.5" stroke-dasharray="5 3" opacity=".5"/><rect x="9" y="7" width="15" height="47" rx="4" fill="#f1cf8c" stroke="#4a2a1a" stroke-width="3"/><g fill="#8f5a28"><circle cx="16.5" cy="16" r="2"/><circle cx="16.5" cy="25" r="2"/><circle cx="16.5" cy="34" r="2"/></g><path d="M50 35 A28 28 0 0 0 31 12" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/><path d="M38 8 L30 12 L35 19" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="16.5" cy="46.5" r="5" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="2.5"/></svg>';
WHY.turnfar='벽 한쪽 끝을 축으로 90도만 돌릴 수 있어요';
{const i=CPOOL.indexOf('choco');if(i>=0)CPOOL.splice(i,1)}
const wallOpen=k=>k==='move'||cardOpen(k);try{GRADE.c.turn=2}catch(e){}// 벽 돌리기: 희귀 (1600코인) · 초코 벽: 전설
function myWall(){const k=SAVE.wallCard;return WALLC.includes(k)&&wallOpen(k)?k:'move'}
// 덱에 들어 있던 초코 벽은 벽 스킬 칸으로 옮겨요
{if(Array.isArray(SAVE.deck)&&SAVE.deck.includes('choco')){let d=SAVE.deck.filter(k=>k!=='choco');for(const k of CPOOL){if(d.length>=DECK_N)break;if(!d.includes(k)&&cardOpen(k))d.push(k)}SAVE.deck=d.length===DECK_N?d:DEF_DECK.slice();try{saveGame()}catch(e){}}}

// ----- 대결 덱: '벽 밀기' 자리에 고른 벽 스킬 -----
{const md=matchDeck;matchDeck=function(){const d=md.apply(this,arguments);let wc=null;
  if(G.mode==='devil'&&!G.tutor)wc=myWall();else if(NET.on&&!G.duo&&G.mode==='hero')wc=WALLC.includes(NET.peerWall)?NET.peerWall:'move';
  if(!wc||wc==='move')return wc?d.filter(k=>k==='move'||!WALLC.includes(k)):d;
  return d.map(k=>k==='move'?wc:k).filter(k=>!WALLC.includes(k)||k===wc)}}
// 증강체 조건: 내 벽 스킬도 덱에 든 걸로 봐요
{const ac=augCtx;augCtx=function(side,S){const r=ac.apply(this,arguments);const w=side==='w'?myWall():(NET.on?(WALLC.includes(NET.peerWall)?NET.peerWall:'move'):'move');if(r&&Array.isArray(r.deck)&&!r.deck.includes(w))r.deck=r.deck.concat(w);return r}}
{const a=AUGI2.w_wall2;if(a)a.need=['move','turn'];const b=AUGI2.w_blockbonus;if(b)b.d='벽 밀기로 길이 5칸 이상 늘면|소다 +2'}
{const q=AUGW2.findIndex(x=>x[0]==='w_blockbonus');if(q>=0)AUGW2[q][3]='벽 밀기로 길이 5칸 이상 늘면|소다 +2'}
{const i=AUGW2.findIndex(q=>q[0]==='w_quake');if(i>=0)AUGW2.splice(i,1)}
// 온라인: 내 벽 스킬을 상대에게 알려요
{const ns=netSend;netSend=function(m){if(m&&(m.t==='walls'||m.t==='prof'))m.wc=myWall();return ns.apply(this,arguments)}}
{const nm=netMsg;netMsg=function(d){if(d&&d.wc&&(d.t==='walls'||d.t==='prof'))NET.peerWall=WALLC.includes(d.wc)?d.wc:'move';return nm.apply(this,arguments)}}
{const nl=netLeave;netLeave=function(){NET.peerWall=null;return nl.apply(this,arguments)}}

// ----- 벽 돌리기: 한쪽 끝을 축으로 90도 -----
function turnOK(w,o,nx,nz){return !!w&&o!==w.o&&Math.abs(nx-w.x)===1&&Math.abs(nz-w.z)===1}
function turnOptsOf(w){const out=[];if(!w||w.temp||w.half||w.gone||w.anim||!G.devil)return out;if((w.lockUntil||0)>G.t)return out;if(G.duo==='ww'&&!wwHalf(w.z))return out;if(heroNearWall(w))return out;
  if(w.moved&&!(G.aug&&G.aug.wall2&&!w.moved2&&!G.devil.wall2used))return out;const no=w.o==='H'?'V':'H';
  for(const sx of[-1,1])for(const sz of[-1,1]){const nx=w.x+sx,nz=w.z+sz;if(nx<1||nz<1||nx>N-1||nz>N-1)continue;if(allHeroes().some(q=>wallDist(q.x,q.z,no,nx,nz)<WALL_NEAR))continue;if(G.duo==='ww'&&!wwHalf(nz))continue;
    if(tryWall(no,nx,nz,w,allCells())!=='ok')continue;out.push({w,o:no,x:nx,z:nz})}return out}
{const ac=applyCard;applyCard=function(k,x,z,extra){
  if(k==='turn'){const w=extra&&extra.w;if(!w)return 'gone';if(!turnOK(w,extra.o,extra.nx,extra.nz))return 'turnfar';if(w.moved&&!(G.aug&&G.aug.wall2&&!w.moved2&&!G.devil.wall2used))return 'moved'}
  const A=AG(),h=G.hero,bonus=(k==='turn'||k==='choco')&&A.w_blockbonus&&h;let L0=null;if(bonus){try{L0=exitField()[idx(...cellOf(h.x,h.z))]}catch(e){}}
  const r=ac.apply(this,arguments);if(r!=='ok')return r;
  if(k==='turn'){const w=extra.w;if(w.moved){w.moved2=1;G.devil.wall2used=1}w.moved=1;try{tintWall(w)}catch(e){}G.wallPing={o:extra.o,x:extra.nx,z:extra.nz,t:G.t+4};try{FIELD.clear()}catch(e){}}
  if(L0!=null){try{FIELD.clear();const L1=exitField()[idx(...cellOf(h.x,h.z))];if(L1-L0>=5&&G.devil){G.devil.pt=Math.min(ptMax(),G.devil.pt+2);if(G.mode==='devil')say(`길이 ${L1-L0}칸 늘었어요! 소다 +2`,false,1.3)}}catch(e){}}
  return r}}
// 온라인(마녀가 손님일 때): 돌리기도 벽 번호와 새 자리를 보내요
{const uc=useCard;useCard=function(k,x,z,extra){if(G.mirror&&k==='turn'){const D=G.devil;if(D.pt<CARDS.turn.cost)return 'pt';if(!extra||!extra.w)return 'gone';
    netSend({t:'card',i:D.hand.indexOf('turn'),k:'turn',x:0,z:0,wi:B.walls.indexOf(extra.w),o:extra.o,nx:extra.nx,nz:extra.nz});SFX.card();return 'ok'}return uc.apply(this,arguments)}}
{const hc=handleCard;handleCard=function(d){if(d&&d.k==='turn'){const D=G.devil;let r;if(!D.hand.includes('turn'))r='gone';else if(D.pt<CARDS.turn.cost)r='pt';else{const w=B.walls[d.wi];r=w?applyCard('turn',0,0,{w,o:d.o,nx:d.nx,nz:d.nz}):'gone'}netSend({t:'cr',r,k:'turn'});return}return hc.apply(this,arguments)}}
// 도는 모습: 축이 되는 끝을 중심으로 빙글
{const uw=updWallAnim;updWallAnim=function(dt){const tw=[];for(const w of B.walls)if(w.anim&&w.anim.from&&w.anim.from.o&&w.anim.from.o!==w.o)tw.push([w,w.anim]);const r=uw.apply(this,arguments);
  for(const[w,a]of tw){const m=WORLD.wallMeshes.get(w);if(!m)continue;const f=a.from;const px=(f.o==='H'?w.x:f.x)*C,pz=(f.o==='H'?f.z:w.z)*C;
    const[ax,az,ry0]=wallPos(f),[bx,bz,ry1]=wallPos(w);const v0x=ax-px,v0z=az-pz,v1x=bx-px,v1z=bz-pz;let th=Math.atan2(-v1z,v1x)-Math.atan2(-v0z,v0x);th=((th+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
    if(!w.anim){m.position.set(bx,0,bz);m.rotation.y=ry1;continue}const k=Math.min(1,a.t/.8),e=k*k*(3-2*k),ang=th*e,c=Math.cos(ang),s=Math.sin(ang);
    m.position.set(px+v0x*c+v0z*s,0,pz-v0x*s+v0z*c);m.rotation.y=ry0+ang}return r}}
// 고르고 누르기: 벽을 누르면 돌아갈 자리가 보이고, 노란 자리를 누르면 돌아가요 (금색 추천 자리는 바로 눌러도 돼요)
const TURN46={w:null};
{const sc=selectCard;selectCard=function(i){TURN46.w=null;WC46.key='';const r=sc.apply(this,arguments);const D=G.devil;
  if(D&&D.sel!=null&&D.hand[D.sel]==='turn'){if(burning()){say(WHY.burn,false,1.2);SFX.deny();D.sel=null;buildHand();return r}try{markMovable(false)}catch(e){}$('dhint').textContent='돌릴 벽을 누르거나, 금색 자리를 바로 눌러요'}return r}}
function turnDo(c){const D=G.devil;const r=useCard('turn',0,0,{w:c.w,o:c.o,nx:c.x,nz:c.z});if(r!=='ok'){say(WHY[r]||'돌릴 수 없어요',false,1.2);SFX.deny();return}
  D.sel=null;TURN46.w=null;WC46.key='';$('dhint').textContent='';buildHand()}
{const dt=devilTap;devilTap=function(x,z,picked){const D=G.devil;if(!(D&&D.sel!=null&&D.hand[D.sel]==='turn'))return dt.apply(this,arguments);
  const near=(list,lim)=>{let b=null,bd=lim;for(const c of list){const[cx,cz]=wallPos(c);const d=Math.hypot(cx-x,cz-z);if(d<bd){bd=d;b=c}}return b};
  if(TURN46.w){const c=near(turnOptsOf(TURN46.w),C*.95);if(c){turnDo(c);return}}
  const t=near(WC46.top||[],C*.8);if(t&&!TURN46.w){turnDo(t);return}
  let bw=null,bd=C*.55;for(const w of B.walls){if(w.temp||w.half)continue;const d=wallDist(x,z,w.o,w.x,w.z);if(d<bd){bd=d;bw=w}}
  if(bw){if(!turnOptsOf(bw).length){say('이 벽은 지금 돌릴 수 없어요',false,1.2);SFX.deny();return}TURN46.w=bw;WC46.key='';SFX.card();$('dhint').textContent='노란 자리를 누르면 그쪽으로 돌아가요';return}
  if(TURN46.w){TURN46.w=null;WC46.key='';$('dhint').textContent='돌릴 벽을 누르거나, 금색 자리를 바로 눌러요';return}
  say('돌릴 벽을 눌러요',false,1)}}

// ----- 표시: 세우기·돌리기는 길이 가장 많이 늘어나는 3곳 + 1등은 금색 -----
const WC46={key:'',list:[],top:[],ghosts:[],glow:null};
function wc46Mesh(i){let m=WC46.ghosts[i];if(!m){m=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT,WH,WT),new THREE.MeshBasicMaterial({color:0xffc400,transparent:true,opacity:.4,depthWrite:false}));m.renderOrder=3;WC46.ghosts[i]=m}if(m.parent!==scene)scene.add(m);return m}
function wc46Glow(){let m=WC46.glow;if(!m){m=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT+.5,WH+.5,WT+.5),new THREE.MeshBasicMaterial({color:0xff9a00,transparent:true,opacity:.5,depthWrite:false}));m.renderOrder=3;WC46.glow=m}if(m.parent!==scene)scene.add(m);return m}
function wc46Hide(){for(const m of WC46.ghosts)if(m)m.visible=false;if(WC46.glow)WC46.glow.visible=false}
function wc46Calc(mode){const h=G.hero,[hx,hz]=cellOf(h.x,h.z);const base=exitField()[idx(hx,hz)];const out=[];
  try{if(mode==='turn'){const src=TURN46.w?[TURN46.w]:B.walls;for(const w of src){if(w.temp||w.anim)continue;for(const q of turnOptsOf(w)){const o={o:w.o,x:w.x,z:w.z};w.o=q.o;w.x=q.x;w.z=q.z;rebuildEdges();const L=exitField()[idx(hx,hz)];w.o=o.o;w.x=o.x;w.z=o.z;if(L>0)out.push(Object.assign(q,{n:L-base}))}}}
    else if(mode==='choco'&&B.walls.filter(w=>w.temp).length<2){const hc=[[hx,hz]];if(G.decoy)hc.push(cellOf(G.decoy.x,G.decoy.z));
      for(let gx=1;gx<N;gx++)for(let gz=1;gz<N;gz++)for(const o of['H','V']){if(wallDist(h.x,h.z,o,gx,gz)<WALL_NEAR)continue;if(tryWall(o,gx,gz,null,hc)!=='ok')continue;
        B.walls.push({o,x:gx,z:gz});rebuildEdges();const L=exitField()[idx(hx,hz)];B.walls.pop();if(L>0&&L-base>0)out.push({o,x:gx,z:gz,n:L-base})}}}
  finally{rebuildEdges();try{FIELD.clear()}catch(e){}}
  out.sort((a,b)=>b.n-a.n);return out}
function wc46Upd(mode){const box=$('wcLab'),h=G.hero;const[hx,hz]=cellOf(h.x,h.z);const key=mode+':'+B.ver+':'+hx+','+hz+':'+(TURN46.w?B.walls.indexOf(TURN46.w):-1);
  if(key!==WC46.key){WC46.list=wc46Calc(mode);WC46.top=TURN46.w&&mode==='turn'?[]:mode==='turn'?WC46.list.slice(0,3):WC46.list.filter(c=>c.n>0).slice(0,3);WC46.key=mode+':'+B.ver+':'+hx+','+hz+':'+(TURN46.w?B.walls.indexOf(TURN46.w):-1)}
  const show=TURN46.w&&mode==='turn'?WC46.list.slice(0,4):WC46.top;const pul=.5+.5*Math.sin(performance.now()/1000*6);wc46Hide();
  let html='';show.forEach((c,i)=>{const m=wc46Mesh(i);const[x,z,ry]=wallPos(c);m.position.set(x,WH/2,z);m.rotation.y=ry;const best=i===0&&c.n>0;
    m.material.color.setHex(best?0xffc400:0xc78bff);m.material.opacity=best?.3+.3*pul:.28;m.visible=true;
    const v=new THREE.Vector3(x,WH+.6,z).project(camera);if(v.z>1)return;const t=c.n>0?'+'+c.n:(c.n<0?String(c.n):'±0');
    html+=`<span class="${best?'top':'alt'}" style="left:${((v.x+1)/2*innerWidth).toFixed(0)}px;top:${((1-v.y)/2*innerHeight).toFixed(0)}px">${t}</span>`});
  const src=mode==='turn'?(TURN46.w||(show[0]&&show[0].w)):null;if(src&&B.walls.includes(src)){const g=wc46Glow();const[x,z,ry]=wallPos(src);g.position.set(x,WH/2,z);g.rotation.y=ry;g.material.opacity=TURN46.w?.55:.35+.3*pul;g.material.color.setHex(TURN46.w?0x4fc3ff:0xff9a00);g.visible=true}
  if(box.innerHTML!==html)box.innerHTML=html}
{const wcMove=wcUpdate;wcUpdate=function(){const D=G.devil,h=G.hero;const k=D&&D.sel!=null?D.hand[D.sel]:null;const on=G.mode==='devil'&&screen==='play'&&!G.over&&h;
  if(on&&(k==='turn'||k==='choco')){try{wc45Hide()}catch(e){}try{wc46Upd(k)}catch(e){wc46Hide()}return}
  wc46Hide();if(k!=='turn')TURN46.w=null;return wcMove.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent=`#wcLab span.alt{background:#9b5cff;opacity:.92}`;document.head.appendChild(st)}

// ----- 카드·스킬 화면: 위 = 쓰는 카드 (벽 스킬 1장 + 카드 5장), 아래 = 후보 (벽 스킬 후보 묶음 + 카드 후보) -----
function wallTap46(k){if(!wallOpen(k)){const pr=typeof unlPrice==='function'?unlPrice('c',k):300;DECKV.pick=null;renderDeck();
    $('deckSel').innerHTML=`<span class="dk-buy-t"><b>${CARDS[k].n}</b> · ${CARD_DESC[k]||''}</span><button class="mbtn berry small dk-buy" ${SAVE.coins<pr?'disabled':''}><span class="mt"><b>${SAVE.coins<pr?`코인이 모자라요 (${pr})`:`${pr}코인으로 열기`}</b></span></button>`;
    const b=$('deckSel').querySelector('.dk-buy');b.onclick=()=>{if(SAVE.coins<pr){SFX.deny();return}SAVE.coins-=pr;SAVE.unl['c:'+k]=1;SAVE.wallCard=k;saveGame();try{syncCoins()}catch(e){}SFX.win();renderDeck();$('deckSel').innerHTML=`<b class="dk-new">열렸어요!</b> <b>${CARDS[k].n}</b> · 벽 스킬로 골랐어요`};SFX.card();return}
  SAVE.wallCard=k;saveGame();SFX.card();DECKV.pick=null;renderDeck();$('deckSel').innerHTML=`<b>${CARDS[k].n}</b> · ${CARD_DESC[k]||''} · 벽 스킬은 하나만 골라 써요`}
{const rd=renderDeck;renderDeck=function(){const r=rd.apply(this,arguments);const W=DECKV.tab==='witch';const top=$('deckTop'),pool=$('deckPool');if(!top||!pool||!W)return r;
  const fx=top.querySelector('.dk.fixed');if(fx)fx.remove();$('deckN').textContent='카드 5장 + 고정 스킬 1개';const cur=myWall();
  const tile=(k,cls)=>dkTile(k,true,'wall46').replace('class="dk ','class="dk '+cls+' ');
  top.insertAdjacentHTML('afterbegin',`<div class="wuse46"><span class="wtag46">고정 스킬</span>${tile(cur,'wtop46')}</div>`);
  const cand=WALLC.filter(k=>k!==cur);
  pool.insertAdjacentHTML('afterbegin',`<div class="wgrp46"><b>벽 스킬<br>후보</b>${cand.map(k=>{let h=tile(k,'wcand46'+(wallOpen(k)?'':' locked'));if(!wallOpen(k)){let w='';try{w=unlockWhere('c',k).replace('스토리 ','')}catch(e){}if(!w)try{w=unlPrice('c',k)+'코인'}catch(e){}h=h.replace('</button>',`<span class="lk"><small>${w}</small></span></button>`)}return h}).join('')}</div>`);
  const s=$('deckSel');if(s&&/벽 밀기는 2장씩/.test(s.textContent))s.innerHTML='카드를 누르면 설명이 나와요 · 벽 스킬 후보를 누르면 바로 바뀌어요';
  return r}}
{const dtp=deckTap;deckTap=function(a,k){if(a==='wall46'){if(k===myWall()){SFX.card();DECKV.pick=null;renderDeck();$('deckSel').innerHTML=`<b>${CARDS[k].n}</b> · ${CARD_DESC[k]||''} · 고정 스킬이에요 · 늘 덱에 들어가요`;return}wallTap46(k);return}return dtp.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent=`
#deckTop .wuse46{display:flex;flex-direction:column;align-items:center;gap:2px;margin-right:4px}
#deckS #deckTop{align-items:flex-end}
#deckTop .wuse46>.dk.wtop46{zoom:.88;flex:0 0 auto!important;width:80px!important;height:92px!important;min-height:92px!important;max-height:none!important}
#deckTop .wtag46{font:11px/1 var(--f-display);color:#8a5a00;white-space:nowrap}
#deckPool .wgrp46{display:flex;align-items:center;gap:6px;padding:5px 8px 5px 6px;border:2.5px dashed #e8b64a;border-radius:14px;background:#fff6d6}
#deckPool .wgrp46>b{font:12px/1.25 var(--f-display);color:#8a5a00;text-align:center;font-weight:normal;white-space:nowrap}
#deckPool .wlk46{position:absolute;left:50%;top:-8px;transform:translateX(-50%);font:11px/1 var(--f-display);color:#fff;background:#8a7a6a;border:2px solid #fff;border-radius:8px;padding:2px 7px;white-space:nowrap;z-index:6}
#wallBox{display:none!important}`;document.head.appendChild(st)}
// 초코 벽 배치 버튼이 떠 있는 동안엔 왼쪽 아래 증강체 칩을 잠깐 숨겨요 (겹치지 않게)
setInterval(()=>{const b=$('chocoBar');const on=!!(b&&!b.hidden);if(document.body.classList.contains('chb46')!==on)document.body.classList.toggle('chb46',on)},250);
{const st=document.createElement('style');st.textContent='body.chb46 #augHud{display:none!important}';document.head.appendChild(st)}
