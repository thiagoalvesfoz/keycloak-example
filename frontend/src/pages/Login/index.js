import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Redirect, useHistory } from "react-router";

function Login() {
  const { keycloak } = useKeycloak();
  const { location } = useHistory();

  const from = location.state || "/dashboard";

  if (keycloak?.authenticated) {
    console.log("autenticado");
    return <Redirect to={from} />;
  } else {
    keycloak.login();
    return <div>Carregando...</div>;
  }
}

export default Login;
