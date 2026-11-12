// ===== 71차: 바닥과 벽이 잘 구분되게 (바다 속 젤리 · 초콜릿 공장 · 생일 케이크 성) =====
// 바닥 타일 사이 줄눈이 진해서 위에서 보면 얇은 벽처럼 보였고, 벽과 바닥 색도 비슷했어요.
// 줄눈은 타일과 거의 같은 색으로 약하게, 벽은 바닥과 밝기·색이 확실히 다르게 해요.
// 바다: 밝은 모래 바닥 + 진한 바다색 바탕의 알록달록 젤리 벽
Object.assign(THEMES.sea.floor,{bg:'#e3c992',t:['#f7e6bc','#f2ddab','#ecd49c'],alt:['#f9ebc8','#f4e1b4','#efd8a6'],i1:'#f8e7bf',i2:'#f3dfb0',alti1:'#faedcd',alti2:'#f5e4bb',sp:['#ffffff55','#c8a87033']});
Object.assign(THEMES.sea.wall,{edge:'#1f6a8e',joint:'#0b4a6e'});
// 초콜릿 공장: 밝은 캐러멜 바닥 + 진한 다크 초코바 벽
Object.assign(THEMES.choco.floor,{bg:'#d9b282',t:['#f0d2a8','#ebc99b','#e4bf8e'],i1:'#f3d8b2',i2:'#eccc9f',sp:['#ffffff44','#a8693d22']});
Object.assign(THEMES.choco.wall,{face:['#6e3c20','#4e2a17'],frame:'#2e170b',rim:'#9a5c36',edge:'#4e2a17',joint:'#2e170b'});
// 생일 케이크 성: 진한 딸기 크림 바닥 + 하얀 생크림·카스텔라 벽 (정답 길 선은 분홍 바닥에서도 보이게 보라색)
Object.assign(THEMES.cake.floor,{bg:'#e2689a',t:['#f186b0','#ee7ca8','#ea73a1'],alt:['#f493b8','#f189b1','#ee80aa'],i1:'#f38eb5',i2:'#f085ae',alti1:'#f69bbe',alti2:'#f392b7',sp:['#ffffff44','#c0406a22']});
THEMES.cake.path=['#6b3cff','#1fae8c'];
