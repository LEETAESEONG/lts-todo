# Vercel 배포
- 해당 링크로 접속하면 설치 없이도 사용 가능합니다.
- [lts-todo](https://lts-todo.vercel.app/todos)

# 실행 방법

1. node 버전 확인 (v20.12.1)

```bash
node -v
```

2. 버전이 다른 경우

- [nvm설치 및 사용법](https://sound-programming.tistory.com/186)
- 해당 링크에서 nvm을 가지고 version을 v20.12.1로 맞춘다.

3. 버전이 같은 경우

- node_modules 설치

```bash
npm install
```

- 실행

```bash
npm run start
```

# 앱 사용방법

1. todo 생성하기
   1. 우측 하단 float button (스마일표시) 클릭
   2. 임의로 할 일 추가 또는 할 일 추가로 생성 가능
      - 임의로 할 일 추가는 원하는 숫자 만큼 데이터를 랜덤으로 추가합니다.
2. 반응형
   - 화면을 phone, tablet, desktop으로 나눠서 반응형으로 제작했습니다.
3. todo 상세 페이지로 이동하기
   - 홈, calendar, 할일 목록 등에서 id를 클릭하면 상세 페이지로 이동가능합니다.
4. 삭제, 변경
   - todo를 done으로 done을 todo로 바꿀 수 있습니다.
   - 완료된 일 페이지에서 해당 id를 선택하고 재활성화 버튼을 클릭하면 done을 todo로 바꿉니다.
     - todo를 done으로 바꾸는 것도 비슷합니다.
   - 삭제하는 일은 todo와 done이 똑같습니다.
     - 해당 id를 checkbox로 선택하고 삭제하기를 클릭합니다.
5. 정렬
   - 완료된 일과 해야할 일 페이지에서는 중요도와 시작 날짜, 끝 날짜를 이용하여 오름차순 내림차순 정렬이 가능합니다.
6. 중요도에 따라 다른 색 적용
   - 처리된 일 : 검정
   - 중요도 1 : 파랑
   - 중요도 2 : 초록
   - 중요도 3 : 노랑
   - 중요도 4 : 주황
   - 중요도 5 : 빨강

# Ant-Design 컴포넌트 사용 내역

### 공통 사용

1. FloatButton
   - navigation으로 사용
   - 화면 전환
2. Button
3. Icon
4. Checkbox
   - 전체 선택
   - todo 선택 삭제
   - todo 변경
5. Tooltip
   - 시간, 제목 등 보여주기
6. Message
   - 즉각적인 피드백
   - 삭제 완료
   - 변경 완료
   - 수정 완료

### All My Works (Main Page)

15. Empty
   - todo가 비었을 때
16. Timeline
   - 오늘을 기준으로 할 일 보여주기

### All My Todos

15. Empty
   - todo가 비었을 때
16. Table
   - 테이블 형식으로 할 일 보여주기

### All My Dones

15. Empty
   - done이 비었을 때
16. Table
   - 테이블 형식으로 완료된 일 보여주기

### Create Todo

5. DatePicker
6. Form
7. Input
8. Rate
   - 중요도
9. TimePicker

### My Calendar

13. Calendar
   - 달력으로 할 일, 완료된 일 보기
      - 검정색 완료된 일
      - 색 별로 중요도 확인 가능

### Todo Detail

6. Form
   - disabled 해놓고 수정할 때는 풀기
   - 버튼 클릭하면 제출하고 수정됨
