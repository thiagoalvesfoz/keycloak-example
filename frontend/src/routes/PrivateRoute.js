import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "components/PageTransition";

//layout padrão
import { DashboardLayout } from "layout";

//Pages
import Login from "pages/Login";
import SecretariaAgenda from "pages/Appointments/secretariaAgenda";
import RoomManagement from "pages/Rooms/RoomManagement";
import ServicesTypeManagement from "pages/Rooms/ServicesTypeManagement";

import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = () => {
  const location = useLocation();
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) {
    return <div>Carregando...</div>;
  }

  const Private = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          console.log("rota privada ->", props.location);
          return keycloak.authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: props.location.pathname,
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <>
      <AnimatePresence>
        <Switch>
          <Route
            exact
            path={[
              "/login",
              "/dashboard",
              "/users",
              "/rooms",
              "/services",
              "/appointments",
              "/payments",
              "/patients",
              "/professionals",
              "/support",
              "/profile",
            ]}
          >
            <Switch location={location} key={location.pathname}>
              <Route exact path="/login" component={Login} />
              <DashboardLayout>
                <PageTransition>
                  <Private exact path="/dashboard" component={() => <h1>Hello dashboard</h1>} />
                  <Private path="/users" component={() => <h1>Hello users</h1>} />
                  <Private path="/rooms" component={RoomManagement} />
                  <Private path="/services" component={ServicesTypeManagement} />
                  <Private path="/appointments" component={SecretariaAgenda} />
                  <Private path="/patients" component={() => <h1>Hello Patients</h1>} />
                  <Private path="/professionals" component={() => <h1>Hello Professionals</h1>} />

                  <Private path="/payments" component={() => <h1>Hello payments</h1>} />
                  <Private path="/support" component={() => <h1>Hello support</h1>} />
                  <Private path="/profile" component={() => <h1>Hello Profile</h1>} />
                </PageTransition>
              </DashboardLayout>
            </Switch>
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
};

export default PrivateRoute;
