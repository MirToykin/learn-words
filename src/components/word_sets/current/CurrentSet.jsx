import React from 'react';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {addToSet} from "../../../redux/actions/wordActions";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";

const mapState = ({ firestore }, {uid}) => {
  return {
    current: firestore.ordered[`${uid}-current`] || []
  };
}

const actions = {
  addToCurrent: addToSet('current')
}

const getPath = ({uid}) => {
  return [{ collection: "users", doc: uid, subcollections: [{ collection: "current" }], storeAs: `${uid}-current` }];
}

const CurrentSet = ({current, addToCurrent}) => {

  return (
    <SetPage set={current} addToSet={addToCurrent} title='Текущий набор'/>
  );
};

export default compose(
  withAuthRedirect,
  firestoreConnect(getPath),
  connect(mapState, actions)
)(CurrentSet);

