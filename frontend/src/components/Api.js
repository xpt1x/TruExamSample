import { create } from "apisauce";

const localURL = "http://127.0.0.1:8000/";
const productionURL = "https://test-truexam.herokuapp.com/";

const Api = create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? localURL
      : productionURL,
});

export default Api;