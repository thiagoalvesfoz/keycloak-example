import React, { Fragment } from "react";
import {
  makeStyles,
  Typography,
  FormControl,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Divider,
  Box,
  withWidth,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputDate from "../InputDate";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.grey[100],
  },
  papper: {
    margin: "0 auto",
  },
  title: {
    width: "100%",
    textAlign: "left",
    marginBottom: theme.spacing(5),
    fontWeight: "bold",
    opacity: 0.85,
  },
  subtitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.text.primary,
    opacity: 0.65,
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    padding: theme.spacing(2.5),
    color: theme.palette.secondary.dark,
    borderColor: theme.palette.secondary.dark,
  },
  buttonColumn: {
    minWidth: 320,
  },
  gutter: {
    marginBottom: theme.spacing(2),
  },
  searchIcon: {
    marginRight: 10,
  },
  formColumn: {
    flexGrow: 1,
  },
  formGroupColumn: {
    flexDirection: "row",
  },
  formControl: {
    minWidth: 150,
    flexGrow: 1,
  },
  formSearch: {
    flexGrow: 9,
    marginRight: theme.spacing(5),
  },
}));

function Filter({ width, ...props }) {
  const classes = useStyles();

  const [especialidade, setEspecialidade] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [periodo, setPeriodo] = React.useState({ manha: false, tarde: false });
  const [sexo, setSexo] = React.useState({ masc: false, fem: false });

  const handleDateChange = (date) => setSelectedDate(date);

  const onSubmit = () => {
    const data = {
      servico: especialidade,
      data: selectedDate,
      periodo: periodo,
      sexo: sexo,
    };
    console.log(data);
  };

  const fullWidth = width !== "md" && width !== "sm";

  return (
    <Paper variant="outlined" elevation={4}>
      <aside className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          Pesquisar
        </Typography>
        <Divider />

        {/* Pesquisa Padrão */}
        <Box display="flex" flexWrap="wrap">
          <FormControl
            margin="normal"
            fullWidth={fullWidth}
            className={clsx({
              [classes.formColumn]: !fullWidth,
              [classes.formSearch]: !fullWidth,
            })}
          >
            <Typography variant="subtitle1" className={classes.subtitle}>
              Especialidade
            </Typography>
            <OutlinedInput
              value={especialidade}
              placeholder="pesquisar"
              margin="dense"
              color="secondary"
              onChange={(e) => setEspecialidade(e.target.value)}
              endAdornment={
                <SearchIcon color="action" className={classes.searchIcon} />
              }
            />
          </FormControl>

          <FormControl
            margin="normal"
            fullWidth={fullWidth}
            className={clsx({
              [classes.formColumn]: !fullWidth,
            })}
          >
            <Typography variant="subtitle1" className={classes.subtitle}>
              Data
            </Typography>
            <InputDate
              color="secondary"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </FormControl>
        </Box>

        {/* Filtros */}
        <Box display="flex" flexWrap="wrap">
          <FormControl
            margin="normal"
            component="fieldset"
            fullWidth={fullWidth}
            className={clsx(classes.formControl, {
              [classes.formColumn]: !fullWidth,
            })}
          >
            <Typography variant="subtitle1" className={classes.subtitle}>
              Periodos
            </Typography>
            <FormGroup
              classes={{
                root: clsx({ [classes.formGroupColumn]: !fullWidth }),
              }}
            >
              <FormControlLabel
                className={clsx({ [classes.gutter]: fullWidth })}
                control={
                  <Checkbox
                    color="secondary"
                    checked={periodo.manha}
                    onChange={() =>
                      setPeriodo({ ...periodo, manha: !periodo.manha })
                    }
                    name="Manhã"
                  />
                }
                label={
                  <Fragment>
                    <Typography variant="body2">Manhã</Typography>
                    <Typography variant="caption">(08h00 - 12h00)</Typography>
                  </Fragment>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={periodo.tarde}
                    onChange={() =>
                      setPeriodo({ ...periodo, tarde: !periodo.tarde })
                    }
                    name="Tarde"
                  />
                }
                label={
                  <Fragment>
                    <Typography variant="body2">Tarde</Typography>
                    <Typography variant="caption">(12h00 - 18h00)</Typography>
                  </Fragment>
                }
              />
            </FormGroup>
          </FormControl>
          <FormControl
            margin="normal"
            component="fieldset"
            fullWidth={fullWidth}
            className={clsx(classes.formControl, {
              [classes.formColumn]: !fullWidth,
            })}
          >
            <Typography variant="subtitle1" className={classes.subtitle}>
              Sexo
            </Typography>
            <FormGroup
              classes={{
                root: clsx({ [classes.formGroupColumn]: !fullWidth }),
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={sexo.masc}
                    onChange={() => setSexo({ ...sexo, masc: !sexo.masc })}
                    name="Masculino"
                  />
                }
                label={<Typography>Masculino</Typography>}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={sexo.fem}
                    onChange={() => setSexo({ ...sexo, fem: !sexo.fem })}
                    name="Feminino"
                  />
                }
                label={<Typography>Feminino</Typography>}
              />
            </FormGroup>
          </FormControl>
          <div style={{ flexGrow: 3, alignSelf: "flex-end", marginBottom: 8 }}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              color="secondary"
              onClick={onSubmit}
              className={clsx(classes.button, {
                [classes.buttonColumn]: !fullWidth,
              })}
            >
              Pesquisar
            </Button>
          </div>
        </Box>
      </aside>
    </Paper>
  );
}

export default withWidth()(Filter);
