import {readJSONSync} from "fs-extra"

const languages = readJSONSync("./data/languages.json")
const urls = readJSONSync("./data/urls.json")

function Widget({ title, text, url, link }) {
  return (
    <>
      <h1>{title}</h1>
      {text ? <p>{text}</p> : null }
      {url && link ? <a href={url}>{link}</a> : null}
    </>
  )
}

function getDataWithFallback(data, locale, language){
  return data ? data[locale] || data[language] || "" : ""
}

export async function getStaticProps({params}) {
  const locale = params.locale
  const language = locale.split("-")[0]

  return {
    props: {
      title: getDataWithFallback(languages.title, locale, language),
      text: getDataWithFallback(languages.text, locale, language),
      link: getDataWithFallback(languages.link, locale, language),
      url: getDataWithFallback(urls, locale, language) || "",
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: "de" } },
      { params: { locale: "de-ch" } },
      { params: { locale: "en-ch" } },
      { params: { locale: "en-us" } },
    ],
    fallback: false
  };
}

export default Widget
