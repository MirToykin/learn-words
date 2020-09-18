import {SubmissionError} from "redux-form";
import api from "../../api/Api";
import {SET_AUTH_DATA, SET_IS_FETCHING} from "../constants";

export const setAuthData = (id, name, email, isAuth) => {
  return {
    type: SET_AUTH_DATA,
    payload: {id, name, email, isAuth}
  }
}

const setIsFetching = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching
  }
}

export const login = (loginData) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.post('login', loginData);
    const user = response.data.user;
    console.log(user);
  } catch (e) {
    throw new SubmissionError({
      _error: 'Неверный логин или пароль'
    })
  }
  dispatch(setIsFetching(false));
}

export const logOut = () => async (dispatch) => {
  const response = await api.delete('auth/login');

  if (response.resultCode === 0) {
    dispatch(setAuthData(null, null, null, false));
  }

}