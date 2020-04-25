function Widget({ host }) {
  const getCode = (locale) => {
    const url = (host.match("localhost") ? "http://" : "https://") + host;
    return `
  <iframe class="stayathomebanner" src="${url}/${locale}" width="100%" height="110" scrolling="no" frameborder="0"></iframe>
  <script src="${url}/v1.js"></script>
    `;
  };

  return (
    <div className="wrapper">
      <h2>Code</h2>
      <textarea
        style={{ border: "1px solid grey", fontSize: "14px" }}
        defaultValue={getCode("de-ch")}
        rows="5"
        cols="100"
      />

      <h2>Examples</h2>
      <div dangerouslySetInnerHTML={{ __html: getCode("en") }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("de-ch") }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("en-us") }} />
    </div>
  );
}

Widget.getInitialProps = ({ req }) => {
  return { host: req.headers.host };
};

export default Widget;
