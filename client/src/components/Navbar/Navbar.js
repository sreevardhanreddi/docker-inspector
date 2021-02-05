import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WorkIcon from "@material-ui/icons/Work";
import { AuthContext } from "../../context/authContext";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import WidgetsIcon from "@material-ui/icons/Widgets";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "2em",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  accountBtn: {
    color: "white",
    textColor: "white",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  titleCenter: {
    flexGrow: 1,
    textAlign: "center",
    color: "white",
  },
  whiteColorBtn: {
    root: { color: "white" },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const authContext = useContext(AuthContext);

  const [drawerState, setDrawerState] = useState({
    drawerActivate: false,
    drawer: false,
  });

  const handleLogout = () => {
    authContext.logout();
    localStorage.clear();
    window.location.reload();
  };

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const anchor = "left";

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setDrawerState({ ...drawerState, drawerActivate: true });
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600) {
        setDrawerState({ ...drawerState, drawerActivate: true });
      } else {
        setDrawerState({ ...drawerState, drawerActivate: false });
      }
    });
  }, []);

  const popupStateForAccount = usePopupState({
    variant: "popover",
    popupId: "popupStateForAccount",
  });

  const SideDrawer = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" className={classes.titleCenter}>
              Docker Inspector
            </Typography>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              className={classes.list}
              onClick={toggleDrawer(anchor, !state)}
            >
              {authContext.isAuthenticated ? (
                <>
                  <List>
                    <NavLink
                      to="/"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItem
                        button
                        onClick={(e) => {
                          history.push("/");
                        }}
                      >
                        <ListItemIcon>
                          <WidgetsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Containers" />
                      </ListItem>
                    </NavLink>
                    {/* <NavLink
                      to="/networks"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ListItem button>
                        <ListItemIcon>
                          <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary="networks" />
                      </ListItem>
                    </NavLink> */}

                    <ListItem
                      button
                      onClick={(e) => {
                        history.push("/settings");
                      }}
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItem>

                    <ListItem button onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </>
              ) : (
                <List>
                  <ListItem button>
                    <ListItemText primary="Login" />
                  </ListItem>
                </List>
              )}
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    );
  };

  const MainNavBar = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            &nbsp;Docker Inspector
          </Typography>
          {authContext.isAuthenticated ? (
            <>
              <NavLink
                to="/"
                exact
                className="navbar_navlink"
                activeClassName="navbar_active"
                // isActive={() => window.location.pathname === "/"}
              >
                <Button startIcon={<WidgetsIcon />} color="inherit">
                  Containers
                </Button>
              </NavLink>

              {/* <NavLink
                to="/calendar"
                exact
                className="navbar_navlink"
                activeClassName="navbar_active"
                // isActive={() => window.location.pathname === "/"}
              >
                <Button color="inherit">networks</Button>
              </NavLink> */}

              <div>
                <Button
                  startIcon={<AccountCircle />}
                  className={classes.accountBtn}
                  {...bindTrigger(popupStateForAccount)}
                >
                  {authContext.username}
                </Button>
                <Menu {...bindMenu(popupStateForAccount)}>
                  <MenuItem
                    onClick={() => {
                      popupStateForAccount.close();
                      history.push("/settings");
                    }}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  };

  return drawerState.drawerActivate ? SideDrawer() : MainNavBar();
};

export default Navbar;
