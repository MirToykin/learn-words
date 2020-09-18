import React from 'react';
import NavBar from './components/nav/NavBar';
import Container from "@material-ui/core/Container";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import CurrentSet from "./components/word_sets/current/CurrentSet";
import RegisterForm from "./components/auth/RegisterForm";
import ToLearnSet from "./components/word_sets/toLearn/ToLearnSet";
import LearnedSet from "./components/word_sets/learned/LearnedSet";

const mapState = (state) => ({
  auth: state.auth.isAuth,
  uid: state.auth.id
})

const App = ({auth, uid}) => {
  const authenticated = auth;

  return (
    <>
      <NavBar/>
      <Container>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={authenticated ? '/current' : '/login'}/>}/>
          <Route path='/login' render={() => <LoginForm auth={authenticated}/>}/>
          <Route path='/register' render={() => <RegisterForm auth={authenticated}/>}/>
          <Route path='/to-learn' render={() => <ToLearnSet uid={uid} auth={authenticated}/>}/>
          <Route path='/current' render={() => <CurrentSet  uid={uid} auth={authenticated}/>}/>
          <Route path='/learned' render={() => <LearnedSet  uid={uid} auth={authenticated}/>}/>
        </Switch>
      </Container>
    </>
  );
}

export default connect(mapState)(App);
