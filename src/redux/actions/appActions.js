import {SET_IS_FETCHING} from "../constants";

export const setIsFetching = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching
  }
}