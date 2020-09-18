import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer
})

export const configureStore = () => {
  const middlewares = [thunk];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  return createStore(rootReducer, composedEnhancer);
};