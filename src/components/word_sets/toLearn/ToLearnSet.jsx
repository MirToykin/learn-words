import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";

const mapState = () => {
  return {
    to_learn: []
  };
}

const actions = {
  // addToTo_lear: addToSet('to_learn')
}

const ToLearnSet = ({to_learn, addToTo_lear}) => {

  return (
    <h1>Заглушка: на очереди</h1>
    //<SetPage set={to_learn} addToSet={addToTo_lear} title='На очереди'/>
  );
};

export default compose(
  withAuthRedirect,
  connect(mapState, actions)
)(ToLearnSet);

