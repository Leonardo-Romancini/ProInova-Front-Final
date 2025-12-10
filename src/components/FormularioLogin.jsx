import React, { useState } from 'react'
import "../components/css/Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const FormularioLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  async function login(){
    
    if (email.trim() !== "" && !email.includes("@")) {
    alert("Email inválido.");
    return;
  }

    //verificar campos vazio 
    if (!email.trim() || !password.trim()) {
    alert("Por favor, preencha todos os campos antes de continuar.");
    return;
    }
    // post - conexao com a api
    try{
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password
      })
      
      alert("Login com sucesso!")
      console.log(response.data)
      localStorage.setItem("token", response.data.token)
      navigate("/home")

    }catch(erro){
      if(erro.response){
        if(erro.response.status === 400){
          alert("Email ou senha incorreto!")
        }
        if(erro.response.status === 500){
          alert("Login não existente.")
        }
      }
      console.log(erro)
    }

  }

  return (
    <div>
      <div className="header-login">
        <div className="return">
          <Link to="/home" className='return-button'><span className="material-symbols-outlined">chevron_backward</span></Link>
        </div>
        <div className="title">
        ProInova
        </div>
        <div className="aux"></div>
      </div>
      <div className='container'>
        <div className='login-card'>
          <h2>Faça seu Login</h2>
          <div id='camposLogin'>

            <label className='label-login' htmlFor="input-email">Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='input-login' id="input-email" />

            <label className='label-login' htmlFor="input-senha">Senha:</label>
            <input value={password}  onChange={(e) => setPassword(e.target.value)} type="password" className='input-login' id="input-senha" />

          </div>
          <div>
            <button onClick={login}className='login-button'>Login</button>
          </div>
          <div className='question'>
            <p>Não possui uma conta?</p>
            <Link to="/cadastro" id='cadastroLink'>Crie uma agora!</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioLogin;
