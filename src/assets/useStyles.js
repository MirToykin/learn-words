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
    padding: theme.spacing(2),
    paddingRight: 0
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  notFound: {
    textAlign: 'center'
  }
}))