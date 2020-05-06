import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import {firestoreReducer, getFirestore, reduxFirestore} from "redux-firestore";
import {firebaseReducer, getFirebase, reactReduxFirebase} from "react-redux-firebase";
import firebase from "../../config/firebase";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: formReducer
})

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

export const configureStore = () => {
  const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer);

  return store;
};