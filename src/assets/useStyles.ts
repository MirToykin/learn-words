import {makeStyles} from "@material-ui/core/styles";

export const useCommonFormStyles = makeStyles(theme => {
  return ({
    paper: {
      padding: theme.spacing(2)
    },
    submit: {
      marginRight: theme.spacing(2)
    },
    head: {
      marginBottom: theme.spacing(2)
    }
  })
})

export const useTestingStyles = makeStyles(theme => ({
  tac: {
    textAlign: 'center',
  },
  block: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1)
  },
  loading: {
    marginTop: -3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  settings: {
    marginTop: theme.spacing(1)
    // display: 'flex',
    // alignItems: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  success: {
    color: theme.palette.success.main
  },
  error: {
    color: theme.palette.error.main
  },
  formHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  settingsButton: {
    height: 41,
    // flex: 1,
    color: '#fff'
  },
  controlsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  formControl: {
    marginBottom: theme.spacing(1),
    // marginRight: theme.spacing(2)
  },
  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  select: {
    marginRight: theme.spacing(1)
  },
  testVariant: {
    flex: 1
  },
  resultTable: {
    marginBottom: theme.spacing(1)
  },
  detailResultHead: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: "none",
    backgroundColor: 'inherit'
  },
  resultHead: {
    minHeight: '40px !important',
    marginTop: 0
  },
  resultPanelExpanded: {
    margin: '1px 0 !important'
  },
  input: {
    marginRight: theme.spacing(1)
  },
  inputWrapper: {
    // backgroundColor: '#535353',
    borderRadius: 4,
    marginTop: theme.spacing(2),
    display: 'flex',
    // height: 50,
    padding: '0 0 0 1em !important',
  },
  datepicker: {
    width: 100,
    marginRight: theme.spacing(2)
  },
  datepickerHelperText: {
    color: theme.palette.text.secondary
  },
  pickersContainer: {
    display: 'flex',
    alignSelf: 'stretch'
  },
  testDisabledMessage: {
    fontSize: 13,
    marginTop: '1em',
    color: theme.palette.text.hint
  }
}))

export const useSetStyles = makeStyles(theme => ({
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: 0
  },
  multipleActions: {
    display: 'flex',
    justifyContent: 'center'
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  notFound: {
    textAlign: 'center'
  },
  list: {
    overflowY: "auto",
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey'
    }
  },
  searchClear: {
    cursor: 'pointer'
  }
}))
