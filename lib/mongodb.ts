import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri =
  "mongodb+srv://marina:zudkyH-nyjwox-1merca@cluster0.yvftlkf.mongodb.net/";

const options: any = {
  // useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!uri) {
  throw new Error("Please add MONGODB_URL inside .env.local");
}

client = new MongoClient(uri!, options);
clientPromise = client.connect();

clientPromise.then(() => console.log("Connected to mongodb atlas"));

export default clientPromise;
