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
  uid: state.auth.id,
  token: state.auth.token
})

const App = ({auth, uid, token}) => {
  const options = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  return (
    <>
      <NavBar options={options}/>
      <Container>
        <Switch>
          <Route path='/' exact render={() => <Redirect to={auth ? '/current' : '/login'}/>}/>
          <Route path='/login' render={() => <LoginForm auth={token}/>}/>
          <Route path='/register' render={() => <RegisterForm auth={token} options={options}/>}/>
          <Route path='/to-learn' render={() => <ToLearnSet token={token} uid={uid} options={options}/>}/>
          <Route path='/current' render={() => <CurrentSet token={token}  uid={uid} options={options}/>}/>
          <Route path='/learned' render={() => <LearnedSet token={token}  uid={uid} options={options}/>}/>
        </Switch>
      </Container>
    </>
  );
}

export default connect(mapState)(App);
