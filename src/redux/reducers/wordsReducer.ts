import {
  DELETE_WORD_FROM_STATE,
  ADD_WORD_TO_STATE,
  ADD_SET,
  UPDATE_WORD_IN_STATE,
  SET_SEARCH_INPUT,
  PUSH_TO_ADDED_MEANINGS, DELETE_FROM_ADDED_MEANINGS, SET_ADDED_MEANINGS
} from "../constants";
import {WordType} from "../../types/types";
import {
  AddSetActionType, AddWordToStateActionType,
  DeleteFromAddedMeaningsActionType, DeleteWordFromStateActionType,
  PushToAddedMeaningsActionType, SetAddedMeaningsActionType,
  SetSearchInputActionType, UpdateWordInStateActionType
} from "../actions/wordsActions";

let initialState = {
  next: [] as Array<WordType>,
  current: [] as Array<WordType>,
  done: [] as Array<WordType>,
  searchInput: '',
  addedMeanings: [] as Array<string>
}

// type ActionType = AddSetActionType | SetSearchInputActionType | PushToAddedMeaningsActionType |
//     DeleteFromAddedMeaningsActionType | SetAddedMeaningsActionType |
//     DeleteWordFromStateActionType | AddWordToStateActionType | UpdateWordInStateActionType

// type ActionType = {
//   type: string
//   payload: any
// }

type InitialStateType = typeof initialState;

const wordsReducer = (state:InitialStateType = initialState, {type, payload}:any): InitialStateType => {
  switch (type) {
    case ADD_SET:
      return {...state, [payload.setName]: payload.set};
    case ADD_WORD_TO_STATE:
      // @ts-ignore
      return {...state, [payload.set]: [...state[payload.set], payload.word]};
    case DELETE_WORD_FROM_STATE:
      // @ts-ignore
      return {...state, [payload.set]: state[payload.set].filter(word => word.id !== payload.wordId)};
    case UPDATE_WORD_IN_STATE:
      // @ts-ignore
      return {...state, [payload.category]: state[payload.category].map((word:WordType) => {
          if (word.id === payload.id) {
            return payload;
          }
          return word;
        })}
    case SET_SEARCH_INPUT:
      return {...state, searchInput: payload};
    case PUSH_TO_ADDED_MEANINGS:
      return {...state, addedMeanings: [...state.addedMeanings, payload]};
    case DELETE_FROM_ADDED_MEANINGS:
      return {...state, addedMeanings: state.addedMeanings.filter(meaning => meaning !== payload)}
    case SET_ADDED_MEANINGS:
      return {...state, addedMeanings: payload}
    default:
      return state;
  }
}

export default wordsReducer;
