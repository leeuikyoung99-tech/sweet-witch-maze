/* ================= 42차: 대결 전 '나 VS 상대' 소개 화면 (아이콘 · 이름 · 레벨 · 이번 역할 랭크 / AI는 난이도) ================= */
const VS_ROLE={hero:'쿠키 도둑',devil:'과자 마녀'};
function vsCard(p){const rk=p.ai?`<span class="vs-rk ai">${IC31.bot}<b>AI · ${AIL_N[p.ail]||'보통'}</b></span>`
    :`<span class="vs-rk">${tierIcon(tierOfP(p.rp))}<b>${p.role==='devil'?'마녀':'도둑'} 랭크</b><em>${rankTxtP(p.rp)}</em></span>`;
  return`<div class="vs-c ${p.side}"><span class="vs-ic">${p.ai?IC31.bot:picon(p.icon)}</span><b class="vs-nm" data-ni="">${p.ai?'AI':(p.nick||'친구')}</b>${p.ai?'':`<small class="vs-lv">Lv ${p.lv|0}</small>`}
    <span class="vs-role r-${p.role}">${VS_ROLE[p.role]}</span>${rk}</div>`}
function vsShow(me,op,done,ms){let M=$('vsM');if(!M){M=document.createElement('div');M.id='vsM';M.className='scr';document.body.appendChild(M)}
  M.innerHTML=`<div class="vs31"><div class="vs-row">${vsCard(Object.assign({side:'me'},me))}<div class="vs-mid"><b>VS</b></div>${vsCard(Object.assign({side:'op'},op))}</div><div class="vs-bar"><i></i></div><p class="vs-tap">눌러서 바로 시작</p></div>`;
  M.hidden=false;M.classList.remove('go');void M.offsetWidth;M.classList.add('go');try{SFX.magic()}catch(e){}
  let fin=false;const end=()=>{if(fin)return;fin=true;clearTimeout(h);M.hidden=true;M.onpointerdown=null;done&&done()};const h=setTimeout(end,ms||3000);
  M.style.setProperty('--vs-t',((ms||3000)/1000)+'s');M.onpointerdown=e=>{e.preventDefault();end()}}
const myProf=role=>({icon:SAVE.icon,nick:SAVE.nick,lv:SAVE.lv,role,rp:RKS(role).p|0});
// ----- 혼자 하기: 4판 대결을 시작할 때 (맵 고르기 전) -----
{const ss=serStart;serStart=function(kind,first){const a=arguments,self=this;if(kind!=='ai'||window.__simFast||window.__aiBoth)return ss.apply(self,a);
  vsShow(myProf(first),{ai:true,ail:AIL,role:first==='hero'?'devil':'hero'},()=>ss.apply(self,a))}}
// 서브 게임 (AI): 경주는 둘 다 도둑, 마녀 대 마녀는 둘 다 마녀
{const r0=startRaceAI;startRaceAI=function(){if(window.__simFast)return r0.apply(this,arguments);vsShow(myProf('hero'),{ai:true,ail:AIL,role:'hero'},()=>r0())}}
{const w0=startWWAI;startWWAI=function(){if(window.__simFast)return w0.apply(this,arguments);vsShow(myProf('devil'),{ai:true,ail:AIL,role:'devil'},()=>w0())}}
// ----- 온라인: 서로 프로필을 보내고, 첫 판 시작 때 보여 줘요 -----
{const ns=netStart;netStart=function(d){NET.peerProf=NET.peerProf||null;ns(d);try{netSend({t:'prof',icon:SAVE.icon,lv:SAVE.lv|0,rT:SAVE.rankT.p|0,rW:SAVE.rankW.p|0,nick:myNick()})}catch(e){}}}
{const nm=netMsg;netMsg=function(d){if(d&&d.t==='prof'){NET.peerProf={icon:PICONS.includes(d.icon)?d.icon:PICONS[0],lv:Math.max(1,Math.min(999,d.lv|0)),rT:Math.max(0,d.rT|0),rW:Math.max(0,d.rW|0),nick:String(d.nick||'').replace(/[<>&"']/g,'').slice(0,8)};return}return nm(d)}}
{const nl=netLeave;netLeave=function(){NET.peerProf=null;NET.vsDone=false;return nl.apply(this,arguments)}}
{const sr=startRound;startRound=function(){const S=NET.ser,self=this,a=arguments;if(!NET.on||NET.duo||!S||!S.on||(S.r|0)!==0||NET.vsDone)return sr.apply(self,a);NET.vsDone=true;
  let tries=0;const go=()=>{const P=NET.peerProf;if(!P&&tries++<10){setTimeout(go,100);return}const opRole=NET.role==='devil'?'hero':'devil';
    vsShow(myProf(NET.role),{nick:(P&&P.nick)||NET.peerNick||'상대',icon:P&&P.icon,lv:P?P.lv:1,role:opRole,rp:P?(opRole==='devil'?P.rW:P.rT):(NET.peerRP|0)},()=>{if(NET.on)sr.apply(self,a)})};go()}}
{const st=document.createElement('style');st.textContent=`
#vsM{z-index:85;background:rgba(255,217,232,.8)!important;padding:10px 16px!important;display:flex;align-items:flex-start;justify-content:center;cursor:pointer}
#vsM[hidden]{display:none}
#vsM .vs31{position:relative;width:min(820px,100%);height:100%;box-sizing:border-box;background:#fff8ee;border:3px solid var(--choco);border-radius:22px;box-shadow:0 6px 0 var(--choco);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:14px;overflow:hidden}
#vsM .vs-row{display:flex;align-items:stretch;justify-content:center;gap:clamp(10px,3vw,28px);width:100%}
#vsM .vs-c{flex:0 1 250px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff;border:3px solid var(--choco);border-radius:20px;box-shadow:0 5px 0 var(--choco);padding:clamp(8px,3vh,16px) 10px;text-align:center}
#vsM .vs-c.me{background:linear-gradient(#e9fff6,#fff 60%)}#vsM .vs-c.op{background:linear-gradient(#ffeaf3,#fff 60%)}
#vsM .vs-ic{width:clamp(56px,20vh,84px);aspect-ratio:1;display:grid;place-items:center;background:#fff8ee;border:3px solid var(--choco);border-radius:18px}#vsM .vs-ic svg{width:80%;height:80%}
#vsM .vs-nm{font:clamp(18px,5.6vh,24px) var(--f-display);color:var(--choco);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#vsM .vs-lv{font:13px var(--f-display);color:#8a6a50;margin-top:-4px}
#vsM .vs-role{font:13px var(--f-display);color:#fff;border-radius:999px;padding:2px 12px;border:2px solid var(--choco)}#vsM .vs-role.r-hero{background:#2fbf93}#vsM .vs-role.r-devil{background:#ff5f9e}
#vsM .vs-rk{display:flex;align-items:center;gap:5px;font:14px var(--f-display);color:var(--choco);background:#fff3c4;border:2px solid #e8c15a;border-radius:12px;padding:3px 10px;white-space:nowrap}
#vsM .vs-rk svg{width:20px;height:20px}#vsM .vs-rk b{font-weight:normal;font-size:12px;color:#8a6a50}#vsM .vs-rk em{font-style:normal}
#vsM .vs-rk.ai{background:#e9f6ff;border-color:#9fd2f2}#vsM .vs-rk.ai b{font-size:14px;color:var(--choco)}
#vsM .vs-mid{display:flex;align-items:center}#vsM .vs-mid b{display:grid;place-items:center;width:clamp(52px,16vh,72px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff6c8,#ffcf3a 55%,#e09a1a);border:3px solid var(--choco);box-shadow:0 4px 0 var(--choco);font:clamp(20px,6vh,28px) var(--f-display);color:var(--choco)}
#vsM .vs-bar{width:min(320px,70%);height:8px;border-radius:6px;background:#f3e6d6;border:2px solid var(--choco);overflow:hidden}#vsM .vs-bar i{display:block;height:100%;width:0;background:#ff5f9e}
#vsM.go .vs-bar i{animation:vsBar var(--vs-t,3s) linear forwards}
#vsM .vs-tap{margin:0;font:12px var(--f-ui);color:#8a6a50}
#vsM.go .vs-c.me{animation:vsL .45s cubic-bezier(.2,1.3,.4,1) both}#vsM.go .vs-c.op{animation:vsR .45s cubic-bezier(.2,1.3,.4,1) both}#vsM.go .vs-mid b{animation:vsM .5s .2s cubic-bezier(.2,1.6,.4,1) both}
@keyframes vsBar{to{width:100%}}@keyframes vsL{from{transform:translateX(-60px);opacity:0}}@keyframes vsR{from{transform:translateX(60px);opacity:0}}@keyframes vsM{from{transform:scale(0)}}`;document.head.appendChild(st)}
{const st=document.createElement('style');st.textContent=`.rk-bar em{transition:left 1.1s cubic-bezier(.2,.8,.2,1),transform 1.1s cubic-bezier(.2,.8,.2,1)!important}`;document.head.appendChild(st)}
// ----- 스킬이 3개일 때: 기존 두 스킬을 대시 쪽으로 좁히고, 새 스킬은 X 표시와 스킬 사이 (대시 위) -----
{const sb=setupSkillBtns;setupSkillBtns=function(){sb.apply(this,arguments);const n=(G.heroSkills||[]).length;document.body.classList.toggle('sk3',n>=3)}}
{const st=document.createElement('style');st.textContent=`
body.sk3 .slA{right:134px!important;bottom:2px!important;width:64px!important;height:64px!important}
body.sk3 .slB{right:120px!important;bottom:76px!important;width:64px!important;height:64px!important}
body.sk3 .slC{right:56px!important;bottom:132px!important;width:64px!important;height:64px!important}
body.sk3 #bMark{right:0px!important;bottom:100px!important}`;document.head.appendChild(st)}
