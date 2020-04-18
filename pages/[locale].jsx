import { readJSONSync } from "fs-extra";

const languages = readJSONSync("./data/languages.json");
const urls = readJSONSync("./data/urls.json");

function Widget({ title, text, url, link, getBanner }) {
  return (
    <div className="main-container">
      <div className="container">
        <div className="icon" />
        <div className="container-text">
          <span className="text-title">{title}</span>
          <div className="text-info">
            {text ? <>{text}&nbsp;</> : null}
            {url ? (
              <a href={url} target="__blank" rel="noopener noreferrer">
                {link}
              </a>
            ) : null}
          </div>
          {getBanner ? (
            <a
              className="get-banner"
              href="https://stayathomebanner.com"
              target="__blank"
              rel="noopener noreferrer"
            >
              {getBanner}
            </a>
          ) : null}
        </div>
      </div>
      <a
        className="close"
        onClick={() => {
          if ("parentIFrame" in window) {
            window.parentIFrame.close();
          }
          return false;
        }}
      >
        X
      </a>
      <script src="/iframe.js"></script>
    </div>
  );
}

function getDataWithFallback(data, locale, language) {
  return data ? data[locale] || data[language] || "" : "";
}

export async function getStaticProps({ params }) {
  const locale = params.locale;
  const language = locale.split("-")[0];

  return {
    props: {
      title: getDataWithFallback(languages.title, locale, language),
      text: getDataWithFallback(languages.text, locale, language),
      link: getDataWithFallback(languages.link, locale, language),
      getBanner: getDataWithFallback(languages.getBanner, locale, language),
      url: getDataWithFallback(urls, locale, language) || "",
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: "de-ch" } },
      { params: { locale: "en-ch" } },
      { params: { locale: "en-us" } },
    ],
    fallback: false,
  };
}

export default Widget;
