// 게시물 모델 정의

  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },


// 크루 모델 정의

  name: String,
  introduction: String,
  profileImage: String,
  
app.use(bodyParser.urlencoded({ extended: false }));

// 크루 생성 API 엔드포인트
app.router('/crew/create-crew', (req, res) => {
  const { name, introduction, profileImage } = req.body;

  // 중복된 크루명인지 확인
  Crew.findOne({ name: name })
    .then((existingCrew) => {
      if (existingCrew) {
        return res.status(409).send('이미 존재하는 크루명입니다.');
      }

      // 새로운 크루 생성
      const newCrew = new Crew({
        name,
        introduction,
        profileImage,
      });

      // 크루 저장
      newCrew
        .save()
        .then(() => {
          res.status(201).send('크루가 성공적으로 생성되었습니다.');
        })
        .catch((err) => {
          console.error('크루 생성 오류:', err);
          res.status(500).send('크루 생성 중 오류가 발생했습니다.');
        });
    })
    .catch((err) => {
      console.error('크루 조회 오류:', err);
      res.status(500).send('크루 생성 중 오류가 발생했습니다.');
    });
});

// 게시물 조회 API 엔드포인트
app.get('/crew/posts/:crewId', (req, res) => {
  const { crewId } = req.params;

  // 크루에 속한 게시물 조회
  Crew.findById(crewId)
    .populate('posts')
    .sort({ 'posts.createdAt': -1 })
    .exec((err, crew) => {
      if (err) {
        console.error('게시물 조회 오류:', err);
        return res.status(500).send('게시물 조회 중 오류가 발생했습니다.');
      }

      if (!crew) {
        return res.status(404).send('크루를 찾을 수 없습니다.');
      }

      res.send(crew.posts);
    });
});

// 게시물 생성 API 엔드포인트
app.router('/crew/create-post', (req, res) => {
  const { crewId, title, content } = req.body;

  // 크루에 속한 게시물 생성
  const newPost = new Post({
    title,
    content,
  });

  newPost.save((err, post) => {
    if (err) {
      console.error('게시물 생성 오류:', err);
      return res.status(500).send('게시물 생성 중 오류가 발생했습니다.');
    }

    Crew.findByIdAndUpdate(
      crewId,
      { $push: { posts: post._id } },
      { new: true },
      (err, crew) => {
        if (err) {
          console.error('게시물 생성 오류:', err);
          return res.status(500).send('게시물 생성 중 오류가 발생했습니다.');
        }

        if (!crew) {
          return res.status(404).send('크루를 찾을 수 없습니다.');
        }

        res.status(201).send('게시물이 성공적으로 생성되었습니다.');
      }
    );
  });
});

