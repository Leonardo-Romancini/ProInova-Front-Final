import React, { useState, useEffect } from "react";
import "../components/css/FormularioArea.css";
import "../components/css/Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

function FormularioArea() {
  const [nomeArea, setNomeArea] = useState("");
  const [areas, setAreas] = useState([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  async function adicionarAreas() {
    if (!nomeArea.trim()) {
      alert("Área inválida.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/activityarea",{
         area: nomeArea ,
        },{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      console.log("Resposta da API:", response.data);
      alert("Área cadastrada com sucesso!");
      buscarAreas();
      setNomeArea("");
    } catch (erro) {
      if (erro.response) {
        console.log("Status:", erro.response.status);
        console.log("Erro:", erro.response.data);
      } else {
        console.log("Erro sem resposta do servidor:", erro);
      }
    }
  }

  async function buscarAreas() {
    try {
      const response = await axios.get("http://localhost:8080/activityarea", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setAreas(response.data);
    } catch (erro) {
      console.log("Erro ao buscar áreas:", erro);
    }
  }

  useEffect(() => {
    buscarAreas();
  }, []);

  function iniciarEdicao(area) {
    setNomeArea(area.area);
    setIdEditando(area.id);
    setEditando(true);
  }

  async function alterarArea() {
    if (!nomeArea.trim()) {
      alert("O nome não pode ficar vazio");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/activityarea/${idEditando}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        
        area: nomeArea
    });

      alert("Área atualizada com sucesso!");
      setNomeArea("");
      setEditando(false);
      setIdEditando(null);
      buscarAreas();
    } catch (erro) {
      console.log("Erro ao atualizar:", erro);
    }
  }

  async function deletarArea(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta área?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/activityarea/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      alert("Área excluída com sucesso!");
      buscarAreas();
    } catch (erro) {
      console.log("Erro ao excluir área:", erro);
    }
  }

  return (
    <div className="form-container">
      <Link to="/home" className="btn-voltar">Voltar</Link>

      <h1 className="titulo">ÁREA DE ATUAÇÃO</h1>

      <label>Nome da área:</label>
      <input
        value={nomeArea}
        onChange={(e) => setNomeArea(e.target.value)}
        type="text"
        className="input"
        placeholder="Nome da área"
      />

      <div className="linha">
        <button className="btn-add" disabled={editando} onClick={adicionarAreas}>
          + Adicionar área
        </button>
        <button className="btn-alterar" disabled={!editando} onClick={alterarArea}>
          Alterar
        </button>
      </div>

      <h2 className="subtitulo">Áreas Criadas</h2>

      <div className="lista-areas">
        {areas.map((item) => (
          <div key={item.id} className="area-linha">
            <input
              type="text"
              className="input"
              value={item.area}
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
                onClick={() => deletarArea(item.id)}
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

export default FormularioArea;