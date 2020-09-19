import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import authReducer from "../reducers/authReducer";
import wordsReducer from "../reducers/wordsReducer";
import appReducer from "../reducers/appReducer";
import {loadState, saveState} from "../../assets/localStorage";
import throttle from 'lodash/throttle';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  words: wordsReducer,
  app: appReducer
})

export const configureStore = () => {
  const middlewares = [thunk];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const serializedState = loadState();

  const store = createStore(rootReducer, serializedState, composedEnhancer);

  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth
    });
  }, 1000))

  return store;
};