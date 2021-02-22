import React, {FC, useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import WordItem from "./WordItem";
import {OptionsType, SetNameType, WordType} from "../../../types/types";
import { Waypoint } from 'react-waypoint';
import {Dispatch} from "redux";
import {SetSearchInputActionType, setSetSize, TSetSetSizeAction} from "../../../redux/actions/wordsActions";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/store/configureStore";

type TProps = {
  set: Array<WordType>
  pageTitle: string
  options: OptionsType
  wordsCount: number
  setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>
}

const areEqual = (prevProps: TProps, props: TProps): boolean => {
  let prevSet = prevProps.set
  let newSet = props.set

  let prevSetTitles = ''
  let prevSetMeanings = ''
  prevSet.forEach(word => {
    prevSetTitles += word.title
    prevSetMeanings += word.meanings
  })

  let newSetTitles = ''
  let newSetMeanings = ''
  newSet.forEach(word => {
    newSetTitles += word.title
    newSetMeanings += word.meanings
  })

  return prevSetTitles === newSetTitles && prevSetMeanings === newSetMeanings
}

const Set: FC<TProps> = ({set, pageTitle, options, setSelectedIDs}) => {
  const dispatch: Dispatch<TSetSetSizeAction> = useDispatch()
  const setSize = useSelector((state: AppStateType) => state.words.setSize)

  return (
    <>
      {set.map((word, index) => {
        if(index + 1 < setSize)
          return (<ListItem key={word.id}>
                    <WordItem word={word} pageTitle={pageTitle}
                              options={options}
                              setSelectedIDs={setSelectedIDs}
                    />
            {index === setSize - 5 && <Waypoint onEnter={() => {
              dispatch(setSetSize(setSize + 10))
            }}/>}
                  </ListItem>)
      })}
    </>
  )
}

export default React.memo(Set, areEqual)