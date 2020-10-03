import {
  DELETE_WORD_FROM_STATE,
  ADD_WORD_TO_STATE,
  ADD_SET,
  UPDATE_WORD_IN_STATE,
  SET_SEARCH_INPUT,
  PUSH_TO_ADDED_MEANINGS, DELETE_FROM_ADDED_MEANINGS, SET_ADDED_MEANINGS
} from "../constants";

let initialState = {
  next: [],
  current: [],
  done: [],
  searchInput: '',
  addedMeanings: []
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
