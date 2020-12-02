import React, {FC} from 'react';
import Container from "@material-ui/core/Container";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import CurrentSet from "./components/word_sets/current/CurrentSet";
import RegisterForm from "./components/auth/RegisterForm";
import NextSet from "./components/word_sets/next/NextSet";
import DoneSet from "./components/word_sets/done/DoneSet";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import lightBlue from "@material-ui/core/colors/lightBlue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useMediaQuery} from "@material-ui/core";
import {AppStateType} from "./redux/store/configureStore";
import {OptionsType} from "./types/types";
import NavBar from "./components/nav/NavBar";

type MapStateType = {
  auth: boolean
  uid: number | null
  token: string | null
  darkState: boolean
}

const mapState = (state: AppStateType) : MapStateType => ({
  auth: state.auth.isAuth,
  uid: state.auth.id,
  token: state.auth.token,
  darkState: state.app.darkState
})

const App:FC<MapStateType> = ({auth, uid, token, darkState}) => {
  const options:OptionsType = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  const palletType = darkState ? 'dark' : 'light';
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  const matches = useMediaQuery('(min-width:540px)');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar options={options}/>
      <Container disableGutters={!matches}>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={auth ? '/current' : '/login'}/>}/>
          <Route path='/login' render={() => <LoginForm auth={token}/>}/>
          <Route path='/register' render={() => <RegisterForm auth={token} options={options}/>}/>
          <Route path='/next' render={() => <NextSet token={token} uid={uid} options={options}/>}/>
          <Route path='/current' render={() => <CurrentSet token={token}  uid={uid} options={options}/>}/>
          <Route path='/done' render={() => <DoneSet token={token}  uid={uid} options={options}/>}/>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default connect<MapStateType, {}, {}, AppStateType>(mapState)(App);
