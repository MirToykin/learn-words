import {SET_AUTH_DATA, SET_IS_FETCHING} from "../constants";

let initialState = {
  id: null as number | null,
  name: null as string | null,
  email: null as string | null,
  isFetching: false,
  isAuth: false,
  token: null as string | null,
  rememberMe: false
}

// fixme - убрать isFetching в appReducer

type ActionType = {
  type: string
  payload: any
}

export type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, {type, payload}:ActionType): InitialStateType => {
  switch (type) {
    case SET_AUTH_DATA:
      return {...state, ...payload};
    case SET_IS_FETCHING:
      return {...state, isFetching: payload};
    default:
      return state;
  }
}

export default authReducer
