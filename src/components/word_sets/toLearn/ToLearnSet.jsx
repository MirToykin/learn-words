import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {addToSet, getSet} from "../../../redux/actions/wordsActions";

const mapState = state => {
  return {
    next: state.words.next,
  };
}

const actions = {
  getNext: getSet('next'),
  addToNext: addToSet('next')
}

const ToLearnSet = ({next, getNext, uid, token, addToNext, options}) => {

  return (
    <SetPage token={token}
             uid={uid}
             set={next}
             getSet={getNext}
             addToSet={addToNext}
             pageTitle='На очереди'
             options={options}
    />
  );
};

export default compose(
  withAuthRedirect,
  connect(mapState, actions)
)(ToLearnSet);

