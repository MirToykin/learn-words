import {SubmissionError} from "redux-form";

export const login = (creds) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
  } catch (err) {
    throw new SubmissionError({
      _error: 'Неверный логин или пароль'
    })
  }
}

export const registerUser = (user) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    await createdUser.user.updateProfile({
      displayName: user.displayName
    });

    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    }

    await firestore.set(`users/${createdUser.user.uid}`, {...newUser})
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    })
  }
}