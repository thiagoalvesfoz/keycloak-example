//Import React
import React, { useState } from "react";

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

  const [name, setName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/services/`, {
        name: name,
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
        Novo tipo de Serviço
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Novo tipo de Serviço</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            label="Tipo de Serviço"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className={classes.inputText}
            fullWidth
          />

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
