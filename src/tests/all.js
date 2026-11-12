(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const res={n:0,ok:0,viaJump:0,viaWall:0,nospot:0,f:[]};
for(let t=0;t<2;t++){snStart({});await w(1300);SN.on=false;const key=SN.my,me=SNV.me,J=SNV.joy,base=SN_Z[key].y+.14;SN.phase='hide';SN.busy=false;SN.camoT=0;
 const tick=n=>{for(let i=0;i<n;i++){snMoveTick(1/30);me.m.mixer.update(1/30)}};
 for(const P of SNV.zones[key].props){if(P.wall||P.k==='sink'||P.g.position.y>base+.01)continue;const b=new THREE.Box3().setFromObject(P.g);if(b.max.y-base<.4)continue;
  const onIt=()=>me.pos.x>b.min.x-.05&&me.pos.x<b.max.x+.05&&me.pos.z>b.min.z-.05&&me.pos.z<b.max.z+.05&&me.pos.y>base+.3;
  const cx=(b.min.x+b.max.x)/2,cz=(b.min.z+b.max.z)/2,R=Math.max(b.max.x-b.min.x,b.max.z-b.min.z)/2;let spots=[];for(let k=0;k<16;k++){const a=k/16*Math.PI*2;for(const rr of[R+.25,R+.45,R+.7]){const x=cx+Math.cos(a)*rr,z=cz+Math.sin(a)*rr;if(snFree(key,x,z,.15)&&snGround(key,x,z,base,'stand')===base){spots.push([x,z]);break}}}
  if(!spots.length){res.nospot++;continue}res.n++;let done=false;
  for(const st of spots.slice(0,4)){const yaw=Math.atan2(cx-st[0],cz-st[1]);const reset=()=>{me.wall=null;me.wallUp=null;me.mantle=null;snSet(me,new THREE.Vector3(st[0],base,st[1]),yaw);snStance(me,'stand');me.m.sb=null;me.vy=0;me.onG=true;SN.cy=yaw};
   reset();J.x=0;J.y=1;tick(8);J.y=0;snJump();tick(30);if(onIt()){res.ok++;res.viaJump++;done=true;break}
   reset();J.y=1;tick(12);J.y=0;snLock();for(let i=0;i<25&&me.wall;i++){snJump();tick(10)}tick(25);if(onIt()){res.ok++;res.viaWall++;done=true;break}}
  if(!done&&res.f.length<12)res.f.push(P.k+' h'+(b.max.y-base).toFixed(2))}
 snStop()}
return JSON.stringify(res)})()
