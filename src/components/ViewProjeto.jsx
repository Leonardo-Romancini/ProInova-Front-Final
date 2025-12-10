import React from 'react'

function ViewProjeto() {
 return (
      <div className="main-section">
        <div className="headline">
          <h1>MEUS PROJETOS</h1>
        </div>

        <div className="projects">
          <div className="project-card">
            <div className="project-image">Foto/Logo do projeto</div>
            <h3>Título do projeto</h3>
            <a href="#" className="project-link">Ver mais do projeto</a>
          </div>

          <div className="project-card"></div>
          <div className="project-card"></div>
        </div>
      </div>
    )
}

export default ViewProjeto