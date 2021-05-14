import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  makeStyles,
  Button,
  Container,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from "@material-ui/core";
import { api } from "api";
import { dayTimeOfWeek } from "utils";
import PageHeader from "components/pageHeader";
import clsx from "clsx";

export default function Confirmation(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  if (!!!props.history.location.state) return <Redirect to="/schedule" />;
  const { professional, userLogged } = props.history.location.state;

  const handleConfirmSchedule = () => {
    setLoading(true);

    const post = {
      status: "Ativo",
      patient_iduser: userLogged.iduser,
      professional_iduser: professional.iduser,
      idschedule: professional.schedules.idschedules,
      rooms_idroom: "1",
      rooms_clinics_idclinics: "1",
      scheduledby_iduser: userLogged.iduser,
    };

    api
      .post("appointments", post)
      .then(() => {
        props.history.replace({
          pathname: "success",
          state: {
            professional,
            user: userLogged,
            schedule: professional.schedules,
          },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleBackToPageSchedules = () => props.history.goBack();

  const Row = ({ label, value, noLineBottom }) => (
    <Box
      component="div"
      className={clsx(classes.row, {
        [classes.borderRow]: !!!noLineBottom,
      })}
    >
      <Typography color="secondary" className={classes.rowLabel}>
        <strong>{label}</strong>
      </Typography>
      <Typography style={{ maxWidth: 700 }}>{value}</Typography>
    </Box>
  );

  const termos =
    "Ao clicar em Finalizar agendamento, você estará concordando com os termos";

  return (
    <>
      <PageHeader title="Tudo certo para o seu agendamento ?" />
      <Container className={classes.container}>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleConfirmSchedule}
          >
            Confirmar agendamento
          </Button>
          <Typography variant="caption" display="block">
            {termos}
          </Typography>
        </Box>
        <Box className={classes.box}>
          <Row
            label="Serviço"
            value={professional.specialties[0].name.toUpperCase()}
          />
          <Row label="Convênio" value="Particular" />
          <Row label="Paciente" value={userLogged.fullname} />
          <Row label="Profissional" value={professional.fullname} />
          <Row
            label="Data e Hora"
            value={
              <>
                <strong>
                  {dayTimeOfWeek(professional.schedules.startdate)}
                </strong>

                <Typography
                  component="span"
                  style={{ display: "block" }}
                  variant="caption"
                >
                  Chegue com <strong>15 min</strong> de antecedência.
                </Typography>
              </>
            }
          />
          <Row
            label="Centro Médico"
            value="Avenida Felipe Wandscheer, n. 2435 - Foz do Iguaçu - Paraná."
          />
          <Row
            noLineBottom
            label="Valor"
            value={
              <>
                <strong>R$ 30 </strong>
                em dinheiro a vista
              </>
            }
          />
        </Box>
        <Box textAlign="center">
          <Typography variant="caption" display="block">
            {termos}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginRight: 20 }}
            onClick={handleBackToPageSchedules}
            className={classes.button}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleConfirmSchedule}
          >
            Confirmar agendamento
          </Button>
        </Box>
      </Container>
      <Dialog open={loading} aria-labelledby="confirm-schedule">
        <DialogTitle id="confirm-schedule">Confirmando Agendamento</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" pb={5}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 120,
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
  },
  headerTitle: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h5.fontSize,
    color: "white",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    padding: `${theme.spacing(2.5)}px ${theme.spacing(5)}px`,
  },
  box: {
    border: "1px solid #ddd",
    borderRadius: 8,
    margin: `${theme.spacing(5)}px 0`,
    width: "100%",
    maxWidth: 940,
    boxShadow: theme.shadows[3],
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(6),
    "@media (max-width:700px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  borderRow: {
    borderBottom: "1px solid #ddd",
  },
  rowLabel: {
    width: 150,
    display: "block",
    "@media (max-width:700px)": {
      marginBottom: theme.spacing(2),
    },
  },
}));
