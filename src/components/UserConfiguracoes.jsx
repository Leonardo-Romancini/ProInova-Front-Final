import React, { useState, useEffect } from 'react'
import "../components/css/UserConfiguracoes.css"
import axios from 'axios'

function UserConfiguracoes() {

    const [nome, setNome] = useState("")
    const [username, setUsername] = useState("")
    const [senhaAtual, setSenhaAtual] = useState("")
    const [novaSenha, setNovaSenha] = useState("")

    async function getUsuario() {
        try {
            const response = await axios.get("http://localhost:8080/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setNome(response.data.name);
            setUsername(response.data.username);
            console.log(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsuario();
    }, []);

    async function putUsuario() {
        try {
            const response = await axios.post("http://localhost:8080/user/update-password", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Senha alterada com sucesso!");
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");

        } catch (error) {
            if (error.response?.status === 400) {
                alert("Senha atual incorreta.");
            } else {
                alert("Erro ao trocar senha.");
            }
            console.log(error);
        }

    }
    return (
        <div>
            <h1 className="titulo">CONFIGURAÇÕES</h1>
            <div className="config-card">
                <div className="left">

                    <label>Nome:</label>
                    <div className="input-edit">
                        <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" />
                        <span className="material-symbols-outlined edit-icon">edit</span>
                    </div>

                    <label>Nome de usuário:</label>
                    <div className="input-edit">
                        <input value={username} onChange={(e) => setNome(e.target.value)} type="text" />
                        <span className="material-symbols-outlined edit-icon">edit</span>
                    </div>

                </div>
                <div className="right">
                    <h3>Trocar senha:</h3>

                    <label>Senha antiga:</label>
                    <input value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} type="password" />

                    <label>Nova senha:</label>
                    <input value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} type="password" />

                    <button onClick={putUsuario} className="salvar-btn">
                        <span className="material-symbols-outlined">check</span> Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserConfiguracoes;