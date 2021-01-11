import React, {FC} from 'react';
import {Field, reduxForm, formValueSelector, stopSubmit, InjectedFormProps, FormAction} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {combineValidators, isRequired} from "revalidate";
import {RenderTextarea, RenderTextField} from "../../../assets/formElems";
import Dialog from "@material-ui/core/Dialog";
import {useCommonFormStyles} from "../../../assets/useStyles";
import {connect, useDispatch, useSelector} from "react-redux";
import {setAddedMeanings, SetAddedMeaningsActionType, TAddToSetData} from "../../../redux/actions/wordsActions";
import MeaningsList from "../word_sets/MeaningsList";
import {handleAddMeaning, onAddMeaning} from "../../../assets/helpers";
import {AppStateType} from "../../../redux/store/configureStore";
import {OptionsType} from "../../../types/types";
import {Dispatch} from "redux";

const validate = combineValidators({
  word: isRequired({message: 'Введите слово'}),
  // means: isRequired({message: 'Введите значения'})
})

const selector = formValueSelector('AddToSetForm');

type TOnSubmitWord = {
  title: string
}

type TProps = {
  open: boolean
  onClose: (additionalActions: Array<() => void>) => void
  addToSet: any
  uid: number
  options: OptionsType
}

const AddToSetForm: FC<TProps & InjectedFormProps<TOnSubmitWord,TProps>> = ({
                        pristine, submitting, error,
                        handleSubmit, reset,
                        addToSet, open, onClose,
                        uid, options
                      }) => {
  const classes = useCommonFormStyles();
  const dispatch: Dispatch<SetAddedMeaningsActionType | FormAction> = useDispatch();

  const titleValue: string = useSelector((state: AppStateType) => selector(state, 'title'))
  let meaningValue: string = useSelector((state: AppStateType) => selector(state, 'meanings'))
  const addedMeanings = useSelector((state: AppStateType) => state.words.addedMeanings)

  const correctMeaningValue: boolean = !!(meaningValue && meaningValue.replace(/\s/g, '').length) // проверка не содержит ли строка только пробелы и переносы строк

  const onSubmit = (word: TOnSubmitWord, meanings: Array<string>) => {
    const newWord: TAddToSetData = {title: '', meanings: '', user_id: 0}
    newWord['title'] = word['title'].toLowerCase().trim()
    newWord['user_id'] = uid
    newWord['meanings'] = meanings.join('/').toLowerCase()
    reset();
    dispatch(setAddedMeanings([]))
    return addToSet(newWord, options)
  }

  const onEnterPress = (e: React.KeyboardEvent): void => {
    if (e.keyCode === 13) {
      e.preventDefault()
      meaningValue= meaningValue.trim()
      handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'AddToSetForm', correctMeaningValue)
    }
  }

  return (
    <Dialog style={{width: '100%'}} open={open} onClose={() => onClose([
      () => dispatch(setAddedMeanings([])),
      () => dispatch(stopSubmit('AddToSetForm', {}))
    ])}>
      <Paper className={classes.paper}>
        <Typography variant='h5'
                    align='center'
                    color='primary'
                    className={classes.head}
        >Добавить слово в набор</Typography>
        <form onSubmit={handleSubmit((word) => onSubmit(word, addedMeanings))} autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="title"
                component={RenderTextField}
                label='Слово'
                placeholder='слово'
                autoFocus={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="meanings"
                component={RenderTextarea}
                label='Значение'
                placeholder='значение'
                onKeyDown={onEnterPress}
              />
            </Grid>
            <Grid item xs={12}>{error && <Typography align={'center'} variant='body1' color='error'>
              {error}
            </Typography>}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type='button'
                      variant="contained"
                      color="primary"
                      style={{width: '100%'}}
                      onClick={() => handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'AddToSetForm', correctMeaningValue)}
                      disabled={pristine || submitting || !correctMeaningValue}
              >Добавить значение</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type='submit'
                      disabled={pristine || submitting || !addedMeanings.length || !titleValue}
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      style={{width: '100%'}}
              >Сохранить</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button type='button'
                      variant="contained"
                      color="primary"
                      onClick={() => onClose([
                        () => dispatch(setAddedMeanings([])),
                        () => dispatch(stopSubmit('AddToSetForm', {}))
                      ])}
                      style={{width: '100%'}}
              >Закрыть</Button>
            </Grid>
            <Grid item xs={12}>
              <MeaningsList
                options={options}
                meaningsArray={addedMeanings}
                id={uid}
                isHttp={false}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Dialog>
  )
}

export default reduxForm<TOnSubmitWord, TProps>({form: 'AddToSetForm', validate})(AddToSetForm)


