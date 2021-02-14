import {WordType} from "../../types/types"

let initialState = {
  testSet: [] as Array<WordType>
}

type ActionType = {
  type: string
}

type InitialStateType = typeof initialState

const testingReducer = (state:InitialStateType = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {

  }
  return state
}

export default testingReducer
