import React, {FC} from 'react';
import {useSelector} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {addToSet, addToSetThunkCreatorType, getSet, GetSetThunkCreatorType} from "../../../redux/actions/wordsActions";
import {getFilteredSet} from "../../../assets/helpers";
import {TSetProps, WordType} from "../../../types/types";
import {AppStateType} from "../../../redux/store/configureStore";


const CurrentSet: FC<TSetProps> = ({uid, token, options}) => {
  const getCurrent: GetSetThunkCreatorType = getSet('current')
  const addToCurrent: addToSetThunkCreatorType = addToSet('current')
  const current: Array<WordType> = useSelector((state: AppStateType) => getFilteredSet(state.words.current, state.words.searchInput, 'title'))

  return (
    <SetPage token={token}
             uid={uid}
             set={current}
             getSet={getCurrent}
             addToSet={addToCurrent}
             pageTitle='Текущий набор'
             options={options}
    />
  );
};

export default withAuthRedirect(CurrentSet);

