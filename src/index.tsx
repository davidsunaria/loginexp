import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router-dom";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import store from "../src/store";
function WaitForStateRehydration({ children }: { children: any }) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}



ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <WaitForStateRehydration>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WaitForStateRehydration>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
