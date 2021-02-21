import React, {FC, Fragment, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import {Field, FormAction, formValueSelector, InjectedFormProps, reduxForm, stopSubmit} from "redux-form";
import {RenderTextarea, RenderTextField} from "../../assets/formElems";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {combineValidators, isRequired} from "revalidate";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {handleAddMeaning, onAddMeaning} from "../../assets/helpers";
import {Dispatch} from "redux";
import {setAddedMeanings, SetAddedMeaningsActionType} from "../../redux/actions/wordsActions";
import {WordType} from "../../types/types";
import {makeStyles} from "@material-ui/core/styles";
import {
  pushToTestResult,
  setCurrentWordIndex,
  TPushToTestResultAction,
  TSetCurrentWordIndexAction
} from "../../redux/actions/testingActions";
import {useTestingStyles} from "../../assets/useStyles";
import {TTestResultItem, TWordResult} from "../../redux/reducers/testingReducer";

const validate = combineValidators({
  meaning: isRequired({message: 'Введите значение'}),
  // means: isRequired({message: 'Введите значения'})
})

const selector = formValueSelector('TestForm');

type TOnCheckMeanings = {
  title: string
}

type TProps = {
  word: WordType
  currentWordIndex: number
  wordsCount: number
  showResult: 1 | 0
  setResultVisible: (visible: boolean) => void
}

const TestForm: FC<TProps & InjectedFormProps<TOnCheckMeanings, TProps>> = ({
                                                                              pristine, submitting, error,
                                                                              handleSubmit, reset, word, currentWordIndex,
                                                                              wordsCount, showResult, setResultVisible
                                                                            }) => {
  const classes = useTestingStyles()
  const addedMeanings = useSelector((state: AppStateType) => state.testing.addedMeanings)
  let meaningValue: string = useSelector((state: AppStateType) => selector(state, 'meanings'))
  const helpersDispatch: Dispatch<SetAddedMeaningsActionType | FormAction> = useDispatch()
  const dispatch: Dispatch<TSetCurrentWordIndexAction | TPushToTestResultAction> = useDispatch()
  const correctMeaningValue: boolean = !!(meaningValue && meaningValue.replace(/\s/g, '').length) // проверка не содержит ли строка только пробелы и переносы строк
  const meaningsArray = word.meanings.split('/')
  const wordResult: Array<TWordResult> = []
  const meaningNum = meaningsArray.length === addedMeanings.length ? addedMeanings.length : addedMeanings.length + 1
  const inputPlaceholder = meaningsArray.length === 1 ? 'Значение' : `Значение ${meaningNum} из ${meaningsArray.length}`

  useEffect(() => {
    if (addedMeanings.length === meaningsArray.length) dispatch(pushToTestResult({word, wordResult}))
  }, [addedMeanings, word])

  const onEnterPress = async (e: React.KeyboardEvent): Promise<void> => {
    if (e.keyCode === 13) {
      e.preventDefault()
      if (!meaningValue) return
      meaningValue = meaningValue.trim()
      handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, helpersDispatch, 'TestForm', correctMeaningValue)
      if (addedMeanings.length + 1 === meaningsArray.length && wordsCount === currentWordIndex + 1) {
        // dispatch(pushToTestResult({word, wordResult}))
        setResultVisible(true)
      }
    }
  }

  const handleCheckResult = (input: Array<string>, answer: Array<string>) => {
    const result: Array<boolean> = []

    input.forEach((word, i) => {
      result[i] = !!(~answer.indexOf(word))
    })

    console.log(result)
  }

  const handleNext = (): void => {
    dispatch(setCurrentWordIndex(currentWordIndex + 1))
    helpersDispatch(setAddedMeanings([]))
    dispatch(pushToTestResult({word, wordResult}))
  }

  const addedMeaningsList = addedMeanings.map((meaning) => {
    let className
    let isCorrect: boolean
    if (~meaningsArray.indexOf(meaning)) {
      className = classes.success
      isCorrect = true
    } else {
      className = classes.error
      isCorrect = false
    }
    wordResult.push({meaning, isCorrect})

    return (
      <Fragment key={meaning}>
        <ListItem>
          <ListItemText primary={meaning} className={className}/>
        </ListItem>
        <Divider/>
      </Fragment>
    )
  })

  return (
    <div>
      <form autoComplete='off'>
        <Grid container spacing={2} justify={'flex-end'}>
          <Grid item xs={12}>
            <Field
              name="meanings"
              component={RenderTextField}
              label={`Значение`}
              disabled={addedMeanings.length === meaningsArray.length}
              // placeholder={`введите значения для "${word.title}" по одному`}
              placeholder={inputPlaceholder}
              onKeyDown={onEnterPress}
            />
          </Grid>
          <Grid item xs={12}>{error && <Typography align={'center'} variant='body1' color='error'>
            {error}
          </Typography>}
          </Grid>
          {!!showResult && <Grid item xs={12}>
            <List>
              {addedMeaningsList}
            </List>
          </Grid>}
          <Grid item xs={12} sm={4}>
            <Button type='button'
              // disabled={pristine || submitting || !addedMeanings.length || !titleValue}
              disabled={wordsCount === currentWordIndex + 1 || addedMeanings.length !== meaningsArray.length}
              variant="contained"
              color="primary"
              // className={classes.submit}
              style={{width: '100%'}}
              onClick={() => handleNext()}
            >Дальше</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default reduxForm<TOnCheckMeanings, TProps>({form: 'TestForm', validate})(TestForm)