// ===== 새 마녀 실버 증강체 "소다 충전" (손 바꾸기 대신) =====
// 판마다 한 번 버튼을 누르면 소다 +4 (최대치까지)
{const i=AUGW2.findIndex(q=>q[0]==='w_redraw');const q=['w_soda4','s','소다 충전','판마다 한 번 버튼을 누르면|소다 +4','soda'];if(i>=0)AUGW2.splice(i,1,q);else AUGW2.push(q);
  AUGI2[q[0]]={id:q[0],side:'w',tier:q[1],n:q[2],d:q[3],ic:q[4],need:null,minR:0}}
const SODA4=4;
function doSoda4(){const D=G.devil;if(!D)return;D.soda4Used=true;D.pt=Math.min(ptMax(),(D.pt||0)+SODA4);try{SFX.magic()}catch(e){}
  if(G.mode==='devil'&&!G.mirror)say(`소다 +${SODA4}`,false,1);if(G.mode==='devil')try{buildHand()}catch(e){}augHud()}
{const as=augStart;augStart=function(){const r=as.apply(this,arguments);if(G.devil)G.devil.soda4Used=false;return r}}
{const ah=augHud;augHud=function(){const r=ah.apply(this,arguments);const A=G.aug||{},D=G.devil,db=$('augBtnD');if(!db||!D)return r;
  const want=!!A.w_soda4&&!D.soda4Used&&G.mode==='devil'&&!G.over;let b=db.querySelector('[data-a="soda4"]');
  if(want&&!b){db.insertAdjacentHTML('beforeend',`<button data-a="soda4" class="ab-soda">소다 충전 +${SODA4}</button>`)}
  else if(!want&&b){b.remove()}
  if(want)db.hidden=false;else if(!db.children.length)db.hidden=true;return r}}
{const aa=augAct;augAct=function(a){if(a==='soda4'){const D=G.devil,A=G.aug||{};if(G.over||!A.w_soda4||!D||D.soda4Used)return;
    if(G.mirror){netSend({t:'augAct',a});D.soda4Used=true;augHud();return}doSoda4();return}return aa.apply(this,arguments)}}
{const nm=netMsg;netMsg=function(d){if(d&&d.t==='augAct'&&d.a==='soda4'){doSoda4();return}return nm.apply(this,arguments)}}
// AI 마녀: 소다가 거의 비었을 때 씀
{const da=devilAI;devilAI=function(dt){try{const A=G.aug||{},D=G.devil;if(!NET.on&&G.mode==='hero'&&A.w_soda4&&D&&!D.soda4Used&&!G.over&&G.t>(typeof GRACE!=='undefined'?GRACE:15)&&D.pt<=1)doSoda4()}catch(e){}return da.apply(this,arguments)}}
{const st=document.createElement('style');st.textContent=`#augBtnD .ab-soda{white-space:nowrap}`;document.head.appendChild(st)}
{const bh=buildHand;buildHand=function(){const r=bh.apply(this,arguments);try{const A=G.aug||{};if(A.w_soda4&&G.devil&&!G.devil.soda4Used&&G.mode==='devil'&&!document.querySelector('#augBtnD [data-a="soda4"]'))augHud()}catch(e){}return r}}
function sodaUI(){try{const pt=G.devil.pt;$('eFill').style.width=(pt*10).toFixed(1)+'%';$('eNum').textContent=Math.floor(pt)}catch(e){}}
{const ds=doSoda4;doSoda4=function(){const r=ds.apply(this,arguments);if(G.mode==='devil')sodaUI();return r}}
