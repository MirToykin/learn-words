import * as axios from "axios";

class Api {
  constructor() {
    this.ajax = axios.create({
      baseURL: "http://api-simpledictionary.ru/api/"
    });
  }

  getSet(set, uid, options) {
    return this.ajax.get(`words/${set}/${uid}`, options);
  }

  auth(endpoint, data) {
    return this.ajax.post(endpoint, data);
  }

  logout(options) {
    return this.ajax.post('logout', null, options);
  }

  addToSet(data, options) {
    return this.ajax.post(`words`, data, options);
  }

  editWord(wordId, data, options) {
    return this.ajax.patch(`words/${wordId}`, data, options);
  }

  deleteWord(wordId, options) {
    return this.ajax.delete(`words/${wordId}`, options);
  }

}

export default Api;


