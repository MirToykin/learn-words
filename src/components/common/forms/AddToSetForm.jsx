import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {combineValidators, isRequired} from "revalidate";
import {RenderTextarea, RenderTextField} from "./formElems";
import Dialog from "@material-ui/core/Dialog";
import {useCommonFormStyles} from "../../../assets/useStyles";

const validate = combineValidators({
  word: isRequired({message: 'Введите слово'}),
  means: isRequired({message: 'Введите значения'})
})

const AddToSetForm = ({
                        pristine, submitting, error,
                        handleSubmit, reset,
                        addToSet, open, onClose
                      }) => {
  const classes = useCommonFormStyles();

  const onSubmit = (wordDoc) => {
    addToSet(wordDoc);
    reset();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper className={classes.paper}>
        <Typography variant='h5'
                    align='center'
                    color='primary'
                    className={classes.head}
        >Добавить слово в набор</Typography>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="word"
                component={RenderTextField}
                label='Слово'
              />
            </Grid>
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
              >Добавить</Button>
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
      </Paper>
    </Dialog>
  )
}

export default reduxForm({form: 'AddToSetForm', validate})(AddToSetForm);

