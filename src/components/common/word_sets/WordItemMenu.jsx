import React from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu/Menu";
import {connect} from "react-redux";
import {addToSet, removeFromSet} from "../../../redux/actions/wordActions";

const actions = {
  addToTo_learn: addToSet('to_learn'),
  addToCurrent: addToSet('current'),
  addToLearned: addToSet('learned'),
  removeFromSet
}

const WordItemMenu = ({anchorEl, setAnchorEl, id,
                        word, means, currentSet, addToTo_learn,
                        addToCurrent, addToLearned, removeFromSet}) => {

  const handleAddToSet = (e, setToRemove, id, addFunc) => {
    const wordDoc = {id, word, means};
    addFunc(wordDoc);
    removeFromSet(setToRemove, id);
    setAnchorEl(false);
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
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={(e) => handleAddToSet(e, currentSet, id, menuItem1.addToSet)}>{menuItem1.title}</MenuItem>
      <MenuItem onClick={(e) => handleAddToSet(e, currentSet, id, menuItem2.addToSet)}>{menuItem2.title}</MenuItem>
      {currentSet !== 'learned' && <MenuItem onClick={() => setAnchorEl(null)}>Изменить значения</MenuItem>}
    </Menu>
  );
};

export default connect(null, actions)(WordItemMenu);
