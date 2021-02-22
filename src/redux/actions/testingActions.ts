import {
  SET_SET_FOR_TEST,
  PUSH_TO_TEST_RESULT,
  SET_CURRENT_WORD_INDEX,
  SET_TEST_ACTIVE,
  SET_INVERT_SET_FOR_TEST
} from "../constants";
import {WordType} from "../../types/types";
import {TTestResultItem} from "../reducers/testingReducer";

export type TSetSetForTestAction = {
  type: typeof SET_SET_FOR_TEST,
  payload: Array<WordType>
}

export const setSetForTest = (set: Array<WordType>): TSetSetForTestAction => ({
  type: SET_SET_FOR_TEST,
  payload: set
})


export type TInvertTestItem = {
  title: string
  meanings: string
}

export type TSetInvertSetForTestAction = {
  type: typeof SET_INVERT_SET_FOR_TEST,
  payload: Array<TInvertTestItem>
}

export const setInvertSetForTest = (set: Array<TInvertTestItem>): TSetInvertSetForTestAction => ({
  type: SET_INVERT_SET_FOR_TEST,
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