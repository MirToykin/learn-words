import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {RenderCheckbox, RenderTextField} from "../../assets/formElems";
import {useCommonFormStyles} from "../../assets/useStyles";
import {AuthActionType, register, TRegData} from "../../redux/actions/authActions";
import {AppStateType} from "../../redux/store/configureStore";
import {ThunkDispatch} from "redux-thunk";


const RegisterForm: FC<InjectedFormProps<TRegData>> = ({pristine, submitting, error, handleSubmit, reset}) => {
  const classes: any = useCommonFormStyles(); // возможно типизация данной переменной избыточна, пока не знаю
  const token = useSelector((state: AppStateType) => state.auth.token)
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()

  const handleRegister = (regData: TRegData): Promise<void> => thunkDispatch(register(regData))

  if (token) return <Redirect to='/current'/>

  return (
    <Grid container alignItems='center' justify='center'>
      <Grid item xs={12} sm={9} md={6} lg={3}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color={'primary'}
                      className={classes.head}
          >Зарегистрироваться</Typography>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  component={RenderTextField}
                  label='Имя'
                  autoFocus={true}
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
              <Grid item xs={12}>
                <Field
                  name="password_confirmation"
                  component={RenderTextField}
                  label='Повторите пароль'
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

export default reduxForm<TRegData>({form: 'register'/*, validate*/})(RegisterForm);

