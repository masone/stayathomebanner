const getCode = (locale, prod = true) => {
  const host = prod
    ? "https://embed.stayathomebanner.com"
    : "http://localhost:3000";
  return `
<iframe class="stayathomebanner" src="/${locale}" width="100%" scrolling="no" frameborder="0"></iframe>
<script src="${host}/v1.js"></script>
  `;
};

function Widget() {
  return (
    <div style={{ background: "white", color: "black", padding: "10px" }}>
      <h2>Code</h2>
      <textarea defaultValue={getCode("de-ch")} rows="5" cols="100"></textarea>

      <h2>Examples</h2>
      <div dangerouslySetInnerHTML={{ __html: getCode("de-ch", false) }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("en-us", false) }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("de", false) }} />
      <div dangerouslySetInnerHTML={{ __html: getCode("en", false) }} />
    </div>
  );
}

export default Widget;
