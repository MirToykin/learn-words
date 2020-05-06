import {SubmissionError} from "redux-form";

export const login = (creds) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
  } catch (err) {
    throw new SubmissionError({
      _error: 'Incorrect email or password'
    })
  }
}