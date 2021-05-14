import { createMuiTheme } from "@material-ui/core";

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1CA78C",
      contrastText: "#f9f9f9",
    },
    secondary: {
      main: "#00939F",
      contrastText: "#f9f9f9",
    },
    contrastThreshold: 3, //calcula o contraste do texto com base no main
    tonalOffset: 0.3, //calcula as cores dark e light com base no 'main'
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 4, //px
});

export default MuiTheme;
