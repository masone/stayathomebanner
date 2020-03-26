import embedCode from 'lucify-embed-code'

const iFrameUrl = '/v1/widget/de-ch';
const code = embedCode.getIFrameEmbedCodeWithRemoteResize("http://localhost:3000/v1/", iFrameUrl)
  .replace("/resize.js", "/corona-widget.js")
  .replace("lucify-", "corona-widget-")

function Widget() {
  return (
    <>
      <h1>Please stay at home widget</h1>
      <p>Insert the following script where you want to render the widget.</p>
      <code>{code}</code>

      <h2>Example</h2>
      <div dangerouslySetInnerHTML={{__html: code}}></div>
    </>
  )
}

export default Widget
