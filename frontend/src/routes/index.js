import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "components/PageTransition";

//layout padrão
import { MinimalLayout } from "layout";

//Pages
import Home from "pages/Home";
import Schedule from "pages/Appointments/schedules";
import ScheduleConfirmation from "pages/Appointments/schedules/confirmation";
import ScheduleSuccess from "pages/Appointments/schedules/success";
// import SecretariaAgenda from "pages/Appointments/secretariaAgenda";
// import RoomManagement from "pages/Rooms/RoomManagement";
// import ServicesTypeManagement from "pages/Rooms/ServicesTypeManagement";
// import SignInSide from "pages/Auth/Signin";
// import SignUpSide from "pages/Auth/Signup";
// import Login from "pages/Login";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Switch>
        {/* Agrupamento de rotas públicas acessadas pelo paciente fazer seu próprio agendamento*/}
        <Route exact path={["/", "/register", "/schedule", "/schedule/confirmation", "/schedule/success"]}>
          <MinimalLayout>
            <Switch location={location} key={location.pathname}>
              <PageTransition>
                <Route exact path="/" component={Home} />
                {/* <Route path="/register" component={SignUpSide} /> */}
                <Route exact path="/schedule" component={Schedule} />
                <Route path="/schedule/confirmation" component={ScheduleConfirmation} />
                <Route path="/schedule/success" component={ScheduleSuccess} />
              </PageTransition>
            </Switch>
          </MinimalLayout>
        </Route>

        {/* Agrupamento de rotas privadas acessadas pelo administrador e usuários do sistema*/}
        <PrivateRoute />

        <Route path="*" component={() => <h1>Page Not Found</h1>} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
