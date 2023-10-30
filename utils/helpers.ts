const { decode } = require("url-encode-decode");

export function createUniLink(name: string) {
  let commaRemoved = name.replace(",", "");
  let uniLink = commaRemoved.replace(/ /g, "_");
  return uniLink;
}

export function getUniFromLink(link: string) {
  let decodedLink = decode(link);
  let uniName = decodedLink.replace(/_/g, " ");
  return uniName;
}
