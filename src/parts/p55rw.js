// ===== 보상 미리보기: 잠겨 있어도 눌러서 무엇인지 확인 =====
{const m=document.createElement('div');m.id='rwInfoM';m.hidden=true;m.innerHTML='<div class="rwi" role="dialog"><button class="nt-x rwi-x" aria-label="닫기"></button><div class="rwi-ic"></div><b class="rwi-n"></b><p class="rwi-d"></p><div class="rwi-odds"></div><span class="rwi-st"></span></div>';document.body.appendChild(m);
  const close=()=>{m.hidden=true};m.onclick=e=>{if(e.target===m)close()};m.querySelector('.rwi-x').onclick=()=>{try{SFX.click()}catch(_){}close()}}
function rwInfo(R,st,stOk){if(!R)return;const m=$('rwInfoM');let ic='',n='',d='',odds='';
  if(R.b!=null){const t=R.b;ic=boxSvg(t);n=boxName(t);d='열면 마녀 카드나 도둑 스킬 중 하나가 나와요';
    odds=['일반','희귀','전설'].map((g,i)=>BOXP[t][i]?`<span style="--gc:${GR_C[i+1]}">${g} ${BOXP[t][i]}%</span>`:'').join('')}
  else if(R.c){ic=COIN_SVG;n=`${R.c}코인`;d='꾸미기 가게에서 쓸 수 있어요'}
  else if(R.o){try{const S=SHOP[R.o[0]];ic=itemIcon(R.o[0],R.o[1]);n=`${S.items[R.o[1]][0]} ${S.t}`}catch(e){n='꾸미기 아이템'}d='받으면 꾸미기에서 바로 입을 수 있어요'}
  else if(R.L){ic=passIc(R);n='전설 카드 고르기';d='아직 없는 전설 카드 중에서 1장을 골라요'}
  m.querySelector('.rwi-ic').innerHTML=ic;m.querySelector('.rwi-n').textContent=n;m.querySelector('.rwi-d').textContent=d;
  const o=m.querySelector('.rwi-odds');o.innerHTML=odds;o.hidden=!odds;
  const s=m.querySelector('.rwi-st');s.textContent=st||'';s.hidden=!st;s.classList.toggle('ok',!!stOk);
  try{SFX.click()}catch(e){}m.hidden=false}
// 패스 칸: 받을 수 없는 칸을 누르면 미리보기
{const cl=passClaim;passClaim=function(kind,l){const P=passS(),R=kind==='f'?PASSF[l]:PASSP[l];
  if(passCan(kind,l))return cl.apply(this,arguments);
  const got=(kind==='f'?P.cf:P.cp)[l];let st;
  if(got)st='받았어요';
  else if(l>passLv())st=`패스 ${l}단계가 되면 받아요`;
  else if(kind==='p'&&!P.prem&&typeof passNextP==='function')st=`앞 단계부터 받아요 · 다음은 ${passNextP()}단계`;
  rwInfo(R,st,!!got)}}
// 레벨 보상 칸
{const sc=$('psScroll');sc.addEventListener('click',e=>{if($('passM').dataset.tab!=='lv')return;const c=e.target.closest('.ps-col');if(!c)return;const l=+(c.querySelector('.ps-n i')||{}).textContent;if(!l)return;
  const box=l%10===0,got=l<=SAVE.lv;rwInfo(box?{b:lvBox(l)}:{c:LV_COIN},got?'받았어요':box?`레벨 ${l}이 되면 받아요 · ${LV_COIN}코인도 함께`:`레벨 ${l}이 되면 받아요`,got)})}
// 랭크 칸: 상자 미리보기
{const or=openRank;openRank=function(){const r=or.apply(this,arguments);try{const ts=document.querySelectorAll('#rankRow .rk6-t');ts.forEach((t,i)=>{if(!i)return;t.classList.add('tap');
    t.onclick=()=>{const done=t.classList.contains('done')||t.classList.contains('cur');rwInfo({b:i},done?'받았어요':`처음 ${TIERS[i][0]} 등급(${i*100}점)이 되면 받아요`,done)}})}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`
#rwInfoM{position:fixed;inset:0;z-index:380;display:grid;place-items:center;background:#4a2a1a66}#rwInfoM[hidden]{display:none}
#rwInfoM .rwi{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;width:min(320px,calc(100vw - 32px));max-height:calc(100dvh - 24px);overflow:auto;box-sizing:border-box;background:#fff8ee;border:3px solid var(--choco);border-radius:20px;box-shadow:0 5px 0 var(--choco);padding:16px 18px 14px;color:var(--choco);text-align:center;animation:ntIn .18s ease-out}
#rwInfoM .rwi-x{position:absolute;right:8px;top:8px;width:30px;height:30px;border-radius:50%;border:2px solid var(--choco);background:#fff;cursor:pointer;padding:0}
#rwInfoM .rwi-x::before,#rwInfoM .rwi-x::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:2.6px;border-radius:2px;background:var(--choco);transform:translate(-50%,-50%) rotate(45deg)}#rwInfoM .rwi-x::after{transform:translate(-50%,-50%) rotate(-45deg)}
#rwInfoM .rwi-ic{width:clamp(56px,20vh,84px);height:clamp(56px,20vh,84px);display:grid;place-items:center}#rwInfoM .rwi-ic svg,#rwInfoM .rwi-ic>span,#rwInfoM .rwi-ic img{width:100%;height:100%}
#rwInfoM .rwi-n{font:19px var(--f-display)}
#rwInfoM .rwi-d{margin:0;font:13px/1.4 var(--f-ui);color:#7a5236;word-break:keep-all}
#rwInfoM .rwi-odds{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}#rwInfoM .rwi-odds[hidden]{display:none}
#rwInfoM .rwi-odds span{font:12px var(--f-display);color:#fff;background:var(--gc);border:2px solid var(--choco);border-radius:9px;padding:1px 8px}
#rwInfoM .rwi-st{font:13px var(--f-display);color:#fff;background:#ff8ab5;border:2px solid var(--choco);border-radius:10px;padding:2px 10px;margin-top:2px}#rwInfoM .rwi-st.ok{background:#2fbf93}#rwInfoM .rwi-st[hidden]{display:none}
#passM.lvmode .ps-cell.lv{cursor:pointer}
#rankRow .rk6-t.tap{cursor:pointer}#rankRow .rk6-t.tap:active{transform:scale(.97)}#rankRow .rk6-t.cur.tap:active{transform:translateY(-4px) scale(1.03)}
/* 랭크 창이 낮은 화면에서 잘리지 않게 */
#rankM .rank-slab.uni-pane .rk5{gap:clamp(8px,3.6vh,30px)!important}
#rankM .rk6{margin-bottom:6px!important}
#rankM .rk6-t{min-height:clamp(96px,30vh,170px)!important;padding-top:6px!important;padding-bottom:6px!important}
#rankM .rk6-ic svg{width:clamp(32px,10vh,56px)!important;height:clamp(32px,10vh,56px)!important}
#rankM .rk5 .rk-trk{padding-bottom:34px!important}
@media (max-height:350px){#rankM .rk6-t{min-height:80px!important}#rankM .rank-slab.uni-pane .rk5{gap:6px!important}}
#rankM .rk5 .rk-bar{height:clamp(18px,6vh,28px)!important}#rankM .rk5 .rk-bar em{top:calc(100% + 5px)!important}
`;document.head.appendChild(st)}
// ----- 랭크 칸: 등급마다 다른 상자 그림 + 상자 이름 -----
{const or=openRank;openRank=function(){const r=or.apply(this,arguments);try{document.querySelectorAll('#rankRow .rk6-t').forEach((t,i)=>{if(!i)return;const rw=t.querySelector('.rk6-rw');if(rw){rw.classList.add('bxn');rw.innerHTML=`<i class="bxi bt${i}">${boxSvg(i)}</i><em>${boxName(i)}</em>`}})}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`
#rankRow .rk6-rw.bxn{gap:2px;padding:0 7px 0 2px;white-space:nowrap}
#rankRow .rk6-rw.bxn em{font-style:normal}
#rankRow .bxi{display:block;width:22px;height:22px;flex:none}#rankRow .bxi svg{width:100%;height:100%;display:block}
/* 상자 그림을 칸 가운데로 (리본이 낮은 상자일수록 위로) */
.pi-b.bt0 svg,.pi-b.bt1 svg,.pi-b.bt2 svg,.bxi.bt1 svg,.bxi.bt2 svg{transform:translateY(-6%)}
.pi-b.bt3 svg,.bxi.bt3 svg{transform:translateY(-3.5%)}
/* 잠금·광고·받음 표시: 동그라미를 조금 줄이고, 표시는 칸 안쪽 모서리에 (동그라미와 안 겹쳐요) */
#passM .ps-cell.p>span,#passM .ps-cell.f>span{height:min(58px,calc(100% - 26px))!important}
#passM .ps-cell.lv>span{height:min(56px,calc(100% - 44px))!important}#passM .ps-cell.lv.bx>span{height:min(70px,calc(100% - 38px))!important}
#passM .ps-cell>span::before,#passM .ps-cell>span::after{display:none!important}
#passM .ps-cell.lock::after,#passM .ps-cell.got::after{content:"";position:absolute;right:4px;width:20px;height:20px;border-radius:50%;border:2px solid #4a2a1a;z-index:4;pointer-events:none}
#passM .ps-cell.lock::after{top:4px;background:#4a2a1a url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='5' y='11' width='14' height='10' rx='3' fill='%23ffd35f' stroke='%234a2a1a' stroke-width='2'/%3E%3Cpath d='M8.5 11 V8 a3.5 3.5 0 0 1 7 0 V11' fill='none' stroke='%23ffd35f' stroke-width='2.4'/%3E%3C/svg%3E") center/14px no-repeat}
#passM .ps-cell.got::after{bottom:4px;background:#2fbf73 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5 L10 16.5 L18 8' fill='none' stroke='%23fff' stroke-width='3.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/15px no-repeat}
#passM .ps-cell .ad-tag{left:auto!important;right:3px!important;top:3px!important;width:22px!important;height:22px!important;z-index:4}
#passM .ps-col.cur::after{display:none!important}
#passM .ps-col.cur .ps-cell{box-shadow:inset 0 0 0 999px #ffffff55}
#passM .ps-cell.lv.got::after{right:auto;bottom:auto;left:calc(50% - 12px);top:calc(50% + 32px)}#passM .ps-cell.lv.bx.got::after{top:calc(50% + 39px)}
/* 랭크: 지금 등급 칸이 옆·아래 칸을 덮지 않게 (커지지 않고 안쪽 테두리로 표시) */
#rankRow .rk6-t.cur{transform:none!important;box-shadow:0 4px 0 var(--choco),inset 0 0 0 3px #ffd23a,inset 0 0 0 5px #fff!important;border-color:#c98a00!important}
#rankRow .rk6-me{top:-10px!important}
`;document.head.appendChild(st)}
