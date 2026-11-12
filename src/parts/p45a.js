/* ================= 45차: 연막에 닿은 몬스터는 잠깐 작아져서 좁은 길에서도 스쳐 지나갈 수 있어요 ================= */
const SMK_T=4,SMK_S=.65;
function smkShrink(e){if(!e||e.dead||!e.g)return;if(!(e.smk>0)){e.smk_r0=e.r;e.smk_s0=e.g.scale.x}e.smk=SMK_T;e.r=e.smk_r0*.5}
function smkAround(x,z,rad){for(const e of G.ents)if(isMon(e)&&!e.dead&&e.type!=='ghost'&&Math.hypot(e.x-x,e.z-z)<rad)smkShrink(e)}
{const ds=doSmoke;doSmoke=function(ai){const h=G.hero,before=h.cdSmoke||0;const r=ds.apply(this,arguments);if((h.cdSmoke||0)>before)smkAround(h.x,h.z,9);return r}}
{const ue=updEnts;updEnts=function(dt){const r=ue.apply(this,arguments);const h=G.hero;
  // 연막이 따라다니는 증강체(연막 이동): 연막 안에 들어온 몬스터도 작아져요
  if(h&&h.smokeT>0)smkAround(h.x,h.z,6);
  for(const e of G.ents){if(!(e.smk_s0>0))continue;if(e.dead){e.smk=0}
    if(e.smk>0){e.smk-=dt;const k=Math.min(1,(SMK_T-e.smk)/.25);e.g.scale.setScalar(e.smk_s0*(1-(1-SMK_S)*k));if(e.smk<=0){e.r=e.smk_r0}}
    else{const cur=e.g.scale.x,tgt=e.smk_s0;const nx=cur+(tgt-cur)*Math.min(1,dt*6);e.g.scale.setScalar(Math.abs(nx-tgt)<.005?tgt:nx);if(Math.abs(nx-tgt)<.005){e.smk_s0=0}}}
  return r}}
/* 45차: 마녀 HUD 정리 — 증강체 칩은 설치 현황판 아래로, 카드 판은 일시정지·이모티콘 줄을 넘지 않게 줄여요 */
function augTop45(){const el=$('augHud'),cp=$('capPanel');const on=!!(el&&!el.hidden&&G.mode==='devil'&&cp&&cp.getClientRects().length);
  if(on){const t=Math.round(cp.getBoundingClientRect().bottom+6)+'px';if(el.style.getPropertyValue('--ah45')!==t)el.style.setProperty('--ah45',t)}
  if(document.body.classList.contains('dv45')!==on)document.body.classList.toggle('dv45',on)}
setInterval(augTop45,300);
{const st=document.createElement('style');st.textContent='body.dv45 #augHud{top:var(--ah45)!important}';document.head.appendChild(st)}
function trayFit45(){const t=document.querySelector('#hudD .tray');if(!t||!t.offsetParent)return;const r=t.getBoundingClientRect(),H=t.offsetHeight;if(!H)return;
  let top=0;for(const id of['bPauseD','emoBtn']){const b=$(id);if(!b||!b.getClientRects().length)continue;const q=b.getBoundingClientRect();if(q.width&&q.left<r.right&&q.right>r.left)top=Math.max(top,q.bottom)}
  top+=6;const k=Math.max(.6,Math.min(1,(r.bottom-top)/H));const v=k>.995?'':`scale(${k.toFixed(3)})`;if(t.style.transform!==v){t.style.transformOrigin='100% 100%';t.style.transform=v}}
{const bh=buildHand;buildHand=function(){const r=bh.apply(this,arguments);try{requestAnimationFrame(trayFit45)}catch(e){}return r}}
setInterval(trayFit45,500);addEventListener('resize',()=>setTimeout(trayFit45,60));
/* 45차: '벽 계산'을 기본 기능으로 — 벽 밀기를 고르면 벽마다 +칸, 가장 많이 늘어나는 벽은 금색으로 반짝이고 밀려갈 자리가 보여요 */
{const i=AUGW2.findIndex(q=>q[0]==='w_wallcalc');if(i>=0)AUGW2.splice(i,1)}
const WC45={glow:null,ghost:null,best:null};
function wc45Obj(){if(!WC45.glow){const gm=new THREE.MeshBasicMaterial({color:0xff9a00,transparent:true,opacity:.45,depthWrite:false});
    WC45.glow=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT+.5,WH+.5,WT+.5),gm);
    const hm=new THREE.MeshBasicMaterial({color:0xffc400,transparent:true,opacity:.38,depthWrite:false});
    WC45.ghost=new THREE.Mesh(new THREE.BoxGeometry(2*C-WT,WH,WT),hm);WC45.glow.renderOrder=WC45.ghost.renderOrder=3}
  for(const o of[WC45.glow,WC45.ghost])if(o.parent!==scene)scene.add(o)}
function wc45Hide(){if(WC45.glow){WC45.glow.visible=false;WC45.ghost.visible=false}WC45.best=null}
wcUpdate=function(){const box=$('wcLab');const D=G.devil,h=G.hero;const on=G.mode==='devil'&&screen==='play'&&D&&D.sel!=null&&D.hand[D.sel]==='move'&&!G.over&&h;
  if(!on){if(box.innerHTML)box.innerHTML='';WC.key='';wc45Hide();return}
  const[hx,hz]=cellOf(h.x,h.z);const key=B.ver+':'+hx+','+hz;
  if(key!==WC.key){WC.key=key;WC.list=[];WC45.best=null;try{const base=exitField()[idx(hx,hz)];
    for(const w of B.walls){if(w.temp||w.anim)continue;let best=0,bq=null;for(const q of wallShifts(w)){const o={x:w.x,z:w.z};w.x=q.x;w.z=q.z;rebuildEdges();const L=exitField()[idx(hx,hz)];w.x=o.x;w.z=o.z;if(L>0&&L-base>best){best=L-base;bq={x:q.x,z:q.z}}}
      if(best>0){WC.list.push([w,best,bq]);if(!WC45.best||best>WC45.best.n)WC45.best={w,n:best,q:bq}}}rebuildEdges()}catch(e){rebuildEdges()}WC.key=B.ver+':'+hx+','+hz;WC45.calc=(WC45.calc|0)+1}
  const B5=WC45.best&&B.walls.includes(WC45.best.w)&&!WC45.best.w.anim?WC45.best:null;
  if(B5){wc45Obj();const t=performance.now()/1000,pul=.5+.5*Math.sin(t*6);const w=B5.w;
    const[x,z,ry]=wallPos(w);WC45.glow.position.set(x,WH/2,z);WC45.glow.rotation.y=ry;WC45.glow.material.opacity=.4+.35*pul;WC45.glow.visible=true;
    const[gx,gz,gr]=wallPos({o:w.o,x:B5.q.x,z:B5.q.z});WC45.ghost.position.set(gx,WH/2,gz);WC45.ghost.rotation.y=gr;WC45.ghost.material.opacity=.3+.3*pul;WC45.ghost.visible=true}else wc45Hide();
  let html='';WC.list.forEach(([w,n],i)=>{const m=WORLD.wallMeshes.get(w);if(!m)return;const v=m.getWorldPosition(new THREE.Vector3()).setY(WH+.6).project(camera);if(v.z>1)return;
    const top=B5&&B5.w===w;html+=`<span data-i="${i}" class="${top?'top':''}" style="left:${((v.x+1)/2*innerWidth).toFixed(0)}px;top:${((1-v.y)/2*innerHeight).toFixed(0)}px">+${n}</span>`});
  if(box.innerHTML!==html)box.innerHTML=html};
{const st=document.createElement('style');st.textContent=`#wcLab span.top{font-size:17px;background:linear-gradient(#ffe36b,#ffb21e);color:#5a2a00;border-color:#fff;box-shadow:0 0 0 2px #8a4b00,0 0 12px #ffd23a;z-index:6;padding:3px 8px;animation:wcTop .9s ease-in-out infinite alternate}
@keyframes wcTop{to{transform:translate(-50%,-100%) scale(1.15)}}`;document.head.appendChild(st)}
