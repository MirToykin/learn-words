import {pushToAddedMeanings} from "../redux/actions/wordsActions";
import {change} from "redux-form";

export const getFilteredSet = (set, query, field) => {
  return set.filter(setItem => setItem[field].toLowerCase().startsWith(query.toLowerCase()));
}

export const onAddMeaning = (meaning, dispatch, formName, repeatValue) => {
  if (!meaning || repeatValue) return;
  dispatch(change(formName, 'meanings', ''));
  dispatch(pushToAddedMeanings(meaning.toLowerCase()));
}

export const handleAddMeaning = (addedMeanings, meaningValue, onAddMeaning, dispatch, formName, correctMeaningValue) => {
  const repeat = addedMeanings.includes(meaningValue);
  correctMeaningValue && onAddMeaning(meaningValue, dispatch, formName, repeat);
}
