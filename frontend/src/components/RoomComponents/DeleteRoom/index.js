//Import React
import React from "react";

//Axios Instance
import axiosInstance from "../../../services/rooms/axios";

//Imports Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const useStyles = makeStyles((theme) => ({
  cancel: {
    color: "#f44336",
    "&:hover": {
      color: "#f44336",
    },
  },
}));

export default function DeleteRoom(props) {
  const [open, setOpen] = React.useState(false);
  const id = props.roomId;
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .delete("/rooms/" + id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        setOpen(false);
        window.location.reload();
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <RemoveCircleIcon style={{ fontSize: 24 }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Tem certeza que deseja apagar esta sala?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Caso a sala seja apagada não será possível restaurar posteriormente.
            Lembre-se em caso de dados errados é sempre possível editar a sala.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.cancel}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Apagar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
