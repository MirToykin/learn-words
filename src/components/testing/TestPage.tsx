import React, {FC, useEffect, useState} from 'react';
import {Prompt} from 'react-router'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import {
  createStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControl,
  FormHelperText,
  InputBase,
  MenuItem,
  Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Theme, useTheme,
  withStyles
} from "@material-ui/core";
import {useSetStyles, useTestingStyles} from "../../assets/useStyles";
import {fade} from '@material-ui/core/styles/colorManipulator';
import {randomInteger} from "../../assets/helpers";
import Button from "@material-ui/core/Button";
import TestForm from "./TestForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import DateFnsUtils from '@date-io/date-fns';
import {OptionsType, WordType} from "../../types/types";
import {
  getSet,
  GetSetThunkCreatorType,
  setAddedMeanings,
  SetAddedMeaningsActionType,
  TGetSet
} from "../../redux/actions/wordsActions";
import {ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import {
  setCurrentWordIndex,
  setInvertSetForTest,
  setSetForTest,
  setTestActive, setTestResult, TInvertTestItem, TSetCurrentWordIndexAction, TSetInvertSetForTestAction,
  TSetSetForTestAction,
  TSetTestActiveAction, TSetTestResultAction
} from "../../redux/actions/testingActions";
import Divider from "@material-ui/core/Divider";
import {
  DatePicker, KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import withAuthRedirect from "../HOCs/withAuthRedirect";
import ruLocale from "date-fns/locale/ru";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {MuiPickersOverrides} from '@material-ui/pickers/typings/overrides';
import LinearProgress from "@material-ui/core/LinearProgress";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {
  }
}

//MuiButton-textPrimary

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    color: theme.palette.primary.main,
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0
  },
}))(MuiAccordionDetails);

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
  const darkTheme = useSelector((state: AppStateType) => state.app.darkState)
  const theme: Theme = useTheme()

  // const primary = theme.palette.primary.main

  let PRIMARY_COLOR: string = theme.palette.primary.main
  let SECONDARY_COLOR: string = theme.palette.secondary.main
  let PRIMARY_BG_COLOR: string = theme.palette.background.default
  let SECONDARY_BG_COLOR: string = theme.palette.background.paper
  let TEXT_PRIMARY_COLOR: string = theme.palette.text.primary

  const materialTheme = createMuiTheme({
    overrides: {
      MuiFormControl: {
        root: {
          // alignSelf: 'flex-start',
          // marginTop: 8,
          borderWidth: 1,
          borderColor: PRIMARY_COLOR
        }
      },
      MuiOutlinedInput: {
        input: {
          padding: 11,
        },
        root: {
          width: 'auto',
        },
        notchedOutline: {
          borderColor: PRIMARY_COLOR,
          borderWidth: 1
        }
      },
      MuiInputBase: {
        root: {
          color: TEXT_PRIMARY_COLOR,
          border: `1px solid ${PRIMARY_COLOR}`,
          paddingRight: 10,
          paddingLeft: 10,
          height: 41,
          borderRadius: 4,
          // width: 120
        }
      },
      MuiInput: {
        underline: {
          '&::after': {
            // borderColor: PRIMARY_COLOR,
            display: 'none'
          },
          '&::before': {
            // borderColor: PRIMARY_COLOR,
            display: 'none'
          },
          // '&:hover': {
          //   borderColor: PRIMARY_COLOR
          // }
        }
      },
      MuiIconButton: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          padding: 0
        }
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: PRIMARY_COLOR
        }
      },
      MuiPickersDay: {
        daySelected: {
          backgroundColor: PRIMARY_COLOR,
          '&:hover': {
            backgroundColor: SECONDARY_COLOR
          }
        },
        day: {
          color: TEXT_PRIMARY_COLOR
        },
        current: {
          color: PRIMARY_COLOR
        }
      },
      MuiPickersYear: {
        root: {
          '&:focus': {
            color: SECONDARY_COLOR
          }
        },
        yearSelected: {
          color: PRIMARY_COLOR
        }
      },
      MuiPickersCalendarHeader: {
        dayLabel: {
          color: TEXT_PRIMARY_COLOR
        },
        iconButton: {
          backgroundColor: PRIMARY_BG_COLOR//'transparent'
        },
        switchHeader: {
          padding: '0 10px 0'
        }
      },
      MuiSvgIcon: {
        root: {
          color: PRIMARY_COLOR
        }
      },
      MuiButton: {
        textPrimary: {
          color: PRIMARY_COLOR
        }
      },
      MuiTextField: {
        root: {
          width: '120px !important',
          marginRight: '0.5em !important'
        }
      },
      MuiPickersModal: {
        dialogRoot: {
          backgroundColor: SECONDARY_BG_COLOR
        }
      },
      MuiPaper: {
        root: {
          color: TEXT_PRIMARY_COLOR
        }
      }
      // MuiPickersBasePicker: {
      //     pickerView: {
      //       color: TEXT_PRIMARY_COLOR
      //     }
      // }
    }
  });


  const classes = useTestingStyles()
  const setClasses = useSetStyles()
  const [wordsCount, setWordsCount] = useState(10)
  const [showResult, setShowResult] = useState<1 | 0>(0)
  const [testVariant, setTestVariant] = useState<1 | 0>(1)
  const [detailResultShown, setDetailResultShown] = useState(false)
  const [commonResultShown, setCommonResultShown] = useState(true)
  const [setVariant, setSetVariant] = useState(0)
  const [stopTestDialog, setStopTestDialog] = useState(false)
  const [topOffset, setTopOffset] = useState(0)

  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const dispatch: Dispatch<TSetTestActiveAction | TSetSetForTestAction | TSetInvertSetForTestAction | TSetCurrentWordIndexAction | SetAddedMeaningsActionType | TSetTestResultAction> = useDispatch();
  const getDone: GetSetThunkCreatorType = getSet('done')

  const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWordsCount(event.target.value as number)
  }

  const handleShowResultChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShowResult(event.target.value as 1 | 0)
  }

  const handleTestVariantChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTestVariant(event.target.value as 1 | 0)
  }

  const handleSetVariantChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSetVariant(event.target.value as 0 | 1 | 2 | 3)
  }

  const testSetFromState = useSelector((state: AppStateType) => !!testVariant ? state.testing.testSet : state.testing.invertTestSet)
  const currentWordIndex = useSelector((state: AppStateType) => state.testing.currentWordIndex)
  const isTestActive = useSelector((state: AppStateType) => state.testing.testActive)
  const testResult = useSelector((state: AppStateType) => state.testing.testResult)
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const [resultVisible, setResultVisible] = useState(!!testResult.length)
  const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());

  let correctMeaningsCount = 0
  let totalMeaningsCount = 0
  let correctWordsCount = 0
  testResult.forEach((item) => {
    let isCorrectCount = 0
    item.wordResult.forEach((res) => {
      if (res.isCorrect) {
        correctMeaningsCount++
        isCorrectCount++
      }
      totalMeaningsCount++
    })
    if (isCorrectCount === item.wordResult.length) correctWordsCount++
  })

  const resultData = [
    {title: 'Всего значений', value: totalMeaningsCount},
    {title: 'Колчичество верно указанных значений', value: correctMeaningsCount},
    {title: 'Колчичество слов без ошибок', value: correctWordsCount}
  ]

  let testingSet: Array<WordType> = []
  const done = useSelector((state: AppStateType) => state.words.done)
  let invertDoneObj: any = {}
  let invertTestingSet: Array<TInvertTestItem>
  // useEffect(() => {
  if (done.length) {
    if (setVariant === 0) {
      // формирование сета для теста перевод-слово
      done.forEach((word) => {
        const meanings = word.meanings.split('/')
        meanings.forEach(meaning => {
          if (invertDoneObj[meaning]) {
            invertDoneObj[meaning].push(word.title)
          } else {
            invertDoneObj[meaning] = [word.title]
          }
        })
      })

      type TInvertTestItem = {
        id: string
        title: string
        meanings: string
      }

      const invertDone: Array<TInvertTestItem> = []

      for (let title in invertDoneObj) {
        invertDone.push({
          id: title,
          title,
          meanings: invertDoneObj[title].join('/')
        })
      }

      const invertMax = invertDone.length - 1
      const invertIndexes = []

      while (invertIndexes.length < wordsCount) {
        const ind = randomInteger(0, invertMax)
        if (!~invertIndexes.indexOf(ind)) invertIndexes.push(ind)
      }
      invertTestingSet = invertIndexes.map(index => invertDone[index])

      // формирование сета для теста слово-перевод
      const max = done.length - 1
      const indexes = []

      while (indexes.length < wordsCount) {
        const ind = randomInteger(0, max)
        if (!~indexes.indexOf(ind)) indexes.push(ind)
      }
      testingSet = indexes.map(index => done[index])
    } else if (setVariant === 1) {
      // формирование сета для теста c выборкой из начала
      for (let i = 0; i < wordsCount; i++) {
        testingSet[i] = done[i]
      }
    } else if (setVariant === 2) {
      // формирование сета для теста c выборкой из конца
      let doneCopy: Array<WordType> = [];
      done.forEach((item, i) => {
        doneCopy[i] = item;
      })
      const reverseDoneCopy = doneCopy.reverse()
      for (let i = 0; i < wordsCount; i++) {
        testingSet[i] = reverseDoneCopy[i]
      }
    } else if (setVariant === 3) {
      // формирование сета для теста c выборкой за период
      let setForPeriod: Array<WordType>
      setForPeriod = done.filter((word) => {
        const msStart = selectedDateStart?.setHours(0, 0, 0, 0)
        const msEnd = selectedDateEnd?.setHours(23, 59, 59, 999)
        if (msStart && msEnd && word.updated_at) {
          return Date.parse(word.updated_at) > msStart && Date.parse(word.updated_at) < msEnd
        } else {
          return false
        }
      })
      testingSet = setForPeriod
    }
  }
  // }, [setVariant, isTestActive, selectedDateStart, selectedDateEnd])

  // const max = done.length - 1
  // const indexes = []
  //
  // if (max !== -1) { // max = -1 до тех пор пока с сервера не будет получен набор done
  //   while (indexes.length < wordsCount) {
  //     const ind = randomInteger(0, max)
  //     if (!~indexes.indexOf(ind)) indexes.push(ind)
  //   }
  //   testingSet = indexes.map(index => done[index])
  // }

  const getDoneSet = () => thunkDispatchGetSet(getDone(uid, options))

  const handleStartTest = (): void => {
    setResultVisible(false)
    dispatch(setTestActive(true))
    if (testResult.length) dispatch(setTestResult([]))
    window.onbeforeunload = () => {
      return 'При перезагрузке страницы тест будет сброшен. Продолжить?';
    }
  }

  const handleStopTest = (): void => {
    dispatch(setTestActive(false))
    dispatch(setSetForTest([]))
    dispatch(setInvertSetForTest([]))
    dispatch(setTestActive(false))
    dispatch(setCurrentWordIndex(0))
    dispatch(setAddedMeanings([]))
    setResultVisible(true)
    setStopTestDialog(false)
  }

  useEffect(() => {
    return () => {
      isTestActive && (window.onbeforeunload = null)
    }
  }, [isTestActive])

  useEffect(() => {
    (async () => {
      if (!testSetFromState.length) getDoneSet()
    })()
  }, [])

  useEffect(() => {
    if (done.length) dispatch(setSetForTest(testingSet))
  }, [wordsCount, done, isTestActive])

  useEffect(() => {
    if (done.length) dispatch(setInvertSetForTest(invertTestingSet))
  }, [wordsCount, done, isTestActive])

  useEffect(() => {
    if (resultVisible) {
      let resultBlock: any = document.getElementById('result_block')
      let data = resultBlock.getBoundingClientRect()
      setTopOffset(data.top)
    }
  }, [resultVisible])

  // @ts-ignore
  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper className={classes.block}>
          <Typography variant='h6' color={'textSecondary'} className={classes.tac}>Тестирование</Typography>
        </Paper>
        {isFetching && !done.length && <LinearProgress className={classes.loading} color={'secondary'}/>}
        <Paper className={`${classes.block} ${classes.settings}`}>
          <div className={classes.controlsWrapper}>
            <FormControl className={`${classes.select} ${classes.formControl}`} style={{
              width: 175
            }}>
              <Select
                value={setVariant}
                onChange={handleSetVariantChange}
                input={<BootstrapInput/>}
                disabled={isTestActive}
              >
                <MenuItem value={0}>Случайный набор</MenuItem>
                {/*<MenuItem value={1}>Из начала</MenuItem>*/}
                <MenuItem value={2}>Последние изученные</MenuItem>
                <MenuItem value={3}>За период</MenuItem>
              </Select>
              <FormHelperText>Вариант выборки</FormHelperText>
            </FormControl>
            {setVariant === 3 && <div className={`${classes.pickersContainer} ${classes.formControl}`}>
                <ThemeProvider theme={materialTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <div>
                            <KeyboardDatePicker className={classes.datepicker} value={selectedDateStart}
                                                onChange={setSelectedDateStart}
                                                inputVariant={'standard'} format={'dd.MM.yy'}/>
                            <FormHelperText className={classes.datepickerHelperText}>Начало
                                периода</FormHelperText>
                        </div>
                        <div>
                            <KeyboardDatePicker className={classes.datepicker} value={selectedDateEnd}
                                                onChange={setSelectedDateEnd}
                                                inputVariant={'standard'} format={'dd.MM.yy'}/>
                            <FormHelperText className={classes.datepickerHelperText}>Конец
                                перида</FormHelperText>
                        </div>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </div>}
            {/*</div>*/}
            {/*<div className={classes.controlsWrapper}>*/}
            {setVariant !== 3 && <FormControl className={`${classes.select} ${classes.formControl}`}>
                <Select
                    value={wordsCount}
                    onChange={handleCountChange}
                    input={<BootstrapInput/>}
                    disabled={isTestActive}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                </Select>
                <FormHelperText>Количество слов</FormHelperText>
            </FormControl>}
            <FormControl className={`${classes.select} ${classes.formControl}`}>
              <Select
                value={showResult}
                onChange={handleShowResultChange}
                input={<BootstrapInput/>}
                // disabled={isTestActive}
              >
                <MenuItem value={1}>Да</MenuItem>
                <MenuItem value={0}>Нет</MenuItem>
              </Select>
              <FormHelperText>Промежуточный результат</FormHelperText>
            </FormControl>
            {setVariant !== 3 && setVariant !== 2 &&
            <FormControl className={`${classes.select} ${classes.formControl}`}>
                <Select
                    value={testVariant}
                    onChange={handleTestVariantChange}
                    input={<BootstrapInput/>}
                    disabled={isTestActive}
                >
                    <MenuItem value={1}>слово-перевод</MenuItem>
                    <MenuItem value={0}>перевод-слово</MenuItem>
                </Select>
                <FormHelperText>Вариант теста</FormHelperText>
            </FormControl>}
          </div>
          <div className={classes.buttonsWrapper}>
            {!isTestActive && <Button type='button'
                                      variant="contained"
                                      color="primary"
                                      onClick={() => handleStartTest()}
                                      className={classes.settingsButton}
                                      disabled={done.length < 10}
            >Старт</Button>}
            {isTestActive && <Button type='button'
                                     variant="contained"
                                     color="primary"
                                     onClick={() => setStopTestDialog(true)}
                                     className={classes.settingsButton}
            >Стоп</Button>}
          </div>
          {done.length < 10 && !isFetching &&
          <Typography className={classes.testDisabledMessage}>Тестирование доступно при наличии в наборе
              "Изученные" не
              менее 10 слов</Typography>}
        </Paper>
        {isTestActive && <Paper className={classes.block} style={{display: resultVisible ? 'none' : 'block'}}>
            <div className={classes.formHead}>
                <Typography variant='h6'
                            color={'primary'}>{testSetFromState[currentWordIndex] && testSetFromState[currentWordIndex].title}</Typography>
                <Typography
                    variant='h6'>{currentWordIndex + 1}/{setVariant === 3 ? testingSet.length : wordsCount}</Typography>
            </div>
            <TestForm
                word={testSetFromState && testSetFromState[currentWordIndex]}
                currentWordIndex={currentWordIndex}
                wordsCount={setVariant === 3 ? testingSet.length : wordsCount}
                showResult={showResult}
                setResultVisible={setResultVisible}
                testResult={testResult}
                handleStopTest={handleStopTest}
            />
        </Paper>}
        {resultVisible && <Paper id={'result_block'} className={setClasses.list}
                                 style={{maxHeight: `${window.innerHeight - (topOffset + 1)}px`}}>
            <Accordion
                expanded={commonResultShown}
                onChange={() => setCommonResultShown(shown => !shown)}
            >
                <AccordionSummary>
                    <Typography>Сводный результат</Typography>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <TableContainer className={classes.resultTable}>
                        <Table>
                            <TableBody>
                              {resultData.map((row) => (
                                <TableRow key={row.title}>
                                  <TableCell component="th" scope="row">
                                    {row.title}
                                  </TableCell>
                                  <TableCell align="right">{row.value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={detailResultShown}
                onChange={() => setDetailResultShown(shown => !shown)}
            >
                <AccordionSummary>
                    <Typography>Детальный результат</Typography>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Слово</TableCell>
                                    <TableCell align="left" style={{padding: 0}}>Значения</TableCell>
                                    <TableCell align="left" style={{padding: 0}}>Результат</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {testResult.map((row) => (
                                <TableRow key={row.word.id}>
                                  <TableCell component="th" scope="row">
                                    {row.word.title}
                                  </TableCell>
                                  <TableCell align="left">
                                    <ol style={{padding: 0}}>
                                      {row.word.meanings.split('/').map(item => <li
                                        key={item}>{item}</li>)}
                                    </ol>
                                  </TableCell>
                                  <TableCell align="left">
                                    <ol style={{padding: 0}}>
                                      {row.wordResult.map(res => {
                                        let className
                                        if (res.isCorrect) className = classes.success
                                        else className = classes.error
                                        return <li key={res.meaning}
                                                   className={className}>{res.meaning}</li>
                                      })}
                                    </ol>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Paper>}
      </Grid>
      <Dialog
        open={stopTestDialog}
        onClose={() => {
          setStopTestDialog(false)
        }}
      >
        <DialogTitle>Завершение теста</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Завершить тестирование и отобразить текущий результат?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setStopTestDialog(false)
          }} color="primary">
            Отмена
          </Button>
          <Button onClick={handleStopTest} autoFocus>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
      <Prompt
        when={isTestActive}
        message='При переходе на другую страницу тест будет сброшен. Текущий результат будет сохранен до старта нового теста либо перезагрузки страницы'
      />
    </Grid>
  );
};

export default withAuthRedirect(TestPage);
