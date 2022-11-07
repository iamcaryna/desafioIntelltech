import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// material ui
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  List,
} from "@mui/material";

import Modal from "./Modal";
import ComponenteImagem from "./ComponenteImagem";
import ComponenteGrafico from "./ComponenteGrafico";
import ListaComponentes from "./ListaComponentes";
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
  const [cor, setCor] = useState("#000000");
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
          id: uidv4(),
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
          id: uidv4(),
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
    setCor("#000000");
    setModalIsOpen(false);
  };

  const uidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const deleteItem = (id, tipo, arr) => {
    let x = arr.filter((item) => item.id !== id);

    if (tipo === 0) setImagem(x);
    else setGrafico(x);
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
      <div className="div-relatorio">
        <div id="a4">
          <ComponenteImagem imagem={imagem} />
          <ComponenteGrafico grafico={grafico} />
        </div>
        <div className="div-componentes">
          <h3>Imagens</h3>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {imagem.length ? (
              imagem.map((x) => {
                return (
                  <ListaComponentes
                    componente="imagem"
                    icon={x.imagem}
                    titulo={x.titulo}
                    delete={() => deleteItem(x.id, 0, imagem)}
                  />
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
                  <ListaComponentes
                    componente="grafico"
                    icon=""
                    titulo={x.titulo}
                    delete={() => deleteItem(x.id, 1, grafico)}
                  />
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
