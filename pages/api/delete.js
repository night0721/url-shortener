import client from "../..";
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const key = req.headers.authorization;
    if (!key || key !== process.env.Key)
      res.status(401).send({ error: "Unauthorized", code: 401 });
    else {
      await (
        await client
      )
        .db("Data")
        .collection("urls")
        .deleteOne({ short: JSON.parse(req.body).short });
      res.status(200).send("Deleted data");
    }
  } else res.status(405).send("Method Not Allowed");
}
