import React, {FC, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import {createStyles, FormControl, InputBase, InputLabel, MenuItem, Select, Theme, withStyles} from "@material-ui/core";
import {useTestingStyles} from "../../assets/useStyles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {handleAddMeaning, onAddMeaning, randomInteger} from "../../assets/helpers";
import Button from "@material-ui/core/Button";
import {RenderTextField} from "../../assets/formElems";
import {Field} from "redux-form";
import TestForm from "./TestForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import withAuthRedirect from "../HOCs/withAuthRedirect";
import {OptionsType} from "../../types/types";
import {getSet, GetSetThunkCreatorType, TGetSet} from "../../redux/actions/wordsActions";
import {ThunkDispatch} from "redux-thunk";

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

type TProps = {
  uid: number,
  options: OptionsType,
  token: string
}

const TestPage: FC<TProps> = ({uid, options}) => {
  const classes = useTestingStyles()
  const [wordsCount, setWordsCount] = useState(10)
  const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWordsCount(event.target.value as number)
  }

  const done = useSelector((state: AppStateType) => state.words.done)
  const max = done.length - 1
  const indexes = []
  for (let i = 0; i < wordsCount; i++) {
    indexes.push(randomInteger(0, max))
  }
  const testingSet = indexes.map(index => done[index])

  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const getDone: GetSetThunkCreatorType = getSet('done')
  const getDoneSet = () => thunkDispatchGetSet(getDone(uid, options))

  useEffect(() => {
    (async () => getDoneSet())()
  }, [])

  useEffect(() => {
    if (done.length) console.log(testingSet)
  }, [wordsCount, done])
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

export default withAuthRedirect(TestPage);