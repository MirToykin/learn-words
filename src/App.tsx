import React, {FC, useEffect} from 'react';
import Container from "@material-ui/core/Container";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
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
import TestPage from "./components/testing/TestPage";
import {
  getSet,
  GetSetThunkCreatorType,
  setAddedMeanings,
  SetAddedMeaningsActionType,
  TGetSet
} from "./redux/actions/wordsActions";
import {ThunkDispatch} from "redux-thunk";
import {
  setCurrentWordIndex,
  setInvertSetForTest,
  setSetForTest,
  setTestActive, TSetCurrentWordIndexAction, TSetInvertSetForTestAction, TSetSetForTestAction,
  TSetTestActiveAction, TSetTestResultAction
} from "./redux/actions/testingActions";
import {Dispatch} from "redux";


const App:FC = () => {
  const auth = useSelector((state: AppStateType) => state.auth.isAuth)
  const uid = useSelector((state: AppStateType) => state.auth.id)
  const token = useSelector((state: AppStateType) => state.auth.token)
  const darkState = useSelector((state: AppStateType) => state.app.darkState)
  const testingEnabled = useSelector((state: AppStateType) => state.words.done.length >= 10)

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

  const history = useHistory()
  const dispatch: Dispatch<TSetTestActiveAction | TSetSetForTestAction | TSetInvertSetForTestAction | TSetCurrentWordIndexAction | SetAddedMeaningsActionType | TSetTestResultAction> = useDispatch();
  useEffect(() => {
    let unlisten = history.listen(location => {
      if (location.pathname !== '/testing') {
        dispatch(setTestActive(false))
        dispatch(setSetForTest([]))
        dispatch(setInvertSetForTest([]))
        dispatch(setTestActive(false))
        dispatch(setCurrentWordIndex(0))
        dispatch(setAddedMeanings([]))
      }
    })

    return () => {
      unlisten()
    }
  })

  const matches = useMediaQuery('(min-width:540px)');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar options={options}/>
      <Container disableGutters={!matches}>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={auth ? '/current' : '/login'}/>}/>
          <Route path='/login' render={() => <LoginForm/>}/>
          <Route path='/register' render={() => <RegisterForm/>}/>
          <Route path='/next' render={() => <NextSet token={token} uid={uid} options={options}/>}/>
          <Route path='/current' render={() => <CurrentSet token={token}  uid={uid} options={options}/>}/>
          <Route path='/done' render={() => <DoneSet token={token} uid={uid} options={options}/>}/>
          <Route path='/testing' render={() => <TestPage token={token} uid={uid} options={options}/>}/>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App
