import React, { useState, useEffect } from "react";
import "../components/css/FormularioEstagio.css";
import "../components/css/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

function FormularioEstagio() {
  const [nomeEstagio, setNomeEstagio] = useState("");
  const [estagios, setEstagios] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  async function adicionarEstagio() {
    if (!nomeEstagio.trim()) {
      alert("Estágio inválido.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/devstage",
        { stage: nomeEstagio },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Estágio cadastrado com sucesso!");
      buscarEstagios();
      setNomeEstagio("");
    } catch (erro) {
      if (erro.response) {
        console.log("Status:", erro.response.status);
        console.log("Erro:", erro.response.data);
      } else {
        console.log("Erro sem resposta do servidor:", erro);
      }
    }
  }

  async function buscarEstagios() {
    try {
      const response = await axios.get("http://localhost:8080/devstage", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setEstagios(response.data);
      console.log("Estágios recebidos:", response.data);
    } catch (erro) {
      console.log("Erro ao buscar estágios:", erro);
    }
  }

  useEffect(() => {
    buscarEstagios();
  }, []);

  function iniciarEdicao(estagio) {
    console.log("Iniciar edição -> Recebido:", estagio);
    setNomeEstagio(estagio.stage);
    setIdEditando(estagio.id);
    setEditando(true);
  }

  async function alterarEstagio() {
    console.log("ID usado no PUT:", idEditando);
    if (!nomeEstagio.trim()) {
      alert("O nome não pode ficar vazio");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/devstage/${idEditando}`,
        { stage: nomeEstagio },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Estágio atualizado com sucesso!");
      setNomeEstagio("");
      setEditando(false);
      setIdEditando(null);
      buscarEstagios();
    } catch (erro) {
      console.log("Erro ao atualizar:", erro);
    }
  }

  async function deletarEstagio(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este estágio?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/devstage/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      alert("Estágio excluído com sucesso!");
      buscarEstagios();
    } catch (erro) {
      console.log("Erro ao excluir estágio:", erro);
    }
  }

  return (
    <div className="form-container">
      <Link to="/home" className="btn-voltar">Voltar</Link>

      <h1 className="titulo">ESTÁGIOS</h1>

      <label>Nome do estágio:</label>
      <input
        value={nomeEstagio}
        onChange={(e) => setNomeEstagio(e.target.value)}
        type="text"
        className="input"
        placeholder="Nome do estágio"
      />

      <div className="linha">
        <button className="btn-add" disabled={editando} onClick={adicionarEstagio}>
          + Adicionar estágio
        </button>
        <button className="btn-alterar" disabled={!editando} onClick={alterarEstagio}>
          Alterar
        </button>
      </div>

      <h2 className="subtitulo">Estágios Criados</h2>

      <div className="lista-estagios">
        {estagios.map((item) => (
          <div key={item.id} className="estagio-linha">
            <input
              type="text"
              className="input"
              value={item.stage}
              readOnly={true}
            />

            <div className="icons">
              <button
                className="icon-button"
                onClick={() => iniciarEdicao(item)}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>

              <button
                className="icon-button delete"
                onClick={() => deletarEstagio(item.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormularioEstagio;