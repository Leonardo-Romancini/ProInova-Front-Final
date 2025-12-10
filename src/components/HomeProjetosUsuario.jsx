import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/Home.css";
import { useLocation, useNavigate } from "react-router-dom";

function HomeProjetosUsuario() {
  const [projetos, setProjetos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const search = params.get("search") || "";
  const areaId = params.get("areaId") || "";

  useEffect(() => {
    // Buscar apenas projetos do usuário logado
    axios.get("http://localhost:8080/user/projects", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
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
      console.error("Erro ao buscar projetos do usuário:", error);
    });
  }, [search, areaId]);

  const handleVerMais = (id) => {
    navigate(`/viewprojeto/${id}`);
  };

  const handleEditar = (id) => {
    navigate(`/projeto-editar/${id}`);
  };

  return (
    <div className="main-section">
      <div className="headline">
        <h1>Meus Projetos</h1>
      </div>

      <div className="projects">
        {projetos.length > 0 ? (
          projetos.map((projeto) => (
            <div key={projeto.id} className="project-card">
              <div className="project-image">
                <img
                  src={`http://localhost:8080${projeto.imageUrl}`}
                  alt={projeto.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>

              <h3>{projeto.title}</h3>

              <div className="project-buttons">
                <button onClick={() => handleVerMais(projeto.id)} className="btn-ver-mais">
                  Ver mais
                </button>
                <button onClick={() => handleEditar(projeto.id)} className="btn-editar">
                  Editar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default HomeProjetosUsuario;