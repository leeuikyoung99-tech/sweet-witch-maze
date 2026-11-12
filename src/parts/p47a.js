/* ================= 47차: 덱 3개 저장 — 마녀 카드(카드 5장 + 벽 스킬)와 도둑 스킬을 각각 3벌까지 ================= */
function dk3Init(){let S=SAVE.dk3;if(!S||!Array.isArray(S.w)||S.w.length!==3||!Array.isArray(S.t)||S.t.length!==3){const wc=myWall();
    S=SAVE.dk3={wi:0,ti:0,w:[0,1,2].map(()=>({d:SAVE.deck.slice(),wc})),t:[0,1,2].map(()=>SAVE.skills.slice())};try{saveGame()}catch(e){}}return S}
function dk3Snap(){const S=dk3Init();const a=S.w[S.wi]||{},b=S.t[S.ti]||[];const wc=myWall();let ch=false;
  if((a.d||[]).join()!==SAVE.deck.join()||a.wc!==wc){S.w[S.wi]={d:SAVE.deck.slice(),wc};ch=true}if(b.join()!==SAVE.skills.join()){S.t[S.ti]=SAVE.skills.slice();ch=true}if(ch)saveGame()}
function dk3Load(i){const S=dk3Init();dk3Snap();const W=DECKV.tab==='witch';
  if(W){if(S.wi===i)return;S.wi=i;const v=S.w[i]||{};let d=(v.d||[]).filter(k=>CPOOL.includes(k)&&cardOpen(k));for(const k of SAVE.deck.concat(DEF_DECK)){if(d.length>=DECK_N)break;if(!d.includes(k))d.push(k)}SAVE.deck=d.slice(0,DECK_N);SAVE.wallCard=WALLC.includes(v.wc)&&wallOpen(v.wc)?v.wc:'move'}
  else{if(S.ti===i)return;S.ti=i;let q=(S.t[i]||[]).filter(k=>SKP.includes(k)&&skillOpen(k));q=[...new Set(q)];for(const k of SAVE.skills){if(q.length>=2)break;if(!q.includes(k))q.push(k)}SAVE.skills=cleanSkills(q.slice(0,2))}
  saveGame();DECKV.pick=null;SFX.card();renderDeck();try{$('deckSel').innerHTML=`<b>덱 ${i+1}</b> · 바꾸면 이 덱에 바로 저장돼요`}catch(e){}}
{const rd=renderDeck;renderDeck=function(){const r=rd.apply(this,arguments);try{dk3Snap();const S=dk3Init(),W=DECKV.tab==='witch',on=W?S.wi:S.ti;
    let g=$('dk3');if(!g){g=document.createElement('div');g.id='dk3';const pt=$('deckTabs');pt.insertAdjacentElement('afterend',g);
      g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();dk3Load(+b.dataset.i)})}
    const html='<span>덱</span>'+[0,1,2].map(i=>`<button data-i="${i}" class="${i===on?'on':''}">${i+1}</button>`).join('');if(g.innerHTML!==html)g.innerHTML=html}catch(e){}return r}}
{const st=document.createElement('style');st.textContent=`
#deckN{display:none!important}
#dk3{display:flex;align-items:center;gap:4px;flex:0 0 auto;margin-left:6px}
#dk3>span{font:12px var(--f-display);color:#8a5a00;margin-right:1px}
#dk3 button{width:30px;height:30px;border-radius:50%;border:2.5px solid var(--choco);background:#fff8ee;color:var(--choco);font:15px/1 var(--f-display);padding:0;cursor:pointer;box-shadow:0 2px 0 var(--choco)}
#dk3 button.on{background:#ffb21e;color:#fff;text-shadow:0 1px 0 #a35a00}`;document.head.appendChild(st)}
// 미로 짓기: '비우기'는 빼고 '지우기'(켜면 벽을 눌러 지우기)를 다시 보여요
{const e=$('bErase');if(e)e.style.display='';const c=$('bClear');if(c)c.style.display='none'}
