import {SubmissionError} from "redux-form";
import api from "../../api/Api";
import {SET_AUTH_DATA, SET_IS_FETCHING} from "../constants";

export const setAuthData = (id, name, email, token, isAuth) => {
  return {
    type: SET_AUTH_DATA,
    payload: {id, name, email, token, isAuth}
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
    const {id, name, email, token} = response.data.user;
    dispatch(setAuthData(id, name, email, token, true));
    console.log(response.data.user);
  } catch (e) {
    throw new SubmissionError({
      _error: 'Неверный логин или пароль'
    })
  }
  dispatch(setIsFetching(false));
}

export const logout = () => async (dispatch) => {
  // Пока реализован на стороне клиента, обращение к api будет, когда там будет реализован метод logout
  dispatch(setIsFetching(true));
  dispatch(setAuthData(null, null, null, false));
  dispatch(setIsFetching(false));

}