import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import ptBRLocale from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  resetMargin: {
    marginTop: 0,
  },
});

export default function InputDate({ children, ...props }) {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
      {!!children ? (
        children
      ) : (
        <KeyboardDatePicker
          disableToolbar
          disablePast
          fullWidth
          variant={props.variant ? props.variant : "inline"}
          inputVariant="outlined"
          margin="dense"
          className={classes.resetMargin}
          format="dd/MM/yyyy"
          id={props.label ? props.id : null}
          label={props.label ? props.label : null}
          value={props.value ? props.value : null}
          onChange={props.onChange ? props.onChange : null}
          color={props.color ? props.color : "primary"}
          KeyboardButtonProps={{
            "aria-label": "Alterar data",
          }}
        />
      )}
    </MuiPickersUtilsProvider>
  );
}
