import React, { useState } from "react";
import "../components/css/FormularioArea.css";
import "../components/css/Home.css";
import { Link } from "react-router-dom";

function FormularioArea() {
  const [nomeArea, setNomeArea] = useState("");
  const [areas, setAreas] = useState([]);

  const adicionarAreas = () => {
    if (!nomeArea.trim()) return;

    setAreas([...areas, { id: Date.now(), nome: nomeArea }]);
    setNomeArea("");
  };

  const excluirArea = (id) => {
    setAreas(areas.filter((e) => e.id !== id));
  };

  return (
      <div className="form-container">
        <Link to="/home" className="btn-voltar">Voltar</Link>

        <h1 className="titulo">ÁREA DE ATUAÇÃO</h1>

        <label>Nome da área:</label>
        <input type="text" className="input" placeholder="Nome da área" />

        <div className="linha">
          <button className="btn-add">+ Adicionar área</button>
          <button className="btn-salvar">Salvar</button>
        </div>

        <h2 className="subtitulo">Áreas Criadas</h2>

        <div className="lista-areas">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="area-linha">
              <input
                type="text"
                className="input"
                placeholder="Nome da área"
              />

              <div className="icons">
                <span className="material-symbols-outlined">edit</span>
                <span className="material-symbols-outlined delete">delete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default FormularioArea;