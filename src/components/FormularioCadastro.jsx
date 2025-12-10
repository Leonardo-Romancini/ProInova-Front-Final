import React from 'react'
import "../components/css/Cadastro.css"
import { Link,Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';


const FormularioCadastro = () => {
  /* AXIOS API CADASTRO */
  //const Api = axios.create({ baseURL: "http://localhost:8080", });
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate();
  
  async function cadastro() {

  if (email.trim() !== "" && !email.includes("@")) {
    alert("Email inválido.");
    return;
  }

    //verificar campos vazio 
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    alert("Por favor, preencha todos os campos antes de continuar.");
    return;
    }
    // verifica as senhas
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return; // impede que a requisição seja enviada
    }

    // post - conexão com backend 
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {

        name: name,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      })

      console.log("Resposta da API:", response.data);
      localStorage.setItem("token",response.data.token)
      alert("Usuário cadastrado com sucesso!");
      navigate("/home")

    } catch (erro) {
      if (erro.response) {
        // verifica usuario ja cadastrado
        if (erro.response.status === 400) {
          alert("Usuário já cadastrado.");
          setName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          console.log("Status:", erro.response.status);
          console.log("Erro:", erro.response.data);
        }
      } else {
        // Caso o Axios nem consiga conectar
        console.log("Erro sem resposta do servidor:", erro);
      }
    }

  }
  return (
    <div>
      <div className="header-cadastro">
        <div className="return">
          <Link to="/home" className='return-button'><span className="material-symbols-outlined">chevron_backward</span></Link>
        </div>
        <div className="title">
          ProInova
        </div>
        <div className="aux"></div>
      </div>
      <div className='container'>
        <div className='cadastro-card'>
          <h2>Cadastre-se agora!</h2>
          <div id='camposLogin'>
            <label className='label-login' htmlFor="input-nome">Nome:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='input-cadastro' id="input-nome" />

            <label className='label-login' htmlFor="input-usuario">Nome de usuário:</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='input-cadastro' id="input-usuario" />

            <label className='label-login' htmlFor="input-email">Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='input-cadastro' id="input-email" />

            <label className='label-login' htmlFor="input-senha">Senha:</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='input-cadastro' id="input-senha" />

            <label className='label-login' htmlFor="input-senha-confirme">Confirme a senha:</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className='input-cadastro' id="input-senha-confirme" />

          </div>
          <div>
            <button onClick={cadastro} className='cadastrar-button'>Criar conta</button>
          </div>
          <div className='question'>
            <p>Já possui uma conta?</p>
            <Link to="/login" id='loginLink'>Entre aqui</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormularioCadastro;
