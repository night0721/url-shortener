import client from "../../";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const coll = (await client).db("Data").collection("urls");
    const d = await coll
      .find({ short: req.body.shortUrl })
      .sort({ metacritic: -1 })
      .limit(1)
      .toArray();
    if (d.length) res.status(404).send("Short URL already exists");
    const obj = {
      full: req.body.fullUrl,
      short: req.body.shortUrl,
      clicks: 0,
    };
    await coll.insertOne(obj);
    res.redirect("/");
  } else res.status(405).send("Method Not Allowed");
}
