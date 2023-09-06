import { MongoClient } from "mongodb";
import { configValues } from "@/utils/config";

const { DB_URI } = configValues;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const options: any = {
  useUnifiedTopology: true,
};

if (!DB_URI) {
  throw new Error("Please add MONGODB_URL inside .env.local");
}

client = new MongoClient(DB_URI, options);
clientPromise = client.connect();

clientPromise.then(() => console.log("Connected to mongodb atlas"));

export default clientPromise;
