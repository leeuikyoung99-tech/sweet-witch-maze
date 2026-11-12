/* ================= 51차: 시작 화면 겹침 정리 · 두 수 보기 (원할 때) ================= */
// 3초 세기: 지난 판의 시간 · 버닝 표시가 남지 않게 바로 새로 그려요
{const sc=startCountdown;startCountdown=function(){const r=sc.apply(this,arguments);try{$('burn').hidden=true;const d=$('dtimer');if(d){d.textContent=fmt(ROUND);d.classList.remove('burn')}}catch(e){}try{if(G.hero)updHUD()}catch(e){}return r}}
// 3초 세는 동안 나온 알림은 세기가 끝난 뒤에 보여 줘요 · 알림이 떠 있는 동안 안내 문구는 잠깐 숨겨요
const SAYQ={m:null};
{const s0=say;say=function(t,warn,dur,small){if(G&&G.cdn&&typeof t==='string'){SAYQ.m=[...arguments];return}
  const r=s0.apply(this,arguments);try{const dh=$('dhint');if(dh&&G.mode==='devil'){dh.style.transition='opacity .25s';dh.style.opacity=0;clearTimeout(SAYQ.h);SAYQ.h=setTimeout(()=>{dh.style.opacity=''},((dur||1.5)*1000)+200)}}catch(e){}return r}}
setInterval(()=>{if(SAYQ.m&&G&&!G.cdn){const a=SAYQ.m;SAYQ.m=null;if(screen==='play'&&!G.over)say(...a)}},150);
{const nm=newMatch;newMatch=function(){SAYQ.m=null;return nm.apply(this,arguments)}}
// 상대 증강체: 가운데 큰 창 대신 왼쪽 '상대' 줄을 3초 동안 반짝여요
showOpAugs=function(){const el=$('opAugShow');if(el)el.hidden=true;const H=$('augHud');if(!H)return;H.classList.remove('opfl');void H.offsetWidth;H.classList.add('opfl');clearTimeout(showOpAugs.t);showOpAugs.t=setTimeout(()=>H.classList.remove('opfl'),3200)};
{const st=document.createElement('style');st.textContent=`#augHud.opfl .op{animation:opFl .8s ease-in-out 4}@keyframes opFl{0%,100%{box-shadow:0 0 0 0 #ffd23a00}50%{box-shadow:0 0 0 4px #ffd23a}}`;document.head.appendChild(st)}

// ----- 두 수 앞 보기: 내가 원할 때 버튼으로 (판마다 한 번) · 도둑이 지금 있는 곳에서 출구까지 가장 멀어지게 -----
// 벽 스킬 카드를 고를 때 저절로 쓰이지 않아요
{const sc=selectCard;selectCard=function(i){const was=PLAN2.used;PLAN2.used=true;let r;try{r=sc.apply(this,arguments)}finally{PLAN2.used=was}return r}}
function p2Activate(){if(PLAN2.used||G.mode!=='devil'||!G.hero||G.over)return;const k=myWall();let p=null;try{p=p2Plan(k)}catch(e){p=null}
  if(!p){say('두 수 앞 보기 · 지금은 도둑 길을 늘릴 자리가 없어요',false,1.8);return}
  PLAN2.used=true;Object.assign(PLAN2,{on:true,k,steps:p.steps,gain:p.gain,tot:p.tot,i:0,cell:cellOf(G.hero.x,G.hero.z).join(),ver:B.ver,t:performance.now()});try{SFX.magic()}catch(e){}
  const nm=CARDS[k].n,cc=nm.charCodeAt(nm.length-1),jo=(cc>=0xAC00&&cc<=0xD7A3&&(cc-0xAC00)%28)?'을':'를';say(`두 수 앞 보기 · ${nm}${jo} ①→② 순서로 쓰면 도둑 길 +${p.tot}칸`,false,2.4);try{augHud()}catch(e){}}
// 도둑이 움직이면 그 자리에서 다시 계산해요 (1초에 한 번까지)
function p2Best1(kind,ex){const h=G.hero,I=idx(...cellOf(h.x,h.z)),base=exitField()[I];let best=null;
  try{for(const c of p2Cands(kind,ex)){const u=p2Do(c);const L=exitField()[I];u();rebuildEdges();if(L>0&&(!best||L>best.L))best=Object.assign(c,{L})}}finally{rebuildEdges();try{FIELD.clear()}catch(e){}}
  return best&&best.L>base?{c:best,g:best.L-base}:null}
setInterval(()=>{if(!PLAN2.on||G.mode!=='devil'||!G.hero||G.over)return;const cell=cellOf(G.hero.x,G.hero.z).join();if(cell===PLAN2.cell&&B.ver===PLAN2.ver)return;if(performance.now()-(PLAN2.t||0)<900)return;
  PLAN2.cell=cell;PLAN2.ver=B.ver;PLAN2.t=performance.now();
  if(PLAN2.i===0){let p=null;try{p=p2Plan(PLAN2.k)}catch(e){}if(p){PLAN2.steps=p.steps;PLAN2.gain=p.gain;PLAN2.tot=p.tot}}
  else if(PLAN2.i===1){const ex=PLAN2.steps[0]&&PLAN2.steps[0].w?[PLAN2.steps[0].w]:[];const b=p2Best1(PLAN2.k,ex);if(b){PLAN2.steps[1]=b.c;PLAN2.gain[1]=b.g;PLAN2.tot=(PLAN2.gain[0]||0)+b.g}else{PLAN2.on=false;say('두 수 앞 보기 · 지금은 더 늘릴 자리가 없어요',false,1.5)}}},300);
// 버튼: 오른쪽 카드 상자 바로 위 (판을 가리지 않게)
{const b=document.createElement('button');b.id='p2Btn';b.hidden=true;b.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="#ffc400" stroke="#4a2a1a" stroke-width="2"/><path d="M12 1.5 v4 M12 18.5 v4 M1.5 12 h4 M18.5 12 h4" stroke="#4a2a1a" stroke-width="2" stroke-linecap="round"/></svg><b>두 수 보기</b><small>판마다 한 번</small>';document.body.appendChild(b);
  b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();p2Activate()})}
function p2BtnSync(){const b=$('p2Btn');if(!b)return;const hand=$('hand');const want=screen==='play'&&G.mode==='devil'&&!G.over&&!G.cdn&&AG().w_plan2&&!PLAN2.used&&hand&&hand.getClientRects().length;
  b.hidden=!want;if(!want)return;let el=hand;for(let q=hand;q&&q!==document.body;q=q.parentElement){const cs=getComputedStyle(q);if(cs.position==='absolute'||cs.position==='fixed'){el=q;break}}const R=el.getBoundingClientRect();
  b.style.right=Math.max(6,innerWidth-R.right)+'px';b.style.bottom=(innerHeight-R.top+8)+'px';b.style.width=Math.max(120,Math.min(R.width,220))+'px'}
setInterval(p2BtnSync,250);
{const st=document.createElement('style');st.textContent=`#p2Btn{position:fixed;z-index:6;display:flex;align-items:center;justify-content:center;gap:6px;padding:5px 10px;border:3px solid var(--choco);border-radius:14px;background:linear-gradient(#ffe48a,#ffbd2e);box-shadow:0 3px 0 var(--choco);color:var(--choco);cursor:pointer;flex-wrap:wrap;animation:p2Pulse 1.6s ease-in-out infinite}#p2Btn[hidden]{display:none}
#p2Btn svg{width:22px;height:22px;flex:0 0 auto}#p2Btn b{font:15px var(--f-display)}#p2Btn small{font:10px var(--f-ui);opacity:.8;width:100%;text-align:center;margin-top:-3px}
@keyframes p2Pulse{0%,100%{box-shadow:0 3px 0 var(--choco),0 0 0 0 #ffd23a00}50%{box-shadow:0 3px 0 var(--choco),0 0 0 5px #ffd23a88}}`;document.head.appendChild(st)}
{const aa=augAct;augAct=function(a){if(a==='plan2'){p2Activate();return}return aa.apply(this,arguments)}}
{const a=AUGI2.w_plan2;if(a)a.d='판마다 한 번 버튼을 누르면|도둑 길이 가장 길어지는 벽 두 수를 알려줘요';const q=AUGW2.find(x=>x[0]==='w_plan2');if(q)q[3]='판마다 한 번 버튼을 누르면|도둑 길이 가장 길어지는 벽 두 수를 알려줘요'}
