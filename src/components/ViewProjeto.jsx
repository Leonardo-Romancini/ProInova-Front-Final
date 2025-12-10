import React, { useEffect, useState } from "react";
import "../components/css/ViewProjeto.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewProjeto() {

  const { id } = useParams();

  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    carregarProjeto();
  }, []);

  async function carregarProjeto() {
    try {
      const resposta = await axios.get(`http://localhost:8080/projects/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      setProjeto(resposta.data);
      console.log("Projeto carregado:", resposta.data);

    } catch (erro) {
      console.log("Erro ao carregar projeto:", erro);
      alert("Não foi possível carregar o projeto.");
    }
  }

  if (!projeto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="visualizar-container">

      {/* Apenas botão de voltar */}
      <div className="botoes-acoes">
        <a href="/home" className="btn-voltar-view">
          ← Voltar
        </a>
      </div>

      <h1 className="titulo">{projeto.title}</h1>

      {/* Área do projeto */}
      <div className="info-top">
        <div className="campo">
          <span className="label">Área de atuação:</span>
          <span className="valor">{projeto.activityArea?.area}</span>
        </div>

        <div className="campo">
          <span className="label">Fundos atuais:</span>
          <span className="valor">R$ {projeto.currentFund}</span>
        </div>

        <div className="campo">
          <span className="label">Meta de fundos:</span>
          <span className="valor">R$ {projeto.fundGoal}</span>
        </div>
      </div>

      {/* Imagem */}
      <div className="imagem-box">
        <img src={`http://localhost:8080${projeto.imageUrl}`} alt="Imagem do Projeto" />
      </div>

      {/* Descrição */}
      <div className="descricao-box">
        <h2>Descrição</h2>
        <p className="descricao-texto">{projeto.description}</p>
      </div>

      {/* Equipe */}
      <div className="equipe-box">
        <h2>Equipe</h2>
        <ul>
          {projeto.members?.map((membro, index) => (
            <li key={index}>{membro}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default ViewProjeto;