/* ================= 39차: 큰 화면 통일 (카드·스킬 화면과 같은 큰 네모 + 위쪽 제목줄 + 오른쪽 위 X) · 친구 목록 카드 ================= */
const UNI=[
  {box:'#role .slab',title:()=>({ai:'혼자 하기',rand:'아무나와 하기',friend:'친구랑 하기'}[ROLECTX]||'게임 고르기'),x:'bRoleBack',mid:'roleTabs'},
  {box:'#skillS .skill-slab',title:b=>{const k=b.querySelector('.kicker');return k&&k.textContent.trim()||'스킬 고르기'},x:'bSkBack'},
  {box:'#pgM.fw-on #pgBody',title:()=>'친구랑 하기',x:'bFwX'},
  {box:'#lobby .slab',title:()=>{const k=$('lobKick');return k&&k.textContent.trim()||'친구랑 하기'},x:'bLobBack',xIf:()=>$('bLobBack').classList.contains('ic-back')||$('lobby').classList.contains('pick')},
  {box:'#rankM .rank-slab',title:()=>'랭크',x:'bRankX'},
  {box:'#dexM .dex31',title:()=>'증강체',x:'bDexX',mid:'dexTabs'},
  {box:'#chal .slab',title:b=>{const k=b.querySelector('.kicker');return k&&k.textContent.trim()||'미로 도전'},x:'bChalX'}];
function uniX(x,on,top){if(!x)return;if(on){if(x.parentElement!==top){if(!x._home)x._home={p:x.parentElement,n:x.nextSibling};top.appendChild(x)}if(!x.classList.contains('bk31')){x.classList.add('bk31');x._uniBk=1}x.classList.add('uni-x');x.classList.remove('abs','pg31x')}
  else if(x._home&&x.parentElement===top){x._home.p.insertBefore(x,x._home.n&&x._home.n.parentElement===x._home.p?x._home.n:null);x.classList.remove('uni-x');if(x._uniBk){x.classList.remove('bk31');x._uniBk=0}}}
function uniApply(){for(const d of UNI){const b=document.querySelector(d.box);if(!b)continue;b.classList.add('uni-pane');
    let top=b.querySelector(':scope>.uni-top');if(!top){top=document.createElement('div');top.className='pane-top uni-top';top.innerHTML='<b class="uni-t"></b><div class="uni-mid"></div>';b.prepend(top)}
    const t=d.title(b),tt=top.querySelector('.uni-t');if(tt.dataset.k!==t){tt.dataset.k=t;tt.textContent=t}
    if(d.mid){const m=$(d.mid);if(m&&m.parentElement!==top.querySelector('.uni-mid'))top.querySelector('.uni-mid').appendChild(m)}
    uniX($(d.x),d.xIf?d.xIf():true,top)}
  // 친구랑 하기 고르기 창이 아닐 때는 일반 작은 창으로 돌려놔요
  const pb=$('pgBody'),pm=$('pgM');if(pb&&pm&&!pm.classList.contains('fw-on')&&pb.classList.contains('uni-pane')){pb.classList.remove('uni-pane');const t=pb.querySelector(':scope>.uni-top');if(t){const x=t.querySelector('.uni-x');if(x)uniX(x,false,t);t.remove()}}}
{let q=0;const run=()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;if(screen==='play'&&!G.over)return;try{uniApply()}catch(e){}})};
  new MutationObserver(run).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class']});setTimeout(run,300)}
{const S=['#role .slab','#skillS .skill-slab','#pgM.fw-on #pgBody','#lobby .slab','#rankM .rank-slab','#dexM .dex31','#chal .slab','#passM .ps31'].map(s=>s+'.uni-pane');
  const st=document.createElement('style');st.textContent=`
${S.join(',')}{position:relative!important;background:#fff8ee!important;border:3px solid var(--choco)!important;border-radius:22px!important;box-shadow:0 6px 0 var(--choco)!important;padding:64px 14px 12px!important;width:min(820px,100%)!important;max-width:none!important;min-width:0!important;height:100%!important;max-height:none!important;box-sizing:border-box!important;overflow-y:auto!important;overflow-x:hidden!important;margin:0!important;transform:none!important}
.uni-pane>.uni-top{position:absolute;left:14px;right:14px;top:10px;display:flex;align-items:center;gap:10px;margin:0;z-index:5;min-height:44px}
.uni-top .uni-t,#misS .pane-top>b,#friendS .pane-top>b,#stages .pane-top>b{font:22px var(--f-display)!important;color:var(--choco)!important;white-space:nowrap}
#pgM.fw-on #pgBody.uni-pane{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important}
#role .slab.uni-pane,#skillS .skill-slab.uni-pane,#rankM .rank-slab.uni-pane,#chal .slab.uni-pane{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:safe center!important}
.uni-top .uni-mid{flex:1;display:flex;justify-content:center;min-width:0}
.uni-top>.uni-x{position:static!important;margin-left:auto!important;order:99;left:auto!important;right:auto!important;top:auto!important}
.uni-pane>.kicker,#lobby .slab.uni-pane>#lobKick{display:none!important}
#role,#skillS,#rankM,#dexM,#passM,#pgM.fw-on{background:rgba(255,217,232,.8)!important;background-image:none!important;padding:10px 16px!important;align-items:flex-start!important;justify-content:center!important}
#role .uni-mid .role-tabs{margin:0}#role .uni-mid .role-tabs button{height:40px}
#dexM .dex31.uni-pane{justify-content:flex-start!important}#dexM .dex31.uni-pane .dex-body{flex:1;min-height:0;width:100%;overflow-y:auto}
#rankM .rank-slab.uni-pane .rk3{width:min(640px,100%)}
#pgM.fw-on #pgBody.uni-pane .fw31{position:static;display:flex;gap:18px;justify-content:center;align-items:center}
/* 모든 큰 화면: 같은 크기 */
#misS .pane,#friendS .pane{width:min(820px,100%)!important;height:100%!important;max-height:none!important;box-sizing:border-box}
#misS,#friendS,#stages,#lobby,#chal{padding:10px 16px!important;align-items:flex-start!important}
/* 상점: 오른쪽 상자의 오른쪽 변을 다른 큰 화면과 맞춰요 */
#shop{padding-right:max(16px,calc((100vw - 820px) / 2))!important;padding-top:10px!important;padding-bottom:10px!important}
/* 패스: 같은 크림색 큰 네모 안에, 보상 줄은 밤하늘 상자로 */
#passM .ps31.uni-pane{padding:10px 14px 12px!important;justify-content:flex-start!important;align-items:stretch!important}
#passM .ps31.uni-pane .ps-top{flex:none;min-height:44px}
#passM .ps31.uni-pane .ps-top #bPassX{order:99;margin-left:auto!important;position:static!important}
#passM .ps31.uni-pane .ps-track{background:radial-gradient(ellipse at 50% -10%,#5a4a9a 0%,#2e2556 55%,#1b1534 100%);border:3px solid var(--choco);border-radius:18px;padding:8px}
#passM .ps31.uni-pane .ps-foot{flex:none}
#passM .ps31.uni-pane .ps-top,#passM .ps31.uni-pane .ps-top *{color:var(--choco)!important;text-shadow:none!important}#passM .ps31.uni-pane .ps-tt b,#passM .ps31.uni-pane .ps-tt>:first-child{font-size:22px!important}`;document.head.appendChild(st)}
// 패스는 위 제목줄이 원래 있어서 큰 네모 모양만 입혀요
{const po=passOpen;passOpen=function(){const r=po.apply(this,arguments);const b=document.querySelector('#passM .ps31');if(b){b.classList.add('uni-pane');const x=$('bPassX');if(x){x.classList.add('bk31');x.classList.remove('ic-back')}}return r}}
// ----- 친구 목록: 친구마다 카드 -----
const frHue=id=>{let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))%360;return h};
const frAvatar=id=>{const h=frHue(id);return`<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" fill="hsl(${h},70%,72%)" stroke="#4a2a1a" stroke-width="3"/><circle cx="24" cy="26" r="13" fill="#f2b980" stroke="#4a2a1a" stroke-width="2.5"/><circle cx="19" cy="24" r="2.2" fill="#4a2a1a"/><circle cx="29" cy="24" r="2.2" fill="#4a2a1a"/><path d="M20 30 q4 3 8 0" stroke="#4a2a1a" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="15" cy="28" r="2" fill="#ff9ec7"/><circle cx="33" cy="28" r="2" fill="#ff9ec7"/></svg>`};
frRender=function(){if(screen!=='friendS')return;
  $('frMe').innerHTML=`<span class="fr-mycard"><span class="fr-av sm">${frAvatar(SAVE.me.id)}</span><span class="fr-nm" data-ni="">${myNick()}</span><button class="fr-ed" id="bFrNick" aria-label="닉네임 바꾸기"><svg viewBox="0 0 24 24" aria-hidden="true" class="pen-svg"><path d="M4 20 l1-5 11-11 4 4-11 11z" fill="#ffd35f" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 6 l4 4" stroke="#4a2a1a" stroke-width="1.8"/><path d="M4 20 l1-5 4 4z" fill="#ff9ec7" stroke="#4a2a1a" stroke-width="1.5" stroke-linejoin="round"/></svg></button></span>`;{const fa=document.querySelector('#friendS .fr-add');let cb=$('frCodeBox');if(fa&&!cb){cb=document.createElement('span');cb.id='frCodeBox';fa.prepend(cb)}if(cb)cb.innerHTML=`<span class="fr-code">내 코드 <b>${SAVE.me.id}</b><button class="sbtn tiny" id="bFrCopy">복사</button></span>`}
  $('bFrNick').onclick=()=>frNickAsk();$('bFrCopy').onclick=async()=>{try{await navigator.clipboard.writeText(SAVE.me.id);tMsg('내 친구 코드를 복사했어요')}catch(e){tMsg('내 친구 코드: '+SAVE.me.id)}};
  const L=SAVE.friends.slice().sort((a,b)=>(FR.on[b.id]?1:0)-(FR.on[a.id]?1:0));
  $('frList').innerHTML=L.length?`<div class="fr-grid">${L.map(f=>{const on=FR.on[f.id],inf=FR.info[f.id],rk=inf?inf.rank:null;
    return`<div class="fr-card${on?' on':''}"><button class="fr-del" data-id="${f.id}" aria-label="친구 삭제">✕</button>
      <span class="fr-av">${frAvatar(f.id)}<i class="fr-dot"></i></span>
      <b class="fr-cn" data-ni="">${f.nick||'친구'}</b>
      <small class="fr-st">${on===undefined?'확인 중…':on?'접속 중':'접속 안 함'}</small>
      ${rk!=null?`<span class="fr-rk">${tierIcon(tierOf(rk))}${rankTxtP(rk)}</span>`:'<span class="fr-rk none">·</span>'}
      <span class="fr-rec">${frRecTxt(f.id)}</span>
      <button class="mbtn berry tiny fr-inv" data-id="${f.id}"${on?'':' disabled'}><span class="mt"><b>초대</b></span></button></div>`}).join('')}</div>`
    :`<div class="fr-empty"><svg viewBox="0 0 120 70" aria-hidden="true"><circle cx="40" cy="38" r="24" fill="#f2b980" stroke="#4a2a1a" stroke-width="3"/><circle cx="80" cy="38" r="24" fill="#ffb3d6" stroke="#4a2a1a" stroke-width="3"/><circle cx="33" cy="35" r="3" fill="#4a2a1a"/><circle cx="47" cy="35" r="3" fill="#4a2a1a"/><circle cx="73" cy="35" r="3" fill="#4a2a1a"/><circle cx="87" cy="35" r="3" fill="#4a2a1a"/><path d="M34 46 q6 5 12 0 M74 46 q6 5 12 0" stroke="#4a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M58 18 q2-6 6-2 q4-4 6 2 q-2 6-6 8 q-4-2-6-8z" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="2"/></svg><b>아직 친구가 없어요</b><span>친구 코드 6자리를 넣으면 친구가 돼요</span></div>`}
{const st=document.createElement('style');st.textContent=`
#friendS .pane-top{flex-wrap:nowrap}
.fr-me{justify-content:flex-start!important;gap:10px!important;flex-wrap:nowrap!important;min-width:0}
.fr-mycard{flex:none;display:flex;align-items:center;gap:6px;background:#fff;border:2.5px solid var(--choco);border-radius:999px;padding:2px 10px 2px 3px;min-width:0}
.fr-av{position:relative;display:grid;place-items:center;width:44px;height:44px;flex:none}.fr-av svg{width:100%;height:100%}.fr-av.sm{width:30px;height:30px}
.fr-mycard .fr-nm{white-space:nowrap}
.fr-code{display:flex;align-items:center;gap:6px;background:#fff3c4;border:2.5px solid var(--choco);border-radius:999px;padding:2px 4px 2px 12px;font:14px var(--f-display);color:var(--choco);white-space:nowrap}
.fr-code b{letter-spacing:.12em;color:#ff5f9e;font-size:16px}
.fr-add{align-items:center;justify-content:center;gap:10px!important;background:#f3e6d6;border-radius:16px;padding:5px;border:2px dashed #d9c3a8;flex:none}
.fr-card{gap:1px!important}.fr-card .fr-inv{margin-top:2px!important}
.fr-list{display:block!important}
.fr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;padding:4px 2px 8px}
.fr-card{position:relative;display:flex;flex-direction:column;align-items:center;gap:3px;background:#fff;border:3px solid var(--choco);border-radius:18px;box-shadow:0 4px 0 var(--choco);padding:7px 8px 8px;color:var(--choco);text-align:center;min-width:0}
.fr-card.on{background:linear-gradient(#f0fff8,#fff 60%)}
.fr-card .fr-dot{position:absolute;right:2px;bottom:4px;width:15px;height:15px;border-width:2.5px}
.fr-card:not(.on) .fr-dot{background:#c9b6a4!important;box-shadow:none!important}.fr-card.on .fr-dot{background:#3fdc8e;box-shadow:0 0 8px #3fdc8e}
.fr-cn{font:17px var(--f-display);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fr-st{font:12px var(--f-ui);color:#8a6a50}.fr-card.on .fr-st{color:#1f9e66}
.fr-rk{display:flex;align-items:center;gap:3px;font:12.5px var(--f-display)}.fr-rk svg{width:16px;height:16px}.fr-rk.none{display:none}
.fr-card .fr-rec{font:12px var(--f-display);color:#7a5236}
.fr-card .fr-inv{margin-top:4px;min-width:90px}
.fr-card .fr-del{position:absolute;right:6px;top:6px;width:24px;height:24px;padding:0;display:grid;place-items:center;border-radius:50%;font-size:11px}
.fr-empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:18px 8px;color:var(--choco)}.fr-empty svg{width:140px}.fr-empty b{font:18px var(--f-display)}.fr-empty span{font:13px var(--f-ui);color:#8a6a50}`;document.head.appendChild(st)}
{const st=document.createElement('style');st.textContent=`
#friendS .fr-add input{height:34px!important;min-height:0!important;padding-top:0!important;padding-bottom:0!important;font-size:15px!important}
#friendS .fr-add .mbtn{min-height:34px!important;height:34px!important;padding-top:0!important;padding-bottom:0!important}
#friendS .fr-add .mbtn .mt{padding-top:0!important;padding-bottom:0!important}
#friendS .pane>.note{flex:none;font-size:11.5px!important;margin:0!important}
.fr-cn{font-size:15px!important}`;document.head.appendChild(st)}
// 패스: 보상 동그라미를 칸 높이에 맞춰요 (아래가 잘리지 않게)
{const st=document.createElement('style');st.textContent=`
#passM .ps31.uni-pane .ps-track{padding:4px 6px}
#passM .ps-scroll{padding:6px 0 8px}#passM .ps-lab{padding:6px 0 8px}
#passM .ps-cell{min-height:0;overflow:visible}
#passM .ps-cell>span{width:auto!important;height:min(70px,calc(100% - 12px))!important;max-width:86%;aspect-ratio:1}
#passM .ps-cell>span .pi-c svg,#passM .ps-cell>span svg{max-height:52%;width:auto}`;document.head.appendChild(st)}
// 패스: 큰 네모와 어울리게 밝은 색으로 (안쪽만 어둡지 않게)
{const st=document.createElement('style');st.textContent=`
#passM .ps31.uni-pane .ps-track{background:#f3e6d6!important;border:2px dashed #d9c3a8!important;border-radius:18px}
#passM .ps-cell.p{background:linear-gradient(#fff6d2,#ffe49a)!important;border-top-color:#e8a92a!important;border-bottom-color:#e8a92a!important}
#passM .ps-col:first-child .ps-cell.p,#passM .ps-col:last-child .ps-cell.p{border-left-color:#e8a92a!important;border-right-color:#e8a92a!important}
#passM .ps-cell.f{background:linear-gradient(#ffffff,#f4ecff)!important;border-top-color:#c9b6ee!important;border-bottom-color:#c9b6ee!important}
#passM .ps-col:first-child .ps-cell.f,#passM .ps-col:last-child .ps-cell.f{border-left-color:#c9b6ee!important;border-right-color:#c9b6ee!important}
#passM .ps-cell.p>span{background:radial-gradient(circle at 50% 35%,#fffbe8,#ffd86a 80%)!important;border:3px solid #4a2a1a!important;box-shadow:0 3px 0 #4a2a1a!important}
#passM .ps-cell.f>span{background:radial-gradient(circle at 50% 35%,#fff,#ece4fb 80%)!important;border:3px solid #4a2a1a!important;box-shadow:0 3px 0 #4a2a1a!important}
#passM .ps-cell .pi-c b,#passM .ps-cell.p .pi-c b{color:#4a2a1a!important}
#passM .ps-cell.lock>span::before{background-color:#4a2a1a!important}
#passM .ps-n::before{background:#e3d2bd!important}#passM .ps-col.reach .ps-n::before{background:#ffcf3a!important}
#passM .ps-n i{color:#8a6a50!important;background:#fff!important;border-color:#d9c3a8!important}
#passM .ps-col.reach .ps-n i{color:#4a2a1a!important;background:#ffcf3a!important;border-color:#4a2a1a!important}
#passM .ps-lab span:not(.mid){border:3px solid #4a2a1a!important}#passM .ps-lab .mid{background:none!important;border:0!important}
#passM .ps-bar{border-color:#4a2a1a!important;background:#f3e6d6!important}
#passM .ps-own{color:#4a2a1a!important;background:#fff3c4!important;border-color:#e8a92a!important}`;document.head.appendChild(st)}
