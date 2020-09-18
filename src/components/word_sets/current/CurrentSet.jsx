import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";

const mapState = () => {
  return {
    current: []
  };
}

const actions = {
  // addToCurrent: addToSet('current')
}

const CurrentSet = ({current, addToCurrent}) => {

  return (
    <h1>Заглушка: текущие</h1>
    // {/*<SetPage set={current} addToSet={addToCurrent} title='Текущий набор'/>*/}
  );
};

export default compose(
  withAuthRedirect,
  connect(mapState, actions)
)(CurrentSet);

