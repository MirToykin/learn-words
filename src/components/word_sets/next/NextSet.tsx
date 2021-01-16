import React, {FC} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {addToSet, addToSetThunkCreatorType, getSet, GetSetThunkCreatorType} from "../../../redux/actions/wordsActions";
import {getFilteredSet} from "../../../assets/helpers";
import {TSetProps, WordType} from "../../../types/types";
import {AppStateType} from "../../../redux/store/configureStore";


const NextSet: FC<TSetProps> = ({uid, token, options}) => {
  const getNext: GetSetThunkCreatorType = getSet('next')
  const addToNext: addToSetThunkCreatorType = addToSet('next')
  const next: Array<WordType> = useSelector((state: AppStateType) => getFilteredSet(state.words.next, state.words.searchInput, 'title'))

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

export default withAuthRedirect(NextSet);

