import React from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

import Grafico from "./Grafico";

import "./Componentes.css";

const ComponenteGrafico = (props) => {
  return (
    <>
      {props.grafico.length ? (
        props.grafico.map((g) => {
          return (
            <Draggable bounds="parent">
              <Resizable bounds="parent">
                <div className="grafico">
                  {g.titulo && <p className="p-titulo">{g.titulo}</p>}
                  <div
                    style={{
                      border: `${g.largura}px solid ${g.cor}`,
                      borderRadius: "5px",
                    }}
                  >
                    <Grafico tipo={g.tipo} />
                  </div>
                </div>
              </Resizable>
            </Draggable>
          );
        })
      ) : (
        <> </>
      )}
    </>
  );
};

export default ComponenteGrafico;
