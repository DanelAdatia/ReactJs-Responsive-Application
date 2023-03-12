import React from "react";
import Routes from "./Routes/Routes";
import { MyProvider } from "./contexts/UserContext";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyProvider>
        <Routes />
      </MyProvider>
    </SnackbarProvider>
  );
};

export default App;
