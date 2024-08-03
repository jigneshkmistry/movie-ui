"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import { SnackbarProvider } from "notistack";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </SnackbarProvider>
    </Provider>
  );
}

export default Providers;
