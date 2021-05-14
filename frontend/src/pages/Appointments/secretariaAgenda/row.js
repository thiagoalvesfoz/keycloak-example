import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  Collapse,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { formatDate } from "utils";
import { api } from "api";
import clsx from "clsx";
import ChipStatus from "./chip";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  search: {
    width: "100%",
    maxWidth: 600,
  },
  table: {
    minWidth: 650,
  },
  danger: {
    color: "#a71c1c",
    border: "1px solid #a71c1c",
  },
  professional: {
    display: "flex",
    alignItems: "center",
  },
  patient: {
    fontWeight: "bold",
    fontSize: theme.typography.subtitle2.fontSize,
  },
  cell: {
    width: "22%",
  },
}));

function Row({ appointment, update }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // const handleStatus = (e) => console.log(e.target.innerHTML);
  const handleStatus = (e) => {
    if (e.status === "Ativo") {
      api
        .put(`/appointments/${e.idappointments}`, {
          status: "Cancelado",
        })
        .then((data) => {
          update(e);
          // console.log(data.status);
        })
        .catch(() => alert("Erro ao pegar dados"))
        .finally(() => console.log(true));
    }
    // console.log(e.status);
  };

  return (
    <Fragment>
      <StyledTableRow>
        <TableCell
          component="th"
          scope="row"
          className={clsx(classes.patient, classes.professional)}
        >
          <Avatar
            src={`http://localhost:8080/avatars/${appointment.avatar}`}
            style={{ marginRight: "15px" }}
          />
          {appointment.fullname}
        </TableCell>
        <TableCell>{appointment.email}</TableCell>
        <TableCell>{appointment.telephone}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </StyledTableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Dados do Agendamento
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Profissional</TableCell>
                    <TableCell className={classes.cell}>Data Inicial</TableCell>
                    <TableCell className={classes.cell}>Data Final</TableCell>
                    <TableCell className={classes.cell}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointment.appointments.map((appointment, i) => (
                    <TableRow key={i}>
                      <TableCell className={classes.professional}>
                        <Avatar
                          src={`http://localhost:8080/avatars/${appointment.schedule.professional.avatar}`}
                          style={{ marginRight: "15px" }}
                        />
                        {appointment.schedule.professional.fullname}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {formatDate(appointment.schedule.startdate)}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {formatDate(appointment.schedule.enddate)}
                      </TableCell>
                      <TableCell className={clsx(classes.cell, classes.chip)}>
                        <ChipStatus
                          status={appointment.status}
                          onClick={() => handleStatus(appointment)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default Row;
