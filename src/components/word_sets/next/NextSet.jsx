import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {addToSet, getSet, setFilteredSet} from "../../../redux/actions/wordsActions";
import {getFilteredSet} from "../../../assets/helpers";

const mapState = state => {
  return {
    next: getFilteredSet(state.words.next, state.words.searchInput, 'title'),
  };
}

const actions = {
  getNext: getSet('next'),
  addToNext: addToSet('next'),
}

const NextSet = ({next, getNext, uid, token, addToNext, options}) => {

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
)(NextSet);

