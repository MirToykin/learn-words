import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";

const mapState = ({ firestore }, {uid}) => {
  return {
    learned: []
  };
}

const LearnedSet = ({learned}) => {

  return (
    <h1>Заглушка: изученные</h1>
    //<SetPage set={learned} addToSet={null} title='Изученные'/>
  );
};

export default compose(
  withAuthRedirect,
  connect(mapState)
)(LearnedSet);

