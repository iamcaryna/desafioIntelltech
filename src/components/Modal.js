import React from "react";
import ReactDOM from "react-dom";

import Button from "@mui/material/Button";

import Backdrop from "./Backdrop.js";
import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div className="modal">
      <div className="modal-overlay">
        <header>
          <h2>Componentes</h2>
        </header>
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault
          }
        >
          <div>{props.children}</div>

          <footer>
            <Button
              variant="contained"
              color="success"
              onClick={props.buttonClick}
              disabled={!props.componente}
              size="small"
            >
              Adicionar
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && (
        <div>
          <Backdrop onClick={props.onCancel} />
          <ModalOverlay {...props} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Modal;
