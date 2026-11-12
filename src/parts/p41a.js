/* ================= 41차: 젤리 거미가 거미줄 자리까지 걸어가요 (순간이동처럼 보이지 않게) · 증강체 다시 뽑기는 카드 아래에 ================= */
function spiderPathTo(e,tx,tz){const[sx,sz]=cellOf(e.x,e.z);const prev=new Map([[idx(sx,sz),null]]),q=[[sx,sz]];
  for(let i=0;i<q.length;i++){const[x,z]=q[i];if(x===tx&&z===tz)break;for(const[dx,dz]of DIRS){const a=x+dx,b=z+dz;if(!inB(a,b)||!canStep(x,z,dx,dz))continue;const k=idx(a,b);if(prev.has(k))continue;prev.set(k,[x,z]);q.push([a,b])}}
  const out=[];let c=[tx,tz];if(!prev.has(idx(tx,tz)))return[[cx2x(tx),cx2x(tz)]];while(c){out.push([cx2x(c[0]),cx2x(c[1])]);c=prev.get(idx(c[0],c[1]))}out.reverse();out.shift();return out}
{const sn=spiderNest;spiderNest=function(e){sn(e);const w=e.web;if(!w)return;e.path=spiderPathTo(e,w.cx,w.cz);w.ready=false;w.g.visible=false;w.g.scale.set(.01,.01,.01)}}
function spiderWalk(e,dt){const w=e.web;const P=e.path||[];const SP=6.5;
  if(P.length){const[tx,tz]=P[0];const dx=tx-e.x,dz=tz-e.z,d=Math.hypot(dx,dz);const st=SP*dt;
    if(d<=st){e.x=tx;e.z=tz;P.shift()}else{e.x+=dx/d*st;e.z+=dz/d*st}
    if(d>.01){const a=Math.atan2(dx,dz);let df=a-e.face;while(df>Math.PI)df-=Math.PI*2;while(df<-Math.PI)df+=Math.PI*2;e.face+=df*Math.min(1,dt*10)}
    const L=e.m&&e.m.legs;if(L)L.forEach((l,i)=>l.rotation.x=Math.sin(G.t*16+i*1.3)*.35);return}
  // 도착: 거미줄이 펼쳐져요
  if(!w.ready){w.g.visible=true;w.t=(w.t||0)+dt;const k=Math.min(1,w.t/.5),s=k<1?1-Math.pow(1-k,3):1;w.g.scale.set(s,s,s);if(k>=1){w.ready=true;w.g.scale.set(1,1,1)}}
  e.face+=dt*.4}
// 거미는 처음부터 바닥에 있어요 (벽 위에 떠 있다가 뚝 떨어지지 않게)
{const mf=monFly;monFly=function(e){mf(e);if(e.type==='spider')e.g.position.y=0}}
// 거미줄은 다 펼쳐진 뒤부터 느려지게 해요
{const ue=updEnts;updEnts=function(dt){const hold=[];if(G.sweb)for(const w of G.sweb)if(w.ready===false&&!G.mirror){hold.push([w,w.cx]);w.cx=-99}try{return ue(dt)}finally{for(const[w,cx]of hold)w.cx=cx}}}
// ----- 증강체 다시 뽑기: 카드 모퉁이 대신 카드 아래 "다시 뽑기 1/1" -----
augRR=function(){const S=$('augS');if(!S||S.hidden||!AUGP.on)return;const cards=[...S.querySelectorAll('.ag-card')];let wrapped=false;
  cards.forEach((b,i)=>{for(const o of b.querySelectorAll('.ag-rr'))o.remove();let col=b.parentElement;
    if(!col.classList.contains('ag-col')){col=document.createElement('div');col.className='ag-col';b.before(col);col.appendChild(b);wrapped=true}
    let u=col.querySelector('.ag-rr2');if(!u){u=document.createElement('button');u.className='ag-rr2';col.appendChild(u);
      u.onclick=e=>{e.stopPropagation();e.preventDefault();if(AUGP.rr[i]||!AUGP.on){SFX.deny();return}const shown=AUGP.ch.slice();
        let pool=[];try{pool=AUGP.more(shown)||[]}catch(err){}const nid=pool.find(q=>!shown.includes(q));if(!nid){SFX.deny();tMsg('더 바꿀 증강체가 없어요');return}
        AUGP.rr[i]=1;AUGP.ch[i]=nid;const card=col.querySelector('.ag-card');const tmp=document.createElement('div');tmp.innerHTML=augCard(nid);const nc=tmp.firstElementChild;card.className=nc.className;card.innerHTML=nc.innerHTML;card.dataset.id=nid;if(nc.getAttribute('style'))card.setAttribute('style',nc.getAttribute('style'));
        try{fitNames(S)}catch(err){}SFX.card();augRR()}}
    const left=AUGP.rr[i]?0:1;if(u.dataset.l===String(left))return;u.dataset.l=left;u.classList.toggle('used',!left);u.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8a8 8 0 1 0 1.5 6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M20 3v5.5h-5.5" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg><span>다시 뽑기</span><b>${left}/1</b>`});if(wrapped)requestAnimationFrame(()=>{try{fitNames(S)}catch(e){}})};
{const st=document.createElement('style');st.textContent=`
#augS .ag-col{display:flex;flex-direction:column;align-items:center;gap:8px;flex:0 1 164px;min-width:0}
#augS .ag-col>.fz.ag-card{flex:none;width:100%;height:min(300px,calc(100vh - 196px))}#augS .ag-col .fz-med{width:clamp(40px,12vh,100px)!important;height:clamp(40px,12vh,100px)!important;margin:2px 0 4px!important}#augS .ag-foot{margin-top:4px}
#augS .ag-rr2{display:flex;align-items:center;gap:5px;padding:4px 12px 4px 9px;border-radius:999px;border:2.5px solid #ffcf3a;background:#2e2556;color:#ffe9a8;font:13px var(--f-display);cursor:pointer;box-shadow:0 3px 0 #120e24;white-space:nowrap}
#augS .ag-rr2 svg{width:15px;height:15px}#augS .ag-rr2 b{font-weight:normal;background:#ffcf3a;color:#4a2a1a;border-radius:8px;padding:0 6px;font-size:12px}
#augS .ag-rr2:active{transform:translateY(2px);box-shadow:0 1px 0 #120e24}
#augS .ag-rr2.used{opacity:.45;pointer-events:none;border-color:#7a6aa8}#augS .ag-rr2.used b{background:#7a6aa8;color:#fff}`;document.head.appendChild(st)}
// ----- 카드·스킬: 위쪽 덱은 내가 바꾼 순서 그대로 보여요 (서로 눌러서 자리 바꾸기) · 처음 한 번만 등급 순으로 정리 -----
{const gOf=(k,W)=>{try{return GRADE[W?'c':'s'][k]|0}catch(e){return 0}};
  if(!SAVE.deckOrd41){SAVE.deckOrd41=1;try{const sd=(L,W)=>{const o=L.map((k,i)=>({k,i,g:gOf(k,W)}));o.sort((a,b)=>a.g-b.g||a.i-b.i);L.splice(0,L.length,...o.map(x=>x.k))};sd(SAVE.deck,true);sd(SAVE.skills,false);saveGame()}catch(e){}}}
// 위쪽 카드를 하나 누르면 '골랐어요' 표시가 보여서, 다른 위쪽 카드를 누르면 자리가 바뀐다는 걸 알 수 있어요
{const rd=renderDeck;renderDeck=function(){const r=rd.apply(this,arguments);try{const p=DECKV.pick;for(const d of $('deckTop').querySelectorAll('.dk[data-a="top"]'))d.classList.toggle('pk41',!!(p&&p.a==='top'&&d.dataset.k===p.k))}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`#deckTop .dk.pk41{transform:translateY(-6px);box-shadow:0 0 0 3px #fff,0 0 0 6px #ff5f9e!important;z-index:3}`;document.head.appendChild(st)}
// ----- 프로필 아이콘(흰 바탕)에서도 거미줄·창대가 보이게 갈색 테두리를 둘러요 -----
ART.soldier=ART.soldier.replace('<path d="M52 60 V14" stroke="#fff8ee" stroke-width="3.5"/>','<path d="M52 60 V14" stroke="#4a2a1a" stroke-width="7" stroke-linecap="round"/><path d="M52 59 V15" stroke="#f6d7a8" stroke-width="3.5" stroke-linecap="round"/>');
ART.spider=ART.spider.replace('<path d="M32 4 V24" stroke="#fff" stroke-width="2" stroke-dasharray="2 2"/>','<path d="M32 3 V24" stroke="#4a2a1a" stroke-width="4.5" stroke-linecap="round"/><path d="M32 4 V23" stroke="#e9fff8" stroke-width="2" stroke-linecap="round"/>');
