// ===== 보상 창: 시즌 패스 + 레벨 보상 (탭) · 패스 꾸미기 =====
const PS_STAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6 l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4-5.7-3.1-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const PS_CROWN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 18 L2.5 7.5 L8 11.5 L12 4.5 L16 11.5 L21.5 7.5 L20.5 18 Z" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="1.8" fill="#ff6fa5" stroke="#4a2a1a" stroke-width="1.2"/></svg>';
const PS_CANDY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 12 L2.5 8.5 V15.5 Z M17.5 12 L21.5 8.5 V15.5 Z" fill="#7fe0c0" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="5.6" fill="#fff" stroke="#4a2a1a" stroke-width="1.8"/><path d="M8.4 9.5 Q12 12 9.2 15.6 M12.6 6.5 Q15.6 10 12.6 17.4 M15.6 8.6 Q17.6 12 15.2 15.4" fill="none" stroke="#7fe0c0" stroke-width="1.6" stroke-linecap="round"/></svg>';
const PS_UP='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#7fe0c0" stroke="#4a2a1a" stroke-width="1.8"/><path d="M12 17 V8 M7.8 11.6 L12 7.4 L16.2 11.6" fill="none" stroke="#4a2a1a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
// 홈 버튼 이름: 패스 → 보상
{const b=$('bPass');if(b)for(const n of b.childNodes)if(n.nodeType===3&&n.textContent.trim()==='패스')n.textContent='보상'}
// 위쪽 탭 + 시즌 표시를 아래로
{const m=$('passM');const tt=m.querySelector('.ps-tt');
  tt.insertAdjacentHTML('beforebegin',`<div class="rk3-tabs ps-tabs"><button data-t="pass">시즌 패스</button><button data-t="lv">레벨 보상</button></div>`);
  for(const b of m.querySelectorAll('.ps-tabs [data-t]'))b.onclick=()=>{if(m.dataset.tab===b.dataset.t)return;SFX.click();m.dataset.tab=b.dataset.t;passDraw();psScrollTo()};
  m.dataset.tab='pass'}
function psScrollTo(){const sc=$('psScroll');if(!sc)return;let t;
  if($('passM').dataset.tab==='lv')t=SAVE.lv-PSLV0;else{let f=0;for(let l=1;l<=passLv()&&!f;l++)if(passCan('f',l)||passCan('p',l))f=l;t=(f||Math.max(1,passLv()))-1}
  setTimeout(()=>{const c0=sc.children[0],c=sc.children[Math.max(0,t-1)];sc.style.scrollBehavior='auto';sc.scrollLeft=c&&c0?c.offsetLeft-c0.offsetLeft:0;sc.style.scrollBehavior=''},120)}
{const po=passOpen;passOpen=function(tab){const m=$('passM');m.dataset.tab=tab==='lv'?'lv':'pass';const r=po.apply(this,arguments);psScrollTo();return r}}
// 레벨 길: 2레벨부터 (적어도 50레벨까지, 내 레벨보다 20칸 더)
const PSLV0=2;
function psLvDraw(){const L=SAVE.lv,need=xpNeed(L),top=Math.max(50,Math.ceil((L+20)/10)*10);
  $('psLv').textContent=L;$('psBar').style.width=Math.min(100,SAVE.xp/need*100)+'%';$('psPts').textContent=`${SAVE.xp} / ${need}`;
  let h='';for(let l=PSLV0;l<=top;l++){const got=l<=L,nx=l===L+1,bx=l%10===0;
    const ic=bx?`<span class="pi-b bt${lvBox(l)}">${boxSvg(lvBox(l))}</span><em class="lv-nm">${boxName(lvBox(l))}</em>`:`<span class="pi-c">${COIN_SVG}<b>${LV_COIN}</b></span>`;
    h+=`<div class="ps-col${got?' reach':''}${l===L?' cur':''}${bx?' ms ms10':''}"><span class="ps-n"><i>${l}</i></span><div class="ps-cell lv${got?' reach got':''}${nx?' nx':''}${bx?' bx':''}">${bx?`<i class="ps-ray bt${lvBox(l)}"></i>`:''}${ic}${nx?'<em class="lv-tag">다음</em>':''}</div></div>`}
  $('psScroll').innerHTML=h;
  $('psFoot').innerHTML=`<span class="ps-ad lv-note">${PS_UP}<b>레벨이 오르면 바로 들어와요 · 10레벨마다 상자도 함께</b></span>`}
function psLab(tab){const lab=document.querySelector('#passM .ps-lab');if(!lab)return;const want=tab==='lv'?'lv':'pass';if(lab.dataset.m===want)return;lab.dataset.m=want;
  lab.innerHTML=want==='lv'?`<span class="lvl">${PS_UP}<em>레벨</em></span>`:`<span class="pr">${PS_CROWN}<em>패스</em></span><span class="mid"></span><span class="fr">${PS_CANDY}<em>무료</em></span>`}
{const pd=passDraw;passDraw=function(){const m=$('passM'),tab=m.dataset.tab||'pass';
  for(const b of m.querySelectorAll('.ps-tabs [data-t]'))b.classList.toggle('on',b.dataset.t===tab);
  m.classList.toggle('lvmode',tab==='lv');psLab(tab);
  if(tab==='lv'){psLvDraw();return}
  const r=pd.apply(this,arguments);
  // 칸 꾸미기: 상자는 등급 색 + 빛줄기, 꾸미기·전설은 큰 보상, 5단계마다 표시
  const cols=$('psScroll').children;for(let i=0;i<cols.length;i++){const l=i+1,col=cols[i];let big=0;
    for(const c of col.querySelectorAll('.ps-cell')){const k=c.classList.contains('p')?'p':'f',R=k==='p'?PASSP[l]:PASSF[l],sp=c.querySelector(':scope>span');if(!R||!sp)continue;
      if(R.b!=null){sp.classList.add('bt'+R.b);c.insertAdjacentHTML('afterbegin',`<i class="ps-ray bt${R.b}"></i>`);big=1}
      else if(R.o||R.L){c.insertAdjacentHTML('afterbegin',`<i class="ps-ray ${R.L?'bt4':'bto'}"></i>`);big=1}
      else if(R.c>=150)sp.classList.add('bigc')}
    if(big)col.classList.add('ms');if(l%10===0)col.classList.add('ms10');else if(l%5===0)col.classList.add('ms5')}
  const ad=$('psFoot').querySelector('.ps-ad b');if(ad&&!passS().prem){const nx=passNextP();ad.textContent=nx&&nx<=passLv()?`광고 1번 보고 ${nx}단계 보상 받기`:'패스 줄은 광고를 보고 받아요'}
  const left=`<span class="ps-season">${PS_STAR}<b>${SEASON.name}</b><small>${seasonLeft()}일 남음</small></span>`;
  $('psFoot').insertAdjacentHTML('afterbegin',left);
  return r}}
{const st=document.createElement('style');st.textContent=`
#bPass{min-width:0}
#passM .ps-tt{display:none!important}
#passM .ps-scroll{scroll-behavior:auto!important}
#passM .ps-tabs{flex:none}#passM .ps-tabs button{padding:4px 14px;white-space:nowrap}
#passM .ps31.uni-pane .ps-top .ps-tabs button.on{background:#ff8ab5!important;color:#fff!important;box-shadow:0 3px 0 var(--choco)}
#passM.lvmode #bPassAll{visibility:hidden}
/* 시즌 표시 (아래) */
#passM .ps-foot{gap:10px;flex-wrap:nowrap}
.ps-season{display:flex;align-items:center;gap:6px;flex:none;font:15px var(--f-display);color:var(--choco);background:linear-gradient(#fff6d2,#ffe49a);border:2.5px solid var(--choco);border-radius:14px;padding:5px 12px 5px 8px;box-shadow:0 3px 0 #4a2a1a55}
.ps-season svg{width:22px;height:22px;flex:none}.ps-season small{font:13px var(--f-display);color:#9a6a3a}
#passM .ps-ad{min-width:0}#passM .ps-ad b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
/* 진행 막대: 사탕 줄무늬 */
#passM .ps-bar i{background:repeating-linear-gradient(-45deg,#ff8ab5 0 8px,#ffb8d3 8px 16px)!important;background-size:22.6px 22.6px!important;animation:psStr 1s linear infinite;border-radius:6px}
@keyframes psStr{to{background-position:22.6px 0}}
#passM .ps-badge{width:46px!important;height:46px!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding-top:3px;box-sizing:border-box;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M24 3 l6 12.4 13.6 1.8-9.9 9.4 2.5 13.5L24 33.6 11.8 40.1l2.5-13.5-9.9-9.4L18 15.4z' fill='%23ffd23a' stroke='%234a2a1a' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E") center/contain no-repeat!important;filter:drop-shadow(0 2px 0 #4a2a1a66)}
#passM.lvmode .ps-badge{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='20' fill='%237fe0c0' stroke='%234a2a1a' stroke-width='3'/%3E%3Ccircle cx='24' cy='24' r='14' fill='none' stroke='%23fff' stroke-width='2' stroke-dasharray='3 4'/%3E%3C/svg%3E")!important;padding-top:0}
/* 판 배경: 축제 깃발 */
#passM .ps31.uni-pane .ps-track{position:relative;background:radial-gradient(circle,#ffffffaa 1.6px,transparent 2px) 0 0/18px 18px,linear-gradient(#ffe9f2,#fff3e6)!important;border:3px solid var(--choco)!important;padding:16px 6px 4px!important}
#passM .ps-track::before{content:"";position:absolute;left:10px;right:10px;top:-1px;height:13px;pointer-events:none;z-index:2;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 13'%3E%3Cpath d='M0 1.5 Q30 4 60 1.5' fill='none' stroke='%234a2a1a' stroke-width='1.5'/%3E%3Cpath d='M3 2.4 L11 2.9 L7 11z' fill='%23ff8ab5' stroke='%234a2a1a' stroke-width='1.2' stroke-linejoin='round'/%3E%3Cpath d='M18 3.3 L26 3.6 L22 12z' fill='%23ffd23a' stroke='%234a2a1a' stroke-width='1.2' stroke-linejoin='round'/%3E%3Cpath d='M33 3.6 L41 3.4 L37 12z' fill='%237fe0c0' stroke='%234a2a1a' stroke-width='1.2' stroke-linejoin='round'/%3E%3Cpath d='M48 2.9 L56 2.4 L52 11z' fill='%23b9a0ff' stroke='%234a2a1a' stroke-width='1.2' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0/60px 13px repeat-x}
/* 줄 이름표 */
#passM .ps-lab{width:44px}
#passM .ps-lab span:not(.mid){display:flex!important;flex-direction:column;align-items:center;justify-content:center;gap:4px;writing-mode:horizontal-tb!important;box-shadow:0 3px 0 #4a2a1a55}
#passM .ps-lab span svg{width:26px;height:26px;flex:none}
#passM .ps-lab em{font-style:normal;writing-mode:vertical-rl;letter-spacing:.12em}
#passM .ps-lab .fr{background:linear-gradient(#f1fff9,#bff0de)!important}
#passM .ps-lab .lvl{background:linear-gradient(#f1fff9,#bff0de)!important;color:var(--choco)}
/* 패스 줄: 금빛 사선 · 무료 줄: 민트 점무늬 */
#passM .ps-cell.p{background:repeating-linear-gradient(115deg,#ffffff55 0 10px,#fff0 10px 22px),linear-gradient(#fff3c4,#ffd96e)!important}
#passM .ps-cell.f{background:radial-gradient(circle,#ffffffb0 1.6px,transparent 2px) 0 0/14px 14px,linear-gradient(#f4fffa,#c9f2e2)!important;border-top-color:#5fc9a5!important;border-bottom-color:#5fc9a5!important}
#passM .ps-col:first-child .ps-cell.f,#passM .ps-col:last-child .ps-cell.f{border-left-color:#5fc9a5!important;border-right-color:#5fc9a5!important}
#passM .ps-cell.f>span{background:radial-gradient(circle at 50% 35%,#fff,#e2f8ef 80%)!important}
/* 레벨 길 */
#passM .ps-cell.lv{background:radial-gradient(circle,#ffffffb0 1.6px,transparent 2px) 0 0/14px 14px,linear-gradient(#f4fffa,#c9f2e2)!important;border-top:3px solid #5fc9a5;border-bottom:3px solid #5fc9a5}
#passM .ps-col:first-child .ps-cell.lv{border-left:3px solid #5fc9a5;border-radius:16px 0 0 16px}#passM .ps-col:last-child .ps-cell.lv{border-right:3px solid #5fc9a5;border-radius:0 16px 16px 0}
#passM .ps-cell.lv>span{background:radial-gradient(circle at 50% 35%,#fffbe8,#ffe08a 80%)!important;border:3px solid #4a2a1a!important;box-shadow:0 3px 0 #4a2a1a!important;height:min(64px,calc(100% - 40px))!important}
#passM .ps-cell.lv.bx>span{height:min(84px,calc(100% - 34px))!important}
#passM .ps-cell.lv{cursor:default}
#passM .ps-cell.lv.nx>span{animation:nx41 1.1s ease-in-out infinite}
#passM .lv-nm,#passM .lv-tag{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);font:12px var(--f-display);font-style:normal;white-space:nowrap;color:var(--choco);background:#fff;border:2px solid var(--choco);border-radius:9px;padding:0 6px;z-index:2}
#passM .lv-tag{background:#ff8ab5;color:#fff}
#passM .ps-cell.lv.bx .lv-tag{bottom:auto;top:4px}
/* 상자 칸: 등급 색 */
#passM .ps-cell>span.bt0{background:radial-gradient(circle at 50% 35%,#fff8ec,#f5cf9a 80%)!important}
#passM .ps-cell>span.bt1{background:radial-gradient(circle at 50% 35%,#fff,#ffc9de 80%)!important}
#passM .ps-cell>span.bt2{background:radial-gradient(circle at 50% 35%,#fff,#dcc8ff 80%)!important}
#passM .ps-cell>span.bt3{background:radial-gradient(circle at 50% 35%,#fff,#b9e2ff 80%)!important}
#passM .ps-cell>span.bt4{background:radial-gradient(circle at 50% 35%,#fffbe0,#ffd23a 80%)!important}
#passM .ps-cell>span.pi-b svg{max-height:74%!important;width:auto}
#passM .ps-cell>span.bigc{background:radial-gradient(circle at 50% 35%,#fffbe0,#ffcf3a 80%)!important}
/* 큰 보상 빛줄기 */
#passM .ps-ray{position:absolute;left:50%;top:50%;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;pointer-events:none;z-index:0;--rc:#ffffff;
  background:repeating-conic-gradient(var(--rc) 0 11deg,transparent 11deg 30deg);-webkit-mask:radial-gradient(circle,#000 30%,transparent 68%);mask:radial-gradient(circle,#000 30%,transparent 68%);animation:psRay 9s linear infinite;opacity:.9}
#passM .ps-ray.bt0{--rc:#ffe2b8}#passM .ps-ray.bt1{--rc:#ffb3d1}#passM .ps-ray.bt2{--rc:#cfb0ff}#passM .ps-ray.bt3{--rc:#9fd6ff}#passM .ps-ray.bt4{--rc:#ffe066}#passM .ps-ray.bto{--rc:#ff9ec7}
#passM .ps-cell>span{z-index:1}
#passM .ps-cell.got .ps-ray{display:none}
@keyframes psRay{to{transform:rotate(360deg)}}
/* 단계 구슬과 사탕 줄 */
#passM .ps-n::before{height:8px!important;border-top:2px solid #d9c3a8;border-bottom:2px solid #d9c3a8;box-sizing:border-box;background:#fff!important}
#passM .ps-col.reach .ps-n::before{background:repeating-linear-gradient(-45deg,#ff8ab5 0 6px,#fff 6px 12px)!important;border-color:#4a2a1a}
#passM .ps-n i{border-radius:50%!important;min-width:26px!important;height:26px!important;line-height:22px!important;padding:0!important}
#passM .ps-col.reach .ps-n i{background:radial-gradient(circle at 35% 30%,#fff 0 18%,#ff9ec7 22% 100%)!important;color:#4a2a1a!important}
#passM .ps-col.ms5 .ps-n i,#passM .ps-col.ms10 .ps-n i{min-width:32px!important;height:32px!important;line-height:28px!important;background:#fff3c4!important;border:2.5px solid #e8a92a!important;color:#9a5a10!important}
#passM .ps-col.reach.ms5 .ps-n i,#passM .ps-col.reach.ms10 .ps-n i{background:radial-gradient(circle at 35% 30%,#fff 0 16%,#ffd23a 22% 100%)!important;border-color:#4a2a1a!important;color:#4a2a1a!important}
#passM .ps-col.cur .ps-n i{transform:scale(1.18);box-shadow:0 0 0 3px #fff,0 0 12px #ff5f9e}
/* 지금 단계 표시 줄 */
#passM .ps-col{position:relative}
#passM .ps-col.cur::after{content:"";position:absolute;inset:0 6px;border-radius:14px;background:linear-gradient(#ffffff00,#ffffff66,#ffffff00);box-shadow:inset 0 0 0 2px #ff8ab5aa;pointer-events:none;z-index:3}
`;document.head.appendChild(st)}
// ----- 내 정보: Lv 줄을 누르면 레벨 보상으로 -----
{const po=profOpen;profOpen=function(page){const r=po.apply(this,arguments);if(page===2)return r;const lv=document.querySelector('#pgBody .pf-lv');
  if(lv&&!lv.querySelector('.pf-lvgo')){lv.insertAdjacentHTML('beforeend',`<button class="pf-lvgo" aria-label="레벨 보상">${PS_UP}</button>`);lv.querySelector('.pf-lvgo').onclick=()=>{SFX.click();pgClose();passOpen('lv')}}return r}}
{const st=document.createElement('style');st.textContent=`.pf-lvgo{flex:none;width:30px;height:30px;padding:0;border:0;background:none;cursor:pointer;margin-left:2px}.pf-lvgo svg{width:100%;height:100%}`;document.head.appendChild(st)}
