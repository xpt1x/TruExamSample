import { create } from "apisauce";

const localURL = "http://127.0.0.1:8000/";

const Api = create({
  baseURL: localURL
});

export default Api;