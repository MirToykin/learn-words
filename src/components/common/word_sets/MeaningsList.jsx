import React, {Fragment} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/core/SvgIcon/SvgIcon";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import {deleteFromAddedMeanings, editWord} from "../../../redux/actions/wordsActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  icon: {
    color: '#000'
  }
}));

const MeaningsList = ({meaningsArray, id, options, isHttp=true}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteMeaning = (meaning) => {
    if(isHttp) {
      let meanings = meaningsArray.filter(item => item !== meaning).join('/');
      dispatch(editWord(null, id, {meanings}, options));
    } else {
      dispatch(deleteFromAddedMeanings(meaning))
    }
  }

  return (
    <List className={classes.root}>
      {meaningsArray.map((meaning, i, array) => (
        <Fragment key={meaning}>
          <ListItem>
            <ListItemText primary={meaning}/>
            {meaningsArray.length > 1 && <IconButton onClick={() => deleteMeaning(meaning)}>
              <DeleteForeverIcon/>
            </IconButton>}
          </ListItem>
          {i !== array.length -1 && <Divider/>}
        </Fragment>
      ))}
    </List>
  );
};

export default MeaningsList;