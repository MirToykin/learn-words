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
import WordItemMenu from "./WordItemMenu";

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

const WordItem = ({wordDoc: {id, word, means}, title}) => {
  const classes = useStyles();
  const [expanded, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentSet = title === 'На очереди' ? 'to_learn' : title === 'Текущий набор' ? 'current' : 'learned'

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
          <Typography variant='h6'>{word}</Typography>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVertIcon/>
          </IconButton>
          <WordItemMenu anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        id={id} word={word}
                        means={means} currentSet={currentSet}
          />
        </ExpansionPanelSummary>
        <Divider/>
        <ExpansionPanelDetails>
          <List className={classes.root}>
            {means.map(mean => (
              <Fragment key={mean}>
                <ListItem>
                  <ListItemText primary={mean}/>
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
