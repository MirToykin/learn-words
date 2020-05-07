import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {combineValidators, isRequired} from "revalidate";
import {RenderTextarea, RenderTextField} from "../../common/forms/formElems";
import Dialog from "@material-ui/core/Dialog";
import {useCommonStyles} from "../../common/forms/formStyles";

const validate = combineValidators({
  word: isRequired({message: 'Введите слово'}),
  means: isRequired({message: 'Введите значения'})
})

const CurrentForm = ({pristine, submitting, error,
                       handleSubmit, reset,
                       addToCurrent, open, onClose}) => {
  const classes = useCommonStyles();

  const onSubmit = (wordDoc) => {
    addToCurrent(wordDoc);
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
              <Grid item xs={12}>
                <Button type='submit'
                        disabled={pristine || submitting}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                >Добавить</Button>
                <Button type='button'
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                >Закрыть</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </Dialog>
  )
}

export default reduxForm({form: 'currentForm', validate})(CurrentForm);

