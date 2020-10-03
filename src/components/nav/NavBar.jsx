import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import {logout} from '../../redux/actions/authActions'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {switchColorTheme} from "../../redux/actions/appActions";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(4)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const mapState = (state) => ({
  auth: state.auth.isAuth,
  name: state.auth.name,
  darkState: state.app.darkState
});

const actions = {
  logout,
  switchColorTheme
}

const SignedInMenu = ({visible, toggleDrawer, logout, name, darkState, switchColorTheme}) => {
  const classes = useStyles();
  return (
    <Toolbar>
      <div>
        <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} /*color="inherit"*/>
          <MenuIcon/>
        </IconButton>
        <Drawer
          anchor='left'
          open={visible}
          onClose={toggleDrawer(false)}
        >
          <List component="nav">
            <ListItem component={Typography} color={'primary'}>
              <ListItemText primary="Категории"/>
            </ListItem>
            <Divider/>
            <ListItem
              component={NavLink}
              to='/next'
              button
              selected={false}
              onClick={toggleDrawer(false)}
            >
              <ListItemText secondary="На очереди"/>
            </ListItem>
            <ListItem
              component={NavLink}
              to='/current'
              button
              selected={false}
              onClick={toggleDrawer(false)}
            >
              <ListItemText secondary="Текущий набор"/>
            </ListItem>
            <ListItem
              component={NavLink}
              to='/done'
              button
              selected={false}
              onClick={toggleDrawer(false)}
            >
              <ListItemText secondary="Изученные"/>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <Typography variant="h6" className={classes.title}>
        {name}
      </Typography>
      <Switch checked={darkState} onChange={switchColorTheme}/>
      <IconButton onClick={logout}>
        <ExitToAppIcon/>
      </IconButton>
    </Toolbar>
  )
};

const SignedOutMenu = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        classes={{
          indicator: '#fff'
        }}
        centered
      >
        <Tab component={NavLink} to='/login' label={<span style={{color: '#fff'}}>Вход</span>}/>
        <Tab component={NavLink} to='/register' label={<span style={{color: '#fff'}}>Регистрация</span>}/>
      </Tabs>
  )
};

const NavBar = ({auth, history, name, logout, options, darkState, switchColorTheme}) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);

  const handleLogOut = () => {
    logout(options);
    history.push('/');
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setVisible(open);
  };

  return (
    <div className={classes.root}>
      <AppBar position={'static'} /*style={{ backgroundColor: "#1976d2", color: '#fff' }}*/>
        <Container>
          {auth ?
            <SignedInMenu visible={visible}
                          toggleDrawer={toggleDrawer}
                          logout={handleLogOut}
                          name={name}
                          darkState={darkState}
                          switchColorTheme={switchColorTheme}
            /> :
            <SignedOutMenu darkState={darkState} switchColorTheme={switchColorTheme}/>}
        </Container>
      </AppBar>
    </div>
  );
}

export default connect(mapState, actions)(withRouter(NavBar));
