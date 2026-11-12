/* ================= 32차 (바): 이야기 장면 배경 — 그 장의 3D 마을을 낮은 각도로 비춰요 ================= */
let STCAM=0;
{const uc=updCamera;updCamera=function(dt){if(STCAM){const W=N*C,t=performance.now()/1000;camera.position.set(W/2+Math.sin(t*.05)*W*.3,11,W*1.22);camera.lookAt(W/2,7,W*.2);camera.fov=58;camera.updateProjectionMatrix();return}return uc.apply(this,arguments)}}
{const tk=storyTalk;storyTalk=function(lines,c,done){const th=STORY[c-1].th,cp=camPreview;try{applyTheme(th)}catch(e){}
  STCAM=1;camPreview=false;document.body.classList.add('st-talk');
  return tk.call(this,lines,c,()=>{STCAM=0;camPreview=cp;document.body.classList.remove('st-talk');done&&done()})}}
{const st=document.createElement('style');st.textContent=`
body.st-talk .scr:not(#storyM),body.st-talk #hud,body.st-talk #hudD,body.st-talk #hudS,body.st-talk #pzM{visibility:hidden!important}
#storyM.st31{background:transparent!important}
#storyM.st31 .s3-bg{background:linear-gradient(#0000 0%,#0000 40%,#2b160b70 78%,#2b160bb0 100%),radial-gradient(ellipse at 50% 45%,#0000 55%,#2b160b55 100%)!important}
#storyM.st31 .s3-bg::after{display:none}
`;document.head.appendChild(st)}
