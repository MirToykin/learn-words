import React, {FC, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import {createStyles, FormControl, InputBase, InputLabel, MenuItem, Select, Theme, withStyles} from "@material-ui/core";
import {useTestingStyles} from "../../assets/useStyles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {handleAddMeaning, onAddMeaning} from "../../assets/helpers";
import Button from "@material-ui/core/Button";
import {RenderTextField} from "../../assets/formElems";
import {Field} from "redux-form";
import TestForm from "./TestForm";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.primary.main}`,
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        boxShadow: `0 0 0 0.2rem ${fade(theme.palette.primary.main, 0.25)}`,
      },
    },
  }),
)(InputBase);

const TestPage: FC = () => {
  const classes = useTestingStyles()
  const [wordsCount, setWordsCount] = useState(10)
  const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWordsCount(event.target.value as number)
  }
  const word = 'Test'
  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper className={classes.block}>
            <Typography variant='h6' color={'textSecondary'} className={classes.tac}>Тестирование</Typography>
        </Paper>
        <Paper className={`${classes.block} ${classes.settings}`}>
          <Typography variant='body1' color={'textSecondary'} className={classes.bold}>Количество слов для теста</Typography>
          <FormControl className={classes.margin}>
            <Select
              id="demo-customized-select"
              value={wordsCount}
              onChange={handleCountChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
          <Button type='button'
                  variant="contained"
                  color="primary"
                  // onClick={() => handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'changeMeaningsForm', correctMeaningValue)}
          >Начать</Button>
        </Paper>
        <Paper className={classes.block}>
          <Typography variant='h6' color={'primary'}>Test</Typography>
          <TestForm word={word}/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TestPage;