import { uniList } from "../public/uni_list";
import { getUniFromLink } from "./helpers";

export function getAllUniIds() {
  const list = uniList;

  return list;
}

export function getUniData(id: string) {
  let uniName = getUniFromLink(id);
  let uniData = uniList.find((uni) => {
    let removedComma = uni.name.replace(",", "");
    return removedComma === uniName;
  });

  // Combine the data with the id
  if (uniData) {
    return {
      id,
      ...uniData,
    };
  } else return null;
}
