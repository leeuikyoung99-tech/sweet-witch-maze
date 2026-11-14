/* ================= 32차 (나): 미니게임 진행 · 1장 보스 거대 막대사탕 · 스토리 화면 ================= */
// ----- 진행 표시 (사탕 n/N) -----
{const d=document.createElement('div');d.id='stgGoal';d.hidden=true;document.body.appendChild(d)}
function stGoalSync(){const st=G.stage,el=$('stgGoal');if(!el)return;const on=!!(st&&st.story&&st.type==='candy'&&screen==='play'&&!G.over);el.hidden=!on;if(on)el.innerHTML=`<i></i><b>${Math.min(G.hero.manaGot,st.need)}</b><span>/ ${st.need}</span>`}
// ----- 매 프레임 -----
const BOSS={};
{const ue=updEnts;updEnts=function(dt){ue.apply(this,arguments);try{storyTick(dt)}catch(e){console.warn(e)}}}
function storyTick(dt){const st=G.stage;if(!st||!st.story||G.over||G.mode!=='hero'||G.duo)return;const h=G.hero;
  if(st.type==='candy'){G.cT=(G.cT||0)-dt;if(G.cT<=0){G.cT=2.2;if(G.candies.filter(c=>!c.fake).length<10)spawnCandy()}
    if(h.manaGot>=st.need){endMatch(true,'candy');return}}
  if(st.type==='boss')bossTick(st.c,dt)}
setInterval(()=>stGoalSync(),200);
// ----- 1장 보스: 거대 막대사탕 (미로 가운데에서 한 바퀴씩 휩쓸고, 사탕 대포 3갈래) -----
function lollyBuild(){const W=N*C,R=W*.40;const g=new THREE.Group();const cx=W/2,cz=W/2;g.position.set(cx,0,cz);
  const mStick=new THREE.MeshPhongMaterial({color:'#fff6ee',shininess:60}),mHead=new THREE.MeshPhongMaterial({color:'#ff6fae',shininess:80,emissive:new THREE.Color('#ff3f8e'),emissiveIntensity:.15}),mSw=new THREE.MeshPhongMaterial({color:'#ffffff',shininess:80});
  const y=WH+1.2;const stick=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,R,12),mStick);stick.rotation.z=Math.PI/2;stick.position.set(R/2,y,0);g.add(stick);
  const head=new THREE.Mesh(new THREE.SphereGeometry(3.2,24,18),mHead);head.position.set(R,y,0);head.scale.y=.85;g.add(head);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(2.1,.45,10,28),mSw);ring.position.set(R,y,0);ring.rotation.y=Math.PI/2;g.add(ring);
  const ring2=new THREE.Mesh(new THREE.TorusGeometry(1.1,.4,10,24),mSw);ring2.position.set(R,y,0);ring2.rotation.y=Math.PI/2;g.add(ring2);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.6,WH+1.6,16),new THREE.MeshPhongMaterial({color:'#ffd35f'}));hub.position.set(0,(WH+1.6)/2,0);g.add(hub);
  // 바닥 경고 띠: 지금 막대 자리(진하게) · 곧 지나갈 자리(옅게)
  const band=(op,col)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(R+3.2,2.6),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2}));m.rotation.x=-Math.PI/2;m.position.set((R+3.2)/2,.08,0);const p=new THREE.Group();p.add(m);return p};
  const now=band(.5,'#ff2f62'),next=band(.25,'#ff7aa0');g.add(now);g.add(next);
  scene.add(g);Object.assign(BOSS,{on:'lolly',g,now,next,R,cx,cz,a:0,dir:1,w:2*Math.PI/10,shotT:3,flipT:14,pause:0})}
function lollyTick(dt){const h=G.hero;if(BOSS.on!=='lolly'){bossClear();lollyBuild();if(G.stage&&G.stage.c===1)say('롤리: 거대 막대사탕을 받아라!',true,2)}
  const B2=BOSS;if(B2.pause>0){B2.pause-=dt}else B2.a+=B2.w*B2.dir*dt;
  B2.flipT-=dt;if(B2.flipT<=0){B2.flipT=12+Math.random()*4;B2.pause=1.2;B2.dir*=-1;say('막대사탕이 반대로 돌아요!',true,1.2)}
  B2.g.rotation.y=-B2.a;B2.next.rotation.y=-B2.dir*.38;
  // 맞았는지: 막대(중심~끝)와 쿠키 사이 거리
  const ux=Math.cos(B2.a),uz=Math.sin(B2.a),rx=h.x-B2.cx,rz=h.z-B2.cz,along=rx*ux+rz*uz,perp=Math.abs(-rx*uz+rz*ux);
  if(along>0&&along<B2.R+3.2&&perp<(along>B2.R-3?3.2:1.3)){const px=B2.cx+ux*along,pz=B2.cz+uz*along;hurt({x:px,z:pz},16,'거대 막대사탕에 맞았어요!')}
  // 사탕 대포 3갈래 (사탕 머리에서)
  B2.shotT-=dt;if(B2.shotT<=0){B2.shotT=4.2;const hx=B2.cx+ux*B2.R,hz=B2.cz+uz*B2.R;if(Math.hypot(h.x-hx,h.z-hz)<34){const n0=G.projs.length;for(let i=0;i<3;i++)shoot({x:hx,z:hz,tk:'tower'});
      [-.28,0,.28].forEach((da,i)=>{const p=G.projs[n0+i];if(!p)return;const sp=Math.hypot(p.vx,p.vz)*.75,an=Math.atan2(p.vz,p.vx)+da;p.vx=Math.cos(an)*sp;p.vz=Math.sin(an)*sp})}}}
function bossClear(){if(BOSS.g){try{scene.remove(BOSS.g)}catch(e){}}for(const k in BOSS)delete BOSS[k]}
{const cw=clearWorld;clearWorld=function(){bossClear();return cw.apply(this,arguments)}}
{const em=endMatch;endMatch=function(){const r=em.apply(this,arguments);if(G.over&&BOSS.g)BOSS.pause=99;return r}}
// ----- 스토리 화면: 보스 칸 · 정보 창 -----
const CROWN31='<svg viewBox="0 0 48 30" aria-hidden="true"><path d="M4 26 L7 8 L16 17 L24 4 L32 17 L41 8 L44 26 Z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="4" r="3" fill="#ff6fae" stroke="#4a2a1a" stroke-width="2"/><circle cx="7" cy="8" r="2.4" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="2"/><circle cx="41" cy="8" r="2.4" fill="#7cc6ff" stroke="#4a2a1a" stroke-width="2"/></svg>';
const STT_IC={surv:'<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="#fff" stroke="#4a2a1a" stroke-width="2.4"/><path d="M12 8 V13 L15 15" stroke="#4a2a1a" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
  candy:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5.5" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="2.2"/><path d="M6.5 12 L2 8.5 V15.5 Z M17.5 12 L22 8.5 V15.5 Z" fill="#ff7eb6" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/></svg>',
  race:'<svg viewBox="0 0 24 24"><path d="M6 21 V3" stroke="#4a2a1a" stroke-width="2.4" stroke-linecap="round"/><path d="M6 4 H19 L16 8 L19 12 H6 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/><path d="M9 4 v8 M12.5 4 v8" stroke="#4a2a1a" stroke-width="1.6"/></svg>',
  witch:'<svg viewBox="0 0 24 24"><path d="M2 19 h20 M6 18 L12 3 L18 18Z" fill="#b98cff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/></svg>',
  puzzle:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M3 12 H13 M12 3 V8" stroke="#4a2a1a" stroke-width="2.4"/></svg>'};
function witchFace(c){const sv=$('bDevil').querySelector('svg').outerHTML.replace(/id="wf"/g,'id="wfB'+c+'"').replace(/url\(#wf\)/g,`url(#wfB${c})`);return sv}
{const rs=renderStages;renderStages=function(){rs.apply(this,arguments);const ch=STORY[STV.c-1];
  try{$('stages').querySelector('.pane-top b').textContent='스토리 · 달콤 별 조각';$('stgTot').innerHTML=`${recipes()} / ${8*STN} · ★ ${stars2()} / ${24*STN}`}catch(e){}
  for(const b of $('stgGrid').querySelectorAll('.st')){const n=+b.dataset.n,s=n%100,ty=stType(ch.n,s);
    if(ty==='boss'){b.classList.add('boss31');b.innerHTML=`<span class="bf ww${ch.n}">${witchFace(ch.n)}</span><span class="ss">${starRow(sb2(ch.n,s))}</span>`}
    else if(STT_IC[ty]&&!b.querySelector('.ty'))b.insertAdjacentHTML('beforeend',`<span class="ty">${STT_IC[ty]}</span>`)}
  const st=stDef(ch.n,STV.s),bits=sb2(ch.n,STV.s),open=stOpen2(ch.n,STV.s),goals=stGoals3(st);
  const cards=(st.type==='esc'||st.type==='boss'||st.type==='surv'||st.type==='candy')?`<div class="si-cards">${st.deck.slice(0,6).map(k=>`<span class="si-c">${ART[k]||''}</span>`).join('')}</div>`:'';
  const gift=st.type==='boss'&&BOSS_BOX[ch.n]!=null?` · ${boxName(BOSS_BOX[ch.n])} · 카드 1장`:'';
  $('stgInfo').innerHTML=`<div class="si-h"><b>${ch.n}장 ${STV.s}단계 · ${STT_N[st.type]}</b></div>${cards}`+
    `<ul class="si-g">${goals.map((g,i)=>`<li class="${(bits>>i)&1?'ok':''}"><i>★</i>${g}</li>`).join('')}</ul>`+
    `<div class="si-rw">보상: ${COIN_SVG}${stFirst(ch.n)}코인 · 별 5코인${gift}</div>`+
    `<button class="mbtn berry small" id="bStgGo"${open?'':' disabled'}><span class="mt"><b>${open?'시작!':'앞 단계를 깨요'}</b></span></button>`;
  const go=$('bStgGo');if(go)go.onclick=async()=>{await initAudio();startStage(ch.n*100+STV.s)}}}
{const st=document.createElement('style');st.textContent=`
#stgGoal{position:fixed;left:max(14px,env(safe-area-inset-left,0px));top:calc(72px + env(safe-area-inset-top,0px));z-index:12;display:flex;align-items:center;gap:6px;padding:4px 14px;background:#fff8eee6;border:3px solid var(--choco);border-radius:16px;box-shadow:0 3px 0 var(--choco);font:18px var(--f-display);color:var(--choco);pointer-events:none}
#stgGoal[hidden]{display:none}#stgGoal i{width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff 0 18%,#ff7eb6 22%);border:2px solid var(--choco)}#stgGoal span{font-size:14px;color:#8a5a40}
#stgGrid .st .ty{position:absolute;right:4px;top:4px;width:18px;height:18px;z-index:2}#stgGrid .st .ty svg{width:100%;height:100%}
#stgGrid .st.boss31{position:relative;overflow:visible;padding:0!important;background:linear-gradient(#ffe9a8,#ffc94a)!important;border-color:#4a2a1a!important;box-shadow:0 4px 0 var(--choco),0 0 0 3px #fff6 inset,0 0 14px 3px #ffc23acc!important}
#stgGrid .st.boss31 .wh{display:none}
#stgGrid .st.boss31 .bc{position:absolute;left:50%;top:-14px;transform:translateX(-50%);width:42px;height:26px;z-index:3;filter:drop-shadow(0 2px 0 #4a2a1a55)}#stgGrid .st.boss31 .bc svg{width:100%;height:100%}
#stgGrid .st.boss31 .bf{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:72%;max-width:78px;aspect-ratio:1;display:grid;place-items:center}#stgGrid .st.boss31 .bf svg{width:100%;height:100%}
.ww2 svg{filter:hue-rotate(170deg)}.ww3 svg{filter:hue-rotate(60deg) saturate(1.3)}.ww4 svg{filter:hue-rotate(110deg)}.ww5 svg{filter:sepia(.6) hue-rotate(-20deg) saturate(1.4)}.ww6 svg{filter:hue-rotate(200deg) brightness(1.08)}.ww7 svg{filter:hue-rotate(250deg)}.ww8 svg{filter:grayscale(.6) brightness(.7) hue-rotate(220deg)}
.si-cards{display:flex;gap:4px;flex-wrap:wrap}.si-c{width:28px;height:28px;border-radius:8px;background:#f3e6d6;border:2px solid #d9c3a8;display:grid;place-items:center}.si-c svg{width:24px;height:24px}
.si-rw{font:15px var(--f-display)!important}
.cp-grid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:460px;max-height:calc(100dvh - 110px);overflow-y:auto;padding:4px}.cp-c{zoom:.8}.cp-c{cursor:pointer}.cp-c .dk{width:80px!important;height:92px!important;pointer-events:none}
`;document.head.appendChild(st)}
