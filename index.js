import { MongoClient } from "mongodb";
export default new MongoClient(process.env.MONGO, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).connect();
