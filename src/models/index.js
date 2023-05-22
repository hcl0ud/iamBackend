require("dotenv").config();
const uri = process.env.DB_URI;

const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
exports.db = client.db("IamDB");

client.connect(() => {}).then((r) => console.log("Connected to MongoDB"));
