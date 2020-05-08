import React from 'react';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";

const mapState = ({ firestore }, {uid}) => {
  return {
    learned: firestore.ordered[`${uid}-learned`] || []
  };
}

const getPath = ({uid}) => {
  return [{ collection: "users", doc: uid, subcollections: [{ collection: "learned" }], storeAs: `${uid}-learned` }];
}

const LearnedSet = ({learned}) => {

  return (
    <SetPage set={learned} addToSet={null} title='Изученные'/>
  );
};

export default compose(
  withAuthRedirect,
  firestoreConnect(getPath),
  connect(mapState)
)(LearnedSet);

