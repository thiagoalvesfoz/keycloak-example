import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

function DashboardLayout({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={() => setOpen(false)} />
      <div className={classes.container}>
        <div className={classes.toolbar} />
        <main className={classes.content}>{children}</main>
        <Footer open={open} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  container: {
    flexGrow: 1,
    position: "relative",
  },
  content: {
    marginBottom: 30,
    padding: theme.spacing(5),
  },
}));

export default DashboardLayout;
