import React from "react";
import {
  makeStyles,
  Container,
  Box,
  Button,
  withWidth,
  InputBase,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EventIcon from "@material-ui/icons/Event";

import { DatePicker } from "@material-ui/pickers";
import InputDate from "../InputDate";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
  input: {
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.h6.fontSize,
  },
  icon: {
    fontSize: theme.typography.h5.fontSize,
    color: theme.palette.secondary.contrastText,
    minWidth: "auto",
    marginRight: theme.spacing(3),
  },
  button: {
    backgroundColor: "#084C61",
    minWidth: "auto",
    marginTop: theme.spacing(2),
  },
  headerMobile: {
    "@media (min-width:900px)": {
      display: "none",
    },
  },
}));

function PageHeader({ width, onSearch }) {
  const classes = useStyles();

  const [especialidade, setEspecialidade] = React.useState("Oftamologista");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showFilter, setShowFilter] = React.useState(false);
  const handleDateChange = (date) => setSelectedDate(date);

  const onSubmit = () => {
    onSearch({
      especilidade: especialidade,
      data: selectedDate,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Box
            display="flex"
            height="100%"
            width="100%"
            padding={5}
            alignItems="center"
            flexWrap="wrap"
          >
            <Box display="flex" color="white" flexGrow="1" alignItems="center">
              <SearchIcon className={classes.icon} />
              <FormControl fullWidth>
                <InputBase
                  className={classes.input}
                  value={especialidade}
                  onClick={() => setShowFilter(!showFilter)}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  InputProps={{
                    className: classes.input,
                    disableUnderline: true,
                  }}
                />
              </FormControl>
            </Box>
            {showFilter && (
              <Box width="100%" color="white">
                <FormControl margin="none" fullWidth>
                  <InputDate>
                    <DatePicker
                      disableToolbar
                      disablePast
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="dense"
                      value={selectedDate}
                      onChange={handleDateChange}
                      InputProps={{
                        className: classes.input,
                        disableUnderline: true,
                        startAdornment: <EventIcon className={classes.icon} />,
                      }}
                    />
                  </InputDate>
                </FormControl>

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
            )}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default withWidth()(PageHeader);
