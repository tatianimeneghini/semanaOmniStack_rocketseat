import React from "react";
import ReactDOM from "react-dom"; //Dom é a áravore de elementos
import App from "./App";

ReactDOM.render( //Renderizar é colocar na tela
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);