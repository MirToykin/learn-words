import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import AddToSetForm from "../forms/AddToSetForm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import WordItem from "./WordItem";
import {useSetStyles} from "../../../assets/useStyles";

const SetPage = ({set, getSet, pageTitle, uid, token, addToSet, options}) => {
  const classes = useSetStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => getSet(uid, options))()
  }, [])

  return (
    <Grid container justify='center'>
      <Grid item md={5} sm={7} xs={12}>
        <Paper>
          <div className={classes.head}>
            <Typography variant='h5'>{pageTitle}</Typography>
            <IconButton color='secondary' size='medium' onClick={() => setOpen(true)}>
              {addToSet && <Icon style={{ fontSize: 40 }} color='secondary'>add_circle</Icon>}
            </IconButton>
          </div>
          <Divider/>
          {addToSet && <AddToSetForm open={open}
                                     onClose={() => setOpen(false)}
                                     addToSet={addToSet} uid={uid}
                                     options={options}
          />}
          <List>
            {set.map(word => (
              <ListItem key={word.id}>
                <WordItem word={word} pageTitle={pageTitle} options={options}/>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SetPage;
