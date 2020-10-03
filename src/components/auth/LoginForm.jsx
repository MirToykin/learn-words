import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {login} from "../../redux/actions/authActions";
import {Redirect} from "react-router-dom";
import {RenderCheckbox, RenderTextField} from "../../assets/formElems";
import {useCommonFormStyles} from "../../assets/useStyles";

const actions = {
  login
}

const LoginForm = ({pristine, submitting, error, handleSubmit, login, reset, auth}) => {
  const classes = useCommonFormStyles();

  if (auth) return <Redirect to='/current'/>

  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={12} sm={9} md={6} lg={4}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color={'primary'}
                      className={classes.head}
          >Войти</Typography>
          <form onSubmit={handleSubmit(login)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  component={RenderTextField}
                  label='Email'
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  component={RenderTextField}
                  label='Пароль'
                  type='password'
                />
              </Grid>
              <Grid style={{padding: 0}} item xs={12}>
                {error && <Typography align={'center'} variant='body1' color='error'>
                  {error}
                </Typography>}
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="rememberMe"
                  component={RenderCheckbox}
                  label='Запомнить меня на этом устройстве'
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit'
                        disabled={pristine || submitting}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                >Отправить</Button>
                <Button type='button'
                        disabled={pristine || submitting}
                        variant="contained"
                        color="primary"
                        onClick={reset}
                >Очистить</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default connect(null, actions)(reduxForm({form: 'login'/*, validate*/})(LoginForm));

