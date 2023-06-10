const MongoClient = require('mongodb').MongoClient;

// MongoDB 연결 문자열
const connectionString = 'mongodb+srv://91714806:AKfnPw7DsfN6sOYE@iamdb.qe5wfqx.mongodb.net/';
const keyword = '검색할_키워드'; // 사용자가 입력한 검색어

// MongoDB에 연결하여 검색 수행
MongoClient.connect(connectionString, (err, client) => {
  if (err) {
    console.error('MongoDB 연결 실패:', err);
    return;
  }

  const db = client.db();
  const collection = db.collection('board'); // 실제 컬렉션 이름으로 'mycollection'을 변경해주세요

  // 키워드를 포함한 데이터 검색
  collection.find({ $text: { $search: keyword } }).toArray((err, documents) => {
    if (err) {
      console.error('검색 실패:', err);
      return;
    }

    if (documents.length > 0) {
      // 검색 결과 표시
      console.log('검색 결과:');
      documents.forEach((document) => {
        console.log(document);
      });
    } else {
      // "데이터가 존재하지 않습니다" 메시지 표시
      console.log('데이터가 존재하지 않습니다.');
    }

    client.close(); // 연결 종료
  });
});
