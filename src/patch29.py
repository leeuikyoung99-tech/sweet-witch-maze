# 29차: patch28.py 안에서 exec 돼요 (s, R 사용)
R("const C=6, WH=4.2, WT=0.9, ROUND=180, BURN=20;","const C=6, WH=4.2, WT=0.9, ROUND=180, BURN=45;")
# 사탕은 시간이 지나도 저절로 생기지 않아요
# 사탕은 6초마다 1개씩 차요 (최대치까지)
R("if(!h.remote){h.manaT=(h.manaT||0)+dt;if(h.manaT>=6){h.manaT-=6;if(h.mana<7)h.mana++}}","if(!h.remote){h.manaT=(h.manaT||0)+dt;if(h.manaT>=6){h.manaT-=6;if(h.mana<HERO.manaMax)h.mana++}}")
# 소다: 최대치·속도 증강
R("D.pt=Math.min(10,D.pt+dt*rate);","D.pt=Math.min(ptMax(),D.pt+dt*rate*sodaMul());")
# 체력 막대는 최대 체력 기준
R("firstChild.style.width=h.hp+'%'","firstChild.style.width=Math.min(100,h.hp/(h.hpMax||100)*100)+'%'",2)
# 랭크: 점수제 · 역할별
R("const randOpen=()=>tierOf(SAVE.rank.s|0)>=1;","const randOpen=()=>true;")
R("rank:SAVE.rank.s|0",'rank:myRP()',3)
R("상대 ${rankTxt(+d.rank||0)}","상대 ${rankTxtP(NET.peerRP=+d.rank||0)}")
R("'상대('+rankTxt(d&&+d.rank||0)+')가","'상대('+rankTxtP(NET.peerRP=(d&&+d.rank)||0)+')가")
R("if(NET.on&&NET.rand&&!NET.series)x.rank=rankUpdate(iW);else if(!NET.on&&!G.stage&&!G.chal&&AIL>=1&&iW&&tierOf(SAVE.rank.s|0)<1)x.rank=rankUpdate(true)","")
R("const rpre=()=>'swm-rand-v3-'+(SET.gmode||'classic')+'-';","let RPX='';const rpre=()=>RPX||('swm-rand-v3-'+(SET.gmode||'classic')+'-');")
R("clearInterval(RM.probe);if(k>0)RM.probe=setInterval","clearInterval(RM.probe);if(k>0&&!RPX)RM.probe=setInterval")
# 새 화면: 맵 고르기 · 게임 중 증강체
R('<div class="scr" id="rankM" hidden','<div class="scr" id="mapM" hidden></div><div id="augHud" hidden></div><div class="scr" id="rankM" hidden')
CSS6="""
/* 29차: 화려한 증강체 카드 */
.ag-box{background:radial-gradient(ellipse at 50% 0,#3b2a7a,#1d1640 70%);border:3px solid #0e0a24;color:#fff;box-shadow:0 6px 0 #0e0a24,0 0 40px #8a6aff55}
.ag-top{color:#fff}.ag-time{background:#ffd35f;color:#2a1a5e}.ag-note{color:#c9c0ff}
.ag-row{gap:clamp(10px,2.4vw,22px)}
.fz.ag-card{flex:0 1 164px;max-width:164px;min-height:0;height:min(330px,calc(100vh - 172px))}
#augS{background:radial-gradient(ellipse at 50% 30%,#3b2a7a,#140f2e 75%)!important}#mapM{background:radial-gradient(ellipse at 50% 30%,#4a2a1a,#2a160c 80%)!important}
#agTip{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:120;max-width:min(420px,92vw);background:#1d1640f2;color:#fff;border:2px solid #c9b6ff;border-radius:14px;padding:8px 14px;font:14px var(--f-display);text-align:center;box-shadow:0 4px 18px #0008;pointer-events:none;display:flex;flex-direction:column;gap:2px}#agTip[hidden]{display:none}#agTip b{font-size:15px;color:#ffe08a}#agTip small{font:11px var(--f-display);opacity:.75}
.fz.ag-card{justify-content:flex-start}.ag-box:has(.fz){width:min(640px,96vw)}
.fz .fz-rib{width:calc(100% + 20px);margin:0 -10px}.fz .ag-n span{font-size:clamp(14px,4.2vh,20px)}.fz .ag-d{font-size:clamp(12px,3.4vh,15px)}
.fz.ag-card{--fr:#c9d3e6;--fr2:#8a96b0;--glow:#a8c8ff;background:linear-gradient(180deg,#2c2368,#1a1440 60%,#120e30);border:0;border-radius:16px;box-shadow:0 0 0 3px var(--fr),0 0 0 6px #0e0a24,0 8px 0 6px #0e0a24,0 0 24px var(--glow);color:#fff;padding:clamp(24px,7.5vh,42px) 10px clamp(10px,2.5vh,16px);gap:clamp(4px,1.4vh,10px);justify-content:flex-start;margin:6px;overflow:visible}
.fz.ag-card::before{inset:7px;border:1.5px solid color-mix(in srgb,var(--fr) 60%,transparent);border-radius:11px}
.fz.t-g{--fr:#ffd56a;--fr2:#c8902a;--glow:#ffcf5a}
.fz.t-p{--fr:#ffb3f0;--fr2:#8ad8ff;--glow:#e2a0ff;animation:none;background:linear-gradient(180deg,#3a2378,#22175a 60%,#150f38)}
.fz.t-p{box-shadow:0 0 0 3px transparent,0 0 0 6px #0e0a24,0 8px 0 6px #0e0a24,0 0 26px var(--glow)}
.fz.t-p::after{content:'';position:absolute;inset:-3px;border-radius:19px;padding:3px;background:conic-gradient(from 0deg,#ff9ee0,#ffe08a,#9ff0c0,#8ad8ff,#c8a8ff,#ff9ee0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;animation:fzspin 6s linear infinite}
@keyframes fzspin{to{filter:hue-rotate(360deg)}}
.fz-c{position:absolute;width:clamp(22px,6vh,32px);height:clamp(22px,6vh,32px);pointer-events:none;z-index:3}.fz-c svg{width:100%;height:100%;fill:var(--fr);filter:drop-shadow(0 0 3px #0e0a24)}.fz-c .gem{fill:var(--glow);stroke:#fff;stroke-width:1.2}
.fz-c.tl{top:0;left:0}.fz-c.tr{top:0;right:0;transform:scaleX(-1)}.fz-c.bl{bottom:0;left:0;transform:scaleY(-1)}.fz-c.br{bottom:0;right:0;transform:scale(-1,-1)}
.t-p .fz-c svg{fill:#ffe08a}
.fz-tier{position:absolute;top:-3px;left:50%;transform:translateX(-50%);font:11px var(--f-display);letter-spacing:.08em;background:linear-gradient(var(--fr),var(--fr2));color:#1d1640;padding:2px 12px 3px;border-radius:0 0 10px 10px;white-space:nowrap;z-index:2}
.t-p .fz-tier{background:linear-gradient(90deg,#ff9ee0,#ffe08a,#9ff0c0,#8ad8ff)}
.fz-med{position:relative;width:clamp(62px,21vh,118px);height:clamp(62px,21vh,118px);flex-shrink:0;margin:4px 0 clamp(6px,2vh,12px);border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,#4a3c9a,#1d1640 72%);box-shadow:0 0 0 3px var(--fr),0 0 0 6px #120e30,0 0 0 8px var(--fr2),0 0 22px var(--glow) inset}
.t-g .fz-med{border-radius:28%}.t-g .fz-glow{border-radius:28%}
.t-p .fz-med{background:radial-gradient(circle at 50% 40%,#5a3ca8,#22175a 72%);box-shadow:0 0 0 3px #ffe08a,0 0 0 6px #120e30,0 0 0 8px #ffb3f0,0 0 26px #e2a0ff inset}
.fz-glow{position:absolute;inset:14%;border-radius:50%;background:radial-gradient(circle,var(--glow),transparent 70%);opacity:.55;filter:blur(4px)}
.ai-svg{position:relative;width:62%;height:62%;filter:drop-shadow(0 0 6px var(--glow)) drop-shadow(0 2px 0 #0e0a24)}
.fz-rib{position:relative;z-index:1;width:calc(100% + 26px);margin:0 -13px;background:linear-gradient(var(--fr),var(--fr2));color:#1d1640;padding:4px 10px 5px;clip-path:polygon(0 0,100% 0,95% 50%,100% 100%,0 100%,5% 50%);box-sizing:border-box}
.t-p .fz-rib{background:linear-gradient(90deg,#ffb3f0,#ffe08a,#9ff0c0,#8ad8ff,#ffb3f0)}
.fz .ag-n span{font:clamp(15px,4.6vh,22px) var(--f-display);color:#1d1640}
.fz .ag-d{color:#ecebff;font-size:clamp(12.5px,3.6vh,16px);margin-top:2px}
.fz.on{transform:translateY(-6px);box-shadow:0 0 0 3px #fff,0 0 0 6px #ff5f9e,0 8px 0 6px #0e0a24,0 0 30px #ff5f9e}
.fz-ok{position:absolute;bottom:6px;right:8px;font:12px var(--f-display);background:#ff5f9e;color:#fff;border-radius:8px;padding:1px 8px}
.ag-foot{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px}.ag-have{display:flex;align-items:center;gap:4px;background:#ffffff14;border:1.5px solid #ffffff33;border-radius:12px;padding:3px 8px;font:12px var(--f-display);color:#e8e4ff;flex-wrap:wrap}
.ag-have>span{margin-right:2px}.ag-have.op{background:#ff5f9e22;border-color:#ff9ec766}.ag-none{font-style:normal;opacity:.6;font-size:11px}
.ag-chip{width:28px;height:28px;border-radius:50%;padding:2px;border:2px solid var(--fr,#c9d3e6);background:#1d1640;display:grid;place-items:center;cursor:pointer;--glow:#a8c8ff}
.ag-chip.t-g{--fr:#ffd56a;--glow:#ffcf5a;border-radius:7px}.ag-chip.t-p{border-color:#ffb3f0;--glow:#e2a0ff;box-shadow:0 0 0 1.5px #ffe08a}
.ag-chip.t-s{--fr:#c9d3e6}
.ag-chip .ai-svg{width:84%;height:84%;filter:none}
/* 결과 화면에서는 밝은 바탕 */
.ag-foot.res .ag-have{background:#2a1d5c;border-color:#2a1d5c}
/* 그림 둘레 틀 없음: 그림만 빛나요 */
.fz-med,.t-g .fz-med,.t-p .fz-med{background:none!important;box-shadow:none!important;border-radius:0!important;transform:none!important}
.fz-glow{inset:6%;border-radius:50%;opacity:.35;filter:blur(18px)}
.fz .ai-svg{width:84%;height:84%}
/* 게임 중 내 증강체 (오른쪽 위 구석) */
#augHud{position:fixed;left:calc(10px + env(safe-area-inset-left,0px));top:calc(64px + env(safe-area-inset-top,0px));z-index:6;display:flex;flex-direction:column;gap:3px;pointer-events:auto}#augHud[hidden]{display:none}
#augHud>div{display:flex;align-items:center;gap:3px;background:#1d1640cc;border-radius:10px;padding:2px 5px;font:10.5px var(--f-display);color:#fff}#augHud>div.op{background:#5a1d40cc}
#augHud .ag-chip{width:24px;height:24px}
/* 맵 고르기 */
#mapM{z-index:72;background:#2a1a40aa}.map-slab{max-width:min(720px,94vw)}.map-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;margin:6px 0}
.map-b{display:flex;flex-direction:column;align-items:center;gap:4px;border:3px solid var(--choco);border-radius:14px;background:#fff;box-shadow:0 3px 0 var(--choco);padding:8px 4px;cursor:pointer;font:inherit;color:var(--choco)}
.map-b i{width:100%;aspect-ratio:1.6;border-radius:9px;background:radial-gradient(circle at 30% 30%,#fff8,transparent 50%),var(--mc);border:2px solid #4a2a1a33}.map-b b{font:13px var(--f-display);white-space:nowrap}
.map-b:active{transform:translateY(2px);box-shadow:0 1px 0 var(--choco)}
.map-b i.pic{background:#fff8ee center/cover no-repeat;border:2px solid #4a2a1a55}.map-b{padding:5px 5px 6px}.map-slab{width:min(600px,94vw);max-width:min(600px,94vw)}.map-slab h2{margin:2px 0}.map-b b{font-size:12.5px}
#augHud .ag-stkrow{display:block!important;margin-top:2px;padding:2px 8px;border-radius:9px;background:#1d1640cc;color:#fff;font:11px var(--f-display);white-space:nowrap;width:max-content;max-width:60vw;overflow:hidden;text-overflow:ellipsis}
.fz-tier em{font-style:normal}.fz-tier .ty-econ{color:#7a5a00}.fz-tier .ty-early{color:#0a6a4a}.fz-tier .ty-late{color:#9a2a1a}.fz-tier .ty-stack{color:#6a2aa0}.fz-tier .ty-gacha{color:#b0306a}.fz-tier .ty-stat{color:#3a3a6a}
#opAugShow{position:fixed;left:50%;top:calc(88px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:40;background:#1d1640ee;color:#fff;border:2px solid #c9b6ff;border-radius:16px;padding:8px 14px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;max-width:min(560px,92vw);box-shadow:0 6px 20px #0006;transition:opacity .35s;pointer-events:auto}#opAugShow[hidden]{display:none}#opAugShow.out{opacity:0}#opAugShow b{font:14px var(--f-display);color:#ffe08a}#opAugShow>div{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 10px}#opAugShow .oa{display:flex;align-items:center;gap:4px;font:12px var(--f-display);white-space:nowrap}#opAugShow .oa svg{width:22px;height:22px}#opAugShow em{font-style:normal}
#shop{touch-action:none}#shop .shop{touch-action:pan-y}
.it .th-pic{display:block;width:100%;aspect-ratio:1.6;object-fit:cover;border-radius:9px;border:2px solid #4a2a1a44;margin-bottom:2px}
/* 상점 칸 크기 똑같이 */
.shop-grid{grid-template-columns:repeat(auto-fill,minmax(88px,1fr));grid-auto-rows:1fr}.shop-grid .it{min-height:96px;justify-content:center;min-width:0}.shop-grid .it .nm{white-space:normal;text-align:center;line-height:1.1;font-size:12.5px;word-break:keep-all}.shop-grid .it>svg,.shop-grid .it>.ic-mix{width:40px;height:40px;flex-shrink:0}.shop-grid .it .pr svg{width:14px;height:14px}
/* 줄어든 스킬 사탕 */
.sk .cost.disc{background:#c9f7dc;color:#1f7a4a;border-color:#1f7a4a}
/* 증강체 설명: 정해 둔 줄에서만 바뀌어요 */
.fz .ag-d{white-space:nowrap;width:100%;overflow:hidden;line-height:1.3}
/* AI 난이도 */
.ai-lvl{display:flex;align-items:center;justify-content:center;gap:6px;margin:4px 0 0;font:14px var(--f-display);color:var(--choco)}.ai-lvl[hidden]{display:none}.ai-lvl button{font:14px var(--f-display);color:var(--choco);background:#fff;border:2.5px solid var(--choco);border-radius:12px;padding:3px 14px;box-shadow:0 2px 0 var(--choco);cursor:pointer}.ai-lvl button.on{background:var(--berry,#ff5f9e);color:#fff}
/* 랭크 두 개 */
.rank-chip{gap:10px;padding:3px 14px 3px 4px}.rk2{display:flex;align-items:center;gap:4px}.rk2>span{display:flex;flex-direction:column;line-height:1.05;font:14px var(--f-display)}.rk2 small{font:10.5px var(--f-ui);color:#8a6a50}
.rk2-wrap{display:flex;flex-direction:column;gap:8px;width:100%}.rk2-sec{display:flex;flex-direction:column;gap:4px}.rk2-h{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:13px;color:var(--choco)}.rk2-h>b{font:16px var(--f-display)}
.rk2-wrap .rk{padding:12px 3px 6px}.rk2-wrap .rk svg{width:30px;height:30px}.rk2-wrap .rk b{font-size:13px}.rk2-wrap .rk-s{font-size:11px}
"""
R(".shop-buy{",CSS6+"\n.shop-buy{")
# 안대(눈 띠)는 앞쪽 관자놀이까지만
R("const[y0,y1,rx,rz,cz]=BODY[bk].band,A=1.9,","const[y0,y1,rx,rz,cz]=BODY[bk].band,A=1.18,")
# 맵마다 나무·날아다니는 것 (29차 자)
R("  if(P.tree==='pine'){","  if(typeof TREES!=='undefined'&&TREES[P.tree]){TREES[P.tree](S,spots,IM,put,L,P,stickM,white)}else if(P.tree==='pine'){")
R("    if(P.flyer==='bat'){","    if(typeof FLYK!=='undefined'&&FLYK[P.flyer])FLYK[P.flyer](g,L,i);else if(P.flyer==='bat'){")
R("g.scale.setScalar(1.3);SK.add(g);","if(g.userData.nw)for(const w of wings)w.visible=false;g.scale.setScalar(1.3);SK.add(g);")
R("wheel.position.set(W+34,18,46);wheel.rotation.y=-Math.PI/2.6;S.add(wheel);","wheel.position.set(W+34,18,46);wheel.rotation.y=-Math.PI/2.6;if(!P.noWheel)S.add(wheel);")
