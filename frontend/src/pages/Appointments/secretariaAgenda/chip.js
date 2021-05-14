import React, { useState } from "react";
import { Button, Chip, makeStyles } from "@material-ui/core";

import clsx from "clsx";

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
    width: "20%",
  },
  button: {
    color: "#FFF",
    backgroundColor: theme.palette.error.main,
    float: "right",
    transition: "0.3s",

    "&:hover": {
      color: "#FFF",
      backgroundColor: theme.palette.error.main,
      opacity: 0.8,
    },
  },
}));

function ChipStatus({ status, onClick }) {
  const classes = useStyles();
  const [ativo, setAtivo] = useState(status === "Ativo");

  function handleStatus() {
    if (ativo) {
      setAtivo(false);
      onClick();
    }
  }

  return (
    <>
      <Chip
        label={ativo ? "Ativo" : "Cancelado"}
        color="secondary"
        variant="outlined"
        onClick={handleStatus}
        className={clsx({
          [classes.danger]: !ativo,
        })}
      />

      <Button
        variant="contained"
        className={classes.button}
        onClick={handleStatus}
        disabled={!ativo}
      >
        Cancelar
      </Button>
    </>
  );
}

export default ChipStatus;
