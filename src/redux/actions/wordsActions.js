import {SubmissionError} from "redux-form";
import {setIsFetching} from "./appActions";
import Api from "../../api/Api";
import {ADD_TO_CURRENT, ADD_TO_DONE, ADD_TO_NEXT, SET_CURRENT, SET_DONE, SET_NEXT} from "../constants";


const api = new Api();

export const getSet = set => (uid, options) => async dispatch => {
  dispatch(setIsFetching(true));
  try {
    const response = await api.getSet(set, uid, options);
    const words = response.data.words;
    switch (set) {
      case 'next':
        dispatch(setNext(words));
        break;
      case 'current':
        dispatch(setCurrent(words));
        break;
      case 'done':
        dispatch(setDone(words));
        break;
    }
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

    switch (set) {
      case 'next':
        dispatch(addToNext(word));
        break;
      case 'current':
        dispatch(addToCurrent(word));
        break;
      case 'done':
        dispatch(addToDone(word));
        break;
    }

  } catch (e) {
    console.log(e.message);
    // throw new SubmissionError({
    //   _error: 'Что-то пошло не так :('
    // })
  }
  dispatch(setIsFetching(false));
}

const setNext = (payload) => {
  return {
    type: SET_NEXT,
    payload
  }
}

const addToNext = (payload) => {
  return {
    type: ADD_TO_NEXT,
    payload
  }
}

const setCurrent = (payload) => {
  return {
    type: SET_CURRENT,
    payload
  }
}

const addToCurrent = (payload) => {
  return {
    type: ADD_TO_CURRENT,
    payload
  }
}

const setDone = (payload) => {
  return {
    type: SET_DONE,
    payload
  }
}

const addToDone = (payload) => {
  return {
    type: ADD_TO_DONE,
    payload
  }
}
