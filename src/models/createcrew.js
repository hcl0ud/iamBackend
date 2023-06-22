const { db } = require(".");
const user = db.collection("user");
const crew = db.collection("crew");
const board = db.collection("board");

// 크루생성
exports.createCrew = async (ctx) => { 

    const { crewName, profileimag, introduction, userIdx} = ctx.request.body;
    const userInfo = await user.findOne({ userEmail: userIdx });
}