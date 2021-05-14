import React from "react";
import { Container, Typography, Box, makeStyles } from "@material-ui/core";
import SearchBox from "components/searchBox";
import banner from "components/assets/banner2.jpg";
import { useKeycloak } from "@react-keycloak/web";

const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: "615px",
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

function Home() {
  const result = useKeycloak();
  console.log(result);
  const classes = useStyles();

  return (
    <>
      <Box className={classes.banner}>
        <Container>
          <Typography variant="h4" paragraph>
            <strong> Como está sua saúde?</strong>
          </Typography>

          <Typography variant="subtitle1">Agende sua consulta hoje mesmo!</Typography>

          <Box width="100%">
            <SearchBox />
          </Box>

          <Typography variant="subtitle1">
            Se preferir agende pelo telefone <strong>(45) 2105-9099</strong>
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Home;
