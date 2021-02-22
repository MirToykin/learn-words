import React, {FC, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MeaningsList from "./MeaningsList";
import {OptionsType, WordType} from "../../../types/types";
import {Checkbox} from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

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
  setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>
}

const WordItem: FC<TProps> = (
  {
    word: {id, title, meanings}, options,setSelectedIDs
  }) => {
  const classes = useStyles();
  const [expanded, setExpand] = useState(false);
  const [checked, setChecked] = useState(false);

  let meaningsArray = meanings.split('/');

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded}>
        <AccordionSummary classes={{
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
            color={'primary'}
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
          />
        </AccordionSummary>
        <Divider/>
        <AccordionDetails classes={{
          root: classes.details
        }}>
          <MeaningsList
            meaningsArray={meaningsArray}
            id={id}
            options={options}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default WordItem;
