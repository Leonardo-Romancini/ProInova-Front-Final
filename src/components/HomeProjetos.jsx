import React, {useState, useEffect} from "react";
import axios from "axios";
import "../components/css/Home.css";



function HomeProjetos() {

  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/projects")
      .then(response => {
        setProjetos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

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
                src={projeto.imagem_url}
                alt={projeto.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
              />
            </div>

            {/* Título vindo do banco */}
            <h3>{projeto.title}</h3>

            {/* Link para ver mais — opcional, pode usar o ID do projeto */}
            <a href={`/projects/${projeto.id}`} className="project-link">
              Ver mais do projeto
            </a>

          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeProjetos;