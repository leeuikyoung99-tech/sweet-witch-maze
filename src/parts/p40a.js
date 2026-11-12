/* ================= 40차: 보상형 광고 + 시즌 패스를 광고로 받기 (현금 결제 없이 출시) ================= */
// ADS.show(자리) → 끝까지 보면 true. 앱(AdMob)이 붙기 전에는 가짜 광고 화면을 3초 보여 줘요.
const ADS={busy:false,
  async show(place){if(this.busy)return false;this.busy=true;try{
      const C=window.Capacitor,AM=C&&C.Plugins&&C.Plugins.AdMob;
      if(AM&&window.__adUnits&&window.__adUnits[place]){try{await AM.prepareRewardVideoAd({adId:window.__adUnits[place]});const r=await AM.showRewardVideoAd();return!!r}catch(e){tMsg('광고를 불러오지 못했어요. 잠시 뒤에 다시 해 주세요.');return false}}
      return await adFake()}finally{this.busy=false}}};
function adFake(){return new Promise(res=>{let M=$('adFakeM');if(!M){M=document.createElement('div');M.id='adFakeM';document.body.appendChild(M)}
  let left=3;M.hidden=false;const draw=()=>{M.innerHTML=`<div class="adf"><b>광고 자리</b><span>앱에서는 여기에 진짜 광고가 나와요</span><button class="sbtn" id="bAdF"${left>0?' disabled':''}>${left>0?left+'초':'보상 받기'}</button><button class="adf-x" id="bAdX" aria-label="닫기">✕</button></div>`;
    $('bAdF').onclick=()=>{if(left>0)return;M.hidden=true;clearInterval(h);res(true)};$('bAdX').onclick=()=>{M.hidden=true;clearInterval(h);res(false)}};
  draw();const h=setInterval(()=>{left--;draw();if(left<=0)clearInterval(h)},1000)})}
const AD_IC='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="#ff5f9e" stroke="#4a2a1a" stroke-width="2"/><path d="M10 9 L15.5 12 L10 15z" fill="#fff"/></svg>';
// ----- 패스: 패스 줄 보상은 광고 1번 보고 받아요 -----
{const pc=passCan;passCan=function(kind,l){const P=passS();if(kind!=='p'||P.prem)return pc(kind,l);
  if(l>passLv()||!PASSP[l])return false;return!P.cp[l]}}
const passAdNeed=(kind)=>kind==='p'&&!passS().prem;
{const cl=passClaim;passClaim=async function(kind,l){if(!passCan(kind,l)){SFX.deny();return}if(passAdNeed(kind)){const ok=await ADS.show('pass');if(!ok)return}return cl(kind,l)}}
// 모두 받기: 광고가 필요 없는 무료 줄만 한 번에
{passAll=function(){const P=passS();let got=[];for(let l=1;l<=passLv();l++)for(const k of['f','p']){if(k==='p'&&!P.prem)continue;if(passCan(k,l)){const R=k==='f'?PASSF[l]:PASSP[l];(k==='f'?P.cf:P.cp)[l]=1;passGive(R);got.push(R)}}
  const bn=P.prem?passBonusCan():0;if(bn){P.bonus=(P.bonus|0)+bn;SAVE.coins+=bn*100;syncCoins();got.push({c:bn*100})}
  if(!got.length){SFX.deny();tMsg(P.prem?'받을 보상이 없어요':'패스 줄 보상은 하나씩 눌러 광고를 보고 받아요');return}saveGame();SFX.card();passDraw();syncPassBadge();passAfter(got.find(R=>R.L)||got.find(R=>R.b!=null)||got[0])}}
{const pd=passDraw;passDraw=function(){pd.apply(this,arguments);const P=passS();if(P.prem)return;
  for(const c of $('psScroll').querySelectorAll('.ps-cell.p')){c.classList.remove('lock');c.classList.add('adc');if(c.classList.contains('reach')&&!c.classList.contains('got')&&c.dataset.k)c.insertAdjacentHTML('beforeend',`<i class="ad-tag">${AD_IC}</i>`)}
  $('psFoot').innerHTML=`<span class="ps-ad">${AD_IC}<b>패스 줄 보상은 광고를 1번 보고 받아요</b></span>`}}
{const st=document.createElement('style');st.textContent=`
#adFakeM{position:fixed;inset:0;z-index:200;display:grid;place-items:center;background:#1b1534ee}#adFakeM[hidden]{display:none}
#adFakeM .adf{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;background:#fff8ee;border:3px solid var(--choco);border-radius:20px;box-shadow:0 5px 0 var(--choco);padding:22px 30px;min-width:260px;color:var(--choco)}
#adFakeM .adf b{font:22px var(--f-display)}#adFakeM .adf span{font:13px var(--f-ui);color:#8a6a50}
#adFakeM .adf-x{position:absolute;right:8px;top:8px;width:32px;height:32px;border-radius:50%;border:2px solid var(--choco);background:#fff;font:14px var(--f-display);color:var(--choco);cursor:pointer}

#passM .ps-cell .ad-tag{position:absolute;right:calc(50% - 38px);top:2px;width:24px;height:24px;z-index:2;font-style:normal;filter:drop-shadow(0 2px 0 #4a2a1a55)}#passM .ps-cell .ad-tag svg{width:100%;height:100%}
.ps-ad{display:flex;align-items:center;gap:8px;font:15px var(--f-display);color:var(--choco);background:#fff;border:2.5px solid var(--choco);border-radius:14px;padding:6px 14px}.ps-ad svg{width:24px;height:24px}`;document.head.appendChild(st)}
{const st=document.createElement('style');st.textContent=`@media (max-width:720px){#passM .ps-top{gap:8px}#passM .ps31.uni-pane .ps-tt>b:first-child{font-size:16px!important}#passM .ps31.uni-pane .ps-tt span{font-size:12px!important}#passM .ps-lv{min-width:130px}#passM .ps-all{padding:4px 10px;font-size:13px}}`;document.head.appendChild(st)}
// ----- 패스 줄은 앞 단계부터 순서대로 받아요 (다음 받을 칸만 광고 표시) -----
function passNextP(){const P=passS();for(let l=1;l<=SEASON.lv;l++)if(PASSP[l]&&!P.cp[l])return l;return 0}
{const pc=passCan;passCan=function(kind,l){if(kind==='p'&&!passS().prem&&l!==passNextP())return false;return pc(kind,l)}}
{const cl=passClaim;passClaim=async function(kind,l){const P=passS();if(kind==='p'&&!P.prem&&!P.cp[l]&&l<=passLv()&&l!==passNextP()){SFX.deny();tMsg(`앞 단계부터 받아요 · 다음은 ${passNextP()}단계`);return}return cl(kind,l)}}
{const pd=passDraw;passDraw=function(){pd.apply(this,arguments);const P=passS();if(P.prem)return;const nx=passNextP(),L=passLv();
  for(const c of $('psScroll').querySelectorAll('.ps-cell.p')){const l=+c.dataset.l;const t=c.querySelector('.ad-tag');
    if(l===nx&&l<=L){c.classList.add('nx41');if(!t)c.insertAdjacentHTML('beforeend',`<i class="ad-tag">${AD_IC}</i>`)}
    else{c.classList.remove('nx41');if(t)t.remove();if(!c.classList.contains('got')&&c.dataset.k)c.classList.add('lock')}}
  $('psFoot').innerHTML=`<span class="ps-ad">${AD_IC}<b>${nx&&nx<=L?`광고 1번 보고 ${nx}단계 패스 보상 받기 · 앞 단계부터 순서대로`:'패스 줄 보상은 앞 단계부터 광고를 보고 받아요'}</b></span>`;
}}
{const po=passOpen;passOpen=function(){const r=po.apply(this,arguments);const nx=passNextP();if(nx&&!passS().prem&&nx<=passLv()){const sc=$('psScroll');requestAnimationFrame(()=>requestAnimationFrame(()=>{sc.scrollLeft=Math.max(0,(nx-2)*86)}))}return r}}
{const st=document.createElement('style');st.textContent=`
#passM .ps-cell.nx41>span{animation:nx41 1.1s ease-in-out infinite}
@keyframes nx41{0%,100%{transform:scale(1);box-shadow:0 3px 0 #4a2a1a,0 0 0 0 #ff5f9e88}50%{transform:scale(1.07);box-shadow:0 3px 0 #4a2a1a,0 0 0 7px #ff5f9e33}}`;document.head.appendChild(st)}
// ----- 결과 화면: 광고 보고 +20코인 (하루 10번 · 판마다 한 번) -----
const ADC={n:20,max:10};
const adDay=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
const adLeft=()=>{const a=SAVE.adCoin||{};return a.d===adDay()?Math.max(0,ADC.max-(a.n|0)):ADC.max};
let AD_MATCH=0,AD_USED=-1;
{const em=endMatch;endMatch=function(){const was=G.over;const r=em.apply(this,arguments);if(!was&&G.over)AD_MATCH++;return r}}
function adCoinBtn(){const R=$('result');if(!R||R.hidden)return;let b=$('bAdCoin');
  const midOnline=!!(NET.on&&!G.duo&&NET.ser&&NET.ser.on&&!NET.ser.done);
  if(G.tutor||(typeof TU!=='undefined'&&TU.on)||midOnline){if(b)b.remove();return}
  const left=adLeft(),used=AD_USED===AD_MATCH;
  if(!b){b=document.createElement('button');b.id='bAdCoin';b.className='ad-coin';const c=$('resCoin');(c&&c.parentElement||R).insertBefore(b,c?c.nextSibling:null);
    b.onclick=async()=>{if(AD_USED===AD_MATCH||adLeft()<=0){SFX.deny();return}const m=AD_MATCH;const ok=await ADS.show('result');if(!ok||m!==AD_MATCH)return;
      const a=SAVE.adCoin&&SAVE.adCoin.d===adDay()?SAVE.adCoin:{d:adDay(),n:0};a.n++;SAVE.adCoin=a;SAVE.coins+=ADC.n;AD_USED=AD_MATCH;saveGame();try{syncCoins()}catch(e){}SFX.win&&SFX.card();tMsg(`${ADC.n}코인을 받았어요!`);adCoinBtn()}}
  const k=used?'d':left?'a':'z';if(b.dataset.k===k+left)return;b.dataset.k=k+left;b.disabled=used||!left;
  b.innerHTML=used?`${COIN_SVG}<b>+${ADC.n} 받았어요</b>`:left?`${AD_IC}<b>광고 보고 ${COIN_SVG}+${ADC.n}</b><small>${left}/${ADC.max}</small>`:`<b>오늘 광고 보상은 다 받았어요</b>`}
new MutationObserver(()=>{adCoinBtn();setTimeout(adCoinBtn,400)}).observe($('result'),{attributes:true,attributeFilter:['hidden']});
{const st=document.createElement('style');st.textContent=`
.ad-coin{display:flex;align-items:center;gap:6px;margin:2px auto;padding:4px 12px 4px 8px;border-radius:999px;border:2.5px solid var(--choco);background:linear-gradient(#fff,#ffe9f3);box-shadow:0 3px 0 var(--choco);font:14px var(--f-display);color:var(--choco);cursor:pointer;white-space:nowrap}
.ad-coin svg{width:20px;height:20px}.ad-coin b{display:flex;align-items:center;gap:3px;font-weight:normal}.ad-coin b svg{width:16px;height:16px}
.ad-coin small{font-size:11px;background:#ff5f9e;color:#fff;border-radius:8px;padding:0 6px}
.ad-coin:disabled{opacity:.6;box-shadow:none;cursor:default;background:#fff}
.ad-coin:not(:disabled):active{transform:translateY(2px);box-shadow:0 1px 0 var(--choco)}`;document.head.appendChild(st)}
