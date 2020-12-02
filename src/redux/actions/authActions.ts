import {SubmissionError} from "redux-form";
import Api from "../../api/Api";
import {SET_AUTH_DATA} from "../constants";
import {setIsFetching, SetIsFetchingActionType} from "./appActions";
import {clearStorage} from "../../assets/browserStorage";
import {ThunkAction} from 'redux-thunk';
import {OptionsType} from "../../types/types";
import {AppStateType} from "../store/configureStore";

const api = new Api();

type SetAuthDataPayloadType = {
  id: number | null
  name: string | null
  email: string | null
  token: string | null
  isAuth: boolean
  rememberMe: boolean
}

type SetAuthDataActionType = {
  type: typeof SET_AUTH_DATA
  payload: SetAuthDataPayloadType
}

export type AuthActionType = SetAuthDataActionType | SetIsFetchingActionType
export type AuthThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType>

export const setAuthData = (payload: SetAuthDataPayloadType): SetAuthDataActionType => {
  return {
    type: SET_AUTH_DATA,
    payload
  }
}

export const login = (loginData: any): AuthThunkType => async (dispatch, getState) => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.auth('login', loginData);
    const rememberMe = loginData.rememberMe;
    const userData = response.data.user;
    dispatch(setAuthData({...userData, isAuth: true, rememberMe}));
  } catch (e) {
    let error;

    if (e.response && e.response.status === 401) {
      error = 'Неверный логин или пароль';
    } else {
      error = e.response && e.response.data.message;
    }
    throw new SubmissionError({
      _error: error ? error : 'Что-то пошло не так'
    });
  }
  dispatch(setIsFetching(false));
}

export const register = (regData: any): AuthThunkType => async (dispatch, getState) => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.auth('register', regData);
    const rememberMe = regData.rememberMe;
    const userData = response.data.user;
    dispatch(setAuthData({...userData, isAuth: true, rememberMe}));
  } catch (e) {
    let error;
    if (e.response) {
      error = e.response.data.message
    }
    throw new SubmissionError({
      _error: error ? error : 'Что-то пошло не так'
    });
  }
  dispatch(setIsFetching(false));
}

export const logout = (options: OptionsType): AuthThunkType => async (dispatch, getState) => {
  dispatch(setIsFetching(true));

  try {
    await api.logout(options);
  } catch (e) {
    console.log(e.response.data.message);
  }

  dispatch(setAuthData({
    id: null,
    name: null,
    email: null,
    token: null,
    isAuth: false,
    rememberMe: false
  }));
  clearStorage();
  dispatch(setIsFetching(false));
}
