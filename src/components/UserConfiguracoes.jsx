import React, { useState, useEffect } from 'react';
import "../components/css/UserConfiguracoes.css";
import axios from 'axios';

function UserConfiguracoes() {

    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

    async function getUsuario() {
        try {
            const response = await axios.get("http://localhost:8080/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setNome(response.data.name);
            setUsername(response.data.username);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsuario();
    }, []);

    // Atualizar apenas o nome
    async function putNome() {
        if (!nome) return; // Não envia se estiver vazio
        try {
            await axios.put("http://localhost:8080/user/update-name", {
                name: nome
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            alert("Nome atualizado com sucesso!");
            getUsuario();

        } catch (error) {
            console.log(error);
            alert("Erro ao atualizar o nome.");
        }
    }

    // Atualizar apenas o username
    async function putUsername() {
        if (!username) return; // Não envia se estiver vazio
        try {
            await axios.put("http://localhost:8080/user/update-name", {
                username: username
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            alert("Nome de usuário atualizado com sucesso!");
            getUsuario();

        } catch (error) {
            console.log(error);
            alert("Erro ao atualizar o nome de usuário.");
        }
    }

    // Atualizar senha
    async function putUsuarioSenha() {
        if (novaSenha !== confirmarNovaSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            await axios.put("http://localhost:8080/user/update-password", {
                currentPass: senhaAtual,
                newPass: novaSenha,
                confirmPass: confirmarNovaSenha
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            alert("Senha alterada com sucesso!");
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarNovaSenha("");

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
                        <span 
                            className="material-symbols-outlined edit-icon" 
                            onClick={putNome}
                        >
                            edit
                        </span>
                    </div>

                    <label>Nome de usuário:</label>
                    <div className="input-edit">
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                        <span 
                            className="material-symbols-outlined edit-icon" 
                            onClick={putUsername}
                        >
                            edit
                        </span>
                    </div>
                </div>

                <div className="right">
                    <h3>Trocar senha:</h3>

                    <label>Senha antiga:</label>
                    <input value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} type="password" />

                    <label>Nova senha:</label>
                    <input value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} type="password" />

                    <label>Confirme a nova senha:</label>
                    <input value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} type="password" />

                    <button onClick={putUsuarioSenha} className="salvar-btn">
                        <span className="material-symbols-outlined">check</span> Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserConfiguracoes;