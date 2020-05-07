import {makeStyles} from "@material-ui/core/styles";

export const useCommonStyles = makeStyles(theme => {
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