import {pushToAddedMeanings} from "../redux/actions/wordsActions";
import {change} from "redux-form";

export const getFilteredSet = (set, query, field) => {
  return set.filter(setItem => setItem[field].startsWith(query));
}

export const onAddMeaning = (meaning, dispatch, formName) => {
  if (!meaning) return;
  dispatch(pushToAddedMeanings(meaning));
  dispatch(change(formName, 'meanings', ''));
}