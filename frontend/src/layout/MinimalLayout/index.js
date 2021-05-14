import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    backgroundColor: "#F8F6F7",
    flexGrow: 1,
    borderBottom: "1px solid rgba(51, 51, 51, 0.1)",
  },
}));

function MinimalLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default MinimalLayout;
