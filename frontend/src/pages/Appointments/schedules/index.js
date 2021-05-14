import React, { useEffect, useState, Fragment } from "react";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import { useHistory } from "react-router-dom";
import { makeStyles, Grid, Container, Typography, Box, Chip } from "@material-ui/core";
import { api } from "api";
import user from "userSimulation";
import PageHeader from "components/pageSearchHeader";
import CardSchedules from "components/cardSchedules";
import CardSchedulesSkeleton from "components/cardSchedules/Skeleton";
import doctor from "components/assets/doctor.svg";

function Schedules(props) {
  const state = props.history.location.state;
  const classes = useStyles();
  const history = useHistory();

  const [showChip, setShowChip] = useState(true);
  const [loading, setLoading] = useState(false);
  const [professionals, setProfessionals] = useState([]);

  const findSchedules = (params) => {
    setLoading(true);
    api
      .get("/schedules", { params })
      .then(({ data }) => setProfessionals(data))
      .catch(() => console.log("Erro ao pegar dados"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let params = {};

    if (state) {
      params = state.params;
    }

    findSchedules(params);
  }, [state]);

  const handleSearch = (params) => findSchedules(params);

  const getSubtitle = () => {
    if (professionals.length === 0) return;

    if (professionals.length === 1) return "1 profissional encontrado";

    return `${professionals.length} profissionais encontrados`;
  };

  const handleClick = (professional) => {
    const userLogged = user.getUserLogged();

    if (userLogged) {
      const selected = {
        professional,
        userLogged,
      };
      history.push({
        pathname: "schedule/confirmation",
        state: selected,
      });
    } else {
      alert("Opa bora logar na conta primeiro !?");
    }
  };

  const CardProfessionals = () => {
    if (professionals.length > 0) {
      return professionals.map((professional) => (
        <CardSchedules key={professional.iduser} professional={professional} onClick={handleClick} />
      ));
    }

    return (
      <Box className={classes.cardNotFound}>
        <Box marginY={5}>
          <Typography color="secondary" variant="h3" paragraph>
            <strong>Oooops...</strong>
          </Typography>
          <Typography variant="h5">
            <strong>Nenhum profissional encontrado!</strong>
          </Typography>
        </Box>
        <img src={doctor} alt="Doctor" className={classes.img} />
      </Box>
    );
  };

  return (
    <>
      <PageHeader onSearch={handleSearch} />
      <Container>
        <Grid container spacing={6} className={classes.root}>
          <Grid item xs={12} lg={12}>
            <Box marginBottom={5} width="100%">
              {showChip && (
                <Chip
                  label="As datas que você selecionou podem ser alterados sem avíso prévio"
                  variant="outlined"
                  color="primary"
                  onDelete={() => setShowChip(false)}
                  className={classes.alert}
                  classes={{
                    label: classes.alertLabel,
                    deleteIconOutlinedColorPrimary: classes.closeAlert,
                  }}
                  icon={<EmojiObjectsOutlinedIcon className={classes.alertIcon} />}
                />
              )}
              <Typography variant="h5" className={classes.subtitle}>
                {loading ? "Buscando os melhores horários..." : getSubtitle()}
              </Typography>
            </Box>
            {loading ? (
              <>
                <Fragment>
                  <CardSchedulesSkeleton />
                  <CardSchedulesSkeleton />
                </Fragment>
              </>
            ) : (
              <CardProfessionals />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Schedules;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(10)}px ${theme.spacing(5)}px`,
  },
  title: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    backgroundColor: "#084C61",
  },
  alert: {
    width: "100%",
    justifyContent: "flex-start",
    color: theme.palette.warning.dark,
    borderColor: theme.palette.warning.main,
  },
  alertLabel: {
    flexGrow: 1,
  },
  closeAlert: {
    color: theme.palette.warning.main,
  },
  subtitle: {
    marginTop: theme.spacing(5),
  },
  filter: {
    "@media (max-width:900px)": {
      display: "none",
    },
  },
  showFilter: {
    display: "block",
  },
  cardNotFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
    margin: `${theme.spacing(20)}px 0`,
    "@media (max-width:855px)": {
      flexDirection: "column-reverse",
      textAlign: "center",
    },
  },
  img: {
    maxWidth: 420,
    padding: theme.spacing(5),
  },
}));
