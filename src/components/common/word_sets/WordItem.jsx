import React, {Fragment, useState} from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ClearIcon from '@material-ui/icons/Clear';
import WordItemMenu from "./WordItemMenu";
import {useDispatch} from "react-redux";
import {editWord} from "../../../redux/actions/wordsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  summary: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
  }
}));

const WordItem = ({word: {id, title, meanings}, pageTitle, options}) => {
  const classes = useStyles();
  const [expanded, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  let meaningsArray = meanings.split('/');
  const currentSet = pageTitle === 'На очереди' ? 'next' : pageTitle === 'Текущий набор' ? 'current' : 'done';


  const deleteMeaning = (meaning) => {
    const meanings = meaningsArray.filter(item => item !== meaning).join('/');
    dispatch(editWord(null, id, {meanings}, options));
  }


  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded}>
        <ExpansionPanelSummary classes={{
          content: classes.summary,
        }}>
          {expanded ?
            <IconButton onClick={() => setExpand(false)}>
              <ExpandLessIcon/>
            </IconButton> :
            <IconButton onClick={() => setExpand(true)}>
              <ExpandMoreIcon/>
            </IconButton>}
          <Typography variant='h6'>{title}</Typography>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVertIcon/>
          </IconButton>
          <WordItemMenu anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        id={id} title={title}
                        meanings={meanings} currentSet={currentSet}
                        options={options}
          />
        </ExpansionPanelSummary>
        <Divider/>
        <ExpansionPanelDetails>
          <List className={classes.root}>
            {meaningsArray.map(meaning => (
              <Fragment key={meaning}>
                <ListItem>
                  <ListItemText primary={meaning}/>
                  {meaningsArray.length > 1 && <IconButton onClick={() => deleteMeaning(meaning)}>
                    <ClearIcon/>
                  </IconButton>}
                </ListItem>
                <Divider/>
              </Fragment>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default WordItem;
