import {readJSONSync} from "fs-extra"
import Icon from "../../icon"

const texts = readJSONSync("./data/text.json")
const urls = readJSONSync("./data/urls.json")

function Widget({ notice, url, link }) {
  return (
    <>
      <style jsx global>{`
        body {
          color: #EFFCF6;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
          font-size: 16px;
          padding: 0;
          margin: 0;
        }
        .notice { padding: 8px 12px; background: #147D64; height: 40px; display: flex; align-items: center; justify-content: space-between; }
        .icon {
          color: #0C6B58;
          fill: #EFFCF6;
          flex-shrink: 0;
          font-size: 2em;
          margin-right: 8px;
        }
        a {
          color: #0C6B58;
          background: #FFF;
          padding: 6px 8px;
          border-radius: 4px;
          text-decoration: none;
        }
        a:hover {
          color: #199473;
        }
        p { display: flex; align-items: center; padding: 0; margin: 0 10px 0 0; font-weight: 500; }
      `}</style>

      <div className="notice">
        <p><Icon className="icon" /> {notice}</p> {url ? <a href={url}>{link}</a> : null}
      </div>
    </>
  )
}

function getDataWithFallback(data, locale, language){
  return data[locale] || data[language]
}

export async function getStaticProps({params}) {
  const locale = params.locale
  const language = locale.split("-")[0]

  return {
    props: {
      notice: getDataWithFallback(texts.notice, locale, language),
      link:getDataWithFallback(texts.link, locale, language),
      url: getDataWithFallback(urls, locale, language) || "",
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: "de-ch" } },
      { params: { locale: "en-ch" } },
      { params: { locale: "en-us" } },
    ],
    fallback: false
  };
}

export default Widget
