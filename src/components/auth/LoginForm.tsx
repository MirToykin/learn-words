import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {AuthActionType, login, TLoginData} from "../../redux/actions/authActions";
import {Redirect} from "react-router-dom";
import {RenderCheckbox, RenderTextField} from "../../assets/formElems";
import {useCommonFormStyles} from "../../assets/useStyles";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";



const LoginForm: FC<InjectedFormProps<TLoginData>> = ({pristine, submitting, error, handleSubmit, reset}) => {
  const classes: any = useCommonFormStyles(); // возможно типизация данной переменной избыточна, пока не знаю
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()
  const token = useSelector((state: AppStateType) => state.auth.token)

  const handleLogin = (loginData: TLoginData): Promise<void> => thunkDispatch(login(loginData))

  if (token) return <Redirect to='/current'/>

  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={12} sm={9} md={6} lg={4}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color={'primary'}
                      className={classes.head}
          >Войти</Typography>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="email"
                  component={RenderTextField}
                  label='Email'
                  autoFocus={true}
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
                  label='Запомнить меня'
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

export default reduxForm<TLoginData>({form: 'login'/*, validate*/})(LoginForm);


