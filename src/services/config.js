import _axios from "axios";
const axios = _axios.create({
  baseURL: "http://localhost:3333/"
});

export const request = async params => {
  const body = await axios({ ...params });
  return body.data;
};
