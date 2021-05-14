//Import React
import React, { useState, useEffect } from "react";

//Axios Instance
import axiosInstance from "../../../services/rooms/axios";

//Imports Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#1CA78C",
    "&:hover": {
      backgroundColor: "#137462",
    },
    color: "#f8f6f7",
    padding: 12,
    fontSize: 14,
    margin: 0,
  },
  cancel: {
    color: "#f44336",
    "&:hover": {
      color: "#f44336",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NewRoom() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [listClinics, setListClinics] = useState([]);
  const [listServices, setListServices] = useState([]);

  const [clinic, setClinic] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [max_occupation, setMax_occupation] = useState("");
  const [rent, setRent] = useState("");
  const [availability, setAvailability] = useState("");
  const [services, setServices] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axiosInstance.get("/clinics/").then((res) => {
      setListClinics([res.data]);
    });
    axiosInstance.get("/services/").then((res) => {
      setListServices([res.data]);
    });
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/rooms/`, {
        identifier: identifier,
        max_occupation: max_occupation,
        rent: rent,
        availability: availability,
        clinic: clinic,
        services: [services],
      })
      .then((res) => {
        window.location.reload();
        setOpen(false);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Nova Sala
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nova Sala</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Clinica</InputLabel>
            <Select
              native
              onChange={(e) => setClinic(e.target.value)}
              value={clinic}
            >
              <option aria-label="None" value="" />

              {listClinics.map((clinic) =>
                clinic.results.map((result) => (
                  <option value={result.id}>{result.name}</option>
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            label="Identificação"
            type="text"
            onChange={(e) => setIdentifier(e.target.value)}
            className={classes.inputText}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label="Ocupação máxima"
            type="number"
            inputProps={{ min: "0", max: "100", step: "1" }}
            onChange={(e) => setMax_occupation(e.target.value)}
            className={classes.inputText}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label="Valor da sala"
            type="number"
            inputProps={{ min: "0", max: "9999.99", step: "0.01" }}
            onChange={(e) => setRent(e.target.value)}
            className={classes.inputText}
            fullWidth
          />

          <FormControl className={classes.formControl}>
            <InputLabel shrink>Disponibilidade</InputLabel>
            <Select
              native
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option aria-label="None" value="" />
              <option value="AVAILABLE">Disponivel</option>
              <option value="UNAVAILABLE">Indisponível</option>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel shrink>Tipo de Serviço</InputLabel>
            <Select
              native
              value={services}
              onChange={(e) => setServices(e.target.value)}
            >
              <option aria-label="None" value="" />
              {listServices.map((service) =>
                service.results.map((result) => (
                  <option value={result.id}>{result.name}</option>
                ))
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.cancel}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
