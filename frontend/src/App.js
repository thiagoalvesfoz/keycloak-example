import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes";
import { ThemeProvider } from "@material-ui/core/styles";
import MuiTheme from "./theme";
import { CssBaseline } from "@material-ui/core";
import "services/keycloak";

//import { AuthProvider } from "components/context/AuthContext";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak, providerConfig } from "services/keycloak";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={providerConfig}>
      <ThemeProvider theme={MuiTheme}>
        {/* <AuthProvider> */}
        <BrowserRouter>
          <CssBaseline />
          <Routes />
        </BrowserRouter>
        {/* </AuthProvider> */}
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
