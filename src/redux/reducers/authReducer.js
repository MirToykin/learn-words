import {SET_AUTH_DATA, SET_AUTH_USER_PROFILE, SET_IS_FETCHING} from "../constants";

let initialState = {
  id: null,
  name: null,
  email: null,
  isFetching: false,
  isAuth: false,
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_AUTH_DATA:
      return {...state, ...payload};
    case SET_IS_FETCHING:
      return {...state, isFetching: payload};
    default:
      return state;
  }
}

export default authReducer;