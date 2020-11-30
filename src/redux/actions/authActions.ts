import {SubmissionError} from "redux-form";
import Api from "../../api/Api";
import {SET_AUTH_DATA} from "../constants";
import {setIsFetching} from "./appActions";
import {clearStorage} from "../../assets/browserStorage";
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {InitialStateType} from '../reducers/authReducer'
import {OptionsType} from "../../types/types";

const api = new Api();

export const setAuthData = (payload: any) => {
  return {
    type: SET_AUTH_DATA,
    payload
  }
}

export const login = (loginData: any) => async (dispatch: any) => {
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

export const register = (regData: any) => async (dispatch: any) => {
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

export const logout = (options: OptionsType): ThunkAction<void, InitialStateType, unknown, Action<OptionsType>> => async dispatch => {

  // @ts-ignore
  dispatch(setIsFetching(true));
  try {
    await api.logout(options);
  } catch (e) {
    console.log(e.response.data.message);
  }
  // @ts-ignore
  dispatch(setAuthData({
    id: null,
    name: null,
    email: null,
    token: null,
    isAuth: false,
    rememberMe: false
  }));
  clearStorage();
  // @ts-ignore
  dispatch(setIsFetching(false));

}
