function Widget({ host }) {
  const getCode = (locale) => {
    const url = (host.match("localhost") ? "http://" : "https://") + host;
    return `
  <iframe class="stayathomebanner" src="${url}/${locale}" width="100%" scrolling="no" frameborder="0"></iframe>
  <script src="${url}/v1.js"></script>
    `;
  };

  return (
    <div style={{ background: "white", color: "black", padding: "10px" }}>
      <h2>Code</h2>
      <textarea defaultValue={getCode("de-ch")} rows="5" cols="100"></textarea>

      <h2>Examples</h2>
      <div dangerouslySetInnerHTML={{ __html: getCode("de-ch") }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("en-us") }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("de") }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("en") }} />
    </div>
  );
}

Widget.getInitialProps = ({ req }) => {
  return { host: req.headers.host };
};

export default Widget;
