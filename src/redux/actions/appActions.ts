import {SET_IS_FETCHING, SWITCH_COLOR_THEME} from "../constants";

export const setIsFetching = (isFetching: boolean) => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching
  }
}

export type SwitchColorThemeActionType = {
  type: typeof SWITCH_COLOR_THEME
}
export const switchColorTheme = ():SwitchColorThemeActionType => {
  return {
    type: SWITCH_COLOR_THEME
  }
}
