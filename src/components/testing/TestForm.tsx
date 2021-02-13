import React, {FC, Fragment} from 'react';
import Grid from "@material-ui/core/Grid";
import {Field, InjectedFormProps, reduxForm, stopSubmit} from "redux-form";
import {RenderTextarea, RenderTextField} from "../../assets/formElems";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {combineValidators, isRequired} from "revalidate";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

const validate = combineValidators({
  meaning: isRequired({message: 'Введите значение'}),
  // means: isRequired({message: 'Введите значения'})
})

type TOnCheckMeanings = {
  title: string
}

type TProps = {
  word: string
}

const TestForm: FC<TProps & InjectedFormProps<TOnCheckMeanings,TProps>> = ({
                                                                          pristine, submitting, error,
                                                                          handleSubmit, reset, word
                                                                        }) => {
  return (
    <div>
      <form onSubmit={() => {}} autoComplete='off'>
        <Grid container spacing={2} justify={'flex-end'}>
          <Grid item xs={12}>
            <Field
              name="meaning"
              component={RenderTextField}
              label='Значение'
              placeholder={`введите значения для "${word}" по одному`}
              // onKeyDown={onEnterPress}
            />
          </Grid>
          <Grid item xs={12}>{error && <Typography align={'center'} variant='body1' color='error'>
            {error}
          </Typography>}
          </Grid>
          <Grid item xs={12}>
            <List>
              <Fragment>
                <ListItem>
                  <ListItemText primary={'тест1'}/>
                  {true && <IconButton >
                      <DeleteForeverIcon/>
                  </IconButton>}
                </ListItem>
                <ListItem>
                  <ListItemText primary={'тест2'}/>
                  {true && <IconButton >
                      <DeleteForeverIcon/>
                  </IconButton>}
                </ListItem>
                <Divider/>
              </Fragment>
            </List>
          </Grid>
          {/*<Grid item xs={12} sm={4}>*/}
          {/*  <Button type='button'*/}
          {/*          variant="contained"*/}
          {/*          color="primary"*/}
          {/*          style={{width: '100%'}}*/}
          {/*          // onClick={() => handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'AddToSetForm', correctMeaningValue)}*/}
          {/*          // disabled={pristine || submitting || !correctMeaningValue}*/}
          {/*  >Назад</Button>*/}
          {/*</Grid>*/}
          <Grid item xs={12} sm={4}>
            <Button type='submit'
                    // disabled={pristine || submitting || !addedMeanings.length || !titleValue}
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                    style={{width: '100%'}}
            >Проверить</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default reduxForm<TOnCheckMeanings, TProps>({form: 'TestForm', validate})(TestForm)