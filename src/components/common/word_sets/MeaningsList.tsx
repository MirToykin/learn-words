import React, {FC, Fragment} from 'react'
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import {makeStyles} from "@material-ui/core/styles"
import {
  deleteFromAddedMeanings,
  DeleteFromAddedMeaningsActionType,
  editWord, TEditWord
} from "../../../redux/actions/wordsActions"
import {useDispatch} from "react-redux"
import {OptionsType} from "../../../types/types"
import {Dispatch} from "redux"
import {ThunkDispatch} from "redux-thunk"
import {AppStateType} from "../../../redux/store/configureStore"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  icon: {
    color: '#000'
  }
}))

type TProps = {
  meaningsArray: Array<string>
  id: number
  options: OptionsType
  isHttp?: boolean
}

const MeaningsList: FC<TProps> = ({meaningsArray, id, options, isHttp=true}) => {
  const classes = useStyles()
  const dispatch: Dispatch<DeleteFromAddedMeaningsActionType> = useDispatch()
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, TEditWord> = useDispatch()

  const deleteMeaning = (meaning: string): void => {
    if(isHttp) {
      let meanings = meaningsArray.filter(item => item !== meaning).join('/')
      thunkDispatch(editWord('current', id, {meanings}, options)) // current - указан в качестве заглушки, как валидный для типа SetNameType
      // в данном вызове этот параметр не используется
    } else {
      dispatch(deleteFromAddedMeanings(meaning))
    }
  }

  return (
    <List className={classes.root}>
      {meaningsArray.map((meaning, i, array) => (
        <Fragment key={meaning}>
          <ListItem>
            <ListItemText primary={meaning}/>
            {meaningsArray.length > 1 && <IconButton onClick={() => deleteMeaning(meaning)}>
              <DeleteForeverIcon/>
            </IconButton>}
          </ListItem>
          {i !== array.length -1 && <Divider/>}
        </Fragment>
      ))}
    </List>
  )
}

export default MeaningsList
