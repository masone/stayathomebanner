import { useState, useEffect } from "react";
import languages from "../languages.json";

function Widget({ host, availableLanguages }) {
  const url = (host.match("localhost") ? "http://" : "https://") + host;

  const [locale, setLocale] = useState("en");
  useEffect(() => {
    window.initStayathomebanner && window.initStayathomebanner();
  }, [locale]);

  const code = `
<iframe id="stayathomebanner" style="display: none;" src="${url}/${locale}" width="100%" height="110" scrolling="no" frameborder="0"></iframe>
<script src="${url}/v1.js"></script>
  `;

  return (
    <div className="wrapper">
      <h2>Embed code</h2>
      <div style={{ display: "flex", marginBottom: "1em" }}>
        {availableLanguages.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            onClick={() => {
              setLocale(l);
            }}
            style={{ marginRight: "0.5em" }}
          >
            {l}
          </a>
        ))}
      </div>
      <textarea
        value={code}
        onChange={() => {}}
        rows="4"
        cols="100"
        style={{
          border: "1px solid grey",
          fontSize: "14px",
          padding: "0.3em 1em",
        }}
      />

      <h2>Demo</h2>
      <div key={locale} dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
}

Widget.getInitialProps = ({ req }) => {
  const availableLanguages = Object.keys(languages);
  return { host: req.headers.host, availableLanguages };
};

export default Widget;
