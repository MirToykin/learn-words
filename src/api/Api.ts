import axios, {AxiosResponse} from "axios";
import {OptionsType, SetNameType, WordType} from "../types/types";
import {TLoginData, TRegData} from "../redux/actions/authActions";
import {TAddToSetData, TEditWordData} from "../redux/actions/wordsActions";

type TGetSetResponse = {
  words: Array<WordType>
}

type TAuthResponse = {
  user: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    token: string
    updated_at: string | null
    created_at: string | null
  }
}

type TAddAndEditResponse = {
  word: WordType
}

class Api {
  ajax;

  constructor() {
    this.ajax = axios.create({
      // baseURL: "http://api-simpledictionary.ru/api/"
      baseURL: "http://learnwords/api/"
    });
  }

  getSet(set: SetNameType, uid: number, options: OptionsType) {
    return this.ajax.get<TGetSetResponse>(`words/${set}/${uid}`, options).then(res => res.data.words)
  }

  auth(endpoint: string, data: TLoginData | TRegData) {
    return this.ajax.post<TAuthResponse>(endpoint, data).then(res => res.data.user)
  }

  logout(options: OptionsType) {
    this.ajax.post('logout', null, options)
  }

  addToSet(data: TAddToSetData, options: OptionsType) {
    return this.ajax.post<TAddAndEditResponse>(`words`, data, options).then(res => res.data.word)
  }

  editWord(wordId: number, data: TEditWordData, options: OptionsType) {
    return this.ajax.patch<TAddAndEditResponse>(`words/${wordId}`, data, options).then(res => res.data.word)
  }

  deleteWord(wordId: number, options: OptionsType) {
    return this.ajax.delete<AxiosResponse<any>>(`words/${wordId}`, options);
  }

}

const apiInstance = new Api()

export type TApi = typeof apiInstance

export default Api;

