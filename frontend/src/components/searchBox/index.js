import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, makeStyles, Button } from "@material-ui/core";
import SelectSpecialties from "components/selectSpecialties";
import format from "date-fns/format";
import { api } from "api";

function SearchBox(props) {
  const history = useHistory();
  const classes = useStyles();
  const [specialties, setSpecialties] = React.useState("");

  useEffect(() => {
    api
      .get("/specialties")
      .then(({ data }) => setSpecialties(data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = () => {
    history.push({
      pathname: "schedule",
      state: {
        params: {
          especialidade: specialties,
          date: format(new Date(), "yyyy-MM-dd"),
        },
        specialties,
      },
    });
  };

  return (
    <>
      <Box className={classes.root}>
        <SelectSpecialties
          fullWidth
          onChange={(idspecialty) => setSpecialties(idspecialty)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onSubmit}
        >
          BUSCAR
        </Button>
      </Box>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    backgroundColor: "#F5F5F5",
    borderRadius: theme.shape.borderRadius,
    marginBottom: 20,
    marginTop: 20,
    display: "flex",
    boxShadow: theme.shadows[3],
    "@media (max-width:420px)": {
      flexDirection: "column",
    },
  },
  button: {
    fontWeight: "bold",
    padding: `${theme.spacing(2.5)}px ${theme.spacing(5)}px`,
    marginLeft: theme.spacing(4),
    width: 160,
    "@media (max-width:420px)": {
      width: "100%",
      marginLeft: 0,
      marginTop: theme.spacing(3),
    },
  },
}));

export default SearchBox;
