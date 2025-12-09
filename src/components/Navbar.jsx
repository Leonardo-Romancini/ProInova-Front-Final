import "../components/css/Home.css";
import { Link } from "react-router-dom";
import isAuthenticated from "../../src/components/isAuthenticated"
import MenuUsuario from "../../src/components/MenuUsuario"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Navbar() {

  const logado = isAuthenticated()
  

  return (
    <div className="header">

      <div className="navbar">
        <div className="logo">
          <Link to="/">PROINOVA</Link>
        </div>

        <div className="pesquisa">
          <input
            type="text"
            placeholder="Busque inovação"
            className="pesquisa-input"
          />
          <div className="divPesquisaBotao">
            <button className="pesquisaBotao"><FontAwesomeIcon icon={faMagnifyingGlass} size="2x"/></button>
          </div>
        </div>

        {logado ? (
         <MenuUsuario></MenuUsuario>
        
        ) : (

        <div className="user-button">
          <Link to="/cadastro" className="cadastrar-link">Cadastre-se</Link>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      )}
      </div>

      <div className="areas">
        <a href="#">Educação</a>
        <a href="#">Biotecnologia</a>
        <a href="#">Saúde</a>
        <a href="#">IoT</a>
      </div>


    </div>

  )
}

export default Navbar;
