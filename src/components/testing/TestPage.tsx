import React, {FC, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import {
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel, FormHelperText,
  InputBase,
  MenuItem,
  Select,
  Theme,
  withStyles
} from "@material-ui/core";
import {useTestingStyles} from "../../assets/useStyles";
import { fade } from '@material-ui/core/styles/colorManipulator';
import {randomInteger} from "../../assets/helpers";
import Button from "@material-ui/core/Button";
import TestForm from "./TestForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import withAuthRedirect from "../HOCs/withAuthRedirect";
import {OptionsType, WordType} from "../../types/types";
import {getSet, GetSetThunkCreatorType, TGetSet} from "../../redux/actions/wordsActions";
import {ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import {
  getSetForTest,
  setTestActive,
  TGetSetForTestAction,
  TSetTestActiveAction
} from "../../redux/actions/testingActions";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import IconButton from "@material-ui/core/IconButton";

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
  const [showResult, setShowResult] = useState<1 | 0>(0)
  const [resultVisible, setResultVisible] = useState(false)
  const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWordsCount(event.target.value as number)
  }

  const handleShowResultChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShowResult(event.target.value as 1 | 0)
  }

  const testSetFromState = useSelector((state: AppStateType) => state.testing.testSet)
  const currentWordIndex = useSelector((state: AppStateType) => state.testing.currentWordIndex)
  const isTestActive = useSelector((state: AppStateType) => state.testing.testActive)
  let testingSet: Array<WordType> = []
  const done = useSelector((state: AppStateType) => state.words.done)
  const max = done.length - 1
  const indexes = []

  if (max !== -1) { // max = -1 до тех пор пока с сервера не будет получен набор done
    while(indexes.length < wordsCount) {
      const ind = randomInteger(0, max)
      if (!~indexes.indexOf(ind)) indexes.push(ind)
    }
    testingSet = indexes.map(index => done[index])
  }

  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const dispatch: Dispatch<TSetTestActiveAction | TGetSetForTestAction> = useDispatch();
  const getDone: GetSetThunkCreatorType = getSet('done')
  const getDoneSet = () => thunkDispatchGetSet(getDone(uid, options))

  const handleStartTest = (): void => {
    dispatch(setTestActive(true))
  }

  useEffect(() => {
    (async () => {
      if (!testSetFromState.length) getDoneSet()
    })()
  }, [])

  useEffect(() => {
    if (done.length) dispatch(getSetForTest(testingSet))
  }, [wordsCount, done])

  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper className={classes.block}>
            <Typography variant='h6' color={'textSecondary'} className={classes.tac}>Тестирование</Typography>
        </Paper>
        <Paper className={`${classes.block} ${classes.settings}`}>
          <div className={classes.controlsWrapper}>
            <FormControl className={classes.select}>
              <Select
                value={wordsCount}
                onChange={handleCountChange}
                input={<BootstrapInput />}
                disabled={isTestActive}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
              <FormHelperText>Количество слов</FormHelperText>
            </FormControl>
            <FormControl className={classes.select}>
              <Select
                value={showResult}
                onChange={handleShowResultChange}
                input={<BootstrapInput />}
                // disabled={isTestActive}
              >
                <MenuItem value={1}>Да</MenuItem>
                <MenuItem value={0}>Нет</MenuItem>
              </Select>
              <FormHelperText>Промежуточный результат</FormHelperText>
            </FormControl>
            {!isTestActive && <Button type='button'
                     variant="contained"
                     color="primary"
                     onClick={() => handleStartTest()}
                     className={classes.startButton}
            >Старт</Button>}
            {isTestActive && <Button type='button'
                                      variant="contained"
                                      color="primary"
                                      // onClick={() => handleStartTest()}
                                      className={classes.startButton}
            >Стоп</Button>}
          </div>
        </Paper>
        {isTestActive && <Paper className={classes.block}>
          <div className={classes.formHead}>
            <Typography variant='h6' color={'primary'}>{testSetFromState[currentWordIndex].title}</Typography>
            <Typography variant='h6'>{currentWordIndex + 1}/{wordsCount}</Typography>
          </div>
          <TestForm
              word={testSetFromState && testSetFromState[currentWordIndex]}
              currentWordIndex={currentWordIndex}
              wordsCount={wordsCount}
              showResult={showResult}
              setResultVisible={setResultVisible}
          />
        </Paper>}
        {resultVisible && <Paper className={classes.block}>
          <Typography variant='body1' color={'textSecondary'} className={classes.tac}>Результаты</Typography>
        </Paper>}
      </Grid>
    </Grid>
  );
};

export default withAuthRedirect(TestPage);