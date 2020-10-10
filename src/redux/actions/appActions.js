import {SET_IS_FETCHING, SET_SCROLLED, SWITCH_COLOR_THEME} from "../constants";

export const setIsFetching = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching
  }
}

export const switchColorTheme = () => {
  return {
    type: SWITCH_COLOR_THEME
  }
}

export const setScrolled = (payload) => {
  return {
    type: SET_SCROLLED,
    payload
  }
}
