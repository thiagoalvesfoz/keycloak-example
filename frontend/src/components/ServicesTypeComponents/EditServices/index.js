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
  const url = `/services/` + props.roomId + '/';
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const initialFormData = Object.freeze({
		name: '',
  });
  const [formData, updateFormData] = useState(initialFormData);

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
        'name': res.data.name,
      });
    });
  }, [updateFormData, url]);

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
        name: formData.name,
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
        <DialogTitle id="form-dialog-title">Editar Tipo de serviço</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            label="Identificação"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className={classes.inputText}
            fullWidth
          />

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
