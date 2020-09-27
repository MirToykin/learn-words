import React, {useState} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import {connect, useDispatch} from "react-redux";
import ChangeMeaningsForm from "../forms/ChangeMeaningsForm";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {useCommonFormStyles} from "../../../assets/useStyles";
import {deleteWord, editWord, setAddedMeanings} from "../../../redux/actions/wordsActions";

const actions = {
  editWord,
  deleteWord
}

const WordItemMenu = ({
                        anchorEl, setAnchorEl, id,
                        title, meanings, currentSet,
                        editWord, options, deleteWord
                      }) => {

  const [open, setOpen] = useState(false);
  const classes = useCommonFormStyles();
  const dispatch = useDispatch();

  const handleMoveToSet = (e, moveToSet) => {
    moveToSet();
    setAnchorEl(false);
  }

  const onChangeMeans = () => {
    setOpen(true);
    setAnchorEl(null);
  }

  const onClose = () => {
    setOpen(false);
    dispatch(setAddedMeanings([]))
  }

  const menuConfig = {
    next: [
      {
        moveToSet: () => editWord(currentSet, id, {"category": "current"}, options),
        title: 'Переместить в текущий набор'
      },
      {
        moveToSet: () => editWord(currentSet, id, {"category": "done"}, options),
        title: 'Переместить в изученные'
      }],
    current: [
      {
        moveToSet: () => editWord(currentSet, id, {"category": "next"}, options),
        title: 'Переместить в очередь'
      },
      {
        moveToSet: () => editWord(currentSet, id, {"category": "done"}, options),
        title: 'Переместить в изученные'
      }],
    done: [
      {
        moveToSet: () => editWord(currentSet, id, {"category": "next"}, options),
        title: 'Переместить в очередь'
      },
      {
        moveToSet: () => editWord(currentSet, id, {"category": "current"}, options),
        title: 'Переместить в текущий набор'
      }
    ]
  }

  const menuItem1 = menuConfig[currentSet][0];
  const menuItem2 = menuConfig[currentSet][1];

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={(e) => handleMoveToSet(e, menuItem1.moveToSet)}>{menuItem1.title}</MenuItem>
        <MenuItem onClick={(e) => handleMoveToSet(e, menuItem2.moveToSet)}>{menuItem2.title}</MenuItem>
        {currentSet !== 'done' && <MenuItem onClick={onChangeMeans}>Изменить значения</MenuItem>}
        <MenuItem onClick={() => deleteWord(currentSet, id, options)}>Удалить</MenuItem>
      </Menu>
      <Dialog open={open} onClose={onClose}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color='primary'
                      className={classes.head}
          >Изменить значения для <Typography variant={'inherit'} color={'textPrimary'}>{title}</Typography></Typography>
          <ChangeMeaningsForm
            // initialValues={{meanings: meanings}}
            meanings={meanings}
            editWord={editWord}
            onClose={() => setOpen(false)}
            id={id}
            options={options}
          />
        </Paper>
      </Dialog>
    </>
  );
};

export default connect(null, actions)(WordItemMenu);
