import React from "react";
import { makeStyles, Container, Box } from "@material-ui/core";

export default function PageHeader(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Box className={classes.box}>
          <h1 className={classes.title}>{props.title}</h1>
        </Box>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 120,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    "@media print": {
      display: "none",
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h5.fontSize,
    color: "white",
  },
  box: {
    display: "flex",
    height: "100%",
    padding: theme.spacing(5),
    alignItems: "center",
    flexWrap: "wrap",
  },
}));
