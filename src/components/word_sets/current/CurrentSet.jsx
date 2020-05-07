import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import CurrentForm from "./CurrentForm";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {addToCurrent} from "../../../redux/actions/wordActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List";
import WordItem from "./WordItem";

const useStyles = makeStyles(theme => ({
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingRight: 0
  },
  divider: {
    marginBottom: theme.spacing(2)
  }
}))

const mapState = ({ firestore }, {uid}) => {
  return {
    current: firestore.ordered[`${uid}-current`] || []
  };
}

const actions = {
  addToCurrent
}

const getPath = ({uid}) => {
  return [{ collection: "users", doc: uid, subcollections: [{ collection: "current" }], storeAs: `${uid}-current` }];
}

const CurrentSet = ({auth, current, addToCurrent}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  if (!auth) return <Redirect to='/login'/>

  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper>
          <div className={classes.head}>
            <Typography variant='h5'>Текущий набор</Typography>
            <IconButton color='secondary' size='medium' onClick={() => setOpen(true)}>
              <Icon style={{ fontSize: 40 }} color='secondary'>add_circle</Icon>
            </IconButton>
          </div>
          <Divider/>
          <CurrentForm open={open} onClose={() => setOpen(false)} addToCurrent={addToCurrent}/>
          <List>
              {current.map(wordDoc => (
                <ListItem key={wordDoc.id}>
                  <WordItem means={wordDoc.means} word={wordDoc.word}/>
                </ListItem>
              ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default compose(
  firestoreConnect(getPath),
  connect(mapState, actions)
)(CurrentSet);

