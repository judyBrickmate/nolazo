import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import RootRouter from "./router/RootRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppAlert from "./component/app-alert";

function App() {
  const theme = createTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <RootRouter />
        </BrowserRouter>
        <AppAlert/>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
