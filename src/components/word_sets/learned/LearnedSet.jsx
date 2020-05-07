import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Redirect} from "react-router-dom";

const LearnedSet = ({auth}) => {
  if (!auth) return <Redirect to='/login'/>

  return (
    <Paper>
      <Typography variant='h5'>Изученные</Typography>
    </Paper>
  );
};

export default LearnedSet;
