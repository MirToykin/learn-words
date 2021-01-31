import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import AddToSetForm from "../forms/AddToSetForm"
import List from "@material-ui/core/List"
import {useCommonFormStyles, useSetStyles} from "../../../assets/useStyles"
import TextField from "@material-ui/core/TextField"
import Set from "./Set"
import {useDispatch, useSelector} from "react-redux"
import {
  deleteWords, editWord,
  GetSetThunkCreatorType, moveWords, setAddedMeanings,
  setSearchInput,
  SetSearchInputActionType, setSetSize, TGetSet, TMoveAndDeleteWords, TSetSetSizeAction
} from "../../../redux/actions/wordsActions"
import LinearProgress from "@material-ui/core/LinearProgress"
import {OptionsType, SetNameType, WordType} from "../../../types/types";
import {AppStateType} from "../../../redux/store/configureStore";
import {AnyAction, Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useLocation } from 'react-router-dom'
import ChangeMeaningsForm from "../forms/ChangeMeaningsForm";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {stopSubmit} from "redux-form";
import {Button, Collapse, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

type TProps = {
  set: Array<WordType>
  getSet: GetSetThunkCreatorType
  pageTitle: string
  uid: number
  addToSet?: any
  options: OptionsType
  token: string
}

const SetPage: FC<TProps> = ({set, getSet, pageTitle, uid, addToSet, options}) => {
  const classes = useSetStyles()
  const classesForm = useCommonFormStyles()
  const [open, setOpen] = useState(false)
  const [openDialogForm, setOpenDialogForm] = useState(false)
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false)
  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])
  const [deltaHeight, setDeltaHeight] = useState(window.pageYOffset ? 90 : 180) // если pageYOffset 0, тогда из высоты контейнера вычитаем 180 px
  const searchInput: string = useSelector((state: AppStateType) => state.words.searchInput)
  const setSize = useSelector((state: AppStateType) => state.words.setSize)
  const dispatchHelpers: Dispatch<SetSearchInputActionType | TSetSetSizeAction> = useDispatch()
  const dispatch: Dispatch<AnyAction> = useDispatch()
  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const currentRoute: any = useLocation().pathname.slice(1)
  const routes: Array<SetNameType> = ['next', 'current', 'done']
  const currentRouteIndex = routes.indexOf(currentRoute)
  const nextRoute = currentRouteIndex === routes.length - 1 ? routes[0] : routes[currentRouteIndex + 1]
  const prevRoute: SetNameType = currentRouteIndex === 0 ? routes[routes.length - 1] : routes[currentRouteIndex - 1]
  let wordToEdit: WordType | undefined

  wordToEdit = useSelector((state: AppStateType) => {
    return state.words[routes[currentRouteIndex]].filter(word => word.id === selectedIDs[0])[0]
  })

  let ConfirmTitle: string
  const [confirmTitle, setConfirmTitle] = useState('')
  let ConfirmBody: string
  const [confirmBody, setConfirmBody] = useState('')
  let ConfirmAction: () => void
  const [confirmAction, setConfirmAction] = useState<() => void >(() => {})

  const pagesTitles = {
    'next': 'На очереди',
    'current': 'Текущий набор',
    'done': 'Изученные'
  }

  const getSetLast = () => thunkDispatchGetSet(getSet(uid, options))

  useEffect(() => {
    (async () => getSetLast())()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatchHelpers(setSearchInput(e.target.value))
  }

  const handleClose = (additionalActions: Array<() => void>): void => {
    setOpen(false)
    if (additionalActions) {
      additionalActions.forEach(action => {
        action()
      })
    }
  }

  const handleScrollDown = (): void => {
    window['scrollTo']({top: 90, behavior: 'smooth'})
    setDeltaHeight(90)
  }

  const handleScrollUp = (): void => {
    window['scrollTo']({top: 0, behavior: 'smooth'})
    setDeltaHeight(180)
  }

  const handleMove = (idsArr: Array<number>, setToMove: SetNameType, setToRemoveFrom: SetNameType, options: OptionsType):void => {
    thunkDispatchMoveAndDelete(moveWords(idsArr, setToMove, setToRemoveFrom, options))
    setSelectedIDs([]);
  }

  const onMoveClick = (route: SetNameType) => {
    setConfirmAction(() => () => handleMove(selectedIDs, route, currentRoute, options))
    setConfirmTitle('Перемещение')
    setConfirmBody(`Переместить выбранные слова (${selectedIDs.length}) в набор "${pagesTitles[route]}"?`)
    setOpenDialogConfirm(true)
  }

  const handleDelete = (setToRemoveFrom: SetNameType, idsArray: Array<number>, options: OptionsType): void => {
    thunkDispatchMoveAndDelete(deleteWords(setToRemoveFrom, idsArray, options))
    setSelectedIDs([]);
  }

  const onDeleteClick = () => {
    setConfirmAction(() => () => handleDelete(currentRoute, selectedIDs, options))
    setConfirmTitle('Удаление')
    setConfirmBody(`Удалить выбранные слова (${selectedIDs.length}) из набора "${pagesTitles[routes[currentRouteIndex]]}"?`)
    setOpenDialogConfirm(true)
  }

  const handleEdit = () => {
    setOpenDialogForm(true)
  }

  const onCloseDialogForm = () => {
    setOpenDialogForm(false)
    dispatch(setAddedMeanings([]))
    dispatch(stopSubmit('changeMeaningsForm', {}))
  }

  const onCloseDialogConfirm = () => {
    setOpenDialogConfirm(false)
  }
  return (
    <>
      {!!selectedIDs.length && <Dialog open={openDialogConfirm} onClose={onCloseDialogConfirm}>
        <DialogTitle id="confirm-dialog">{confirmTitle}</DialogTitle>
        <DialogContent>{confirmBody}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenDialogConfirm(false)}
            color="primary"
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialogConfirm(false)
              confirmAction()
            }}
            color="default"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>}
      {wordToEdit && <Dialog open={openDialogForm} onClose={onCloseDialogForm}>
          <Paper className={classesForm.paper}>
              <Typography variant='h5'
                          align='center'
                          color='primary'
                          className={classesForm.head}
              >Изменить значения для <Typography variant={'inherit'}
                                                 color={'textPrimary'}>{wordToEdit.title}</Typography></Typography>
              <ChangeMeaningsForm
                  meanings={wordToEdit.meanings.split('/')}
                  onClose={() => setOpenDialogForm(false)}
                  id={wordToEdit.id}
                  options={options}
              />
          </Paper>
      </Dialog>}
      <Grid container justify='center'>
        <Grid item md={5} sm={7} xs={12}>
          <Paper style={{marginBottom: '5px'}}>
            <div className={classes.head}>
              <Typography variant='h6' color={'textSecondary'}>{pageTitle} - {set.length}</Typography>
              <div>
                {deltaHeight === 90 ? // при deltaHeight 90 страница не прокручена, значит показать стрелку вверх, иначе вниз
                  <IconButton onClick={handleScrollUp}>
                    <Icon>expand_more</Icon>
                  </IconButton>
                  :
                  <IconButton onClick={handleScrollDown}>
                    <Icon>expand_less</Icon>
                  </IconButton>
                }
                <IconButton color='primary' style={{padding: '6px', marginRight: '6px'}} size='medium'
                            onClick={() => setOpen(true)}>
                  {addToSet && /*<AddIcon fontSize={'large'}/>*/
                  <Icon style={{fontSize: 40}} color='primary'>add_circle</Icon>}
                </IconButton>
              </div>
            </div>
            {isFetching && !set.length && <LinearProgress color={'secondary'}/>}
            {addToSet && <AddToSetForm open={open}
                                       onClose={handleClose}
                                       addToSet={addToSet}
                                       uid={uid}
                                       options={options}
            />}
          </Paper>
          <Paper style={{marginBottom: '5px'}}>
            <form>
              <TextField fullWidth={true}
                         placeholder={'введите строку для поиска'}
                         inputProps={{
                           style: {
                             textAlign: "center"
                           }
                         }}
                         value={searchInput}
                         onChange={handleInputChange}
                         disabled={!set.length && !searchInput}
              />
            </form>
          </Paper>
          <Collapse in={!!selectedIDs[0]}>
            <Paper style={{marginBottom: '5px'}}>
              <div className={classes.multipleActions}>
                <IconButton onClick={() => onMoveClick(prevRoute)}>
                  <ArrowBackIcon/>
                </IconButton>
                <IconButton onClick={onDeleteClick}>
                  <DeleteForeverIcon/>
                </IconButton>
                <IconButton disabled={selectedIDs.length !== 1} onClick={handleEdit}>
                  <EditIcon/>
                </IconButton>
                <IconButton onClick={() => onMoveClick(nextRoute)}>
                  <ArrowForwardIcon/>
                </IconButton>
              </div>
            </Paper>
          </Collapse>
          <Paper>
            <List id={'words_list'} className={classes.list} style={{maxHeight: `${window.innerHeight - deltaHeight}px`}}>
              {set.length ? <Set set={set}
                                 pageTitle={pageTitle}
                                 options={options}
                                 wordsCount={setSize}
                                 setSelectedIDs={setSelectedIDs}
              /> : !set.length && searchInput ?
                <Typography className={classes.notFound} variant='body1'>Ничего не найдено</Typography> : ''}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default SetPage
