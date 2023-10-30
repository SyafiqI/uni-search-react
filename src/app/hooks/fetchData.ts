// custom hook to have React Suspense work with Axios
import { useState, useEffect } from "react";
import axios from "axios";

const promiseWrapper = (promise: any) => {
  let status = "pending";
  let result: any;

  const s = promise.then(
    (value: any) => {
      status = "success";
      result = value;
    },
    (error: any) => {
      status = "error";
      result = error;
    }
  );

  return () => {
    switch (status) {
      case "pending":
        throw s;
      case "success":
        return result;
      case "error":
        throw result;
      default:
        throw new Error("Unknown status");
    }
  };
};

function useGetData(url: any) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const promise = axios.get(url).then((response) => response.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, [url]);

  return resource;
}
function usePostData(url: any, payload: any) {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const promise = axios
        .post(url, payload)
        .then((response) => response.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, [payload, url]);

  return resource;
}

export { useGetData, usePostData };
