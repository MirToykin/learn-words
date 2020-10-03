import {pushToAddedMeanings} from "../redux/actions/wordsActions";
import {change} from "redux-form";

export const getFilteredSet = (set, query, field) => {
  return set.filter(setItem => setItem[field].startsWith(query));
}

export const onAddMeaning = (meaning, dispatch, formName, repeatValue) => {
  if (!meaning) return;
  dispatch(change(formName, 'meanings', ''));
  if (repeatValue) return;
  dispatch(pushToAddedMeanings(meaning));

}