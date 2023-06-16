const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MongoDB 연결 설정
mongoose.connect('mongodb+srv://91714806:AKfnPw7DsfN6sOYE@iamdb.qe5wfqx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Crew 모델 정의
const Crew = mongoose.model('Crew', {
  name: String,
  introduction: String,
  profileImage: String,
});

app.use(express.static('public'));

// 추천 크루 가져오는 API 엔드포인트
app.get('/api/get-recommended-crew', (req, res) => {
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

  res.json({ recommendedCrews });
});

// 크루 가입 API 엔드포인트
app.post('/api/join-crew', (req, res) => {
  const { crewId } = req.body;

  // 크루 가입 로직 작성
  // crewId를 기반으로 크루를 조회하고, 사용자를 크루에 추가하는 로직을 구현

  res.status(200).send('크루 가입이 완료되었습니다.');
});

app.listen(5173, () => {
  console.log('서버가 5173번 포트에서 실행 중입니다.');
});
