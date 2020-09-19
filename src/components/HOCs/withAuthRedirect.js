import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapState = (state) => {
  return {
    auth: state.auth.isAuth
  }
}

const withAuthRedirect = (Component) => {
  const ComponentContainer = (props) => {
    const {token} = props;
    if (!token) return <Redirect to='/login'/>
    return <Component {...props} />
  }

  return connect(mapState)(ComponentContainer)
}

export default withAuthRedirect;