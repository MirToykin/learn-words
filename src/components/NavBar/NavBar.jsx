import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setVisible(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <div>
              <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit">
                <MenuIcon/>
              </IconButton>
              <Drawer anchor='top' open={visible} onClose={toggleDrawer(false)}>
                <List component="nav">
                  <ListItem
                    button
                    selected={false}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="На очереди"/>
                  </ListItem>
                  <ListItem
                    button
                    selected={false}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Текущий набор"/>
                  </ListItem>
                  <ListItem
                    button
                    selected={false}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Изученные"/>
                  </ListItem>
                </List>
              </Drawer>
            </div>
            <Typography variant="h6" className={classes.title}>
              User Name
            </Typography>
            <Button color="inherit">Выход</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavBar;