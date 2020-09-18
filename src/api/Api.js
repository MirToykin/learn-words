import * as axios from "axios";

let api = {

  ajax: axios.create({
    // withCredentials: true, // на будущее, для отправки куки, с credentials - true ошибка CORS
    baseURL: "http://learnwords/api/"
  }),
  get(endpoint) {
    return this.ajax.get(endpoint);
  },
  post(endpoint, data) {
    return this.ajax.post(endpoint, data);
  }
}

export default api;


