import { MongoClient } from "mongodb";

const monogoUTL =
  "mongodb+srv://hberdous:Fzzmzhb82$@cluster0.w3vtf.mongodb.net/meetup?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(monogoUTL);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}

export default handler;
