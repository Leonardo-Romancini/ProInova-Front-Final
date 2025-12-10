import "../components/css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import isAuthenticated from "../../src/components/isAuthenticated";
import MenuUsuario from "../../src/components/MenuUsuario";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilter,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {

  const logado = isAuthenticated();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState([]);
  const [mostrarMais, setMostrarMais] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  // Buscar TODAS as áreas
  useEffect(() => {
    axios.get("http://localhost:8080/activityarea")
      .then(response => {
        setAreas(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar áreas:", error);
      });
  }, []);

  // Dividir entre as 5 principais e o restante
  const top5 = areas.slice(0, 5);
  const restante = areas.slice(5);

  return (
    <div className="header">
      <div className="navbar">
        <div className="logo">
          <Link to="/">PROINOVA</Link>
        </div>

        <form className="pesquisa" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Busque inovação"
            className="pesquisa-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="divPesquisaBotao">
            <button className="pesquisaBotao" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
            </button>
          </div>
        </form>

        {logado ? (
          <MenuUsuario />
        ) : (
          <div className="user-button">
            <Link to="/cadastro" className='cadastrar-link'>Cadastre-se</Link>
            <Link to="/login" className='login-link'>Login</Link>
          </div>
        )}
      </div>

      {/* Áreas principais */}
      <div className="areas">
        {top5.map(area => (
          <a
            key={area.id}
            href={`/?areaId=${area.id}`}
          >
            {area.area}
          </a>
        ))}

        {/* Botão de expandir */}
        {restante.length > 0 && (
          <button
            className="btn-mais-areas"
            onClick={() => setMostrarMais(!mostrarMais)}
          >
            <FontAwesomeIcon icon={mostrarMais ? faChevronUp : faFilter} />
          </button>
        )}
      </div>

      {/* Área expandida */}
      {mostrarMais && (
        <div
          className={`todas-areas ${mostrarMais ? "open" : ""}`}
          style={{
            gridTemplateColumns: `repeat(${restante.length >= 6 ? 6 : restante.length}, auto)`
          }}
        >
          {restante.map(area => (
            <a
              key={area.id}
              className="area-item"
              href={`/?areaId=${area.id}`}
            >
              {area.area}
            </a>
          ))}
        </div>
      )}

    </div>
  );
}

export default Navbar;
