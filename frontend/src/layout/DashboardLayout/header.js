import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  withWidth,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Badge,
  Typography,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
// import { useAuth } from "components/context/AuthContext";
import { useHistory } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

function Header({ open, setOpen, ...props }) {
  const { keycloak } = useKeycloak();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const { logout } = useAuth();
  // const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    keycloak.logout();
  }

  return (
    <AppBar
      position="fixed"
      color="inherit"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          Dashboard
        </Typography>
        <Box display="flex">
          <IconButton aria-label="você novas notificações" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Button
            edge="end"
            aria-label="conta de usuario atual"
            aria-haspopup="true"
            classes={{
              root: classes.buttonProfile,
            }}
            onClick={handleClick}
            color="inherit"
            disableRipple
            startIcon={<Avatar />}
            endIcon={<ExpandMoreIcon />}
          >
            Olá, {keycloak.tokenParsed?.given_name || "NOT"}
          </Button>

          <Menu
            id="positioned-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem className={classes.menuItem}>
              <PersonIcon className={classes.menuIcon} />
              Conta
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleLogout}>
              <ExitToAppIcon className={classes.menuIcon} />
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${theme.spacing(18)}px)`,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  },
  buttonProfile: {
    textTransform: "none",
    fontSize: theme.typography.body1.fontSize,
    marginLeft: theme.spacing(3),
  },
  menuItem: {
    width: 170,
    height: 40,
  },
  menuIcon: {
    marginRight: theme.spacing(3),
  },
}));

export default withWidth()(Header);
