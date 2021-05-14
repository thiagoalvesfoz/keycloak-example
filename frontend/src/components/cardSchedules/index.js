import React from "react";
import { DateTime } from "luxon";
import {
  makeStyles,
  Avatar,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";

export default function CardSchedules({ professional, onClick }) {
  const { fullname, specialties, schedules, avatar } = professional;
  const classes = useStyles();

  const SelectHour = ({ schedule }) => {
    const date = DateTime.fromSQL(schedule.startdate);

    const handleClick = () => {
      const selected = {
        ...professional,
        schedules: schedule,
      };

      return onClick(selected);
    };

    return (
      <Grid item md={2} xs={4}>
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          className={classes.button}
          size="large"
          fullWidth
          onClick={handleClick}
        >
          <small>{date.toFormat("H:mm dd/LL")}</small>
        </Button>
      </Grid>
    );
  };

  return (
    <Card className={classes.root} variant="elevation">
      <div className={classes.top} />
      <CardHeader
        className={classes.header}
        avatar={<Avatar src={`http://localhost:8080/avatars/${avatar}`} />}
        title={
          <Typography component="h2" variant="h6" className={classes.title}>
            {fullname}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="inherit" component="span">
            {specialties.map((specialty) => (
              <span key={specialty.idspecialty}>
                {`${specialty.documenttype} ${specialty.pivot.document}`}
              </span>
            ))}
            <div className={classes.circle} />
            {specialties.map((specialty) => specialty.name).join(", ")}
          </Typography>
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
          {schedules.map((schedule) => (
            <SelectHour schedule={schedule} key={schedule.idschedules} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    border: "1px solid #ddd",
  },
  top: {
    height: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    display: "flex",
    width: "100%",
    borderBottom: "1px solid #ddd",
    backgroundColor: theme.palette.primary.contrastText,
  },
  content: {
    display: "flex",
    flexGrow: 1,
    flexWrap: "wrap",
    backgroundColor: theme.palette.grey[200],
  },
  title: {
    fontWeight: "bold",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: "#c4c4c4",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  contentTitle: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: "bold",
  },
  button: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontSize: theme.typography.subtitle1.fontSize,
    "&:focus": {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.dark,
    },
  },
}));
