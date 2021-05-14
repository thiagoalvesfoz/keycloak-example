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
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
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

export default function EditRoom(props) {
  const url = `/rooms/` + props.roomId + '/';
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const initialFormData = Object.freeze({
		identifier: '',
		max_occupation: '',
		rent: '',
		availability: '',
    clinic: '',
    services: ''
  });
  const [formData, updateFormData] = useState(initialFormData);
  
  const [listClinics, setListClinics] = useState([]);
  const [listServices, setListServices] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  useEffect(() => {
    axiosInstance.get(url).then((res) => {
      updateFormData( {
        ...formData,
        'identifier': res.data.identifier,
        'max_occupation': res.data.max_occupation,
        'rent': res.data.rent,
        'availability': res.data.availability,
        'clinic': res.data.clinic,
        'services': res.data.services,
      });
    });
  }, [updateFormData, url]);

  useEffect(() => {
    axiosInstance.get("/clinics/").then((res) => {
      setListClinics([res.data]);
    });
    axiosInstance.get("/services/").then((res) => {
      setListServices([res.data]);
    });
  },[]);

  const handleChange = (e) => {
			updateFormData({
				...formData,
				[e.target.name]: e.target.value,
			});
	};

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(url, {
        identifier: formData.identifier,
        max_occupation: formData.max_occupation,
        rent: formData.rent,
        availability: formData.availability,
        clinic: formData.clinic.id,
        services: formData.services,
      })
      .then((res) => {
        window.location.reload();
        setOpen(false);
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <CreateIcon style={{ fontSize: 24 }} />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Sala</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Clinica</InputLabel>
            <Select
              native
              name="clinic"
              onChange={handleChange}
              value={formData.clinic.id}
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
            name="identifier"
            onChange={handleChange}
            value={formData.identifier}
            className={classes.inputText}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label="Ocupação máxima"
            type="number"
            inputProps={{ min: "0", max: "100", step: "1" }}
            name="max_occupation"
            onChange={handleChange}
            value={formData.max_occupation}
            className={classes.inputText}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label="Valor da sala"
            type="number"
            inputProps={{ min: "0", max: "9999.99", step: "0.01" }}
            name="rent"
            onChange={handleChange}
            value={formData.rent}
            className={classes.inputText}
            fullWidth
          />

          <FormControl className={classes.formControl}>
            <InputLabel shrink>Disponibilidade</InputLabel>
            <Select
              native     
              name="availability"
              onChange={handleChange}
              value={formData.availability}
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
              name="services"
              onChange={e => {
                updateFormData({
                  ...formData,
                  [e.target.name]: [...e.target.value],
                })
              }}
              value={formData.services.id}
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
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
