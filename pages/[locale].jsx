import languages from "../languages.json";

const renderText = (t, url) => {
  const unlinked = t.replace(/[{}]/g, "");
  if (!url) {
    return unlinked;
  }

  const matched = t.match(/(.*)\{(.*)\}/);
  return matched ? (
    <span>
      {matched[1]}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {matched[2]}
      </a>
    </span>
  ) : (
    unlinked
  );
};

function Widget({ title, text, url, getBanner }) {
  return (
    <div className="main-container">
      <div className="container">
        <div className="icon" />
        <div className="container-text">
          <span className="text-title">{title}</span>
          <div className="text-info">{renderText(text, url)}</div>
          {getBanner ? (
            <a
              className="get-banner"
              href="https://stayathomebanner.com"
              target="_blank"
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
            window.parentIFrame.sendMessage("persistClose", "*");
            window.parentIFrame.close();
          }
          return false;
        }}
      />
      <script src="/iframe.js"></script>
    </div>
  );
}

function getDataWithFallback(field, locale, language) {
  return (
    (languages[locale] && languages[locale][field]) ||
    (languages[language] && languages[language][field]) ||
    ""
  );
}

export async function getStaticProps({ params }) {
  const locale = params.locale;
  const language = locale.split("-")[0];

  return {
    props: {
      title: getDataWithFallback("title", locale, language),
      text: getDataWithFallback("text", locale, language),
      getBanner: getDataWithFallback("getBanner", locale, language),
      url: getDataWithFallback("url", locale, language),
    },
  };
}

export async function getStaticPaths() {
  const availableLanguages = Object.keys(languages);
  return {
    paths: availableLanguages.map((language) => "/" + language),
    fallback: false,
  };
}

export default Widget;
