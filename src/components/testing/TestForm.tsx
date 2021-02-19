import React, {FC, Fragment} from 'react';
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
import {SetAddedMeaningsActionType} from "../../redux/actions/wordsActions";
import {WordType} from "../../types/types";
import {makeStyles} from "@material-ui/core/styles";

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
}

const useTestFormStyles = makeStyles(theme => ({
  success: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.error.main
  }
}))

const TestForm: FC<TProps & InjectedFormProps<TOnCheckMeanings, TProps>> = ({
                                                                              pristine, submitting, error,
                                                                              handleSubmit, reset, word
                                                                            }) => {
  const classes = useTestFormStyles()

  const addedMeanings = useSelector((state: AppStateType) => state.testing.addedMeanings)
  let meaningValue: string = useSelector((state: AppStateType) => selector(state, 'meanings'))
  const dispatch: Dispatch<SetAddedMeaningsActionType | FormAction> = useDispatch()
  const correctMeaningValue: boolean = !!(meaningValue && meaningValue.replace(/\s/g, '').length) // проверка не содержит ли строка только пробелы и переносы строк

  const onEnterPress = (e: React.KeyboardEvent): void => {
    if (e.keyCode === 13) {
      e.preventDefault()
      meaningValue = meaningValue.trim()
      handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'TestForm', correctMeaningValue)
    }
  }

  const meaningsArray = word.meanings.split('/')

  const handleCheckResult = (input: Array<string>, answer: Array<string>) => {
    const result: Array<boolean> = []

    input.forEach((word, i) => {
      result[i] = !!(~answer.indexOf(word))
    })

    console.log(result)
  }

  return (
    <div>
      <form autoComplete='off'>
        <Grid container spacing={2} justify={'flex-end'}>
          <Grid item xs={12}>
            <Field
              name="meanings"
              component={RenderTextField}
              label='Значение'
              disabled={addedMeanings.length === meaningsArray.length}
              // placeholder={`введите значения для "${word.title}" по одному`}
              placeholder={`введите значения по одному`}
              onKeyDown={onEnterPress}
            />
          </Grid>
          <Grid item xs={12}>{error && <Typography align={'center'} variant='body1' color='error'>
            {error}
          </Typography>}
          </Grid>
          <Grid item xs={12}>
            <List>
              <Fragment>
                {addedMeanings.map((meaning) => {
                  let className
                  if(~meaningsArray.indexOf(meaning)) className = classes.success
                  else className = classes.error
                  return (
                    <Fragment key={meaning}>
                      <ListItem>
                        <ListItemText primary={meaning} className={className}/>
                        {/*{true && <IconButton>*/}
                        {/*    <DeleteForeverIcon/>*/}
                        {/*</IconButton>}*/}
                      </ListItem>
                      <Divider/>
                    </Fragment>
                  )
                })}
              </Fragment>
            </List>
          </Grid>
          {/*<Grid item xs={12} sm={4}>*/}
          {/*  <Button type='button'*/}
          {/*          variant="contained"*/}
          {/*          color="primary"*/}
          {/*          style={{width: '100%'}}*/}
          {/*          // onClick={() => handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'AddToSetForm', correctMeaningValue)}*/}
          {/*          // disabled={pristine || submitting || !correctMeaningValue}*/}
          {/*  >Назад</Button>*/}
          {/*</Grid>*/}
          <Grid item xs={12} sm={4}>
            <Button type='button'
              // disabled={pristine || submitting || !addedMeanings.length || !titleValue}
                    variant="contained"
                    color="primary"
              // className={classes.submit}
                    style={{width: '100%'}}
                    onClick={() => handleCheckResult(addedMeanings, meaningsArray)}
            >Проверить</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default reduxForm<TOnCheckMeanings, TProps>({form: 'TestForm', validate})(TestForm)