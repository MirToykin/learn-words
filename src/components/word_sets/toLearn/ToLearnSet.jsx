import React from 'react';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {addToSet} from "../../../redux/actions/wordActions";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";

const mapState = ({ firestore }, {uid}) => {
  return {
    to_learn: firestore.ordered[`${uid}-to_learn`] || []
  };
}

const actions = {
  addToTo_lear: addToSet('to_learn')
}

const getPath = ({uid}) => {
  return [{ collection: "users", doc: uid, subcollections: [{ collection: "to_learn" }], storeAs: `${uid}-to_learn` }];
}

const ToLearnSet = ({to_learn, addToTo_lear}) => {

  return (
    <SetPage set={to_learn} addToSet={addToTo_lear} title='На очереди'/>
  );
};

export default compose(
  withAuthRedirect,
  firestoreConnect(getPath),
  connect(mapState, actions)
)(ToLearnSet);

