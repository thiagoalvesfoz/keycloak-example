import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { dayTimeOfWeek } from "utils";
import PrintIcon from "@material-ui/icons/Print";

import PageHeader from "components/pageHeader";

export default function Success(props) {
  const classes = useStyles();
  const { state: appointment } = props.history.location;
  console.log("response: ", appointment);

  if (!!!appointment) {
    return <Redirect to="/schedule" />;
  }

  const formatDate = () =>
    dayTimeOfWeek(
      appointment.schedule.startdate,
      "cccc', ' dd/MM 'às' HH'h'mm "
    );

  const Row = ({ label, text }) => (
    <>
      <p>{label}</p>
      <Typography color="secondary" variant="body2" className={classes.text}>
        <strong>{text}</strong>
      </Typography>
    </>
  );

  const linkTo =
    "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=-25.5485118,-54.5573294";

  return (
    <>
      <PageHeader title="Sucesso" />
      <Container className={classes.root}>
        <h2 style={{ textAlign: "center" }}>
          {appointment.user.fullname.split(" ")[0]}, o seu agendamento foi
          realizado.
        </h2>
        <Box className={classes.box}>
          <Box className={classes.contentLeft}>
            <Typography paragraph variant="body2">
              Pagamento
            </Typography>
            <Typography color="secondary" variant="h6">
              <strong>à vista de R$ 30,00</strong>
            </Typography>
            <Box flexGrow={1} bgcolor="#E9E9E9" mt={7}></Box>
          </Box>

          <Box width="450px" className={classes.contentRight}>
            <Typography>Serviço</Typography>
            <Typography color="secondary" variant="h6" className={classes.text}>
              <strong>{appointment.professional.specialties[0].name}</strong>
            </Typography>
            <Row label="Horário" text={<strong>{formatDate()}</strong>} />
            <Row
              label="Profissional"
              text={appointment.professional.fullname}
            />

            <Typography variant="body2" className={classes.map}>
              Avenida Felipe Wandscheer, n. 2435 - Foz do Iguaçu - Paraná.
            </Typography>
            <a
              href={linkTo}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <Typography color="secondary" variant="body2" paragraph>
                <strong>COMO CHEGAR</strong>
              </Typography>
            </a>
            <Box className={classes.groupButtons}>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginRight: 12 }}
              >
                <strong>Detalhes</strong>
              </Button>
              <Button
                variant="outlined"
                color="default"
                onClick={() => window.print()}
                startIcon={<PrintIcon size="small" />}
              >
                imprimir
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    marginTop: theme.spacing(8),
    "@media print": {
      marginTop: 0,
    },
  },
  box: {
    border: "1px solid #ddd",
    borderLeft: `10px solid ${theme.palette.secondary.main}`,
    margin: `${theme.spacing(10)}px auto`,
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    background: "#f9f9f9",
    boxShadow: theme.shadows[7],
    "@media (max-width:700px)": {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
      border: "1px solid #ddd",
      borderTop: `10px solid ${theme.palette.secondary.main}`,
    },
  },
  contentLeft: {
    width: "100%",
    padding: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
  },
  contentRight: {
    padding: theme.spacing(7),
    borderLeft: "1px solid rgba(51, 51, 51, 0.1)",
    "@media (max-width:700px)": {
      width: "100%",
      borderBottom: "1px solid rgba(51, 51, 51, 0.1)",
      marginTop: theme.spacing(7),
    },
  },
  text: {
    marginBottom: theme.spacing(8),
  },
  map: {
    fontSize: "0.75rem",
    marginBottom: theme.spacing(2),
    "@media print": {
      fontSize: "0.875rem",
    },
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    "@media print": {
      display: "none",
    },
  },
  groupButtons: {
    display: "flex",
    width: "100%",
    "@media print": {
      display: "none",
    },
  },
}));
