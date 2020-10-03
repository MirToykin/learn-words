import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {getSet} from "../../../redux/actions/wordsActions";
import {getFilteredSet} from "../../../assets/helpers";

const mapState = state => {
  return {
    done: getFilteredSet(state.words.done, state.words.searchInput, 'title'),
  };
}

const actions = {
  getDone: getSet('done'),
}

const DoneSet = ({done, getDone, uid, token, options}) => {

  return (
    <SetPage token={token}
             uid={uid}
             set={done}
             getSet={getDone}
             pageTitle='Изученные'
             options={options}
    />
  );
};

export default compose(
  withAuthRedirect,
  connect(mapState, actions)
)(DoneSet);

