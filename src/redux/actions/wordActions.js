import {SubmissionError} from "redux-form";

export const addToCurrent = (wordDoc) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const uid = firebase.auth().currentUser.uid;

  const wordDocument = {
    ...wordDoc,
    means: wordDoc.means.split(',').filter(mean => mean !== '')
  }

  try {
    await firestore.collection('users').doc(uid).collection('current').add({...wordDocument});
  } catch (error) {
    throw new SubmissionError({
      _error: error.message
    })
  }

}