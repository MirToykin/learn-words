import React, {useDebugValue, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import AddToSetForm from "../forms/AddToSetForm";
import List from "@material-ui/core/List";
import {useSetStyles} from "../../../assets/useStyles";
import TextField from "@material-ui/core/TextField";
import Set from "./Set";
import {useDispatch, useSelector} from "react-redux";
import {setSearchInput} from "../../../redux/actions/wordsActions";
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from "@material-ui/core/LinearProgress";

const SetPage = ({set, getSet, pageTitle, uid, addToSet, options}) => {
  const classes = useSetStyles();
  const [open, setOpen] = useState(false);
  const searchInput = useSelector(state => state.words.searchInput);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.app.isFetching);


  useEffect(() => {
    (async () => getSet(uid, options))()
  }, [])

  const handleInputChange  = e => {
    dispatch(setSearchInput(e.target.value));
  }

  const handleClose = additionalActions => {
    setOpen(false);
    if(additionalActions) {
      additionalActions.forEach(action => {
        action();
      })
    }
  }

  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper>
          <div className={classes.head}>
            <Typography variant='h5' color={'textSecondary'}>{pageTitle}</Typography>
            <IconButton color='primary' size='medium' onClick={() => setOpen(true)}>
              {addToSet && /*<AddIcon fontSize={'large'}/>*/<Icon style={{ fontSize: 40 }} color='primary'>add_circle</Icon>}
            </IconButton>
          </div>
          <Divider/>
          {addToSet && <AddToSetForm open={open}
                                     onClose={handleClose}
                                     addToSet={addToSet} uid={uid}
                                     options={options}
          />}
          <List>
            <form>
              <TextField fullWidth={true}
                         placeholder={'введите строку для поиска'}
                         inputProps={{style: {
                           textAlign: "center"
                           }}}
                         value={searchInput}
                         onChange={handleInputChange}
                         disabled={!set.length && !searchInput}
              />
            </form>
            {isFetching && !set.length && <LinearProgress color={'secondary'}/>}
            {set.length ? <Set set={set}
                 pageTitle={pageTitle}
                 options={options}
            /> : !set.length && searchInput ? <Typography className={classes.notFound} variant='body1'>Ничего не найдено</Typography> : ''}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SetPage;
