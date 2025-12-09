import React, { useState } from "react";
import "../components/css/FormularioEstagio.css";
import "../components/css/Home.css";
import { Link } from "react-router-dom";

function FormularioEstagio() {
  const [nomeEstagio, setNomeEstagio] = useState("");
  const [estagios, setEstagios] = useState([]);

  const adicionarEstagio = () => {
    if (!nomeEstagio.trim()) return;

    setEstagios([...estagios, { id: Date.now(), nome: nomeEstagio }]);
    setNomeEstagio("");
  };

  const excluirEstagio = (id) => {
    setEstagios(estagios.filter((e) => e.id !== id));
  };

  return (
      <div className="form-container">
        <Link to="/home" className="btn-voltar">Voltar</Link>

        <h1 className="titulo">ESTÁGIO DE DESENVOLVIMENTO</h1>

        <label>Nome do estágio:</label>
        <input type="text" className="input" placeholder="Nome do estágio" />

        <div className="linha">
          <button className="btn-add">+ Adicionar estágio de dev</button>
          <button className="btn-salvar">Salvar</button>
        </div>

        <h2 className="subtitulo">Estágios Criados</h2>

        <div className="lista-estagios">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className="estagio-linha">
              <input
                type="text"
                className="input"
                placeholder="Nome do estágio"
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

export default FormularioEstagio;
