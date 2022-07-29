import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import store from "../src/store";
function WaitForStateRehydration({ children }: { children: any }) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <WaitForStateRehydration>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WaitForStateRehydration>
    </StoreProvider>
  </React.StrictMode>
);
