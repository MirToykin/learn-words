import {pushToAddedMeanings, PushToAddedMeaningsActionType} from "../redux/actions/wordsActions";
import {change, FormAction} from "redux-form";
import {WordType} from "../types/types";
import {AnyAction, Dispatch} from "redux";

export const getFilteredSet = (set: Array<WordType>, query: string, field: 'title' | 'meanings') => {
  // return set.filter(setItem => setItem[field].toLowerCase().startsWith(query.toLowerCase()));
  return set.filter(setItem => setItem[field].toLowerCase().includes(query.toLowerCase()));
}

type TDispatch = Dispatch<FormAction | PushToAddedMeaningsActionType>
type TFormName = 'AddToSetForm' | 'changeMeaningsForm'
type TOnAddMeaning = (meaning: string, dispatch: TDispatch, formName: TFormName, repeatValue: boolean) => void
export const onAddMeaning: TOnAddMeaning = (meaning, dispatch, formName, repeatValue) => {
  if (!meaning || repeatValue) return;
  dispatch(change(formName, 'meanings', ''));
  dispatch(pushToAddedMeanings(meaning.toLowerCase()));
}

export const handleAddMeaning = (addedMeanings: Array<string>, meaningValue: string, onAddMeaning: TOnAddMeaning, dispatch: TDispatch, formName: TFormName, correctMeaningValue: boolean) => {
  const repeat = addedMeanings.includes(meaningValue);
  correctMeaningValue && onAddMeaning(meaningValue, dispatch, formName, repeat);
}

export const randomInteger = (min: number, max: number) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}