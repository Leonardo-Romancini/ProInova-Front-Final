import { Routes, Route, Link, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import ProjetoCriar from "./pages/projeto/ProjetoCriar";
import Rotas from "./components/Rotas";
import Estagio from "./pages/estagio/Estagio";
import Area from "./pages/area/Area";
import Configuracoes from "./pages/configuracoes/Configuracoes";
import VisualizarProjeto from "./pages/projeto/VisualizarProjeto";
import MeuProjeto from "./pages/projeto/MeuProjeto";
import ProjetoEditar from "./pages/projeto/ProjetoEditar";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/projeto-criar" element={<Rotas><ProjetoCriar /></Rotas>}></Route>
        <Route path="/estagio" element={<Rotas><Estagio /></Rotas>}></Route>
        <Route path="/area" element={<Rotas><Area /></Rotas>}></Route>
        <Route path="/configuracoes" element={<Rotas><Configuracoes></Configuracoes></Rotas>}></Route>
        <Route path="/viewprojeto/:id" element={<Rotas><VisualizarProjeto /></Rotas>}></Route>
        <Route path="/meuprojeto" element={<Rotas><MeuProjeto /></Rotas>}></Route>
        <Route path="/projeto-editar/:id" element={<Rotas><ProjetoEditar /></Rotas>}></Route>
      </Routes>
  );
}

export default App;
