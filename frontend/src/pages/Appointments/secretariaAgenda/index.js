import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
  withStyles,
  Modal,
  Fade,
  Backdrop,
  Box,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { api } from "api";
import Row from "./row";
import SearchBar from "../../../components/searchBar";
import NewAppointments from "./newAppointments";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    // fontWeight: "bold",
    fontSize: theme.typography.subtitle1.fontSize,
  },
}))(TableCell);

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
    width: "100%",
  },
  danger: {
    color: "#a71c1c",
    border: "1px solid #a71c1c",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function SecretariaAgenda(props) {
  const classes = useStyles();
  const [getAppointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [params, setParams] = useState();

  const handleSearch = (params) => {
    setLoading(true);

    api
      .get(`/appointments?role=patient&text=${params}`)
      .then(({ data }) => setAppointments(data))
      .catch(() => alert("Erro ao pegar dados"))
      .finally(() => setLoading(false));
  };

  const updateAppointments = (appointment) => {
    appointment.status = "Cancelado";
    const old = getAppointments[getAppointments.indexOf(appointment)];
    console.log(old);
  };

  const findAppointments = (name, date) => {
    setLoading(true);

    api
      .get(`/appointments?role=patient`)
      .then(({ data }) => setAppointments(data))
      .catch(() => alert("Erro ao pegar dados"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    findAppointments();
  }, []);

  const handleNewPatient = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.header}>
          <div className={classes.search}>
            <SearchBar size="large" onSearch={handleSearch} />
          </div>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleNewPatient}
            size="large"
          >
            <DateRangeIcon style={{ marginRight: 10 }} /> Novo Agendamento
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Paciente</StyledTableCell>
                  <StyledTableCell>E-mail</StyledTableCell>
                  <StyledTableCell>Telefone</StyledTableCell>
                  <StyledTableCell align="right">Opções</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton width="75%" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Skeleton />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ) : (
                  getAppointments.map((appointment, i) => (
                    <Row
                      appointment={appointment}
                      update={updateAppointments}
                      key={i}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleNewPatient}
        className={classes.modal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <NewAppointments onClose={handleNewPatient} />
        </Fade>
      </Modal>
    </div>
  );
}

export default SecretariaAgenda;
