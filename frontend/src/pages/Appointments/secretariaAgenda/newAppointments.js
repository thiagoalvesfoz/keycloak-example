import React, { useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  TextField,
  Box,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { api } from "api";

import CardSchedules from "components/cardSchedules";

function NewAppointments({ onClose }) {
  const classes = useStyles();
  const [professionals, setProfessionals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(0);
  const [selected, setSelected] = useState({});

  const handleProfessional = (id) =>
    setSelectedProfessional(id ? id.iduser : 0);

  const handlePatient = (id) => setSelectedPatient(id ? id.iduser : 0);

  const saveAppointments = () => {
    api
      .post("appointments", {
        status: "Ativo",
        patient_iduser: selectedPatient,
        professional_iduser: selected.iduser,
        idschedule: selected.schedules.idschedules,
        rooms_idroom: "1",
        rooms_clinics_idclinics: "1",
        scheduledby_iduser: "1",
      })
      .then((res) => {
        onClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api
      .get("/users?role=patient")
      .then(({ data }) => setPatients(data))
      .catch((err) => console.log(err));

    api
      .get("/users?role=professional")
      .then(({ data }) => {
        console.log(data);
        setProfessionals(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box maxWidth="600px" width="100%" bgcolor="#fff" borderRadius={8}>
      <Box className={classes.header} p={5}>
        <Typography variant="h5">
          <strong>Novo agendamento</strong>
        </Typography>
      </Box>
      <Box mt={10} mb={5} paddingX={5}>
        <Autocomplete
          id="combo-box-demo"
          options={patients}
          getOptionLabel={(option) => option.fullname}
          onChange={(e, iduser) => handlePatient(iduser)}
          fullWidth
          style={{ marginBottom: 20 }}
          renderInput={(params) => (
            <TextField {...params} label="Pacientes" variant="outlined" />
          )}
        />
        <Autocomplete
          id="combo-box-demo"
          options={professionals}
          getOptionLabel={(option) => option.fullname}
          onChange={(e, iduser) => handleProfessional(iduser)}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Profissionais" variant="outlined" />
          )}
        />
      </Box>
      <Box paddingX={5}>
        {selectedProfessional !== 0 && (
          <CardSchedules
            paddingX={5}
            onClick={setSelected}
            professional={professionals.find(
              (p) => p.iduser === selectedProfessional
            )}
          />
        )}
      </Box>

      <Box textAlign="start" paddingX={5} mb={2}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: 20 }}
          className={classes.button}
          onClick={saveAppointments}
        >
          Confirmar
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onClose()}
          className={classes.button}
        >
          Fechar
        </Button>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    width: "100%",
    borderBottom: "1px solid #ddd",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "8px 8px 0 0",
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    padding: `${theme.spacing(2.5)}px ${theme.spacing(5)}px`,
  },
}));

export default NewAppointments;
