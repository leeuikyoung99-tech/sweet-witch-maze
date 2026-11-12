/* ================= 43차: 이모티콘 (게임 중 · 게임 끝나고) — 작고 짧게, 누르는 걸 막지 않게 ================= */
const EMO_FACE=(inner,bg)=>`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="25" r="19" fill="${bg||'#e3a659'}" stroke="#4a2a1a" stroke-width="3"/><circle cx="14" cy="17" r="1.8" fill="#8a5a30"/><circle cx="34" cy="34" r="1.8" fill="#8a5a30"/><circle cx="33" cy="15" r="1.5" fill="#8a5a30"/>${inner}</svg>`;
const EMO=[
  ['hi','안녕',EMO_FACE('<circle cx="18" cy="23" r="2.4" fill="#4a2a1a"/><circle cx="30" cy="23" r="2.4" fill="#4a2a1a"/><path d="M18 30 q6 5 12 0" stroke="#4a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="13" cy="29" r="2.6" fill="#ff9ec7"/><circle cx="35" cy="29" r="2.6" fill="#ff9ec7"/><path d="M40 8 q4 3 2 8 M44 6 q4 5 1 11" stroke="#4a2a1a" stroke-width="2" fill="none" stroke-linecap="round"/>')],
  ['lol','ㅋㅋ',EMO_FACE('<path d="M14 22 q4-4 8 0 M26 22 q4-4 8 0" stroke="#4a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M15 28 h18 q-1 10-9 10 q-8 0-9-10z" fill="#7a2a2a" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/><path d="M19 34 q5 3 10 0" fill="#ff7e9e"/><path d="M8 18 l-3 4 M40 18 l3 4" stroke="#7cc6ff" stroke-width="2.4" stroke-linecap="round"/>')],
  ['cry','엉엉',EMO_FACE('<path d="M14 21 q4 3 8 0 M26 21 q4 3 8 0" stroke="#4a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M17 23 q-2 8 0 14 M31 23 q2 8 0 14" stroke="#7cc6ff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M19 34 q5-4 10 0" stroke="#4a2a1a" stroke-width="2.4" fill="none" stroke-linecap="round"/>')],
  ['grr','흥!',EMO_FACE('<path d="M13 17 l8 4 M35 17 l-8 4" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/><circle cx="18" cy="25" r="2.4" fill="#4a2a1a"/><circle cx="30" cy="25" r="2.4" fill="#4a2a1a"/><path d="M18 34 q6-4 12 0" stroke="#4a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M38 6 l2 4 4-1-2 4 3 3-4 0-1 4-2-4-4 1 2-4-3-3 4 0z" fill="#ff5f5f"/>','#ef8f5a')],
  ['love','좋아',EMO_FACE('<path d="M18 27 c-5-3-6-8-2-9 c2 0 2 2 2 2 c0 0 0-2 2-2 c4 1 3 6-2 9z M30 27 c-5-3-6-8-2-9 c2 0 2 2 2 2 c0 0 0-2 2-2 c4 1 3 6-2 9z" fill="#ff4f93" stroke="#4a2a1a" stroke-width="1.6"/><path d="M18 32 q6 5 12 0" stroke="#4a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>')],
  ['wow','헉!',EMO_FACE('<circle cx="18" cy="22" r="3.6" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><circle cx="30" cy="22" r="3.6" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><circle cx="18" cy="22" r="1.6" fill="#4a2a1a"/><circle cx="30" cy="22" r="1.6" fill="#4a2a1a"/><ellipse cx="24" cy="33" rx="4" ry="5" fill="#7a2a2a" stroke="#4a2a1a" stroke-width="2"/><path d="M41 10 v8 M41 22 v1" stroke="#4a2a1a" stroke-width="3" stroke-linecap="round"/>')],
  ['gg','GG',`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 22 h6 l6-12 q4 0 4 4 l-2 8 h10 q4 0 3 5 l-3 12 q-1 3-4 3 h-14 l-6-3z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="3" stroke-linejoin="round"/><rect x="5" y="21" width="8" height="21" rx="2" fill="#7ee8c8" stroke="#4a2a1a" stroke-width="3"/></svg>`],
  ['tongue','메롱',EMO_FACE('<path d="M14 22 q4-3 8 0" stroke="#4a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="30" cy="22" r="2.4" fill="#4a2a1a"/><path d="M16 30 q8 4 16 0" stroke="#4a2a1a" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M22 31 q0 9 5 9 q5 0 4-8" fill="#ff7e9e" stroke="#4a2a1a" stroke-width="2"/>')]];
const EMOK=Object.fromEntries(EMO.map(e=>[e[0],e]));
const EMS={t:0,open:false,mute:false,h:null};
const emoCtx=()=>{if(window.__simFast||window.__aiBoth)return null;if(G.tutor||(typeof TU!=='undefined'&&TU.on))return null;if(G.stage||G.chal)return null;
  const live=NET.on||(SER&&SER.on)||!!G.duo;if(!live)return null;if(screen==='play'&&!G.over)return G.mode==='devil'?'devil':'hero';if(screen==='result')return'res';return null};
{const b=document.createElement('button');b.id='emoBtn';b.hidden=true;b.setAttribute('aria-label','이모티콘');b.innerHTML=EMO[0][2];document.body.appendChild(b);
  const p=document.createElement('div');p.id='emoPan';p.hidden=true;p.innerHTML=EMO.map(([k,n,s])=>`<button data-k="${k}" aria-label="${n}">${s}<b>${n}</b></button>`).join('')+`<button data-k="mute" class="emo-mute" aria-label="상대 이모티콘 끄기"></button>`;document.body.appendChild(p);
  const box=document.createElement('div');box.id='emoBox';document.body.appendChild(box);
  const stop=e=>{e.stopPropagation()};for(const el of[b,p])for(const ev of['pointerdown','touchstart','mousedown'])el.addEventListener(ev,stop,{passive:true});
  b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();EMS.open=!EMS.open;p.hidden=!EMS.open;emoLayout();clearTimeout(EMS.h);if(EMS.open)EMS.h=setTimeout(()=>{EMS.open=false;p.hidden=true},5000)});b.onclick=e=>{e.preventDefault();e.stopPropagation()};
  p.onclick=e=>{e.stopPropagation()};p.addEventListener('pointerdown',e=>{const k=e.target.closest('[data-k]');if(!k)return;e.preventDefault();e.stopPropagation();if(k.dataset.k==='mute'){EMS.mute=!EMS.mute;emoMuteBtn();return}emoSend(k.dataset.k)})}
function emoMuteBtn(){const m=$('emoPan').querySelector('.emo-mute');m.innerHTML=EMS.mute?'<svg viewBox="0 0 24 24"><path d="M4 9 h4 l5-4 v14 l-5-4 h-4z" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><path d="M16 9 l5 6 M21 9 l-5 6" stroke="#e8364f" stroke-width="2.4" stroke-linecap="round"/></svg><b>상대 끔</b>':'<svg viewBox="0 0 24 24"><path d="M4 9 h4 l5-4 v14 l-5-4 h-4z" fill="#fff" stroke="#4a2a1a" stroke-width="2" stroke-linejoin="round"/><path d="M16 9 q3 3 0 6 M18 6 q6 6 0 12" stroke="#4a2a1a" stroke-width="2" fill="none" stroke-linecap="round"/></svg><b>상대 켬</b>'}
emoMuteBtn();
function emoSend(k){const now=performance.now();if(now-EMS.t<2500){SFX.deny();return}EMS.t=now;EMS.open=false;$('emoPan').hidden=true;
  emoPop(k,true);try{SFX.card()}catch(e){}
  if(NET.on){try{netSend({t:'emo',k})}catch(e){}}
  else if(Math.random()<.6){const R={hi:['hi','tongue'],lol:['lol','tongue','grr'],cry:['lol','hi','tongue'],grr:['tongue','lol','grr'],love:['love','hi'],wow:['wow','lol'],gg:['gg','love'],tongue:['grr','tongue','cry']}[k]||['hi'];
    const r=R[Math.floor(Math.random()*R.length)];setTimeout(()=>{if(emoCtx())emoPop(r,false)},900+Math.random()*900)}}
function emoPop(k,mine){const E=EMOK[k];if(!E)return;if(!mine&&EMS.mute)return;const box=$('emoBox');
  for(const o of box.querySelectorAll(mine?'.me':'.op'))o.remove();
  const d=document.createElement('div');d.className='emo-b '+(mine?'me':'op');d.innerHTML=`${E[2]}<i>${mine?'나':'상대'}</i>`;box.appendChild(d);emoLayout();
  if(!mine)try{tone&&tone(880,.08,'sine',.04)}catch(e){}
  setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),300)},2200)}
{const nm=netMsg;netMsg=function(d){if(d&&d.t==='emo'){if(EMOK[d.k]&&emoCtx())emoPop(d.k,false);return}return nm(d)}}
// 자리: 도둑은 '1인칭' 버튼 아래, 마녀는 일시정지 버튼 왼쪽, 결과 화면은 왼쪽 위 · 말풍선은 그 버튼 바로 아래
function emoLayout(){const c=emoCtx(),b=$('emoBtn'),p=$('emoPan'),box=$('emoBox');if(!c){if(!b.hidden){b.hidden=true;p.hidden=true;EMS.open=false}box.hidden=true;return}
  b.hidden=false;box.hidden=false;let x,y;const S=36;
  if(c==='hero'){const a=$('bView');const r=a&&a.offsetParent?a.getBoundingClientRect():null;if(r){x=r.right-S;y=r.bottom+8}else{x=innerWidth-260;y=58}}
  else if(c==='devil'){const a=$('bPauseD');const r=a&&a.offsetParent?a.getBoundingClientRect():null;if(r){x=r.left-S-8;y=r.top+3}else{x=innerWidth-100;y=10}}
  else{x=12;y=12}
  b.style.left=x+'px';b.style.top=y+'px';
  const pw=Math.min(innerWidth-16,9*44+10);let px=Math.min(Math.max(8,x+S-pw),innerWidth-pw-8);if(c==='res')px=8;p.style.left=px+'px';p.style.top=(y+S+6)+'px';p.style.width=pw+'px';
  box.style.left=(c==='res'?x:x+S-52)+'px';box.style.top=(y+S+6)+'px'}
setInterval(emoLayout,300);
{const ts=titleScreen;titleScreen=function(){const r=ts.apply(this,arguments);EMS.open=false;$('emoPan').hidden=true;$('emoBox').innerHTML='';emoLayout();return r}}
{const st=document.createElement('style');st.textContent=`
#emoBtn,#emoPan{touch-action:none}#emoBtn{position:fixed;z-index:46;width:36px;height:36px;padding:2px;border-radius:50%;border:2.5px solid var(--choco);background:#fff8ee;box-shadow:0 3px 0 var(--choco);cursor:pointer;display:grid;place-items:center}
#emoBtn[hidden]{display:none}#emoBtn svg{width:100%;height:100%}#emoBtn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--choco)}
#emoPan{position:fixed;z-index:47;display:flex;flex-wrap:wrap;justify-content:center;gap:4px;padding:5px;background:#fff8eef2;border:2.5px solid var(--choco);border-radius:16px;box-shadow:0 4px 0 var(--choco);box-sizing:border-box}
#emoPan[hidden]{display:none}
#emoPan button{width:40px;height:44px;padding:0;border:0;background:none;display:flex;flex-direction:column;align-items:center;cursor:pointer;color:var(--choco)}
#emoPan button svg{width:30px;height:30px}#emoPan button b{font:10px var(--f-display);font-weight:normal;line-height:12px;white-space:nowrap}
#emoPan button:active{transform:scale(.9)}#emoPan .emo-mute svg{width:22px;height:22px;margin:4px 0}
#emoBox{position:fixed;z-index:45;display:flex;flex-direction:column;gap:4px;pointer-events:none}
#emoBox[hidden]{display:none}
.emo-b{position:relative;width:52px;height:52px;border-radius:16px;background:#fff8eee8;border:2.5px solid var(--choco);box-shadow:0 3px 0 #4a2a1a88;display:grid;place-items:center;animation:emoIn .35s cubic-bezier(.2,1.6,.4,1) both;transition:opacity .3s,transform .3s}
.emo-b svg{width:40px;height:40px}.emo-b.op{border-color:#e8407e;background:#fff0f6e8}.emo-b.me{border-color:#1f9e78;background:#effff8e8}
.emo-b i{position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);font:9.5px var(--f-display);font-style:normal;color:#fff;border-radius:6px;padding:0 5px;white-space:nowrap}.emo-b.op i{background:#e8407e}.emo-b.me i{background:#1f9e78}
.emo-b.out{opacity:0;transform:scale(.8)}
@keyframes emoIn{from{transform:scale(.3);opacity:0}}`;document.head.appendChild(st)}
try{AVOID.hero.push('emoBtn');AVOID.devil.push('emoBtn')}catch(e){}
// ----- 행운 상자: 처음 나올 때 무작위 프리즘 1개 + 골드 1개를 뽑고, 그 대결 내내 고정 -----
{const ba=buildAug;buildAug=function(){const A=ba.apply(this,arguments);try{const S=curSer();if(!A.tn_lucky||!S)return A;
  if(A.lucky){const o=A.lucky;A[o]=false;if(AUGMAP[o]&&!(A.ids&&[...A.ids].some(x=>x!==o&&AUGMAP[x]===AUGMAP[o])))A[AUGMAP[o]]=false;A.lucky=null}
  if(!S.luckyFix){const rnd=seededRnd((S.seed||7)*197+(S.r|0)*23+9);const pick=t=>{const pool=AUGT2.map(q=>q[0]).filter(id=>AUGI2[id]&&AUGI2[id].tier===t&&AUGI2[id].side==='t'&&!A.ids.has(id)&&augTy(id)!=='gacha'&&!AUGSTK[id]);return pool.length?pool[Math.floor(rnd()*pool.length)]:null};
    const p=pick('p'),g=pick('g');S.luckyFix=[p,g].filter(Boolean);S.luckyNew=S.r}
  const L=S.luckyFix;for(const id of L){A[id]=true;if(AUGMAP[id])A[AUGMAP[id]]=true}A.lucky=L[0]||null;A.lucky2=L[1]||null;A.luckyNew=S.luckyNew===S.r}catch(e){}return A}}
