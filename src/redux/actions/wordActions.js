import {SubmissionError} from "redux-form";

export const addToSet = (set) => (wordDoc) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const uid = firebase.auth().currentUser.uid;

    const wordDocument = {
      ...wordDoc,
      means: wordDoc.means.split ? wordDoc.means.split(',').filter(mean => mean !== '') : wordDoc.means
    }

    try {
      if(wordDoc.id) {
        const {id, ...restDoc} = wordDoc;
        await firestore.collection('users').doc(uid).collection(set).doc(wordDoc.id).set(restDoc);
      } else {
        await firestore.collection('users').doc(uid).collection(set).add({...wordDocument});
      }
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

export const removeFromSet = (set, id) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const uid = firebase.auth().currentUser.uid;

    try {
      await firestore.collection('users').doc(uid).collection(set).doc(id).delete();
    } catch (error) {
      console.log(error)
    }
  }