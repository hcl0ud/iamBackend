router.get("/data", async (ctx) => {
  try {
    // 데이터 조회
    const data = await Data.find();
    ctx.body = data;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "데이터 조회 실패" };
  }
});

