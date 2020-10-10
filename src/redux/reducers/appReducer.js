import {SET_IS_FETCHING, SET_SCROLLED, SWITCH_COLOR_THEME} from "../constants";

let initialState = {
  isFetching: false,
  darkState: false,
  scrolled: false
}

const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_IS_FETCHING:
      return {...state, isFetching: payload};
    case SWITCH_COLOR_THEME:
      return {...state, darkState: !state.darkState};
    case SET_SCROLLED:
      return {...state, scrolled: payload}
    default:
      return state;
  }
}

export default authReducer;
