import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function HomeProjetos() {

  const [projetos, setProjetos] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const search = params.get("search") || "";
  const areaId = params.get("areaId") || "";

  useEffect(() => {
    axios.get("http://localhost:8080/projects")
      .then(response => {

        let lista = response.data;

        // Filtro por texto (search)
        if (search.trim() !== "") {
          lista = lista.filter(projeto =>
            projeto.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Filtro por área de atuação (ID)
        if (areaId.trim() !== "") {
          lista = lista.filter(projeto =>
            String(projeto.activityArea?.id) === String(areaId)
          );
        }

        setProjetos(lista);
      })
      .catch(error => {
        console.error("Erro ao buscar projetos:", error);
      });

  }, [search, areaId]);

  const handleVerMais = (id) => {
    navigate(`/viewprojeto/${id}`);
  };

  return (
    <div className="main-section">
      <div className="headline">
        <h1>Chegou a hora de tirar sua ideia do papel.</h1>
      </div>

      <div className="projects">
        {projetos.map((projeto) => (
          <div key={projeto.id} className="project-card">

            {/* Imagem vinda do banco */}
            <div className="project-image">
              <img
                src={`http://localhost:8080${projeto.imageUrl}`}
                alt={projeto.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>

            {/* Título vindo do banco */}
            <h3>{projeto.title}</h3>


            <div className="project-buttons">
              <button onClick={() => handleVerMais(projeto.id)} className="btn-ver-mais">
                Ver mais
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeProjetos;