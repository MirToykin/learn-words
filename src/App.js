import React from 'react';
import NavBar from './components/nav/NavBar';
import Container from "@material-ui/core/Container";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import CurrentSet from "./components/current/CurrentSet";
import RegisterForm from "./components/auth/RegisterForm";

const mapState = (state) => ({
  auth: state.firebase.auth
})

const App = ({auth}) => {
  const authenticated = auth.isLoaded && !auth.isEmpty;

  return (
    <>
      <NavBar/>
      <Container>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={authenticated ? '/current' : '/login'}/>}/>
          <Route path='/login' render={() => <LoginForm auth={authenticated}/>}/>
          <Route path='/register' render={() => <RegisterForm auth={authenticated}/>}/>
          <Route path='/current' render={() => <CurrentSet auth={authenticated}/>}/>
        </Switch>
      </Container>
    </>
  );
}

export default connect(mapState)(App);
