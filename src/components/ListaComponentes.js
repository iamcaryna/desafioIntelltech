import React from "react";

//material ui
import { ListItem, Icon, ListItemText, IconButton } from "@mui/material";
import { Delete, BarChart } from "@mui/icons-material";

import "./Componentes.css";

const ListaComponentes = (props) => {
  return (
    <>
      <ListItem>
        <Icon style={{ marginRight: 5 }}>
          {props.componente === "imagem" ? (
            <img
              style={{ width: "100%", height: "100%" }}
              alt="not fount"
              src={URL.createObjectURL(props.icon)}
            />
          ) : (
            <BarChart />
          )}
        </Icon>
        {props.titulo ? (
          <ListItemText
            id={"aria-labelledby"}
            primary={`Título: ${props.titulo}.`}
          />
        ) : (
          <>
            {props.componente === "imagem" ? (
              <ListItemText
                id={"aria-labelledby"}
                primary={"Imagem sem título."}
              />
            ) : (
              <ListItemText
                id={"aria-labelledby"}
                primary={"Gráfico sem título."}
              />
            )}
          </>
        )}

        <IconButton edge="end" aria-label="comments" onClick={props.delete}>
          <Delete />
        </IconButton>
      </ListItem>
    </>
  );
};

export default ListaComponentes;
