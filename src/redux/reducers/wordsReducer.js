import {SET_NEXT, SET_CURRENT, SET_DONE, ADD_TO_NEXT, ADD_TO_CURRENT, ADD_TO_DONE} from "../constants";

let initialState = {
  next: [],
  current: [],
  done: [],
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_NEXT:
      return {...state, next: payload};
    case ADD_TO_NEXT:
      return {...state, next: [...state.next, payload]}
    case SET_CURRENT:
      return {...state, current: payload};
    case ADD_TO_CURRENT:
      return {...state, next: [...state.current, payload]}
    case SET_DONE:
      return {...state, done: payload};
    case ADD_TO_DONE:
      return {...state, next: [...state.done, payload]}
    default:
      return state;
  }
}

export default authReducer;