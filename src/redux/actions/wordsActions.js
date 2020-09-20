import {SubmissionError} from "redux-form";
import {setIsFetching} from "./appActions";
import Api from "../../api/Api";
import {
  ADD_SET,
  ADD_WORD_TO_STATE,
  DELETE_WORD_FROM_STATE, UPDATE_WORD_IN_STATE
} from "../constants";


const api = new Api();

export const getSet = set => (uid, options) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.getSet(set, uid, options);
    const words = response.data.words;
    dispatch(addSet(set, words));
  } catch(e) {
    console.log(e.message);
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
    console.log(e.message);
    // throw new SubmissionError({
    //   _error: 'Что-то пошло не так :('
    // })
  }
  dispatch(setIsFetching(false));
}

export const editWord = (setToRemoveFrom, wordId, data, options) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.editWord(wordId, data, options);
    const word = response.data.word;
    if (data.category) {
      // На текущий момент внесение изменений в state, влияющий отрисовку другой категории
      // избыточен, поскольку при открытии другой категории происходит загрузка записей из БД.
      // Если будет реализован вывод из state без загрузки из БД, то может понадобится
      // dispatch(addWordToState(data.category, word));

      dispatch(deleteWordFromState(setToRemoveFrom, wordId));
    }

    dispatch(updateWordInState(word));

  } catch (e) {
    console.log(e.message);
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
    console.log(e.message);
  }
  dispatch(setIsFetching(false));
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