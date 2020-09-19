import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {addToSet, getSet} from "../../../redux/actions/wordsActions";

const mapState = (state) => {
  return {
    current: state.words.current,
  };
}

const actions = {
  getCurrent: getSet('current'),
  addToCurrent: addToSet('current')
}

const CurrentSet = ({current, getCurrent, uid, token, addToCurrent}) => {

  return (
    <SetPage token={token}
             uid={uid}
             set={current}
             getSet={getCurrent}
             addToSet={addToCurrent}
             pageTitle='Текущий набор'
    />
  );
};

export default compose(
  withAuthRedirect,
  connect(mapState, actions)
)(CurrentSet);

