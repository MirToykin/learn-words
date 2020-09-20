import {
  DELETE_WORD_FROM_STATE, ADD_WORD_TO_STATE, ADD_SET, UPDATE_WORD_IN_STATE
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
    case UPDATE_WORD_IN_STATE:
      return {...state, [payload.category]: state[payload.category].map(word => {
          if (word.id === payload.id) {
            return payload;
          }
          return word;
        })}
      // return {...state, [payload.category]: [...state[payload.category].filter(word => word.id !== payload.id), payload]}
    default:
      return state;
  }
}

export default wordsReducer;