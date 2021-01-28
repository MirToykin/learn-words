import React, {FC, useState} from 'react';
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
import MeaningsList from "./MeaningsList";
import {OptionsType, SetNameType, WordType} from "../../../types/types";
import {Checkbox} from "@material-ui/core";

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

type TProps = {
  word: WordType
  pageTitle: string
  options: OptionsType
  setAnchorEl: (el: Element | ((element: Element) => Element) | null | undefined) => void
  setWordId: (id: number) => void
  setWordTitle: (title: string) => void
  setCurrentSet: (setName: SetNameType) => void
  setMeaningsArray: (arr: Array<string>) => void
  setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>
}

const WordItem: FC<TProps> = (
  {
    word: {id, title, meanings},
    pageTitle, options, setAnchorEl,
    setCurrentSet, setMeaningsArray, setWordId, setWordTitle,
    setSelectedIDs
  }) => {
  const classes = useStyles();
  const [expanded, setExpand] = useState(false);
  const [checked, setChecked] = useState(false);

  let meaningsArray = meanings.split('/');
  const currentSet = pageTitle === 'На очереди' ? 'next' : pageTitle === 'Текущий набор' ? 'current' : 'done';

  const showMenu = (target: Element | ((element: Element) => Element) | null | undefined) => {
    setAnchorEl(target)
    setCurrentSet(currentSet)
    setMeaningsArray(meaningsArray)
    setWordId(id)
    setWordTitle(title)
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
          <Typography variant='h6' color={'primary'}>{title}</Typography>
          <Checkbox
            checked={checked}
            onChange={() => {
              setChecked((checked) => !checked)
              if(!checked) {
                setSelectedIDs((prev) => {
                  return [...prev, id]
                })
              } else {
                setSelectedIDs((prev) => {
                  return prev.filter(item => item !== id)
                })
              }
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          {/*<IconButton onClick={(event) => showMenu(event.currentTarget)}>*/}
          {/*  <MoreVertIcon/>*/}
          {/*</IconButton>*/}
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
