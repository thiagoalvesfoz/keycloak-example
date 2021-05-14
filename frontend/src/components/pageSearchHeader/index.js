import React from "react";
import {
  makeStyles,
  Container,
  Box,
  Typography,
  Button,
  withWidth,
  IconButton,
} from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";

import InputDate from "../InputDate";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import ptBRLocale from "date-fns/locale/pt-BR";

import { DatePicker } from "@material-ui/pickers";
import SelectSpecialities from "components/selectSpecialties";

function PageHeader({ onSearch }) {
  const classes = useStyles();

  const [especialidade, setEspecialidade] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => setSelectedDate(date);

  const formatDateLabel = (date, invalidLabel) => {
    let dateClone = date;
    const day = format(dateClone, "d");
    const month = format(dateClone, "MMMM", { locale: ptBRLocale });

    const capitalize = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    return dateClone && isValid(dateClone)
      ? `${day} de ${capitalize(month)}`
      : invalidLabel;
  };

  const onSubmit = () => {
    onSearch({ especialidade, data: format(selectedDate, "yyyy-MM-dd") });
  };

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.headerDesktop}>
          <Box className={classes.container}>
            <Box mr={10} color="white" flexGrow={1} className={classes.mobile}>
              <Typography variant="subtitle2" gutterBottom>
                Serviço
              </Typography>
              <SelectSpecialities
                className={classes.select}
                onChange={setEspecialidade}
              />
            </Box>

            <Box color="white" flexGrow={1} mr={10} className={classes.mobile}>
              <Typography variant="subtitle2" gutterBottom>
                Data
              </Typography>
              <Box>
                <InputDate>
                  <DatePicker
                    disableToolbar
                    disablePast
                    className={classes.mobile}
                    labelFunc={formatDateLabel}
                    variant="inline"
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputProps={{
                      className: classes.inputDate,
                      disableUnderline: true,
                      endAdornment: (
                        <IconButton
                          color="default"
                          aria-label="calendar picture"
                          component="span"
                        >
                          <TodayIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </InputDate>
              </Box>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                size="large"
                disableElevation
                onClick={onSubmit}
                className={classes.button}
              >
                Pesquisar
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
  container: {
    display: "flex",
    height: "100%",
    padding: theme.spacing(5),
    alignItems: "flex-end",
    "@media (max-width:800px)": {
      flexDirection: "column",
      alignItems: "inherit",
    },
  },
  inputDate: {
    fontSize: theme.typography.body1.fontSize,
    backgroundColor: "#fff",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: theme.shape.borderRadius,
    height: 56,
  },
  icon: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#084C61",
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
    height: "55px",
  },
  mobile: {
    "@media (max-width:800px)": {
      width: "100%",
      marginBottom: theme.spacing(3),
    },
  },
  select: {
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    minWidth: 200,
  },
}));

export default withWidth()(PageHeader);
