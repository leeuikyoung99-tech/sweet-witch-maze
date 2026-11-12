(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const E=[];addEventListener('error',e=>E.push(e.message));const res={n:0,stick:0,top:0,side:0,fails:[]};let shot=null;
for(let round=0;round<1;round++){snStart({});await w(1500);SN.on=false;const me=SNV.me,key=SN.my,J=SNV.joy;SN.phase='hide';SN.busy=false;SN.camoT=0;SN.face=false;const base=SN_Z[key].y+.14;
 const tick=n=>{for(let i=0;i<n;i++){snMoveTick(1/30);me.m.mixer.update(1/30)}};
 for(const o of SNV.obs[key]){const h=o.top-base;if(h<.6)continue;let st=null;for(let k=0;k<16&&!st;k++){const a=k/16*Math.PI*2;const rr=(o.box?Math.max(o.hx,o.hz):o.r)+.3;const x=o.x+Math.cos(a)*rr,z=o.z+Math.sin(a)*rr;if(snFree(key,x,z,.15)&&snGround(key,x,z,base,'stand')===base&&snObsD(o,x,z)<.32)st=[x,z]}
  if(!st)continue;res.n++;const yaw=Math.atan2(o.x-st[0],o.z-st[1]);me.wall=null;me.wallUp=null;me.mantle=null;snSet(me,new THREE.Vector3(st[0],base,st[1]),yaw);snStance(me,'stand');me.m.sb=null;me.vy=0;me.onG=true;
  snLock();if(!me.wall){if(res.fails.length<6)res.fails.push('nostick h'+h.toFixed(2)+' d'+snObsD(o,st[0],st[1]).toFixed(2));continue}res.stick++;
  const p0=me.pos.clone();SN.cy=me.yaw+Math.PI;J.x=1;J.y=0;tick(20);J.x=0;if(me.pos.distanceTo(p0)>.05)res.side++;
  if(!shot&&h>1.5){shot=1;SNV.me.m.mixer.update(.1)}
  for(let i=0;i<40&&me.wall;i++){snJump();tick(8)}tick(20);if(!me.wall&&me.onG!==false&&me.pos.y>=o.top-.03)res.top++;else if(res.fails.length<6)res.fails.push('notop h'+h.toFixed(2)+' y+'+(me.pos.y-base).toFixed(2)+' wall'+!!me.wall)}
 snStop()}
return JSON.stringify(res)+' '+E.join('|')})()
