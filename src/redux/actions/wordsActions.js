import {SubmissionError} from "redux-form";
import {setIsFetching} from "./appActions";
import Api from "../../api/Api";
import {
  ADD_SET,
  ADD_WORD_TO_STATE, SET_ADDED_MEANINGS, DELETE_FROM_ADDED_MEANINGS,
  DELETE_WORD_FROM_STATE, PUSH_TO_ADDED_MEANINGS, SET_SEARCH_INPUT, UPDATE_WORD_IN_STATE
} from "../constants";
import {setAuthData} from "./authActions";


const api = new Api();

export const getSet = set => (uid, options) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.getSet(set, uid, options);
    const words = response.data.words;
    dispatch(addSet(set, words));
  } catch(e) {
    if (e.response && e.response.status === 401) {
      dispatch(setAuthData(null, null, null, false));
    }
    console.log(e.response);
  }
  dispatch(setIsFetching(false));
}

export const addToSet = set => (data, options) => async (dispatch) => {

  dispatch(setIsFetching(true));
  const newData = {...data, category: set};

  try {
    const response = await api.addToSet(newData, options);
    const word = response.data.word;
    dispatch(addWordToState(set, word));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      dispatch(setAuthData(null, null, null, false));
    }
    throw new SubmissionError({
      _error: e.response.data.message
    });
  }
  dispatch(setIsFetching(false));
}

export const editWord = (setToRemoveFrom, wordId, data, options) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.editWord(wordId, data, options);
    const word = response.data.word;
    if (data.category) {
      // На текущий момент внесение изменений в state, влияющий на отрисовку другой категории
      // избыточен, поскольку при открытии другой категории происходит загрузка записей из БД.
      // Если будет реализован вывод из state без загрузки из БД, то может понадобится
      // dispatch(addWordToState(data.category, word));

      dispatch(deleteWordFromState(setToRemoveFrom, wordId));
    }

    dispatch(updateWordInState(word));

  } catch (e) {
    if (e.response && e.response.status === 401) {
      dispatch(setAuthData(null, null, null, false));
    }
    console.log(e.response.data.message);
  }
  dispatch(setIsFetching(false));
}

export const deleteWord = (set, wordId, config) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.deleteWord(wordId, config);
    if (response.statusText === 'OK') {
      dispatch(deleteWordFromState(set, wordId));
    }
  } catch (e) {
    if (e.response && e.response.status === 401) {
      dispatch(setAuthData(null, null, null, false));
    }
    console.log(e.response.data.message);
  }
  dispatch(setIsFetching(false));
}

export const setSearchInput = payload => {
  return {
    type: SET_SEARCH_INPUT,
    payload
  }
}

export const pushToAddedMeanings = payload => {
  return {
    type: PUSH_TO_ADDED_MEANINGS,
    payload
  }
}

export const deleteFromAddedMeanings = payload => {
  return {
    type: DELETE_FROM_ADDED_MEANINGS,
    payload
  }
}

export const setAddedMeanings = (payload) => {
  return {
    type: SET_ADDED_MEANINGS,
    payload
  }
}

const addSet = (setName, set) => {
  return {
    type: ADD_SET,
    payload: {setName, set}
  }
}

const deleteWordFromState = (set, wordId) => {
  return {
    type: DELETE_WORD_FROM_STATE,
    payload: {set, wordId}
  }
}

const addWordToState = (set, word) => {
  return {
    type: ADD_WORD_TO_STATE,
    payload: {set, word}
  }
}

const updateWordInState = (payload) => {
  return {
    type: UPDATE_WORD_IN_STATE,
    payload
  }
}
