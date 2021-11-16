import Head from "next/head";
import style from "../styles/Home.module.css";
import client from "..";
export default function Home({ shortUrls }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <title>URL Shortener</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="container">
        <h1 className="text-center">URL Shrinker</h1>
        <form action="/api/shortUrls" method="POST" className="my-4 form">
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Long URL</label>
            <input
              required
              type="url"
              className="form-control"
              name="fullUrl"
              placeholder="Your URL"
            />
          </div>

          <label htmlFor="e">Your Extension</label>
          <div className="form-group form-inline">
            <input
              readOnly
              type="text"
              id="e"
              className="form-control"
              placeholder="url.cath.gq"
            />
            <p className={style.slash}>/</p>
            <input
              required
              type="text"
              id="e"
              className="form-control"
              name="shortUrl"
              placeholder="example-endpoint"
            />
          </div>
          <br />
          <button className={style.btn} type="submit">
            Shrink
          </button>
        </form>
        <br />
        <h3 className="text-center">All URLs</h3>
        <table className="table table-striped table-responsive justify-content-center">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {shortUrls.map((shortUrl, i) => (
              <>
                <tr key={i}>
                  <td className="justify-content-center" key={i}>
                    <a href={shortUrl.full}>{shortUrl.full}</a>
                  </td>
                  <td key={i}>
                    <a href={shortUrl.short}>{shortUrl.short}</a>
                  </td>
                  <td key={i}>{shortUrl.clicks}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <style>
        {`
        body {
          background-color: #78c4e7;
        }
        th,
        td,
        text-center,
        label,
        p,
        text-center {
          color: white;
        }
        `}
      </style>
    </>
  );
}
export async function getServerSideProps(context) {
  const coll = (await client).db("Data").collection("urls");
  const d = await coll.find({}).sort({ metacritic: -1 }).toArray();
  const data = d.map(e => {
    return {
      full: e.full,
      short: e.short,
      clicks: e.clicks,
    };
  });
  return { props: { shortUrls: data, fallback: false } };
}
