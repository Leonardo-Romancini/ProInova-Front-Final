import { Navigate } from "react-router-dom";

let alertShown = false;


function Rotas ({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    if(!alertShown){
    alert("Cadastre-se ou faça o login para acessar essa página.");
    alertShown = true;
   
    }
     return <Navigate to="/home" replace />;
}

  return children;
}

export default Rotas;