import React, {FC} from 'react';
import {useSelector} from "react-redux";
import withAuthRedirect from "../../HOCs/withAuthRedirect";
import SetPage from "../../common/word_sets/SetPage";
import {getSet, GetSetThunkCreatorType, GetSetThunkType} from "../../../redux/actions/wordsActions";
import {getFilteredSet} from "../../../assets/helpers";
import {AppStateType} from "../../../redux/store/configureStore";
import {OptionsType, WordType} from "../../../types/types";

type TProps = {
  uid: number
  options: OptionsType
}

const DoneSet: FC<TProps> = ({uid, options}) => {

  const done: Array<WordType> = useSelector((state: AppStateType) => getFilteredSet(state.words.done, state.words.searchInput, 'title'))
  const getDone: GetSetThunkCreatorType = getSet('done')

  return (
    <SetPage uid={uid}
             set={done}
             getSet={getDone}
             pageTitle='Изученные'
             options={options}
    />
  );
};

export default withAuthRedirect(DoneSet);

