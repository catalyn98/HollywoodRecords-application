import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationContextProvider } from "./managing application state/context/AuthenticationContext";
import { Provider } from "react-redux";
import { store, persistor } from "./managing application state/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.Fragment>
);

reportWebVitals();
