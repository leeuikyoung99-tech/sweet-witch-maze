# 쿠쿠드 · 마녀의 미로 (sweet-witch-maze)

쿠키 도둑(미로 탈출)과 과자 마녀(미로 짓기·방해)의 비대칭 대결. 혼자 하기(AI), 스토리(달콤 별 조각), 아무나와 하기(도둑·마녀 랭크), 친구랑 하기, 꾸미기, 카드·스킬, 보상, 매일 미션, 증강체.
2026-11-12 에 달콤 공방전·달콤 저격전을 따로 저장소로 나눴고, 이 저장소에서는 두 게임 코드를 모두 걷어 냈어요.

## 정해진 것
- 서브 게임(도둑 대 도둑 경주 · 마녀 대 마녀)은 없앴어요. 게임 고르기 화면에는 도둑·마녀만 있어요 (parts/p69nosub.js, 안쪽 코드는 아직 숨은 채로 남아 있어요).
- 마녀 벽 스킬은 '벽 밀기(벽 옮기기)' 하나만. 초코 벽·벽 돌리기는 없어요 (parts/p67wmove.js). 카드·스킬 화면에서는 '고정 스킬'이라고 써요. 벽 스킬 후보 칸은 없어요.
- 증강체 버튼(도둑 하늘 보기·벽 냠냠, 마녀 소다 충전·새 패·출동)은 아이콘으로, 나/상대 증강체 칩 옆에 붙어요 (도둑은 칩 아래, 마녀는 칩 오른쪽). parts/p70fix.js
- 마녀 3,2,1 동안 왼쪽 개수 판(몬스터·포탑…)은 숨겨 두고 시작할 때 한 번만 켜요. 화면이 낮으면 도둑 스킬 버튼 묶음을 미니맵 아래 높이에 맞게 줄여요. parts/p70fix.js
- 맵 고르기 넘기기 화면 스타일은 parts/p50a.js 에 있어요 (.mp-row, .mp-arw, .mp-pic, .mp-dots).

## 작업 규칙 (사용자와 합의)
- 한국어로 대답하고, 이모지는 쓰지 않아요. 짧고 핵심만.
- 화면 UI·버튼은 절대 서로 겹치거나, 잘리거나, 떠 있으면 안 돼요. 바꿀 때마다 여러 화면 크기(640x300, 740x330, 844x390, 1024x600)에서 직접 확인해요.
- 버튼에는 글씨 대신 직접 그린 아이콘을 써요.
- 애매한 결정은 일어날 수 있는 경우를 보기로 들어 사용자에게 물어봐요.
- 버그는 사용자에게 떠넘기지 말고 직접 플레이·봇 테스트로 찾아요.
- 카메라가 저절로 움직이면 안 돼요 (사용자가 손가락으로 돌리거나 확대할 때만).

## 소스 구조
- 맨 위 폴더 = GitHub Pages로 바로 나가는 결과물 (index.html, sw.js, manifest.webmanifest, 아이콘, models/, music/, vendor/).
- src/ = 빌드 재료. 직접 index.html을 고치지 말고 src를 고친 뒤 빌드해요.
  - src/mz/v27.html: 바탕 게임 파일
  - src/patch28.py (+ patch29.py, patch29z.py): 바탕에 고친 점을 덧대고 parts/*.js 를 차례로 이어 붙여요
  - src/parts/*.js: 기능별 코드 조각 (차례가 중요해요, patch28.py 의 목록 참고)
  - src/app.txt: maze (build.py 가 maze 만 받아요)
  - src/patch.txt: 패치 번호. 올릴 때마다 1씩 올려요 (sw.js 캐시 이름이 바뀌어 휴대폰에서도 새 버전을 받아요)

## 빌드·배포
```
python3 src/build.py         # SYNTAX_OK 와 built ... 가 나오면 성공
git add -A && git commit -m "..." && git push origin main   # GitHub Pages 반영까지 3분쯤
```
- 미리보기·테스트용 한 파일: src/mz/v28e.html (글꼴 포함). Artifact 로 보여 줄 때도 이 파일을 써요.
- 필요한 도구: python3 + fontTools (pip install fonttools brotli --break-system-packages), node, playwright(크로미움).

## 테스트 (src/tests)
- `node src/tests/probe4.js "<브라우저에서 돌릴 JS>"` : src/mz/v28e.html 을 열고 JS 결과를 찍어요. SHOT=파일.png VW=844 VH=390 환경변수로 화면 찍기.
- 페이지 오류(PAGEERR)·콘솔 오류(CERR)도 같이 찍혀요.
- tour.js: 제목 화면 버튼 돌아보기 (probe4.js 에 내용을 넘겨서 돌려요).

## 다른 게임과의 관계
- 원래 '쿠쿠드' 앱 하나에 마녀의 미로·달콤 공방전·달콤 저격전이 같이 있었고, 2026-11-12 에 게임마다 저장소를 나눴어요.
  - sweet-witch-maze (마녀의 미로, app=maze), sweet-witch-gongbang (달콤 공방전, app=rg), sweet-witch-sniper (달콤 저격전, app=sn)
- 지금은 세 저장소의 src 가 같은 코드에서 시작했어요. 공방전·저격전 앱 안에는 아직 미로 코드가 숨은 채로 들어 있어요 (제목 화면에서 진입만 막음). 미로 저장소에서는 공방전·저격전 코드·그림·번역 문구를 지웠어요. 앞으로 각 저장소에서 따로 다듬고, 필요 없는 미로 코드는 천천히 걷어 내도 돼요.
- 저장 데이터는 게임마다 따로예요 (localStorage 키: 미로 swm-save, 공방전 swm-save-rg, 저격전 swm-save-sn). 같은 github.io 주소를 써서 키를 나눴어요.
- sw.js 는 자기 캐시(접두어)만 지워요. 미로 sweet-witch-v*, 공방전 sw-gongbang-v*, 저격전 sw-sniper-v*.
- 계정·랭크 서버(Supabase)는 세 게임이 같이 써요. publishable 키는 공개용이고, 지우는 SQL 은 사용자 허락이 필요해요.
