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
});

export const useSetStyles = makeStyles(theme => ({
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: 0
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
  }
}))
