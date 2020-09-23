import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {combineValidators, isRequired} from "revalidate";
import {RenderChangeMeaningsTextarea} from "./formElems";
import {useCommonFormStyles} from "../../../assets/useStyles";

const validate = combineValidators({
  means: isRequired({message: 'Введите значения'})
})

const ChangeMeaningsForm = ({
                           pristine, submitting, error,
                           handleSubmit, editWord,
                           onClose, id, options
                         }) => {
  const classes = useCommonFormStyles();

  const onSubmit = (meanings) => {
    editWord(null, id, meanings, options);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="meanings"
            component={RenderChangeMeaningsTextarea}
            label='Значения'
            placeholder='значения через слэш (/)'
          />
        </Grid>
        <Grid item xs={12}>{error && <Typography variant='body1' color='error'>
          {error}
        </Typography>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type='submit'
                  disabled={pristine || submitting}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{width: '100%'}}
          >Сохранить</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button type='button'
                  variant="contained"
                  color="primary"
                  onClick={onClose}
                  style={{width: '100%'}}
          >Закрыть</Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default reduxForm({form: 'changeMeaningsForm', enableReinitialize: true, validate})(ChangeMeaningsForm);

