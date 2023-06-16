// routes/index.js

const router = require('koa-router')();
const { User, Crew, Post } = require('../models');

// 크루 생성 API 엔드포인트
router.post('/crew/create-crew', async (ctx) => {
  const { name, introduction, profileImage } = ctx.request.body;

  try {
    // 중복된 크루명인지 확인
    const existingCrew = await Crew.findOne({ name: name });

    if (existingCrew) {
      ctx.status = 409;
      ctx.body = '이미 존재하는 크루명입니다.';
      return;
    }

    // 새로운 크루 생성
    const newCrew = new Crew({
      name,
      introduction,
      profileImage,
    });

    // 크루 저장
    await newCrew.save();

    ctx.status = 201;
    ctx.body = '크루가 성공적으로 생성되었습니다.';
  } catch (err) {
    console.error('크루 생성 오류:', err);
    ctx.status = 500;
    ctx.body = '크루 생성 중 오류가 발생했습니다.';
  }
});

// 게시물 조회 API 엔드포인트
router.get('/crew/posts/:crewId', async (ctx) => {
  const { crewId } = ctx.params;

  try {
    // 크루에 속한 게시물 조회
    const crew = await Crew.findById(crewId).populate({
      path: 'posts',
      populate: {
        path: 'author',
        model: 'User',
      },
    }).sort({ 'posts.createdAt': -1 });

    if (!crew) {
      ctx.status = 404;
      ctx.body = '크루를 찾을 수 없습니다.';
      return;
    }

    // 현재 사용자의 크루 소속 여부 확인
    // 예시로 사용자 ID를 'userId'라고 가정합니다.
    const userId = 'userId';

    if (crew.members.includes(userId)) {
      // 현재 사용자가 크루에 속한 경우 게시물 목록 반환
      ctx.body = crew.posts;
    } else {
      // 현재 사용자가 크루에 속하지 않은 경우 권한 없음 에러 반환
      ctx.status = 403;
      ctx.body = '해당 크루에 접근할 권한이 없습니다.';
    }
  } catch (err) {
    console.error('게시물 조회 오류:', err);
    ctx.status = 500;
    ctx.body = '게시물 조회 중 오류가 발생했습니다.';
  }
});

// 게시물 생성 API 엔드포인트
router.post('/crew/create-post', async (ctx) => {
  const { crewId, title, content } = ctx.request.body;

  // 현재 사용자의 ID
  // 예시로 사용자 ID를 'userId'라고 가정합니다.
  const userId = 'userId';

  try {
    // 사용자가 속한 크루인지 확인
    const user = await User.findById(userId);

    if (!user) {
      ctx.status = 404;
      ctx.body = '사용자를 찾을 수 없습니다.';
      return;
    }

    // 사용자가 속한 크루 목록에서 입력된 크루 ID를 찾음
    if (user.crews.includes(crewId)) {
      // 크루에 속한 게시물 생성
      const newPost = new Post({
        title,
        content,
        author: userId,
      });

      await newPost.save();

      const crew = await Crew.findByIdAndUpdate(
        crewId,
        { $push: { posts: newPost._id } },
        { new: true }
      );

      if (!crew) {
        ctx.status = 404;
        ctx.body = '크루를 찾을 수 없습니다.';
        return;
      }

      ctx.status = 201;
      ctx.body = '게시물이 성공적으로 생성되었습니다.';
    } else {
      ctx.status = 403;
      ctx.body = '게시물을 작성할 권한이 없습니다.';
    }
  } catch (err) {
    console.error('게시물 생성 오류:', err);
    ctx.status = 500;
    ctx.body = '게시물 생성 중 오류가 발생했습니다.';
  }
});

module.exports = router;