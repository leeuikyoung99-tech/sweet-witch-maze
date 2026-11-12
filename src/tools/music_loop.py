# 게임용 반복 음악 만들기 (두 번째 방법)
# 곡 안에서 앞뒤 몇 초의 소리(음높이 띠별 세기)가 가장 똑같은 두 지점 A < B 를 찾아 [A, B) 를 반복해요.
# 같은 후렴의 같은 자리라서, B 에서 A 로 넘어가도 박자·화음이 그대로 이어져요.
# 마지막에 파형을 샘플 단위로 맞추고 0.12초 겹쳐 이어요. 소리 크기는 -12 LUFS, 최고점 -1dB.
# 사용: python3 loop2.py <입력> <출력.mp3> [최소 반복 길이 초=90]
import subprocess,sys,json,os,numpy as np
SR=44100
def load(f,sr,ch):
    b=subprocess.run(['ffmpeg','-v','error','-i',f,'-ac',str(ch),'-ar',str(sr),'-f','f32le','-'],capture_output=True,check=True).stdout
    return np.frombuffer(b,np.float32).reshape(-1,ch).copy()
inp,out=sys.argv[1],sys.argv[2];minL=float(sys.argv[3]) if len(sys.argv)>3 else 90
BAR=float(sys.argv[4])*int(sys.argv[5])/1 if len(sys.argv)>5 else 0  # 박 간격(초) x 한 마디 박 수
x=load(inp,SR,2);m=load(inp,22050,1)[:,0]
# 특징: 48개 띠(로그 간격) 세기, 프레임마다 정규화
hop=512;win=4096;fps=22050/hop;nfr=(len(m)-win)//hop
idx=np.arange(win)[None,:]+hop*np.arange(nfr)[:,None]
P=np.abs(np.fft.rfft(m[idx]*np.hanning(win),axis=1))**2
fr=np.fft.rfftfreq(win,1/22050);ed=np.geomspace(60,8000,49)
B=np.stack([P[:,(fr>=ed[i])&(fr<ed[i+1])].sum(1) for i in range(48)],1)
F=np.log(B+1e-6);F-=F.mean(1,keepdims=True);F/=np.linalg.norm(F,axis=1,keepdims=True)+1e-9
# 곡의 시작·끝 (조용한 앞부분, 끝 페이드) 피하기
rms=np.sqrt((B.sum(1)));db=20*np.log10(rms+1e-9);med=np.median(db)
loud=db>med-10;s0=int(np.argmax(loud));e0=len(loud)-int(np.argmax(loud[::-1]))
W=int(6*fps)   # 앞뒤 6초씩 비교
lo,hi=s0+W+int(3*fps),e0-W-int(3*fps)
best=(-1,0,0)
for L in range(int(minL*fps),hi-lo):
    if BAR:
        k=round(L/fps/BAR)
        if abs(L/fps-k*BAR)>1.5/fps:continue
    d=(F[lo-W:hi-L+W]*F[lo-W+L:hi+W]).sum(1)   # A 와 A+L 의 프레임 유사도
    c=np.convolve(d,np.ones(2*W)/(2*W),'valid')  # 앞뒤 6초 평균
    if not len(c):continue
    i=int(np.argmax(c));sc=c[i]+0.02*(L/fps)/180   # 같으면 긴 반복을 조금 더 좋아해요
    if sc>best[0]:best=(sc,lo+i,L)
sc,Af,Lf=best;A=Af/fps;Bt=A+Lf/fps
# 샘플 단위 맞추기: B 근처 ±25ms 에서 A 주변 파형과 가장 닮은 곳
mm=x.mean(1);a=int(A*SR);b0=int(Bt*SR);K=int(.04*SR);R=int(.025*SR)
ref=mm[a-K:a+K];bestc=(-9,b0)
for b in range(b0-R,b0+R):
    seg=mm[b-K:b+K];c=np.dot(ref,seg)/(np.linalg.norm(ref)*np.linalg.norm(seg)+1e-9)
    if c>bestc[0]:bestc=(c,b)
corr,b=bestc
y=x[a:b].copy();cf=int(.12*SR)
# 끝 0.12초를 'A 직전 0.12초'로 바꿔 가며 겹치면, 끝에서 처음으로 그대로 이어져요
t=np.linspace(0,1,cf)[:,None];y[-cf:]=y[-cf:]*np.cos(t*np.pi/2)**2+x[a-cf:a]*np.sin(t*np.pi/2)**2
print(f'{os.path.basename(inp)}: 반복 {A:.2f}s → {b/SR:.2f}s (길이 {(b-a)/SR:.1f}s) · 앞뒤 6초 닮은 정도 {sc:.3f} · 파형 맞춤 {corr:.3f}')
raw=out+'.f32';y.astype(np.float32).tofile(raw)
r=subprocess.run(['ffmpeg','-hide_banner','-f','f32le','-ar',str(SR),'-ac','2','-i',raw,'-af','loudnorm=I=-12:TP=-1.0:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
J=json.loads(r[r.rindex('{'):r.rindex('}')+1])
af=f"loudnorm=I=-12:TP=-1.0:LRA=11:measured_I={J['input_i']}:measured_TP={J['input_tp']}:measured_LRA={J['input_lra']}:measured_thresh={J['input_thresh']}:offset={J['target_offset']}:linear=true"
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i',raw,'-af',af,'-ar',str(SR),'-c:a','libmp3lame','-b:a','128k',out],check=True);os.remove(raw)
