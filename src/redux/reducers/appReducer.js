import {SET_IS_FETCHING} from "../constants";

let initialState = {
  isFetching: false
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_IS_FETCHING:
      return {...state, isFetching: payload};
    default:
      return state;
  }
}

export default authReducer;