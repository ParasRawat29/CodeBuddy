import axios from "axios";

export const http = (
  URL,
  METHOD,
  PAYLOAD = {},
  HEADERS = {},
  CREDENTIALS = true,
  OPTIONS = {}
) => {
  const requestConfig = {
    method: METHOD,
    url: URL,
    headers: HEADERS,
    withCredentials: CREDENTIALS,
    ...OPTIONS,
  };
  if (METHOD !== "GET") {
    requestConfig.data = PAYLOAD;
  }
  return axios(requestConfig);
};
