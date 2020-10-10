import React, {useEffect} from 'react';
import {Field, formValueSelector, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {combineValidators, isRequired} from "revalidate";
import {RenderChangeMeaningsTextarea} from "../../../assets/formElems";
import {useCommonFormStyles} from "../../../assets/useStyles";
import MeaningsList from "../word_sets/MeaningsList";
import {connect, useDispatch} from "react-redux";
import {setAddedMeanings} from "../../../redux/actions/wordsActions";
import {onAddMeaning} from "../../../assets/helpers";

const validate = combineValidators({
  means: isRequired({message: 'Введите значения'})
})

const ChangeMeaningsForm = ({
                              pristine, submitting, error,
                              handleSubmit, editWord,
                              onClose, id, options, meanings,
                              meaningValue, addedMeanings
                            }) => {
  const classes = useCommonFormStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAddedMeanings(meanings));
  }, []);

  const onSubmit = (meaningsArray, id, options) => {
    meanings = meaningsArray.join('/');
    editWord(null, id, {meanings}, options);
    onClose();
    dispatch(setAddedMeanings([]));
  };



  return (
    <form /*onSubmit={handleSubmit(onSubmit)}*/ autoComplete='off'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="meanings"
            component={RenderChangeMeaningsTextarea}
            label='Значение'
            placeholder='Введите значение'
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12}>{error && <Typography align={'center'} variant='body1' color='error'>
          {error}
        </Typography>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type='button'
                  variant="contained"
                  color="primary"
                  onClick={() => onAddMeaning(meaningValue, dispatch, 'changeMeaningsForm')}
                  style={{width: '100%'}}
          >Добавить значение</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type='button'
                  disabled={meaningValue || submitting}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{width: '100%'}}
                  onClick={() => onSubmit(addedMeanings, id, options)}
          >Сохранить и закрыть</Button>
        </Grid>
        <Grid item xs={12}>
          <MeaningsList
            isHttp={false}
            meaningsArray={addedMeanings}
            options={options}
            id={id}
          />
        </Grid>
      </Grid>
    </form>
  )
}

const form = reduxForm({form: 'changeMeaningsForm', enableReinitialize: true, validate})(ChangeMeaningsForm);
const selector = formValueSelector('changeMeaningsForm');
export default connect(state => ({
  meaningValue: selector(state, 'meanings'),
  addedMeanings: state.words.addedMeanings
}))(form);

