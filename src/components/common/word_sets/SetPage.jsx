import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import AddToSetForm from "../forms/AddToSetForm";
import List from "@material-ui/core/List";
import {useSetStyles} from "../../../assets/useStyles";
import TextField from "@material-ui/core/TextField";
import Set from "./Set";
import {useDispatch, useSelector} from "react-redux";
import {setSearchInput} from "../../../redux/actions/wordsActions";
import LinearProgress from "@material-ui/core/LinearProgress";

const SetPage = ({set, getSet, pageTitle, uid, addToSet, options}) => {
  const classes = useSetStyles();
  const [open, setOpen] = useState(false);
  const [deltaHeight, setDeltaHeight] = useState(window.pageYOffset ? 90 : 180); // если pageYOffset 0, тогда из высоты контейнера вычитаем 180 px
  const searchInput = useSelector(state => state.words.searchInput);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.app.isFetching);


  useEffect(() => {
    (async () => getSet(uid, options))()
  }, [])

  const handleInputChange = e => {
    dispatch(setSearchInput(e.target.value));
  }

  const handleClose = additionalActions => {
    setOpen(false);
    if (additionalActions) {
      additionalActions.forEach(action => {
        action();
      })
    }
  }

  const handleScrollDown = () => {
    window['scrollTo']({top: 90, behavior: 'smooth'});
    setDeltaHeight(90);
  }

  const handleScrollUp = () => {
    window['scrollTo']({top: 0, behavior: 'smooth'});
    setDeltaHeight(180);
  }

  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper style={{marginBottom: '5px'}}>
          <div className={classes.head}>
            <Typography variant='h6' color={'textSecondary'}>{pageTitle} - {set.length}</Typography>
            <div>
              {deltaHeight === 90 ? // при deltaHeight 90 страница не прокручена, значит показать стрелку вверх, иначе вниз
                <IconButton onClick={handleScrollUp}>
                  <Icon>expand_more</Icon>
                </IconButton>
              :
                <IconButton onClick={handleScrollDown}>
                  <Icon>expand_less</Icon>
                </IconButton>
              }
              <IconButton color='primary' style={{padding: '6px', marginRight: '6px'}} size='medium'
                          onClick={() => setOpen(true)}>
                {addToSet && /*<AddIcon fontSize={'large'}/>*/
                <Icon style={{fontSize: 40}} color='primary'>add_circle</Icon>}
              </IconButton>
            </div>
          </div>
          {isFetching && !set.length && <LinearProgress color={'secondary'}/>}
          {addToSet && <AddToSetForm open={open}
                                     onClose={handleClose}
                                     addToSet={addToSet} uid={uid}
                                     options={options}
          />}
        </Paper>
        <Paper style={{marginBottom: '5px'}}>
          <form>
            <TextField fullWidth={true}
                       placeholder={'введите строку для поиска'}
                       inputProps={{
                         style: {
                           textAlign: "center"
                         }
                       }}
                       value={searchInput}
                       onChange={handleInputChange}
                       disabled={!set.length && !searchInput}
            />
          </form>
        </Paper>
        <Paper>
          <List className={classes.list} style={{maxHeight: `${window.innerHeight - deltaHeight}px`}}>
            {set.length ? <Set set={set}
                               pageTitle={pageTitle}
                               options={options}
            /> : !set.length && searchInput ?
              <Typography className={classes.notFound} variant='body1'>Ничего не найдено</Typography> : ''}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SetPage;
