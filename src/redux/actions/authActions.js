import {SubmissionError} from "redux-form";
import Api from "../../api/Api";
import {SET_AUTH_DATA, SET_IS_FETCHING} from "../constants";
import {setIsFetching} from "./appActions";

const api = new Api();

export const setAuthData = (id, name, email, token, isAuth) => {
  return {
    type: SET_AUTH_DATA,
    payload: {id, name, email, token, isAuth}
  }
}

export const login = (loginData) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.post('login', loginData);
    const {id, name, email, token} = response.data.user;
    dispatch(setAuthData(id, name, email, token, true));
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