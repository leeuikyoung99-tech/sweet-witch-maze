(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const res={stack:0,float:0,items:0,ifl:0,f:[]};for(let t=0;t<4;t++){snStart({});await w(1300);
for(const key of['low','high']){const base=SN_Z[key].y+.14;const Z=SNV.zones[key];
 const below=(obj,x,z,y)=>{const vis=obj.visible;obj.visible=false;snRay.set(new THREE.Vector3(x,y+.02,z),new THREE.Vector3(0,-1,0));snRay.far=50;const L=snRay.intersectObjects(SNV.occ[key],false).filter(h=>{let p=h.object;while(p){if(p===obj)return false;p=p.parent}return true});obj.visible=vis;snRay.far=Infinity;return L[0]?y-L[0].point.y:null};
 for(const P of Z.props){if(P.fix||P.big)continue;const y=P.g.position.y;if(y<=base+.01)continue;res.stack++;const d=below(P.g,P.x,P.z,y);if(d==null||d>.06){res.float++;if(res.f.length<6)res.f.push(P.k+' gap'+(d==null?'none':d.toFixed(2)))}}
 for(const it of SNV.items[key]){const p=it.sp.position;if(p.y<=base+.01)continue;res.items++;const d=below(it.sp,p.x,p.z,p.y);if(d==null||d>.06){res.ifl++;if(res.f.length<10)res.f.push('item '+it.k+' gap'+(d==null?'none':d.toFixed(2)))}}}
snStop()}return JSON.stringify(res)})()
