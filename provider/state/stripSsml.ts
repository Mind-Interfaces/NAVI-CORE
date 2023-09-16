const stripSsml = (ssmlText: string) => {
  // An xmlns must be defined to make Amazon SSML valid XML
  const withNamespace = ssmlText.replace(
    '<speak>',
    '<speak xmlns="http://www.w3.org/2001/10/synthesis" version="1.0" xmlns:uneeq="uneeq" xmlns:amazon="amazon">'
  )
  const parser = new DOMParser()
  const ssml = parser.parseFromString(withNamespace, 'text/xml')
  if (ssml.getElementsByTagName('parsererror').length) {
    console.warn(ssml)
    console.info(ssmlText)
    return ssmlText
  }
  return ssml?.firstChild?.textContent
}

export default stripSsml
