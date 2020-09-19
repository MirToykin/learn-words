import * as axios from "axios";

class Api {
  constructor() {
    this.ajax = axios.create({
      baseURL: "http://learnwords/api/"
    });
  }

  getSet(set, uid, options) {
    return this.ajax.get(`words/${set}/${uid}`, options);
  }

  post(endpoint, data) {
    return this.ajax.post(endpoint, data);
  }

  addToSet(data, options) {
    return this.ajax.post(`words`, data, options);
  }

}

export default Api;


