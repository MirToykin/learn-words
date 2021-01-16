import React, {FC} from 'react';
import ListItem from "@material-ui/core/ListItem";
import WordItem from "./WordItem";
import {OptionsType, WordType} from "../../../types/types";

type TProps = {
  set: Array<WordType>
  pageTitle: string
  options: OptionsType
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

const Set: FC<TProps> = ({set, pageTitle, options}) => {
  return (
    <>
      {set.map(word => (
        <ListItem key={word.id}>
          <WordItem word={word} pageTitle={pageTitle} options={options}/>
        </ListItem>
      ))}
    </>
  )
}

export default React.memo(Set, areEqual)