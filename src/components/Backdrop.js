import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

// Descrição: funciona como um fundo para o modal, permitindo a ação de fechar o modal ao clicar fora dele.
const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
