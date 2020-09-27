import React, {Fragment, useState} from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import WordItemMenu from "./WordItemMenu";
import MeaningsList from "./MeaningsList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  summary: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
  },
  details: {
    paddingBottom: 0
  }
}));

const WordItem = ({word: {id, title, meanings}, pageTitle, options}) => {
  const classes = useStyles();
  const [expanded, setExpand] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  let meaningsArray = meanings.split('/');
  const currentSet = pageTitle === 'На очереди' ? 'next' : pageTitle === 'Текущий набор' ? 'current' : 'done';

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
          <Typography variant='h6' color={'primary'}>{title}</Typography>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreVertIcon/>
          </IconButton>
          <WordItemMenu anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                        id={id} title={title}
                        meanings={meaningsArray}
                        currentSet={currentSet}
                        options={options}
          />
        </ExpansionPanelSummary>
        <Divider/>
        <ExpansionPanelDetails classes={{
          root: classes.details
        }}>
          <MeaningsList
            meaningsArray={meaningsArray}
            id={id}
            options={options}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default WordItem;
