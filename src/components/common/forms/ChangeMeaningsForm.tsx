import React, {FC, useEffect} from 'react';
import {Field, formValueSelector, InjectedFormProps, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {combineValidators, isRequired} from "revalidate";
import {RenderChangeMeaningsTextarea} from "../../../assets/formElems";
import {useCommonFormStyles} from "../../../assets/useStyles";
import MeaningsList from "../word_sets/MeaningsList";
import {useDispatch, useSelector} from "react-redux";
import {setAddedMeanings} from "../../../redux/actions/wordsActions";
import {onAddMeaning} from "../../../assets/helpers";
import {handleAddMeaning} from "../../../assets/helpers";
import {OptionsType} from "../../../types/types";
import {AppStateType} from "../../../redux/store/configureStore";

const validate = combineValidators({
  means: isRequired({message: 'Введите значения'})
})

const selector = formValueSelector('changeMeaningsForm');

interface IProps extends InjectedFormProps{
  meanings: Array<string>
  editWord: any
  onClose: () => void
  id: number
  options: OptionsType
}

const ChangeMeaningsForm: FC<IProps> = ({
                              submitting, error, editWord,
                              onClose, id, options, meanings
                            }) => {
  const addedMeanings = useSelector((state: AppStateType) => state.words.addedMeanings)
  let meaningValue = useSelector((state: AppStateType) => selector(state, 'meanings'))

  const classes = useCommonFormStyles();
  const dispatch = useDispatch();
  const correctMeaningValue: boolean = !!(meaningValue && meaningValue.replace(/\s/g, '').length) // проверка не содержит ли строка только пробелы и переносы строк

  useEffect(() => {
    dispatch(setAddedMeanings(meanings));
  }, []);

  const onSubmit = (meaningsArray: Array<string>, id: number, options: OptionsType) => {
    const meanings = meaningsArray.join('/').toLowerCase();
    editWord(null, id, {meanings}, options);
    onClose();
    dispatch(setAddedMeanings([]));
  }

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      meaningValue = meaningValue.trim();
      handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'changeMeaningsForm', correctMeaningValue);
    }
  }

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
            onKeyDown={onEnterPress}
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
                  onClick={() => handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'changeMeaningsForm', correctMeaningValue)}
                  style={{width: '100%'}}
          >Добавить значение</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type='button'
                  disabled={!!meaningValue || submitting}
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

export default reduxForm({form: 'changeMeaningsForm', enableReinitialize: true, validate})(ChangeMeaningsForm);

