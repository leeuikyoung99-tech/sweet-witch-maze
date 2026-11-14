/* ================= 90차: 스토리 화면 = 슈퍼마리오 같은 장 지도 ================= */
// 왼쪽: 장 탭 + 그 장 지도(장마다 다른 길 모양·배경·장식). 길 위 6칸은 장소 그림(입구·골목·규칙·마녀 모자·시계탑·성),
//       쿠키 도둑 말이 지금 칸에 서 있고, 열린 칸을 누르면 길을 따라 걸어가요. 판을 깨고 오면 다음 칸으로 걸어가요.
// 오른쪽: 고른 칸의 이름·목표·이 장 규칙(또는 새 카드) · 별 얻는 법 3줄 · 보상 · 시작 버튼.
// 대사: 시작을 누르면 (처음 한 번) 지도 위 말풍선으로 짧게 → 바로 판 시작. 마녀 말은 성 위에, 쿠키·바삭 말은 도둑 말 위에.
const WM={tok:{},anim:null,talk:null};
const WMPAL={1:['#ffe3f0','#ffd3b0','#ff8fc0'],2:['#e6f6ff','#cfe7ff','#6fb8ff'],3:['#45305e','#6c4182','#ff9a3a'],4:['#e6f6ec','#ffe3e3','#2fae6a'],
  5:['#f6e2c8','#d7a879','#8a5a3a'],6:['#f3ecff','#e0f0ff','#b48cff'],7:['#dbf7f1','#c3e7ff','#2fb3a6'],8:['#ffeaf3','#fff4d8','#ff6fae']};
const WMPTS={1:[[50,232],[130,176],[212,214],[288,152],[214,86],[332,62]],2:[[58,70],[140,116],[92,204],[204,232],[292,182],[342,92]],
  3:[[50,152],[122,80],[204,128],[160,226],[272,238],[342,140]],4:[[60,240],[70,140],[152,70],[242,120],[232,216],[342,170]],
  5:[[50,90],[140,60],[202,150],[110,228],[262,236],[346,140]],6:[[60,202],[140,244],[204,160],[132,80],[244,60],[342,112]],
  7:[[50,60],[92,160],[182,222],[252,140],[192,70],[342,204]],8:[[60,232],[152,242],[222,170],[150,100],[252,56],[342,122]]};
// 가로로 넓은 화면에 맞게 지도 높이를 230으로 눌러요
const WMH=230;for(const c in WMPTS)WMPTS[c]=WMPTS[c].map(([x,y])=>[x,Math.round(30+(y-56)*160/188)]);
const WMCOL={intro:'#62b8f0',mix:'#ff8fbe',twist:'#a77cf2',witch:'#7a4ddf',time:'#ffab3c',boss:'#ffc23a'};
const WM_IC={
 intro:'<path d="M-9 9 V-1 A9 9 0 0 1 9 -1 V9 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.4"/><path d="M-4 9 V2 A4 4 0 0 1 4 2 V9" fill="#ffd9a8" stroke="#4a2a1a" stroke-width="2"/>',
 mix:'<path d="M-11 9 V0 L-5 -6 L1 0 V9 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/><path d="M0 9 V-2 L6 -9 L12 -2 V9 Z" fill="#ffe6f0" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/>',
 witch:'<path d="M-12 7 Q0 2 12 7 Q0 11 -12 7 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M-6 6 L1 -12 L6 5 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/>',
 time:'<circle r="10" fill="#fff" stroke="#4a2a1a" stroke-width="2.4"/><path d="M0 -6 V0 L4 3" fill="none" stroke="#4a2a1a" stroke-width="2.4" stroke-linecap="round"/>',
 boss:'<path d="M-12 10 V-3 H-8 V-7 H-4 V-3 H4 V-7 H8 V-3 H12 V10 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2.2" stroke-linejoin="round"/><path d="M-3 10 V4 A3 3 0 0 1 3 4 V10" fill="#ffd9a8" stroke="#4a2a1a" stroke-width="1.8"/><path d="M-6 -9 L-4 -14 L0 -10 L4 -14 L6 -9 Z" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/>',
 lock:'<rect x="-7" y="-2" width="14" height="11" rx="2" fill="#fff" stroke="#4a2a1a" stroke-width="2.2"/><path d="M-4 -2 V-6 A4 4 0 0 1 4 -6 V-2" fill="none" stroke="#4a2a1a" stroke-width="2.2"/>'};
// 3판(비틀기) 그림은 그 장 규칙 모양
const WM_TW={1:'<path d="M-10 0 A6 6 0 0 1 -2 -7 A7 7 0 0 1 10 -2 A5 5 0 0 1 9 6 H-8 A4 4 0 0 1 -10 0 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><circle cx="-5" cy="10" r="2" fill="#ff8fc0"/><circle cx="2" cy="11" r="2" fill="#7cc8ff"/><circle cx="8" cy="10" r="2" fill="#ffd23a"/>',
 2:'<rect x="-10" y="-8" width="8" height="16" rx="1.5" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><path d="M1 0 H11 M7 -4 L11 0 L7 4" fill="none" stroke="#4a2a1a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
 3:'<path d="M3 -10 A10 10 0 1 0 10 5 A8 8 0 1 1 3 -10 Z" fill="#fff4b0" stroke="#4a2a1a" stroke-width="2.2"/>',
 4:'<rect x="-11" y="-9" width="9" height="18" rx="1.5" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><rect x="2" y="-9" width="9" height="18" rx="1.5" fill="#ffe6a8" stroke="#4a2a1a" stroke-width="2"/><text x="6.5" y="4" font-size="9" text-anchor="middle" fill="#4a2a1a" font-weight="bold">?</text>',
 5:'<rect x="-6" y="-2" width="12" height="11" rx="2" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><circle cy="-5" r="5" fill="#ff8fc0" stroke="#4a2a1a" stroke-width="2"/><path d="M3 -7 L11 -11" stroke="#4a2a1a" stroke-width="2.6" stroke-linecap="round"/>',
 6:'<path d="M-11 4 A5 5 0 0 1 -6 -3 A7 7 0 0 1 7 -4 A5 5 0 0 1 11 4 Z" fill="#fff" stroke="#4a2a1a" stroke-width="2"/><path d="M-6 8 H6" stroke="#4a2a1a" stroke-width="2" stroke-dasharray="2 2"/>',
 7:'<path d="M-9 8 Q-10 -6 0 -8 Q10 -6 9 8 Z" fill="#9ff0d8" stroke="#4a2a1a" stroke-width="2"/><circle cx="-3" cy="0" r="1.6" fill="#4a2a1a"/><circle cx="3" cy="0" r="1.6" fill="#4a2a1a"/>',
 8:'<path d="M0 0 m-9 0 a9 9 0 1 1 9 9" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M0 0 m-9 0 a9 9 0 1 1 9 9" fill="none" stroke="#4a2a1a" stroke-width="1.6" stroke-linecap="round"/><circle r="3" fill="#ff8fc0" stroke="#4a2a1a" stroke-width="1.6"/>'};
// 장 장식 (작은 그림 몇 개)
const WM_DEC={1:(x,y)=>`<g transform="translate(${x} ${y})"><path d="M0 0 V14" stroke="#fff" stroke-width="3"/><circle r="7" fill="#ff8fc0" stroke="#4a2a1a" stroke-width="1.6"/><path d="M-4 0 A4 4 0 0 1 4 0" fill="none" stroke="#fff" stroke-width="1.6"/></g>`,
 2:(x,y)=>`<g transform="translate(${x} ${y})" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M-8 0 H8 M-4 -7 L4 7 M-4 7 L4 -7"/></g>`,
 3:(x,y)=>`<g transform="translate(${x} ${y})"><ellipse rx="9" ry="7" fill="#ff9a3a" stroke="#4a2a1a" stroke-width="1.6"/><path d="M0 -7 V-11" stroke="#2f7a3a" stroke-width="2.4"/></g>`,
 4:(x,y)=>`<g transform="translate(${x} ${y})"><path d="M0 -12 L9 6 H-9 Z" fill="#2fae6a" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/><rect x="-2" y="6" width="4" height="4" fill="#8a5a3a"/></g>`,
 5:(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-9" y="-6" width="18" height="12" rx="2" fill="#7a4a2a" stroke="#4a2a1a" stroke-width="1.6"/><path d="M-3 -6 V6 M3 -6 V6 M-9 0 H9" stroke="#a06a44" stroke-width="1.4"/></g>`,
 6:(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-12 4 A5 5 0 0 1 -6 -3 A7 7 0 0 1 8 -3 A5 5 0 0 1 12 4 Z" fill="#fff" stroke="#c7b8e8" stroke-width="1.6"/></g>`,
 7:(x,y)=>`<g transform="translate(${x} ${y})" fill="none" stroke="#fff" stroke-width="2"><circle r="5"/><circle cx="8" cy="-8" r="3"/></g>`,
 8:(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-8 2 H8 L6 10 H-6 Z" fill="#ffd9a8" stroke="#4a2a1a" stroke-width="1.6"/><path d="M-9 2 A9 7 0 0 1 9 2 Z" fill="#fff" stroke="#4a2a1a" stroke-width="1.6"/><circle cy="-6" r="2.4" fill="#ff5a7e"/></g>`};
function wmCurve(P){let d=`M${P[0][0]} ${P[0][1]}`;const segs=[];for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||P[i+1];
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];const s=`C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    d+=' '+s;segs.push(`M${p1[0]} ${p1[1]} ${s}`)}return{d,segs}}
function wmDecor(c,P){const R=mulberry(c*977+13),out=[];for(let g=0;g<200&&out.length<9;g++){const x=20+R()*360,y=16+R()*(WMH-32);if(P.some(p=>Math.hypot(p[0]-x,p[1]-y)<46))continue;
    let ok=true;for(let i=0;i<P.length-1&&ok;i++)for(let t=0;t<=1;t+=.1){const a=P[i],b=P[i+1];if(Math.hypot(a[0]+(b[0]-a[0])*t-x,a[1]+(b[1]-a[1])*t-y)<30){ok=false;break}}
    if(ok&&out.every(q=>Math.hypot(q[0]-x,q[1]-y)>40))out.push([x,y])}return out.map(([x,y])=>WM_DEC[c](x.toFixed(0),y.toFixed(0))).join('')}
function wmSvg(c){const P=WMPTS[c],[a,b,k]=WMPAL[c],th=STORY[c-1].th,{d,segs}=wmCurve(P);
  const nodes=P.map((p,i)=>{const s=i+1,o=stOpen2(c,s),bits=sb2(c,s),st=stDef(c,s),v=st.v||'intro',col=o?WMCOL[v]:'#d9cbbb',ic=o?(v==='twist'?WM_TW[c]:WM_IC[v]):WM_IC.lock,sel=s===STV.s;
    const stars=o?[0,1,2].map(j=>`<path transform="translate(${-11+j*11} 30) scale(.42)" d="M0 -10 L2.9 -3.6 9.5 -3.1 4.6 1.4 6 8.1 0 4.6 -6 8.1 -4.6 1.4 -9.5 -3.1 -2.9 -3.6Z" fill="${(bits>>j)&1?'#ffd23a':'#fff'}" stroke="#4a2a1a" stroke-width="2.6"/>`).join(''):'';
    return`<g class="wm-n${o?'':' lock'}${sel?' sel':''}" data-s="${s}" transform="translate(${p[0]} ${p[1]})">${sel?'<circle r="29" fill="none" stroke="#fff" stroke-width="4"/><circle r="33" fill="none" stroke="#ff5f9e" stroke-width="4"/>':''}`+
      `<circle r="23" fill="${col}" stroke="#4a2a1a" stroke-width="3"/><circle cx="-7" cy="-8" r="6" fill="#ffffff70"/><g>${ic}</g>`+
      `<g transform="translate(17 -17)"><circle r="8" fill="#fff8ee" stroke="#4a2a1a" stroke-width="2"/><text y="3.6" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#4a2a1a">${s}</text></g>${stars}`+
      `<circle r="30" fill="transparent"/></g>`}).join('');
  const road=segs.map((s,i)=>`<path d="${s}" class="wm-rd${sb2(c,i+1)&1?' dn':''}"/>`).join('');
  return`<svg class="wm-svg" viewBox="0 0 400 ${WMH}" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="wmbg${c}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`+
    `<image href="${MAPIMG[th]||''}" x="-300" y="-150" width="1000" height="600" preserveAspectRatio="xMidYMid slice" opacity=".55"/><rect x="-300" y="-150" width="1000" height="600" fill="url(#wmbg${c})" opacity=".72"/>`+
    `<g class="wm-dec">${wmDecor(c,P)}</g><path d="${d}" class="wm-rd0"/><path d="${d}" class="wm-rd1"/>${road}<path d="${d}" class="wm-rd2"/><path d="${d}" class="wm-ref" fill="none" stroke="none"/>${nodes}</svg>`}
// 길 위 위치 (0~1 비율) 와 칸의 길 거리
function wmPathPts(svg){const p=svg.querySelector('.wm-ref');const L=p.getTotalLength(),N=200,pts=[];for(let i=0;i<=N;i++){const q=p.getPointAtLength(L*i/N);pts.push([q.x,q.y])}return pts}
function wmNodeIdx(pts,P){return P.map(n=>{let bi=0,bd=1e9;pts.forEach((q,i)=>{const d=Math.hypot(q[0]-n[0],q[1]-n[1]);if(d<bd){bd=d;bi=i}});return bi})}
function wmPx(box,xy){const svg=box.querySelector('.wm-svg'),m=svg.getScreenCTM(),b=box.getBoundingClientRect();if(!m)return[0,0];const p=svg.createSVGPoint();p.x=xy[0];p.y=xy[1];const q=p.matrixTransform(m);return[q.x-b.left-box.clientLeft,q.y-b.top-box.clientTop]}
function wmTokPlace(box,xy){const t=box.querySelector('.wm-tok');if(t){const[x,y]=wmPx(box,xy);t.style.left=x+'px';t.style.top=y+'px';t.dataset.x=xy[0];t.dataset.y=xy[1]}}
function wmScale(box){const svg=box.querySelector('.wm-svg'),m=svg.getScreenCTM();return m?m.a:1}
function wmWalk(c,from,to,done){const box=document.querySelector('#sv72 .wm-box');if(!box){done&&done();return}const svg=box.querySelector('.wm-svg'),P=WMPTS[c];
  const pts=wmPathPts(svg),ni=wmNodeIdx(pts,P),a=ni[from-1],b=ni[to-1];if(WM.anim)cancelAnimationFrame(WM.anim.id);
  const dur=Math.max(260,Math.abs(to-from)*420),t0=performance.now();box.querySelector('.wm-tok').classList.add('walk');
  const f=now=>{const k=Math.min(1,(now-t0)/dur),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,i=Math.round(a+(b-a)*e);wmTokPlace(box,pts[Math.max(0,Math.min(pts.length-1,i))]);
    if(k<1)WM.anim={id:requestAnimationFrame(f)};else{WM.anim=null;const tk=box.querySelector('.wm-tok');tk&&tk.classList.remove('walk');done&&done()}};WM.anim={id:requestAnimationFrame(f)}}
const WM_STAR='<svg viewBox="-10 -10 20 20"><path d="M0 -9 L2.6 -3.2 8.6 -2.8 4.1 1.3 5.4 7.3 0 4.1 -5.4 7.3 -4.1 1.3 -8.6 -2.8 -2.6 -3.2Z" fill="#ffd23a" stroke="#4a2a1a" stroke-width="1.6" stroke-linejoin="round"/></svg>';
renderStages=function(){const c=STV.c,ch=STORY[c-1],S=STV.s,st=stDef(c,S),bits=sb2(c,S),open=stOpen2(c,S);
  try{$('stages').querySelector('.pane-top b').textContent='스토리 · 달콤 별 조각';$('stgTot').innerHTML=`${recipes()} / ${8*STN} · <span class="sv-tst">${PS_STAR}</span> ${stars2()} / ${24*STN}`}catch(e){}
  const stg=$('stages').querySelector('.stg');let R=$('sv72');if(!R){R=document.createElement('div');R.id='sv72';stg.appendChild(R);R.addEventListener('click',sv72Click)}R.classList.add('wm');
  const tabs=STORY.map(q=>`<button class="sv-tab${q.n===c?' on':''}${chOpen(q.n)?'':' lock'}" data-c="${q.n}" style="--tc:${WMPAL[q.n][2]}" aria-label="${q.n}장">${chOpen(q.n)?q.n+'장':LOCK_SVG}</button>`).join('');
  const goals=stGoals3(st);const gl=goals.map((g,i)=>`<li class="${(bits>>i)&1?'ok':''}"><i>${WM_STAR}</i><span>${g}</span></li>`).join('');
  const gift=st.type==='boss'&&BOSS_BOX[c]!=null?`<span class="sv-chip">${SV72_GIFT}${boxName(BOSS_BOX[c])}</span>`:'';
  const rw=`<span class="sv-chip">${COIN_SVG}${stFirst(c)}</span><span class="sv-chip">${PS_STAR}마다 ${COIN_SVG}5</span>${gift}`;
  const hero=($('bHero')&&$('bHero').querySelector('svg'))?uniqSvg($('bHero').querySelector('svg').outerHTML,'wmt'):'';
  R.innerHTML=`<div class="sv-left"><div class="sv-tabs">${tabs}</div><div class="wm-wrap"><div class="wm-box">${wmSvg(c)}<div class="wm-tok">${hero}</div><div class="wm-bub" hidden></div></div></div></div>`+
    `<div class="wm-info"><b class="sv-ttl"></b><ul class="wm-goals">${gl}</ul><div class="wm-cards"><span class="wm-cl">${st.type==='witch'?'내 카드':'마녀 카드'}</span>${st.deck.map(k=>`<span class="wm-cd" title="${cName(k)}">${ART[k]||''}</span>`).join('')}</div><div class="sv-rw">${rw}</div>`+
    `<button class="mbtn berry sv-go" id="bStgGo"${open?'':' disabled'} aria-label="${open?'시작':'앞 단계를 깨면 열려요'}">${open?SV72_PLAY:LOCK_SVG}</button></div>`;
  try{const t=R.querySelector('.wm-info .sv-ttl');t.innerHTML=`<span class="s6n">${c}-${S} ${st6Name(c,S)}</span><span class="s6l"><i class="g">목표</i>${st6Goal(st)}</span>`+(st6RuleOn(st)?`<span class="s6l"><i>이 장 규칙</i>${st6Rule(st)}</span>`:'')+(st7New(st).length?`<span class="s6l s7n">${st7NewHtml(st)}</span>`:'');t.querySelectorAll('.s6n,.s6l').forEach(e=>st6Fit(e,9))}catch(e){console.warn(e)}
  requestAnimationFrame(()=>{wmFit();const box=R.querySelector('.wm-box');if(!box)return;const svg=box.querySelector('.wm-svg'),pts=wmPathPts(svg),ni=wmNodeIdx(pts,WMPTS[c]);
    const from=WM.tok[c]||S;wmTokPlace(box,pts[ni[from-1]]);if(from!==S&&!WM.talk)wmWalk(c,from,S,()=>{});WM.tok[c]=S;R.querySelectorAll('.wm-goals span').forEach(e=>st6Fit(e,9))})};
// 칸 누르기 · 장 탭 · 시작
sv72Click=function(e){if(WM.talk)return;const t=e.target.closest('.sv-tab');if(t){const c=+t.dataset.c;if(!chOpen(c)){SFX.deny();tMsg('앞 장의 보스를 이기면 열려요');return}
    STV.c=c;STV.s=1;for(let i=1;i<=STN;i++)if(stOpen2(c,i))STV.s=i;WM.tok[c]=STV.s;applyTheme(STORY[c-1].th);SFX.card();renderStages();return}
  const n=e.target.closest('.wm-n');if(n){const s=+n.dataset.s;if(!stOpen2(STV.c,s)){SFX.deny();tMsg('앞 칸을 깨면 열려요');return}if(s===STV.s){return}STV.s=s;SFX.card();renderStages();return}
  const g=e.target.closest('.sv-go');if(g){if(g.disabled){SFX.deny();return}(async()=>{try{await initAudio()}catch(_){}startStage(STV.c*100+STV.s)})();return}};
{const R=$('sv72');if(R){R.removeEventListener('click',sv72Click)}}
// 판 시작 전 대사: 스토리 지도 화면이면 지도 위 말풍선
{const si=storyIntro;storyIntro=function(c,s,go){const box=document.querySelector('#sv72 .wm-box');SAVE.st3Seen=SAVE.st3Seen||{};const key=c+'-'+s,L=ST3[c]&&ST3[c][s];
  if(!box||$('stages').hidden||screen!=='stages'||SAVE.st3Seen[key]||!L)return si.apply(this,arguments);SAVE.st3Seen[key]=1;saveGame();wmTalk(c,s,L,go)}}
function wmTalk(c,s,lines,go){const box=document.querySelector('#sv72 .wm-box'),bub=box.querySelector('.wm-bub'),tok=box.querySelector('.wm-tok');let i=0;WM.talk=true;
  const P=WMPTS[c],boss=P[5];const end=()=>{WM.talk=false;bub.hidden=true;box.onclick=null;go()};
  const step=()=>{if(i>=lines.length){end();return}const[who,txt]=lines[i++],W=st3Who(who,c),atBoss=who==='w'||who==='b';
    const tx=+tok.dataset.x,ty=+tok.dataset.y,ax=atBoss?boss[0]:tx,ay=atBoss?boss[1]:ty,[px,py]=wmPx(box,[ax,ay]),bw=box.clientWidth;
    bub.className='wm-bub '+(ay<110?'dn':'up')+(px<bw*.3?' l':px>bw*.7?' r':'');bub.style.left=px+'px';bub.style.top=py+'px';
    bub.innerHTML=`<span class="wb-av ${W.cls}">${uniqSvg(W.art,'wb'+i)}</span><span class="wb-t"><b>${W.nm}</b><span>${txt}</span></span><button class="wb-skip" aria-label="건너뛰기">건너뛰기</button>`;bub.hidden=false;
    bub.querySelector('.wb-skip').onclick=ev=>{ev.stopPropagation();SFX.click();i=lines.length;step()}};
  box.onclick=ev=>{ev.stopPropagation();SFX.card();step()};step()}
function wmFit(){const b=document.querySelector('#sv72 .wm-box');if(!b)return;const t=b.querySelector('.wm-tok');if(t&&t.dataset.x)wmTokPlace(b,[+t.dataset.x,+t.dataset.y]);if(t){const k=wmScale(b);t.style.width=Math.round(46*k)+'px'}}
addEventListener('resize',()=>setTimeout(()=>{if(!$('stages').hidden)wmFit()},60));
// 판을 시작할 때 그 칸을 기억 → 끝나고 돌아오면 거기서 다음 칸으로 걸어가요
{const ss=startStage;startStage=function(n){if(n>=100){const c=Math.floor(n/100),s=n%100;WM.tok[c]=s}return ss.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent=`
#sv72.wm{grid-template-columns:minmax(0,1.7fr) minmax(0,1fr)!important}
#sv72.wm .wm-wrap{position:relative;flex:1 1 auto;min-height:0;display:flex}
#sv72.wm .wm-box{position:relative;flex:1 1 auto;min-width:0;box-sizing:border-box;border-radius:16px;border:3px solid var(--choco);box-shadow:0 4px 0 var(--choco);overflow:hidden;background:#fff8ee}
#sv72.wm .wm-svg{position:absolute;inset:0;width:100%;height:100%;display:block}
#sv72.wm .wm-rd0{fill:none;stroke:#4a2a1a;stroke-width:20;stroke-linecap:round}
#sv72.wm .wm-rd1{fill:none;stroke:#fff3e0;stroke-width:14;stroke-linecap:round}
#sv72.wm .wm-rd{fill:none;stroke:transparent;stroke-width:14;stroke-linecap:round}#sv72.wm .wm-rd.dn{stroke:#ffb3d6}
#sv72.wm .wm-rd2{fill:none;stroke:#d8b894;stroke-width:2.4;stroke-dasharray:5 8;stroke-linecap:round}
#sv72.wm .wm-n{cursor:pointer}#sv72.wm .wm-n.lock{opacity:.85}
#sv72.wm .wm-tok{position:absolute;width:46px;aspect-ratio:1;transform:translate(-50%,-88%);pointer-events:none;filter:drop-shadow(0 3px 0 #4a2a1a80);transition:none;z-index:2}
#sv72.wm .wm-tok svg{width:100%;height:100%}
#sv72.wm .wm-tok.walk{animation:wmHop .28s ease-in-out infinite}
@keyframes wmHop{0%,100%{margin-top:0}50%{margin-top:-6px}}
#sv72.wm .wm-bub{position:absolute;z-index:4;display:flex;align-items:center;gap:6px;max-width:92%;width:max-content;box-sizing:border-box;padding:6px 8px 6px 6px;background:#fff8ee;border:3px solid var(--choco);border-radius:14px;box-shadow:0 3px 0 var(--choco);transform:translate(-50%,calc(-100% - 34px));cursor:pointer}
#sv72.wm .wm-bub.dn{transform:translate(-50%,26px)}#sv72.wm .wm-bub.l{transform:translate(-14%,calc(-100% - 34px))}#sv72.wm .wm-bub.r{transform:translate(-86%,calc(-100% - 34px))}
#sv72.wm .wm-bub.dn.l{transform:translate(-14%,26px)}#sv72.wm .wm-bub.dn.r{transform:translate(-86%,26px)}
#sv72.wm .wm-bub[hidden]{display:none}
#sv72.wm .wb-av{flex:0 0 auto;width:34px;height:34px;border-radius:50%;overflow:hidden;background:#fff;border:2px solid var(--choco);display:grid;place-items:center}#sv72.wm .wb-av svg{width:120%;height:120%}
#sv72.wm .wb-t{display:flex;flex-direction:column;min-width:0}#sv72.wm .wb-t b{font:11px var(--f-display);color:#a0705a}#sv72.wm .wb-t span{font:13px/1.3 var(--f-display);color:var(--choco)}
#sv72.wm .wb-skip{flex:0 0 auto;align-self:flex-start;border:2px solid var(--choco);background:#fff;border-radius:9px;font:10px var(--f-display);color:var(--choco);padding:2px 6px;cursor:pointer}
#sv72.wm .wm-info{display:flex;flex-direction:column;gap:6px;min-height:0;min-width:0}
#sv72.wm .wm-info .sv-ttl{position:static!important;display:flex!important;flex-direction:column;gap:3px;max-width:none!important;background:#4a2a1a;border-radius:12px;padding:7px 10px 8px!important;color:#fff;font:clamp(14px,4.4vh,18px) var(--f-display)}
#sv72.wm .wm-goals{list-style:none;margin:0;padding:6px 8px;display:flex;flex-direction:column;gap:3px;background:#fff8ee;border:2.5px solid var(--choco);border-radius:12px}
#sv72.wm .wm-goals li{display:flex;align-items:center;gap:5px;font:12px/1.2 var(--f-display);color:var(--choco);min-width:0}
#sv72.wm .wm-goals li span{white-space:nowrap;overflow:hidden;min-width:0}
#sv72.wm .wm-goals li i{flex:0 0 auto;width:16px;height:16px;filter:grayscale(1) opacity(.35)}#sv72.wm .wm-goals li.ok i{filter:none}#sv72.wm .wm-goals li i svg{width:100%;height:100%}
#sv72.wm .sv-go{grid-row:auto;grid-column:auto;width:100%;height:clamp(36px,11vh,52px);margin:auto 0 0}
#sv72.wm .wm-cards{display:flex;flex-wrap:wrap;align-items:center;gap:4px;background:#fff8ee;border:2.5px solid var(--choco);border-radius:12px;padding:6px 8px}
#sv72.wm .wm-cl{flex:0 0 100%;font:12px var(--f-display);color:#a0705a}
#sv72.wm .wm-cd{width:30px;height:30px;border-radius:8px;background:#fff1dc;display:grid;place-items:center}#sv72.wm .wm-cd svg{width:88%;height:88%}
@media (max-height:420px){#sv72.wm .wm-cards{display:none}}
@media (min-height:480px){#sv72.wm .wm-info{gap:10px}#sv72.wm .wm-info .sv-ttl{font-size:22px;padding:10px 14px 12px!important;gap:6px}#sv72.wm .wm-info .sv-ttl .s6l{font-size:15px}
  #sv72.wm .wm-goals{padding:10px 12px;gap:7px}#sv72.wm .wm-goals li{font-size:15px;gap:8px}#sv72.wm .wm-goals li i{width:22px;height:22px}#sv72.wm .sv-rw{font-size:15px}#sv72.wm .sv-rw svg{width:20px;height:20px}
  #sv72.wm .wb-t span{font-size:16px}#sv72.wm .wb-t b{font-size:13px}#sv72.wm .wb-av{width:44px;height:44px}}
@media (max-height:360px){#sv72.wm .wm-info{gap:4px}#sv72.wm .wm-info .sv-ttl{padding:5px 8px 6px!important}#sv72.wm .wm-goals{padding:4px 7px;gap:1px}#sv72.wm .wm-goals li{font-size:11px}#sv72.wm .sv-rw{font-size:12px}}`;document.head.appendChild(st)}
