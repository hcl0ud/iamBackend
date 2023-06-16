const { db } = require("../models");
const user = db.collection("user");
const board = db.collection("crew");

app.use(express.static('public'));

// 추천 크루 가져오는 API 엔드포인트
app.get('/crew/get-recommended-crew', async (ctx) => {
  // 예시 데이터로 대체
  const recommendedCrews = [
    {
      _id: '크루1_ID',
      name: '추천 크루 1',
      introduction: '추천 크루 1 소개',
      memberCount: 10,
      postCount: 20,
    },
    {
      _id: '크루2_ID',
      name: '추천 크루 2',
      introduction: '추천 크루 2 소개',
      memberCount: 15,
      postCount: 30,
    },
    //...
  ];

  ctx.body = { recommendedCrews };
});

// 크루 가입 API 엔드포인트
app.post('/crew/join-crew', async (ctx) => {
  const { crewId } = ctx.request.body;

  // 크루 가입 로직 작성
  // crewId를 기반으로 크루를 조회하고, 사용자를 크루에 추가하는 로직을 구현

  ctx.body = '크루 가입이 완료되었습니다.';
});
