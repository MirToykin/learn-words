import {WordType} from "../../types/types"
import {GET_SET_FOR_TEST, PUSH_TO_ADDED_MEANINGS, SET_TEST_ACTIVE} from "../constants";
import {TGetSetForTestAction, TSetTestActiveAction} from "../actions/testingActions";
import {PushToAddedMeaningsActionType} from "../actions/wordsActions";

let initialState = {
  testSet: [] as Array<WordType>,
  testActive: false as boolean,
  currentWordIndex: 0 as number,
  addedMeanings: [] as Array<string>
}

type ActionType = TGetSetForTestAction | TSetTestActiveAction | PushToAddedMeaningsActionType

type InitialStateType = typeof initialState

const testingReducer = (state:InitialStateType = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case GET_SET_FOR_TEST:
      return {...state, testSet: action.payload}
    case SET_TEST_ACTIVE:
      return {...state, testActive: action.payload}
    case PUSH_TO_ADDED_MEANINGS:
      return {...state, addedMeanings: [...state.addedMeanings, action.payload]}
  }
  return state
}

export default testingReducer
