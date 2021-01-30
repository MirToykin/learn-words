import React, {FC, useState} from 'react'
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu/Menu"
import {useDispatch} from "react-redux"
import ChangeMeaningsForm from "../forms/ChangeMeaningsForm"
import Paper from "@material-ui/core/Paper/Paper"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog/Dialog"
import {useCommonFormStyles} from "../../../assets/useStyles"
import {
  deleteWords,
  editWord,
  setAddedMeanings,
  TDeleteWord,
  TEditWord
} from "../../../redux/actions/wordsActions"
import {stopSubmit} from "redux-form"
import {OptionsType, SetNameType} from "../../../types/types"
import {AnyAction, Dispatch} from "redux"
import {ThunkDispatch} from "redux-thunk"
import {AppStateType} from "../../../redux/store/configureStore"


type TProps = {
  anchorEl:  Element | ((element: Element) => Element) | null | undefined
  id: number
  title: string
  meanings: Array<string>
  currentSet: SetNameType
  options: OptionsType
  setAnchorEl: (el: Element | ((element: Element) => Element) | null | undefined) => void
}

const WordItemMenu: FC<TProps> = ({
                        anchorEl, setAnchorEl, id,
                        title, meanings, currentSet,
                        options
                      }) => {

  const [open, setOpen] = useState(false)
  const classes = useCommonFormStyles()
  // const dispatch: Dispatch<SetAddedMeaningsActionType | StopSubmitAction> = useDispatch()
  const dispatch: Dispatch<AnyAction> = useDispatch()
  const dispatchEdit: ThunkDispatch<AppStateType, unknown, TEditWord> = useDispatch()
  const dispatchDelete: ThunkDispatch<AppStateType, unknown, TDeleteWord> = useDispatch()

  const handleMoveToSet = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, moveToSet: () => void) => {
    moveToSet()
    setAnchorEl(null)
  }

  const onChangeMeans = () => {
    setOpen(true)
    setAnchorEl(null)
  }

  const onClose = () => {
    setOpen(false)
    dispatch(setAddedMeanings([]))
    dispatch(stopSubmit('changeMeaningsForm', {}))
  }

  const menuConfig = {
    next: [
      {
        moveToSet: () => {dispatchEdit(editWord(currentSet, id, {"category": "current"}, options))},
        title: 'Переместить в текущий набор'
      },
      {
        moveToSet: () => {dispatchEdit(editWord(currentSet, id, {"category": "done"}, options))},
        title: 'Переместить в изученные'
      }],
    current: [
      {
        moveToSet: () => {dispatchEdit(editWord(currentSet, id, {"category": "next"}, options))},
        title: 'Переместить в очередь'
      },
      {
        moveToSet: () => {dispatchEdit(editWord(currentSet, id, {"category": "done"}, options))},
        title: 'Переместить в изученные'
      }],
    done: [
      {
        moveToSet: () => {dispatchEdit(editWord(currentSet, id, {"category": "next"}, options))},
        title: 'Переместить в очередь'
      },
      {
        moveToSet: () => {dispatchEdit(editWord(currentSet, id, {"category": "current"}, options))},
        title: 'Переместить в текущий набор'
      }
    ]
  }

  const menuItem1 = menuConfig[currentSet][0]
  const menuItem2 = menuConfig[currentSet][1]

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={(e) => handleMoveToSet(e, menuItem1.moveToSet)}>{menuItem1.title}</MenuItem>
        <MenuItem onClick={(e) => handleMoveToSet(e, menuItem2.moveToSet)}>{menuItem2.title}</MenuItem>
        {currentSet !== 'done' && <MenuItem onClick={onChangeMeans}>Изменить значения</MenuItem>}
        <MenuItem onClick={() => dispatchDelete(deleteWords(currentSet, [id], options))}>Удалить</MenuItem>
      </Menu>
      <Dialog open={open} onClose={onClose}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color='primary'
                      className={classes.head}
          >Изменить значения для <Typography variant={'inherit'} color={'textPrimary'}>{title}</Typography></Typography>
          <ChangeMeaningsForm
            meanings={meanings}
            editWord={editWord}
            onClose={() => setOpen(false)}
            id={id}
            options={options}
          />
        </Paper>
      </Dialog>
    </>
  )
}

export default WordItemMenu
