import React, {FC, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import WordItem from "./WordItem";
import {OptionsType, SetNameType, WordType} from "../../../types/types";
import WordItemMenu from "./WordItemMenu";

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
  const [anchorEl, setAnchorEl] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  const [wordId, setWordId] = useState<number>(0)
  const [wordTitle, setWordTitle] = useState<string>('')
  const [currentSet, setCurrentSet] = useState<SetNameType>('current')
  const [meaningsArray, setMeaningsArray] = useState<Array<string>>([])
  return (
    <>
      <WordItemMenu anchorEl={anchorEl}
                    id={wordId} title={wordTitle}
                    meanings={meaningsArray}
                    currentSet={currentSet}
                    options={options}
                    setAnchorEl={setAnchorEl}
      />
      {set.map(word => (
        <ListItem key={word.id}>
          <WordItem word={word} pageTitle={pageTitle}
                    options={options} setWordId={setWordId}
                    setWordTitle={setWordTitle}
                    setCurrentSet={setCurrentSet}
                    setMeaningsArray={setMeaningsArray}
                    setAnchorEl={setAnchorEl}
          />
        </ListItem>
      ))}
    </>
  )
}

export default React.memo(Set, areEqual)