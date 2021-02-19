import {GET_SET_FOR_TEST, SET_TEST_ACTIVE} from "../constants";
import {WordType} from "../../types/types";

export type TGetSetForTestAction = {
  type: typeof GET_SET_FOR_TEST,
  payload: Array<WordType>
}

export const getSetForTest = (set: Array<WordType>): TGetSetForTestAction => ({
  type: GET_SET_FOR_TEST,
  payload: set
})

export type TSetTestActiveAction = {
  type: typeof SET_TEST_ACTIVE,
  payload: boolean
}

export const setTestActive = (isActive: boolean): TSetTestActiveAction => ({
  type: SET_TEST_ACTIVE,
  payload: isActive
})