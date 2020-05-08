import React from 'react';
import {Field, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {combineValidators, isRequired} from "revalidate";
import {Redirect} from "react-router-dom";
import {RenderTextField} from "../common/forms/formElems";
import {useCommonFormStyles} from "../../assets/useStyles";
import {registerUser} from "../../redux/actions/authActions";

const validate = combineValidators({
  displayName: isRequired({message: 'Введите имя'}),
  email: isRequired({message: 'Введите email'}),
  password: isRequired({message: 'Введите пароль'})

})

const actions = {
  registerUser
}

const RegisterForm = ({pristine, submitting, error, handleSubmit, registerUser, reset, auth}) => {
  const classes = useCommonFormStyles();

  if (auth) return <Redirect to='/current'/>

  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={12} sm={9} md={6} lg={3}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color={'primary'}
                      className={classes.head}
          >Зарегистрироваться</Typography>
          <form onSubmit={handleSubmit(registerUser)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="displayName"
                  component={RenderTextField}
                  label='Имя'
                />
              </Grid>
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

export default connect(null, actions)(reduxForm({form: 'register', validate})(RegisterForm));

