import React, {useState} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import {connect} from "react-redux";
import {addToSet, removeFromSet} from "../../../redux/actions/wordActions";
import ChangeMeansForm from "../forms/ChangeMeansForm";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {useCommonFormStyles} from "../../../assets/useStyles";

const actions = {
  addToTo_learn: addToSet('to_learn'),
  addToCurrent: addToSet('current'),
  addToLearned: addToSet('learned'),
  removeFromSet
}

const WordItemMenu = ({
                        anchorEl, setAnchorEl, id,
                        word, means, currentSet, addToTo_learn,
                        addToCurrent, addToLearned, removeFromSet
                      }) => {

  const [open, setOpen] = useState(false);
  const wordDoc = {id, word, means};
  const classes = useCommonFormStyles();

  const handleAddToSet = (e, setToRemove, id, addFunc) => {
    addFunc(wordDoc);
    removeFromSet(setToRemove, id);
    setAnchorEl(false);
  }

  const onChangeMeans = () => {
    setOpen(true);
    setAnchorEl(null);
  }

  const menuConfig = {
    to_learn: [
      {
        addToSet: addToCurrent,
        title: 'Добавить в текущий набор'
      },
      {
        addToSet: addToLearned,
        title: 'Добавить в изученные'
      }],
    current: [
      {
        addToSet: addToTo_learn,
        title: 'Добавить в очередь'
      },
      {
        addToSet: addToLearned,
        title: 'Добавить в изученные'
      }],
    learned: [
      {
        addToSet: addToTo_learn,
        title: 'Добавить в очередь'
      },
      {
        addToSet: addToCurrent,
        title: 'Добавить в текущий набор'
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
        <MenuItem onClick={(e) => handleAddToSet(e, currentSet, id, menuItem1.addToSet)}>{menuItem1.title}</MenuItem>
        <MenuItem onClick={(e) => handleAddToSet(e, currentSet, id, menuItem2.addToSet)}>{menuItem2.title}</MenuItem>
        {currentSet !== 'learned' && <MenuItem onClick={onChangeMeans}>Изменить значения</MenuItem>}
        <MenuItem onClick={() => removeFromSet(currentSet, id)}>Удалить</MenuItem>
      </Menu>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Paper className={classes.paper}>
          <Typography variant='h5'
                      align='center'
                      color='primary'
                      className={classes.head}
          >Изменить значения для <span style={{fontWeight: "bold", color: 'black'}}>{word}</span></Typography>
          <ChangeMeansForm
            initialValues={{means: means.join(', ')}}
            addToSet={currentSet === 'current' ? addToCurrent : addToTo_learn}
            onClose={() => setOpen(false)}
            word={word}
            id={id}
          />
        </Paper>
      </Dialog>
    </>
  );
};

export default connect(null, actions)(WordItemMenu);
