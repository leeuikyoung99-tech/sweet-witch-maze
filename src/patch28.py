import os
s=open('mz/v27.html').read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(s.count(a),a[:120]); s=s.replace(a,b)
# 상수
R("const isMon=e=>['skel','ginger','ghost','bat','bear'].includes(e.type);","const isMon=e=>['skel','ginger','ghost','bat','bear','soldier','spider'].includes(e.type);")
R("else if(TURK.includes(k)){if(count('tower')>=3)return 'cap';","else if(TURK.includes(k)){if(count('tower')>=TOWER_CAP())return 'cap';")
R("else if(TURK.includes(k)&&count('tower')<3)","else if(TURK.includes(k)&&count('tower')<TOWER_CAP())")
# 몸 모델은 이제 안 불러요 (쿠키 도둑 하나)
R("...['b_knight','b_barb','b_mage','b_skel'].map(k=>[k,ASSETS[k]])]","...[].map(k=>[k,ASSETS[k]])]")
# HTML
R('<div class="scr" id="loading">','<div id="cdn" hidden></div><div id="sndM" class="scr" hidden></div><div id="chocoBar" hidden><button data-o="H">━ 가로</button><button data-o="V">┃ 세로</button><button id="bChocoGo">배치</button></div>\n<div class="scr" id="loading">')
R('<div class="slab title-slab">','<div class="slab title-slab"><button class="ib snd-b" id="bSnd" aria-label="소리 설정">⚙️</button>')
R('<button class="sbtn" id="bHow">하는 법</button>','<button class="sbtn" id="bHow">하는 법</button><button class="sbtn" id="bSnd2">⚙️ 소리</button>')
CSS="""
#cdn{position:fixed;inset:0;z-index:70;display:grid;place-items:center;pointer-events:none}#cdn[hidden]{display:none}
#cdn .cd-n{font:clamp(64px,20vh,150px) var(--f-display);color:#fff;-webkit-text-stroke:5px var(--choco);paint-order:stroke;text-shadow:0 8px 0 var(--choco)}
#cdn .cd-n.pop{animation:cdpop .5s cubic-bezier(.2,1.6,.4,1)}@keyframes cdpop{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}
.title-slab{position:relative}.snd-b{position:absolute!important;top:10px;right:10px;width:38px;height:38px;font-size:19px;display:grid;place-items:center;z-index:2}
#sndM{z-index:80;background:#4a2a1a66}.snd-slab{min-width:min(420px,90vw)}.snd-row{display:flex;align-items:center;gap:10px;margin:10px 0;font:15px var(--f-display);color:var(--choco)}.snd-row span{width:96px;text-align:left}
.snd-row .tg{font:13px var(--f-display);border:2px solid var(--choco);border-radius:12px;padding:4px 10px;background:#eee;color:var(--choco);min-width:58px;cursor:pointer}.snd-row .tg.on{background:var(--mint,#3fbf9f);color:#fff}.snd-row input{flex:1;accent-color:#ff5f9e}
#chocoBar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(118px + env(safe-area-inset-bottom,0px));z-index:40;display:flex;gap:6px;background:#fff8eeee;border:2.5px solid var(--choco);border-radius:16px;padding:5px;box-shadow:0 3px 0 var(--choco)}#chocoBar[hidden]{display:none}
#chocoBar button{font:14px var(--f-display);border:2px solid var(--choco);border-radius:12px;padding:6px 12px;background:#fff;color:var(--choco);cursor:pointer}#chocoBar button.on{background:#7a4526;color:#fff}#bChocoGo{background:var(--berry,#ff5f9e)!important;color:#fff!important}#bChocoGo:disabled{opacity:.45}
"""
R(".shop-buy{",CSS+"\n.shop-buy{")
R("stake:st,round:NET.nextRound||1})}catch(e){}netStart({role:hr,stake:st,round:NET.nextRound||1})}","stake:st,round:NET.nextRound||1,seed:NET.seriesSeed})}catch(e){}netStart({role:hr,stake:st,round:NET.nextRound||1,seed:NET.seriesSeed})}")
R("const burning=()=>ROUND-G.t<=BURN;","const burning=()=>ROUND-G.t<=BURN+((G.aug&&G.aug.burnearly)?30:0);")
R('id="hudH" class="hud" hidden>','id="hudH" class="hud" hidden><div id="augBtnH" class="aug-btns" hidden></div><div id="warnBox" hidden></div>')
R('id="hudD" class="hud" hidden>','id="hudD" class="hud" hidden><div id="augBtnD" class="aug-btns" hidden></div><div id="peekBox" hidden></div>')
R('<div id="cdn" hidden></div>','<div id="cdn" hidden></div><div id="augS" hidden></div>')
CSS2="""
#augS{position:fixed;inset:0;z-index:75;background:#2a1a40aa;display:grid;place-items:center;padding:8px}#augS[hidden]{display:none}
.ag-box{background:#fff8ee;border:3px solid var(--choco);border-radius:22px;box-shadow:0 5px 0 var(--choco);padding:12px 16px;width:min(900px,96vw);max-width:96vw;box-sizing:border-box;max-height:96vh;overflow:auto}
.ag-top{display:flex;align-items:center;gap:8px;font:clamp(16px,4.6vh,21px) var(--f-display);color:var(--choco);margin-bottom:6px}.ag-top b{flex:1}.ag-time{min-width:34px;text-align:center;background:var(--choco);color:#fff;border-radius:12px;padding:2px 8px}
.ag-tier,.ag-tr{font:12px var(--f-display);border-radius:10px;padding:2px 8px;color:#fff;border:2px solid var(--choco)}.t-s{--tc:#b8c4d6;--tc2:#eef2f8}.t-g{--tc:#ffc94a;--tc2:#fff3c9}.t-p{--tc:#c38bff;--tc2:#ffe0f4}
.ag-tier,.ag-tr{background:var(--tc)}.ag-row{display:flex;gap:14px;justify-content:center}
.ag-card{position:relative;flex:1;max-width:270px;min-width:0;min-height:clamp(190px,62vh,340px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(4px,1.6vh,10px);border:3px solid var(--choco);border-radius:20px;box-shadow:0 5px 0 var(--choco);padding:clamp(16px,4vh,24px) 8px 8px;cursor:pointer;font-family:var(--f-body);color:var(--choco);overflow:hidden;background:var(--cbg)}
.ag-card::before{content:'';position:absolute;inset:5px;border-radius:15px;border:2px dashed #ffffffaa;pointer-events:none}
.t-s.ag-card{--cbg:linear-gradient(160deg,#ffffff,#dfe6f1 55%,#b8c4d6)}.t-g.ag-card{--cbg:linear-gradient(160deg,#fffbe6,#ffe38a 55%,#ffb93a)}
.t-p.ag-card{--cbg:linear-gradient(135deg,#ffd6ef,#d6ecff 30%,#fff3c4 55%,#e2d6ff 80%,#ffd6ef);background-size:200% 200%;animation:prism 4s linear infinite}@keyframes prism{to{background-position:200% 200%}}
.ag-card:active{transform:translateY(3px);box-shadow:0 2px 0 var(--choco)}
.ag-tr{position:absolute;top:0;left:50%;transform:translateX(-50%);border-radius:0 0 12px 12px;border-top:0!important;padding:1px 12px 2px!important;white-space:nowrap}
.ag-fr{width:clamp(70px,24vh,130px);height:clamp(70px,24vh,130px);display:grid;place-items:center;flex-shrink:0;background:var(--choco);padding:3px}
.ag-fr .ag-art{width:100%;height:100%;display:grid;place-items:center;background:radial-gradient(circle at 40% 35%,#fff,var(--tc2) 60%,var(--tc))}
.f-s,.f-s .ag-art{border-radius:50%}
.f-g,.f-g .ag-art{clip-path:polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)}
.f-p,.f-p .ag-art{clip-path:polygon(50% 0,61% 32%,95% 25%,72% 52%,90% 84%,57% 72%,50% 100%,43% 72%,10% 84%,28% 52%,5% 25%,39% 32%)}
.f-p .ag-art{background:conic-gradient(#ffb3d6,#ffe08a,#b8f0c0,#a8e0ff,#d9c2ff,#ffb3d6)}
.ag-art svg{width:78%;height:78%}.f-p .ag-art svg,.f-p .ag-em{transform:scale(.8)}
.ag-sk{width:78%;height:78%;display:grid;place-items:center;border-radius:50%;background:linear-gradient(#ffd0e4,#ff7eb6);border:2px solid var(--choco)}.ag-sk svg{width:80%;height:80%}
.ag-em{font-size:clamp(34px,12vh,66px);line-height:1;filter:drop-shadow(0 2px 0 #4a2a1a55)}
.ag-n{display:block;width:100%;text-align:center;white-space:nowrap;overflow:hidden}.ag-n span{font:clamp(16px,5vh,24px) var(--f-display);white-space:nowrap}
.ag-d{font-size:clamp(13px,3.9vh,17px);line-height:1.25;text-align:center;word-break:keep-all;overflow-wrap:normal;padding:0 2px}.ag-note{text-align:center;font-size:12px;color:#8a6a55;margin-top:8px}
.ser-t{border-collapse:collapse;margin:4px auto;font:13px var(--f-display);color:var(--choco)}.ser-t th,.ser-t td{border:2px solid #e9d2b8;padding:2px 8px;text-align:center}.ser-t td.sc{background:#fff3c9}.ser-t td.sc small{display:block;font-size:10px;color:#2fbf93}.ser-t td.wd{color:#b99;font-size:11px}.ser-t td.tot{background:#ffd6ea;font-size:15px}
.ser-aug{display:flex;gap:12px;justify-content:center;font-size:12px;flex-wrap:wrap}.ser-aug i{font-style:normal;cursor:pointer;margin:0 1px}.ser-next{margin-top:4px;font:13px var(--f-display);color:#ff5f9e}.ser-coin{font-size:12px;opacity:.85}
.aug-btns{position:absolute;left:50%;transform:translateX(-50%);top:calc(64px + env(safe-area-inset-top,0px));display:flex;gap:6px;pointer-events:auto;z-index:5}.aug-btns[hidden]{display:none}
.aug-btns button{font:13px var(--f-display);color:#fff;background:linear-gradient(#c38bff,#9b6bff);border:2px solid var(--choco);border-radius:12px;padding:4px 10px;box-shadow:0 2px 0 var(--choco);cursor:pointer}.aug-btns .ab-i{font:13px var(--f-display);background:#fff8ee;border:2px solid var(--choco);border-radius:12px;padding:3px 8px;color:var(--choco)}
#augBtnD{top:auto;bottom:calc(150px + env(safe-area-inset-bottom,0px))}
#warnBox{position:absolute;inset:0;pointer-events:none}#warnBox[hidden]{display:none}#warnBox i{position:absolute;left:50%;top:50%;width:0;height:0}#warnBox i b{position:absolute;left:-12px;top:calc(-1 * min(42vh,40vw));font-size:24px;color:#ff3d5a;-webkit-text-stroke:2px #fff;animation:wb .5s infinite alternate}@keyframes wb{to{opacity:.4}}
#peekBox{position:absolute;right:8px;bottom:calc(130px + env(safe-area-inset-bottom,0px));background:#fff8eeee;border:2px solid var(--choco);border-radius:12px;padding:2px 6px;font:12px var(--f-display);color:var(--choco);display:flex;align-items:center;gap:3px;pointer-events:none}#peekBox[hidden]{display:none}#peekBox i{width:26px;height:26px;display:inline-block}#peekBox svg{width:100%;height:100%}
#echo{position:absolute;left:50%;transform:translateX(-50%);top:calc(84px + env(safe-area-inset-top,0px));background:#fff8eeee;border:2px solid var(--choco);border-radius:12px;padding:2px 10px;font:14px var(--f-display);color:var(--choco);pointer-events:none;white-space:nowrap}#echo[hidden]{display:none}
.sk.slC{right:180px!important;bottom:84px!important;width:64px!important;height:64px!important}
"""
R(".shop-buy{",CSS2+"\n.shop-buy{")
R('<div id="cdn" hidden></div>','<div id="cdn" hidden></div><div id="storyM" hidden></div>')
CSS3="""
#optMap{grid-column:1/-1}#chMap{flex-wrap:wrap;justify-content:center;max-width:94vw}#chMap button{font-size:12px!important;padding:3px 6px!important;min-height:0}#setup .slab{gap:6px!important}#setup .opts{gap:4px 22px!important}
.ic-mix{position:relative;display:block;width:100%;height:100%}.ic-mix svg{width:100%;height:100%}.ic-mix b{position:absolute;right:-4px;bottom:-4px;font-size:18px;line-height:1}
.dk.locked{position:relative}.dk.locked .dk-art{filter:grayscale(.9) brightness(.9);opacity:.85}.dk.locked .lk{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;background:#4a2a1a38;border-radius:inherit;pointer-events:none}.dk.locked .lk::before{content:'🔒';font-size:clamp(22px,6.5vh,30px);filter:drop-shadow(0 2px 0 #4a2a1a)}.dk.locked .lk small{font:10.5px var(--f-display);color:#fff;background:#4a2a1acc;border-radius:8px;padding:1px 5px;word-break:keep-all;text-align:center;line-height:1.2;max-width:92%}.dk.locked .nm{position:relative;z-index:6;color:#fff!important;background:#4a2a1a;border-radius:8px;padding:0 4px}
#stgGrid.stg-grid{display:block!important;overflow:auto}.ch-tabs{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin-bottom:4px}.ch-t{font:13px var(--f-display);border:2px solid var(--choco);border-radius:10px;padding:3px 8px;background:#fff;color:var(--choco);cursor:pointer}.ch-t.on{background:var(--tc);color:#fff}.ch-t.lock{opacity:.55}
.ch-name{text-align:center;font:14px var(--f-display);color:var(--choco);margin:2px 0 6px}.ch-name span{color:#ff5f9e}
.st-row{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.st.boss{outline:3px solid #ffd35f;outline-offset:-3px}
.si-unl{font-size:12.5px;background:#fff3c9;border:2px dashed #e8b020;border-radius:10px;padding:3px 6px;margin:4px 0}.rc-got,.unl-got{font:13px var(--f-display);margin-top:3px}.unl-got{color:#ff5f9e}
#storyM{position:fixed;inset:0;z-index:72;background:#2a1a4066;display:flex;align-items:flex-end;justify-content:center;padding:0 12px calc(14px + env(safe-area-inset-bottom,0px));cursor:pointer}#storyM[hidden]{display:none}
.st-box{position:relative;display:flex;align-items:flex-end;gap:10px;max-width:min(720px,96vw);width:100%}.st-box.w{flex-direction:row-reverse}
.st-art{width:clamp(72px,24vh,130px);flex-shrink:0;display:grid;place-items:center}.st-art svg{width:100%;height:auto;filter:drop-shadow(0 4px 0 #4a2a1a55)}.st-gm{font-size:clamp(56px,18vh,100px)}
.st-bub{flex:1;background:#fff8ee;border:3px solid var(--choco);border-radius:20px;box-shadow:0 4px 0 var(--choco);padding:10px 14px;color:var(--choco)}.st-bub b{font:15px var(--f-display);color:#ff5f9e}.st-box.w .st-bub b{color:#7a45e0}.st-bub p{margin:4px 0 2px;font-size:clamp(14px,3.6vh,17px);word-break:keep-all;line-height:1.4}.st-bub small{font-size:11px;opacity:.6}
.st-skip{position:absolute!important;top:-46px;right:0}
#gmCake{position:absolute;left:14px;top:8px;font-size:34px;filter:drop-shadow(0 2px 0 #4a2a1a66)}#gmCake[hidden]{display:none}
"""
R(".shop-buy{",CSS3+"\n.shop-buy{")
R("syncPosts();SFX.crunch();\n    if(G.mode==='hero'){if(!G.wallWarned){G.wallWarned=1;say('🍪 쿠키 벽이 움직였어요! 지도와 다를 수 있어요',true,2.2)}else say('🍪 쿠키 벽이 움직였어요',true,1.2)}else say('쿠키 벽을 옮겼어요',false,1)}","syncPosts();if(G.mode!=='hero'){SFX.crunch();say('쿠키 벽을 옮겼어요',false,1)}}")
CSS4="""
.scr{overflow-y:auto!important;align-items:flex-start!important}.scr>*{margin-top:auto!important;margin-bottom:auto!important;flex-shrink:0}
#augS{display:flex!important;overflow:auto;align-items:flex-start}#augS[hidden]{display:none!important}.ag-box{margin:auto}
.res-slab.ser{gap:6px!important;padding-top:10px!important}.res-slab.ser .badges{display:none!important}.res-slab.ser .res-big{font-size:clamp(28px,8vh,52px)!important}.res-slab.ser #resArt svg{width:clamp(48px,13vh,80px)!important;height:auto}
.ser-t th,.ser-t td{padding:1px 7px!important}
"""
R(".shop-buy{",CSS4+"\n.shop-buy{")
R('<div id="cdn" hidden></div>','<div id="cdn" hidden></div><div class="scr" id="friendS" hidden><div class="pane fr-pane"><div class="pane-top"><b>👫 친구</b><span class="fr-me" id="frMe"></span><button class="sbtn" id="bFrX">닫기</button></div><div class="fr-add"><input id="frAddIn" maxlength="6" placeholder="친구 코드 6자리" autocomplete="off" autocapitalize="characters" spellcheck="false"><button class="mbtn mint tiny" id="bFrAdd"><span class="mt"><b>친구 추가</b></span></button></div><div class="fr-list" id="frList"></div><div class="note">친구가 게임을 켜 두면 초록불이 켜져요 · 초대하면 친구 방으로 바로 시작해요</div></div></div><div id="frM" class="scr" hidden></div><div id="frInv" hidden></div>')
CSS5="""
#friendS .fr-pane{width:min(720px,96vw);max-height:92vh;display:flex;flex-direction:column;gap:8px}
.fr-me{flex:1;display:flex;align-items:center;gap:6px;justify-content:center;font:14px var(--f-display);color:var(--choco);flex-wrap:wrap}.fr-nm{font-size:16px;color:#ff5f9e}.fr-ed{border:0;background:none;cursor:pointer;font-size:15px}.fr-code b{letter-spacing:2px;background:#fff3c9;border:2px solid var(--choco);border-radius:8px;padding:0 6px}
.fr-add{display:flex;gap:8px;justify-content:center}.fr-add input,.fr-nick input{font:16px var(--f-display);border:2.5px solid var(--choco);border-radius:12px;padding:5px 10px;width:min(220px,50vw);text-transform:uppercase;text-align:center;color:var(--choco);background:#fff}.fr-nick input{text-transform:none}
.fr-list{flex:1;overflow:auto;display:flex;flex-direction:column;gap:6px;min-height:80px;padding:2px}
.fr-row{display:flex;align-items:center;gap:8px;background:#fff;border:2.5px solid var(--choco);border-radius:14px;padding:5px 8px;color:var(--choco)}.fr-row.on{background:#effff7}
.fr-dot{width:12px;height:12px;border-radius:50%;background:#c9b6a4;flex-shrink:0;border:2px solid var(--choco)}.fr-row.on .fr-dot{background:#3fdc8e;box-shadow:0 0 6px #3fdc8e}
.fr-who{flex:1;display:flex;flex-direction:column;min-width:0}.fr-who b{font:15px var(--f-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fr-who small{font-size:11.5px;display:flex;align-items:center;gap:3px;white-space:nowrap}.fr-who small svg{width:16px;height:16px}
.fr-rec{font:12.5px var(--f-display);white-space:nowrap}.fr-inv:disabled{opacity:.4;filter:grayscale(.6)}.fr-del{border:2px solid var(--choco);background:#fff;border-radius:10px;font:12px var(--f-display);color:var(--choco);padding:3px 7px;cursor:pointer;white-space:nowrap}
#frM{z-index:78;background:#4a2a1a66}
#frInv{position:fixed;top:calc(10px + env(safe-area-inset-top,0px));left:50%;transform:translateX(-50%);z-index:90}#frInv[hidden]{display:none}.fr-ib{display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff8ee;border:3px solid var(--choco);border-radius:18px;box-shadow:0 4px 0 var(--choco);padding:8px 16px;color:var(--choco);animation:cdpop .4s}.fr-ib b{font:16px var(--f-display);color:#ff5f9e}.fr-ib span{font-size:13px}.fr-ib .row{gap:8px;margin-top:2px}
"""
R(".shop-buy{",CSS5+"\n.shop-buy{")
R("HERO.speed*(h.sprint>0?1.4:1)","HERO.speed*(h.sprint>0?1.5:1)")
R("h.rev=4;say(me?'방향이 거꾸로! (4초)'","h.rev=3;say(me?'방향이 거꾸로! (3초)'")
R("else if(k==='fog'){G.mapFog=5;","else if(k==='fog'){G.mapFog=3;")
R("h.slide={t:.75,","h.slide={t:1.5,")
R("else if(e.type==='jelly')danger[idx(ex,ez)]+=3;","else if(e.type==='jelly')danger[idx(ex,ez)]+=3;else if(e._xr&&TRAPS.includes(e.type))danger[idx(ex,ez)]+=8;")
R("else{h.root=2;const j=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.2,1.6)","else{h.root=3.5;const j=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.2,1.6)")
R("hemi:['#ffffff','#a9c8e0',.9],sun:['#ffffff',.7],\n  ground:'#ffe0ee'","hemi:['#ffffff','#9cbcdc',.74],sun:['#fff6ea',.6],\n  ground:'#ffe0ee'")
R("floor:{bg:'#8fb4dc',t:['#d4e8fb','#c6dff8','#b8d6f3'],i1:'#dcedfc',i2:'#d0e6fa',sp:['#ffffff55','#7cc6ff33']}","floor:{bg:'#4a86c4',t:['#93c8f2','#82bdee','#70b1e8'],i1:'#a3d1f5',i2:'#8cc4f0',sp:['#ffffff55','#2f6fae33']}")
R("if(P.snow){const n=700,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=Math.random()*(W+120)-60;pos[i*3+1]=Math.random()*60;pos[i*3+2]=Math.random()*(W+120)-60}","if(P.snow){const n=500,pos=new Float32Array(n*3);for(let i=0;i<n;i++){let x,z;do{x=Math.random()*(W+120)-60;z=Math.random()*(W+120)-60}while(x>-4&&x<W+4&&z>-4&&z<W+4);pos[i*3]=x;pos[i*3+1]=Math.random()*60;pos[i*3+2]=z}")
R("new THREE.PointsMaterial({color:'#ffffff',size:.45,transparent:true,opacity:.9,depthWrite:false})","new THREE.PointsMaterial({color:'#ffffff',size:.7,map:canvasTex(32,32,(g,w,h)=>{const r=g.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.6,'rgba(255,255,255,.8)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,w,h)}),alphaTest:.05,transparent:true,opacity:.9,depthWrite:false})")
R("(c.fake||h.mana<HERO.manaMax)","(c.fake||h.mana<HERO.manaMax||(G.aug&&G.aug.tp_free))")
R("gingerNear(c.x,c.z)}else{h.mana++;h.manaGot++;","gingerNear(c.x,c.z)}else{h.mana=Math.min(HERO.manaMax,h.mana+1);h.manaGot++;")
R("분홍 선이 정답 길","굵은 선이 정답 길",2)
exec(open('patch29.py').read())
JS=''.join(open('parts/'+f).read()+'\n' for f in ['p28a.js','p28b.js','p28c.js','p28d.js','p28e.js','p28f.js','p28g.js','p29a.js','p29b.js','p29c.js','p29d.js','p29e.js','p29f.js','p29g.js','p29h.js','p29i.js','p29k_img.js','p29j.js','p30a.js','p30b.js','p30c.js','p30d.js','p30e.js','p30f.js','p30g.js','p30h.js','p30i.js','p30j.js','p30k.js','p30l.js','p30m.js','p30n.js','p30o.js','p30p.js','p30r.js','p30s.js','p30t.js','p30u.js','p30v.js','p30w.js','p30x.js','p30y.js','p30z.js','p31a.js','p31b.js','p31c.js','p31d.js','p32a.js','p32b.js','p32c.js','p32d.js','p32e.js','p32f.js','p33a.js','p33b.js','p33c.js','p34a.js','p34b.js','p34c.js','p35a.js','p36a.js','p37a.js','p38a.js','p39a.js','p40a.js','p41a.js','p42a.js','p43a.js','p44a.js','p45a.js','p46a.js','p47a.js','p48a.js','p50a.js','p51fix.js','p52icons.js','p53pass.js','p54note.js','p55rw.js','p56look.js','p57tuaug.js','p58soda.js','p59nick.js','p60augseen.js','p62.js','p66wcch.js','p67wmove.js','p69nosub.js','p70fix.js','p71color.js','p72story.js','p73trap.js','p74fcandy.js','p75inv.js','p76mini.js','p77mfx.js','p79lobby.js','p80mnet.js','p81wsk.js'])
JS=JS.replace("ver:'__PATCH__'","ver:'p"+open('patch.txt').read().strip()+"'")
R("/* 전체화면 */","\n"+JS+"\n/* 전체화면 */")
R("const w=wallPick(e.clientX,e.clientY);if(w){SWIPE={w,x:e.clientX,y:e.clientY};markWall(w,true);tapStart=null;return}}","let w=wallPick(e.clientX,e.clientY);if(w&&!wallShifts(w).length)w=null;w=w||movPick(e.clientX,e.clientY);if(w){SWIPE={w,x:e.clientX,y:e.clientY};markWall(w,true);tapStart=null;return}tapStart=null;return}")
R("G.heroSkills=r.isAI?['sprint','gum']:cleanRace(NET.peerRaceSkills)","G.heroSkills=r.isAI?raceAISk():cleanRace(NET.peerRaceSkills)")
R("function setPause(on){if(!(screen==='play'||screen==='pause')||G.over)return;","function setPause(on){if(!(screen==='play'||screen==='pause')||(G.over&&!G.cdn))return;")
R("const t0=performance.now();G.over=true;G.cdn=true;","let t0=performance.now();G.over=true;G.cdn=true;")
R("CDN.t=3.4-(performance.now()-t0)/1000;","if(screen==='pause'){t0+=50;setTimeout(tick,50);return}CDN.t=3.4-(performance.now()-t0)/1000;")
R("AUGP.h=setInterval(()=>{left--;","AUGP.h=setInterval(()=>{if(AUGP.paused)return;left--;",2)
R("vx:dx/L*12,vz:dz/L*12","vx:dx/L*14.4,vz:dz/L*14.4")
R("const k=3.2*dt*(e.push?-1:1);","const k=2.59*dt*(e.push?-1:1);")
R("if(G.t<5)s='금빛 기둥이 출구예요. 나침반을 따라가요';else if(G.t<11)s=","if(false)s='';else if(false)s=")
R("const d=ds[Math.floor(Math.random()*ds.length)]||[0,1];h.slide=","const d=slipDir(h,ds)||ds[Math.floor(Math.random()*ds.length)]||[0,1];h.slide=")
R("const ptMax=()=>((G.aug||{}).wbank?14:10);","const ptMax=()=>((G.aug||{}).wbank?14:10)+((G.aug||{}).w_goldsoda?5:0);")
R("const burning=()=>ROUND-G.t<=BURN+((G.aug&&G.aug.burnearly)?30:0);","const burning=()=>ROUND-G.t<=BURN+((G.aug&&G.aug.burnearly)?30:0)-((G.aug&&G.aug.w_lateburn)?10:0);")
R("left<=BURN","burning()",3)
R("if(G.ents.filter(e=>TRAPS.includes(e.type)).length>=4)return 'cap';","if(G.ents.filter(e=>TRAPS.includes(e.type)).length>=trapCap())return 'cap';")
R("if(count('tower')>=TOWER_CAP())return 'cap';","if(towerCount()>=TOWER_CAP())return 'cap';")
R("const monCount=()=>G.ents.filter(e=>MONK.includes(e.type)&&!e.dead).length","const monCount=()=>G.ents.filter(e=>MONK.includes(e.type)&&!e.dead&&!e.twin).length")
R("const WMAX=()=>WALLS;","const WMAX=()=>WALLS+((G.aug&&G.aug.w_walls3)?3:0);")
R("const xpNeed=L=>Math.min(300,60+10*(L-1));","const xpNeed=L=>Math.min(1200,100+25*(L-1));")
R("const LV_COIN=50;","const LV_COIN=20;")
R("const C=6, WH=4.2, WT=0.9, ROUND=180, BURN=45;let WALLS=50","const C=6, WH=4.2, WT=0.9, BURN=45;let ROUND=180, WALLS=50")
R("${COIN_SVG}+${rk.rew}","${rk.box?'상자를 받았어요':''}",2)
exec(open('patch29z.py').read())
R("bh.textContent==='뒤로'","(bh.textContent==='뒤로'||bh.textContent==='Back')")
R("const SAVE=(()=>{",open('parts/p35_core.js').read()+"\nconst SAVE=(()=>{")
R("else if(k==='move'){if(burning())return 'burn';const{w,o,nx,nz}=extra;const h=G.hero;if(o!==w.o||Math.abs(nx-w.x)+Math.abs(nz-w.z)!==1)return 'far';","else if(k==='move'||k==='turn'){if(burning())return 'burn';const{w,o,nx,nz}=extra;const h=G.hero;if(k==='move'?(o!==w.o||Math.abs(nx-w.x)+Math.abs(nz-w.z)!==1):!turnOK(w,o,nx,nz))return k==='turn'?'turnfar':'far';")
R("say('쿠키 벽을 옮겼어요',false,1)","say(k==='turn'?'쿠키 벽을 돌렸어요':'쿠키 벽을 옮겼어요',false,1)")
R("const GRACE=15;","const GRACE=5;")
R("시작 15초 동안은 몬스터를 부를 수 없어요","시작 5초 동안은 몬스터를 부를 수 없어요",2)
R("시작 15초가 지나면 부를 수 있어요","시작 5초가 지나면 부를 수 있어요",2)
s=s.replace('메인 게임','마녀의 미로').replace('"Main game','"Witch’s Maze').replace('main game','Witch’s Maze')
# 게임 제목: 쿠쿠드 (Cookood)
s=s.replace('과자 마녀의 <em>미로</em>','쿠쿠드').replace('SWEET WITCH MAZE','COOKOOD').replace('과자 마녀의 미로','쿠쿠드').replace('Sweet Witch Maze','Cookood')
open('mz/v28.html','w').write(s);print('ok',len(s))
