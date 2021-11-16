import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "..";
export default function Page({ long }) {
  if (!long) {
    return <div>404 Not Found</div>;
  } else {
    const router = useRouter();
    useEffect(() => {
      router.push(long);
    }, []);
    return <div>Redirecting to {long}...</div>;
  }
}
export async function getServerSideProps(context) {
  const coll = (await client).db("Data").collection("urls");
  const d = await coll
    .find({ short: context.query.shortURL })
    .sort({ metacritic: -1 })
    .limit(1)
    .toArray();
  if (!d.length) {
    return { props: { long: null, fallback: false } };
  } else {
    await coll.updateOne(
      { short: context.query.shortURL },
      { $inc: { clicks: 1 } }
    );
    return { props: { long: d[0].full, fallback: false } };
  }
}
