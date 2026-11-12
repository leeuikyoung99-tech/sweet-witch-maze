(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const res={trials:0,inside:0,trapped:0,fell:0,parkOK:0,parkTry:0,samples:[]};
for(let round=0;round<2;round++){snStart({});await w(1500);SN.on=false;await w(50);const me=SNV.me,key=SN.my,Z=SN_Z[key],J=SNV.joy;SN.phase='hide';SN.busy=false;SN.camoT=0;SN.face=false;
 const pen=()=>{const st=snTr(me)?'prone':me.stance,r=SN_RAD[st],s=SN_STEP[st];for(const o of SNV.obs[key])if(o.top>me.pos.y+s&&snObsD(o,me.pos.x,me.pos.z)<r-.03)return o;return null};
 const tick=n=>{for(let i=0;i<n;i++){snMoveTick(1/30);me.m.mixer.update(1/30)}};
 for(let t=0;t<40;t++){res.trials++;const sp=snRandSpot(key,'any');snSet(me,sp,snR(0,7));me.vy=0;me.onG=true;me.mantle=null;snStance(me,Math.random()<.5?'stand':'prone');me.m.sb=null;SN.cy=snR(0,7);
  let pc=0,maxPc=0;for(let s=0;s<6;s++){const a=snR(0,7);J.x=Math.cos(a);J.y=Math.sin(a);for(let i=0;i<15;i++){tick(1);if(pen())pc++;else pc=0;maxPc=Math.max(maxPc,pc)}
    if(Math.random()<.4&&me.stance==='stand'){const y0=me.pos.y;res.parkTry++;snParkour();J.x=0;J.y=0;tick(30);if(me.pos.y>y0+.36)res.parkOK++}}
  J.x=J.y=0;if(maxPc>20){res.inside++;const o=pen();if(res.samples.length<6)res.samples.push('inside '+(o?(o.box?'box':'circ r'+o.r.toFixed(2))+' top+'+(o.top-me.pos.y).toFixed(2):'?'))}
  if(me.pos.y<Z.y-.01){res.fell++}
  const p0=me.pos.clone();let mx=0;for(let k=0;k<8;k++){const a=k/8*Math.PI*2;snSet(me,p0.clone(),me.yaw);J.x=Math.cos(a);J.y=Math.sin(a);tick(12);mx=Math.max(mx,me.pos.distanceTo(p0))}snSet(me,p0,me.yaw);J.x=J.y=0;
  if(mx<.03){res.trapped++;if(res.samples.length<10)res.samples.push('trapped '+me.stance+' near '+SNV.obs[key].filter(o=>snObsD(o,p0.x,p0.z)<.3).map(o=>(o.box?'box':'r'+o.r.toFixed(2))+'/top+'+(o.top-p0.y).toFixed(2)).join(','))}}
 snStop()}
return JSON.stringify(res)})()
