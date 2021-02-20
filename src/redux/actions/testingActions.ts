import {GET_SET_FOR_TEST, PUSH_TO_TEST_RESULT, SET_CURRENT_WORD_INDEX, SET_TEST_ACTIVE} from "../constants";
import {WordType} from "../../types/types";
import {TTestResultItem} from "../reducers/testingReducer";

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

export type TSetCurrentWordIndexAction = {
  type: typeof SET_CURRENT_WORD_INDEX,
  payload: number
}

export const setCurrentWordIndex = (index: number): TSetCurrentWordIndexAction => ({
  type: SET_CURRENT_WORD_INDEX,
  payload: index
})

export type TPushToTestResultAction = {
  type: typeof PUSH_TO_TEST_RESULT,
  payload: TTestResultItem
}

export const pushToTestResult = (resItem: TTestResultItem): TPushToTestResultAction => ({
  type: PUSH_TO_TEST_RESULT,
  payload: resItem
})