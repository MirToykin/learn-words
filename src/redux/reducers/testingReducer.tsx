import {WordType} from "../../types/types"
import {
  PUSH_TO_ADDED_MEANINGS,
  PUSH_TO_TEST_RESULT,
  SET_ADDED_MEANINGS,
  SET_CURRENT_WORD_INDEX,
  SET_INVERT_SET_FOR_TEST,
  SET_SET_FOR_TEST,
  SET_TEST_ACTIVE,
  SET_TEST_RESULT
} from "../constants";
import {
  TInvertTestItem,
  TPushToTestResultAction,
  TSetCurrentWordIndexAction,
  TSetInvertSetForTestAction,
  TSetSetForTestAction,
  TSetTestActiveAction,
  TSetTestResultAction
} from "../actions/testingActions";
import {PushToAddedMeaningsActionType, SetAddedMeaningsActionType} from "../actions/wordsActions";

export type TWordResult = {
  meaning: string
  isCorrect: boolean
}

export type TTestResultItem = {
  word: WordType | TInvertTestItem
  wordResult: Array<TWordResult>
}

let initialState = {
  testSet: [] as Array<WordType>,
  invertTestSet: [] as Array<TInvertTestItem>,
  testActive: false as boolean,
  currentWordIndex: 0 as number,
  addedMeanings: [] as Array<string>,
  testResult: [] as Array<TTestResultItem>
}

type ActionType = TSetSetForTestAction | TSetTestActiveAction | PushToAddedMeaningsActionType | TSetTestResultAction |
  TSetCurrentWordIndexAction | SetAddedMeaningsActionType | TPushToTestResultAction | TSetInvertSetForTestAction

type InitialStateType = typeof initialState

const testingReducer = (state:InitialStateType = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case SET_SET_FOR_TEST:
      return {...state, testSet: action.payload}
    case SET_INVERT_SET_FOR_TEST:
      return {...state, invertTestSet: action.payload}
    case SET_TEST_ACTIVE:
      return {...state, testActive: action.payload}
    case PUSH_TO_ADDED_MEANINGS:
      return {...state, addedMeanings: [...state.addedMeanings, action.payload]}
    case SET_ADDED_MEANINGS:
      return {...state, addedMeanings: action.payload}
    case SET_CURRENT_WORD_INDEX:
      return {...state, currentWordIndex: action.payload}
    case PUSH_TO_TEST_RESULT:
      return {...state, testResult: [...state.testResult, action.payload]}
    case SET_TEST_RESULT:
      return {...state, testResult: action.payload}
  }
  return state
}

export default testingReducer
