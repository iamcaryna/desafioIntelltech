import React from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

import "./Componentes.css";

const ComponenteImagem = (props) => {
  return (
    <>
      {props.imagem.length ? (
        props.imagem.map((img) => {
          return (
            <Draggable bounds="parent">
              <Resizable bounds="parent">
                <div className="image">
                  {img.titulo && <p className="p-titulo">{img.titulo}</p>}
                  <img
                    style={{
                      border: `${img.largura}px solid ${img.cor}`,
                      borderRadius: "5px",
                    }}
                    draggable="false"
                    alt="not fount"
                    src={URL.createObjectURL(img.imagem)}
                  />
                </div>
              </Resizable>
            </Draggable>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default ComponenteImagem;
