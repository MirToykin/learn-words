import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {combineValidators, isRequired} from "revalidate";
import {RenderTextarea} from "./formElems";
import {useCommonFormStyles} from "../../../assets/useStyles";

const validate = combineValidators({
  means: isRequired({message: 'Введите значения'})
})

const ChangeMeansForm = ({
                           pristine, submitting, error,
                           handleSubmit, addToSet,
                           onClose, word, id
                         }) => {
  const classes = useCommonFormStyles();

  const onSubmit = (wordDoc) => {
    const newDoc = {...wordDoc, id, word};
    addToSet(newDoc);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="means"
            component={RenderTextarea}
            label='Значения'
            placeholder='Значения через запятую'
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

export default reduxForm({form: 'changeMeansForm', enableReinitialize: true, validate})(ChangeMeansForm);

