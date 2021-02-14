import {GET_SET_FOR_TEST} from "../constants";
import {WordType} from "../../types/types";

export type TGetSetForTestAction = {
  type: typeof GET_SET_FOR_TEST,
  payload: Array<WordType>
}

export const getSetForTest = (set: Array<WordType>): TGetSetForTestAction => ({
  type: GET_SET_FOR_TEST,
  payload: set
})