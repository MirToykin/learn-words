import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper/Paper"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import Icon from "@material-ui/core/Icon"
import AddToSetForm from "../forms/AddToSetForm"
import List from "@material-ui/core/List"
import {useSetStyles} from "../../../assets/useStyles"
import TextField from "@material-ui/core/TextField"
import Set from "./Set"
import {useDispatch, useSelector} from "react-redux"
import {
  GetSetThunkCreatorType,
  setSearchInput,
  SetSearchInputActionType, setSetSize, TGetSet, TSetSetSizeAction
} from "../../../redux/actions/wordsActions"
import LinearProgress from "@material-ui/core/LinearProgress"
import {OptionsType, WordType} from "../../../types/types";
import {AppStateType} from "../../../redux/store/configureStore";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
  const [open, setOpen] = useState(false)
  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])
  const [deltaHeight, setDeltaHeight] = useState(window.pageYOffset ? 90 : 180) // если pageYOffset 0, тогда из высоты контейнера вычитаем 180 px
  const searchInput: string = useSelector((state: AppStateType) => state.words.searchInput)
  const setSize = useSelector((state: AppStateType) => state.words.setSize)
  const dispatch: Dispatch<SetSearchInputActionType | TSetSetSizeAction> = useDispatch()
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)

  const getSetLast = () => thunkDispatch(getSet(uid, options))

  useEffect(() => {
    (async () => getSetLast())()
  }, [])

  // useEffect(() => {
  //   let wordsList: HTMLElement | null = document.querySelector('#words_list')
  //   let listener = (e: any) => {
  //     const list: any = e.currentTarget
  //     list && list.addEventListener('scroll', (e: any) => {
  //       if (list.scrollHeight - (list.scrollTop + list.offsetHeight) < 100) {
  //         dispatch(setSetSize(setSize + 10))
  //         console.log('SetPage mounted, size: ' + setSize)
  //       }
  //     })
  //   }
  //
  //   if (wordsList != null) {
  //     wordsList.addEventListener('scroll', listener)
  //   }
  //
  //   return () => {
  //     wordsList && wordsList.removeEventListener('scroll', listener)
  //   }
  // })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchInput(e.target.value))
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

  return (
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
        <Paper style={{marginBottom: '5px'}}>
          <div className={classes.multipleActions}>
            <IconButton>
              <ArrowBackIcon/>
            </IconButton>
            <IconButton>
              <DeleteForeverIcon/>
            </IconButton>
            <IconButton disabled>
              <EditIcon/>
            </IconButton>
            <IconButton>
              <ArrowForwardIcon/>
            </IconButton>
          </div>
        </Paper>
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
  )
}

export default SetPage
