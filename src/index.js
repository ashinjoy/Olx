import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Context,{FirebaseContext}  from "./store/FirebaseContext";
// import Context from './store/FirebaseContext'
import firebase from "./Firebase/config";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={firebase}>
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
