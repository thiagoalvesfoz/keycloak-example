import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Media() {
  const classes = useStyles();

  const SelectHour = () => {
    return (
      <Grid item md={2} xs={4}>
        <Skeleton animation="wave" className={classes.button} />
      </Grid>
    );
  };

  return (
    <Card className={classes.root} variant="elevation">
      <Skeleton animation="wave" variant="rect" className={classes.top} />
      <CardHeader
        className={classes.header}
        avatar={
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        }
        title={<Skeleton animation="wave" className={classes.name} />}
        subheader={
          <div className={classes.subHeader}>
            <Skeleton animation="wave" className={classes.description} />
            <Skeleton
              animation="wave"
              variant="circle"
              className={classes.circle}
            />
            <Skeleton animation="wave" className={classes.description} />
          </div>
        }
      />
      <CardContent className={classes.content}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              className={classes.contentTitle}
              gutterBottom
            >
              Escolha um horário
            </Typography>
          </Grid>
          <SelectHour />
          <SelectHour />
          <SelectHour />
          <SelectHour />
          <SelectHour />
          <SelectHour />
        </Grid>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    border: "1px solid #ddd",
    backgroundColor: theme.palette.primary.contrastText,
  },
  top: {
    height: theme.spacing(1),
    backgroundColor: theme.palette.grey[300],
  },
  header: {
    display: "flex",
    width: "100%",
    borderBottom: "1px solid #ddd",
  },
  name: {
    width: 280,
    height: 32,
    marginBottom: 1,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  circle: {
    width: 8,
    height: 8,
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  subHeader: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  description: {
    width: 93,
    height: 14,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexGrow: 1,
    },
  },
  content: {
    backgroundColor: theme.palette.grey[200],
  },
  contentTitle: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: "bold",
  },
  button: {
    transform: "none",
    width: "100%",
    height: 44,
  },
}));
