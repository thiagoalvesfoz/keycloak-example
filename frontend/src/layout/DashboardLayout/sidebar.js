import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withWidth } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ width, open, setOpen }) {
  const location = useLocation();
  const classes = useStyles();

  const navigation = [
    {
      name: "Dashboard",
      ico: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Agenda",
      ico: "today",
      path: "/appointments",
    },
    {
      name: "Salas",
      ico: "meeting_room",
      path: "/rooms",
    },
    {
      name: "Pacientes",
      ico: "groups",
      path: "/patients",
    },
    {
      name: "Profissionais",
      ico: "local_hospital",
      path: "/professionals",
    },
    {
      name: "Financeiro",
      ico: "attach_money",
      path: "/payments",
    },
  ];

  const variant = width === "xs" ? "temporary" : "permanent";
  const support = location.pathname === "/support";
  const profile = location.pathname === "/profile";

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={setOpen}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      {/* logo */}
      <div className={classes.toolbar}>
        <Link to="/dashboard" className={classes.link}>
          <Typography variant="h5">{open ? "Uniamérica" : "CIS"}</Typography>
        </Link>
      </div>
      <Divider />

      {/* lista */}
      <List className={classes.list}>
        {navigation.map((item, index) => (
          <ListItem
            component={Link}
            to={item.path}
            button
            selected={location.pathname === item.path}
            key={item.name}
            className={classes.listColor}
            classes={{
              selected: classes.selected,
            }}
          >
            <ListItemIcon
              className={clsx(classes.iconList, classes.listColor, {
                [classes.selected]: location.pathname === item.path,
              })}
            >
              <Icon>{item.ico}</Icon>
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              classes={{
                primary: clsx({
                  [classes.selected]: location.pathname === item.path,
                }),
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* SUPORTE */}
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          selected={profile}
          to="/profile"
          className={classes.listColor}
        >
          <ListItemIcon
            className={clsx(classes.iconList, classes.listColor, {
              [classes.selected]: profile,
            })}
          >
            <Icon>person</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Minha Conta"
            classes={{
              primary: clsx(classes.textList, {
                [classes.selected]: profile,
              }),
            }}
          />
        </ListItem>

        <ListItem
          button
          component={Link}
          selected={support}
          to="/support"
          className={classes.listColor}
        >
          <ListItemIcon
            className={clsx(classes.iconList, classes.listColor, {
              [classes.selected]: support,
            })}
          >
            <Icon>support_agent</Icon>
          </ListItemIcon>
          <ListItemText
            primary="Suporte"
            classes={{
              primary: clsx(classes.textList, {
                [classes.selected]: support,
              }),
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: 240,
    overflowX: "hidden",
    background: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.spacing(18),
    overflowX: "hidden",
    background: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  list: {
    paddingTop: theme.spacing(10),
  },
  iconList: {
    display: "flex",
    justifyContent: "center",
    paddingRight: theme.spacing(4),
  },
  listColor: {
    color: theme.palette.primary.contrastText,
  },
  selected: {
    fontWeight: "bold",
    color: theme.palette.primary.dark,
    letterSpacing: 0.3,
  },
}));

export default withWidth()(Sidebar);
