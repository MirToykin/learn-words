import {
  DELETE_WORD_FROM_STATE, ADD_WORD_TO_STATE, ADD_SET
} from "../constants";

let initialState = {
  next: [],
  current: [],
  done: [],
}

const wordsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_SET:
      return {...state, [payload.setName]: payload.set};
    case ADD_WORD_TO_STATE:
      return {...state, [payload.set]: [...state[payload.set], payload.word]};
    case DELETE_WORD_FROM_STATE:
      return {...state, [payload.set]: state[payload.set].filter(word => word.id !== payload.wordId)};
    default:
      return state;
  }
}

export default wordsReducer;