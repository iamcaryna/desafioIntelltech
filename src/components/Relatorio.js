import React, { useState } from "react";
import Draggable from "react-draggable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// material ui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/material/Icon";
import BarChartIcon from "@mui/icons-material/BarChart";

import Modal from "./Modal";
import Grafico from "./Grafico";
import "./Relatorio.css";

const Relatorio = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [componente, setComponente] = useState();
  const [imagem_aux, setImagem_aux] = useState(null);
  const [imagem, setImagem] = useState([]);
  const [grafico, setGrafico] = useState([]);
  const [grafico_aux, setGrafico_aux] = useState(null);
  const [borda, setBorda] = useState();
  const [bordaValue, setBordaValue] = useState();
  const [cor, setCor] = useState();
  const [titulo, setTitulo] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setComponente();
    setImagem_aux();
    setGrafico_aux();
    setBorda();
  };

  const addImagem = (event) => {
    event.preventDefault();
    if (imagem_aux) {
      setImagem([
        ...imagem,
        {
          imagem: imagem_aux,
          titulo: titulo,
          borda: borda,
          largura: bordaValue,
          cor: cor,
        },
      ]);
    }
    if (grafico_aux) {
      setGrafico([
        ...grafico,
        {
          tipo: grafico_aux,
          titulo: titulo,
          borda: borda,
          largura: bordaValue,
          cor: cor,
        },
      ]);
    }

    setComponente();
    setGrafico_aux();
    setImagem_aux();
    setTitulo();
    setBorda();
    setBordaValue();
    setCor();
    setModalIsOpen(false);
  };

  const deleteImagem = (event, img) => {
    event.preventDefault();
    let index = imagem.findIndex((i) => i.imagem === img);

    imagem.splice(index, 1);
  };

  const generatePDF = () => {
    html2canvas(document.querySelector("#a4")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="main-div">
      <div className="modal">
        <Modal
          show={modalIsOpen}
          onCancel={closeModal}
          buttonClick={addImagem}
          componente={imagem_aux + grafico_aux}
        >
          <div className="modal-content">
            <div className="div-radio">
              <RadioGroup
                row
                name="componentes"
                onChange={(e) => setComponente(e.target.value)}
              >
                <FormControlLabel
                  value="imagem"
                  control={<Radio />}
                  label="Imagem"
                />
                <FormControlLabel
                  value="grafico"
                  control={<Radio />}
                  label="Gráfico"
                />
              </RadioGroup>
            </div>
            {componente && (
              <div className="div-form">
                {componente === "imagem" && (
                  <>
                    <h3>Imagem</h3>

                    <TextField
                      type="file"
                      name="imagem"
                      onChange={(event) => {
                        setImagem_aux(event.target.files[0]);
                      }}
                      style={{ width: 400, marginBottom: 10 }}
                      size="small"
                    ></TextField>
                  </>
                )}
                {componente === "grafico" && (
                  <>
                    <h3>Gráfico</h3>
                    <div className="div-radio-grafico">
                      <RadioGroup
                        row
                        name="graficos"
                        onChange={(e) => setGrafico_aux(e.target.value)}
                      >
                        <FormControlLabel
                          value="linha"
                          control={<Radio />}
                          label="Line"
                        />
                        <FormControlLabel
                          value="barra"
                          control={<Radio />}
                          label="Bar"
                        />
                        <FormControlLabel
                          value="pizza"
                          control={<Radio />}
                          label="Pie"
                        />
                      </RadioGroup>
                    </div>
                  </>
                )}

                <TextField
                  label="Título"
                  onChange={(e) => setTitulo(e.target.value)}
                  type="text"
                  style={{ width: 150, marginBottom: 10 }}
                  size="small"
                />

                <FormControl style={{ marginBottom: 10 }}>
                  <InputLabel id="label-borda">Borda</InputLabel>
                  <Select
                    labelId="label-borda"
                    defaultValue={false}
                    label="Borda"
                    onChange={(e) => setBorda(e.target.value)}
                    style={{ width: 150 }}
                  >
                    <MenuItem value="true">Sim</MenuItem>
                    <MenuItem value="false">Não</MenuItem>
                  </Select>
                </FormControl>

                {borda === "true" && (
                  <>
                    <TextField
                      label="Largura da borda (px)"
                      onChange={(e) => setBordaValue(e.target.value)}
                      type="text"
                      style={{ width: 200, marginBottom: 10 }}
                      size="small"
                    />

                    <TextField
                      label="Cor da borda"
                      onChange={(e) => setCor(e.target.value)}
                      type="color"
                      style={{ width: 200, marginBottom: 10 }}
                      size="small"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </Modal>
      </div>
      <div className="menu">
        <Button
          variant="contained"
          onClick={openModal}
          size="small"
          style={{ margin: 10 }}
        >
          Adicionar
        </Button>

        <Button
          variant="contained"
          onClick={generatePDF}
          size="small"
          style={{ margin: 10 }}
        >
          Imprimir
        </Button>
      </div>
      <div className="div-a4-componentes">
        <div id="a4">
          {imagem.length ? (
            imagem.map((img) => {
              return (
                <Draggable bounds="parent">
                  <div className="image">
                    {img.titulo && <p>{img.titulo}</p>}
                    <img
                      style={{
                        border: `${img.largura}px solid ${img.cor}`,
                        borderRadius: "5px",
                      }}
                      className="image"
                      alt="not fount"
                      width={"250px"}
                      src={URL.createObjectURL(img.imagem)}
                    />
                  </div>
                </Draggable>
              );
            })
          ) : (
            <></>
          )}
          {grafico &&
            grafico.map((g) => {
              return (
                <Draggable bounds="parent">
                  <div className="grafico">
                    {titulo && <p>{g.titulo}</p>}
                    <div
                      style={{
                        border: `${g.largura}px solid ${g.cor}`,
                        borderRadius: "5px",
                      }}
                    >
                      <Grafico tipo={g.tipo} />
                    </div>
                  </div>
                </Draggable>
              );
            })}
        </div>

        <div className="div-componentes">
          <h3>Imagens</h3>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {imagem.length ? (
              imagem.map((x) => {
                return (
                  <ListItem>
                    <Icon style={{ marginRight: 5 }}>
                      <img
                        className="image"
                        alt="not fount"
                        width={"250px"}
                        src={URL.createObjectURL(x.imagem)}
                      />
                    </Icon>
                    {x.titulo ? (
                      <ListItemText
                        id={"aria-labelledby"}
                        primary={`Título: ${x.titulo}.`}
                      />
                    ) : (
                      <ListItemText
                        id={"aria-labelledby"}
                        primary={"Imagem sem título."}
                      />
                    )}

                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={(e) => deleteImagem(e, x.imagem)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })
            ) : (
              <p>Não há imagens.</p>
            )}
          </List>
        </div>
        <div className="div-componentes">
          <h3>Gráficos</h3>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {grafico.length ? (
              grafico.map((x) => {
                return (
                  <ListItem>
                    <Icon style={{ marginRight: 5 }}>
                      <BarChartIcon />
                    </Icon>
                    {x.titulo ? (
                      <ListItemText
                        id={"aria-labelledby"}
                        primary={`Título: ${x.titulo}.`}
                      />
                    ) : (
                      <ListItemText
                        id={"aria-labelledby"}
                        primary={"Gráfico sem título."}
                      />
                    )}

                    <IconButton
                      edge="end"
                      aria-label="comments"
                      // onClick={(e) => deleteImagem(e, x.imagem)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                );
              })
            ) : (
              <p>Não há gráficos.</p>
            )}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Relatorio;
