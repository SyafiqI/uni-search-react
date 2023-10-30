//env
import env from "../../../../utils/config";

//uuid
const { v4: uuidv4 } = require("uuid");

export async function getData() {
  let sessionId;

  if (typeof window !== "undefined" && window.localStorage) {
    let id = localStorage.getItem("sessionId");
    if (id) {
      sessionId = id;
    } else {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }
  let payload = { sessionId: sessionId };
  let res = await fetch(
    `http://${env.NEXT_PUBLIC_SEARCH_BASE_URL}/api/search/fetch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  return res.json();
}

export async function postData(search: string) {
  let sessionId;

  if (typeof window !== "undefined" && window.localStorage) {
    let id = localStorage.getItem("sessionId");
    if (id) {
      sessionId = id;
    } else {
      sessionId = uuidv4();
      localStorage.setItem("sessionId", sessionId);
    }
  }
  let payload = { sessionId: sessionId, search: search };
  let res = await fetch(
    `http://${env.NEXT_PUBLIC_SEARCH_BASE_URL}/api/search/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
