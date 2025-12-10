import React, { useState, useEffect } from 'react'
import "../components/css/FormularioCriarProjeto.css"
import { Link } from "react-router-dom";
import axios from 'axios';

function FormularioCriarProjeto() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState(null);
    const [fundo, setFundo] = useState("");
    const [meta, setMeta] = useState("");
    const [membro, setMembro] = useState([]);
    const [areas, setAreas] = useState([]);
    const [estagios, setEstagios] = useState([]);
    const [areaSelecionada, setAreaSelecionada] = useState("");
    const [estagioSelecionado, setEstagioSelecionado] = useState("");

    function formatarMoeda(valor) {
        valor = valor.replace(/\D/g, "");
        const numero = Number(valor);
        const formatado = (numero / 100).toFixed(2);

        return formatado
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function handleFundo(e) {
        setFundo(formatarMoeda(e.target.value));
    }

    function handleMeta(e) {
        setMeta(formatarMoeda(e.target.value));
    }

    function addMember() {
        setMembro([...membro, ""]);
    }

    function atualizarMembro(index, valor) {
        const novos = [...membro];
        novos[index] = valor;
        setMembro(novos);
    }

    function removerMembro(index) {
        setMembro(membro.filter((_, i) => i !== index));
    }

    function handleImage(e) {
        setImagem(e.target.files[0]);
    }

    useEffect(() => {
        carregarAreas();
        carregarEstagios();
    }, []);

    async function carregarAreas() {
        try {
            const resposta = await axios.get("http://localhost:8080/activityarea", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            setAreas(resposta.data);
            console.log(resposta.data)
        } catch (err) {
            console.log("Erro ao carregar áreas", err);
        }
    }

    async function carregarEstagios() {
        try {
            const resposta = await axios.get("http://localhost:8080/devstage", {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            setEstagios(resposta.data);
            console.log(resposta.data)
        } catch (err) {
            console.log("Erro ao carregar estágios", err);
        }
    }

    async function create() {
        let uploadedImageUrl = "";

        try {
            if (imagem) {
                const formData = new FormData();
                formData.append("file", imagem);

                const imageResponse = await axios.post(
                    "http://localhost:8080/projects/uploadImage",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }
                );

                uploadedImageUrl = await imageResponse.data; // Ajuste conforme seu backend
                console.log(imageResponse)
            }
        } catch (error) {
            alert("Erro ao fazer upload da imagem");
            console.log(error);
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/projects",
                {
                    title: titulo,
                    description: descricao,
                    currentFund: fundo,
                    fundGoal: meta,
                    members: membro,
                    imageUrl: uploadedImageUrl,
                    activityAreaId: areaSelecionada,
                    devStageId: estagioSelecionado,
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            );

            alert("Projeto criado com sucesso!");

        } catch (erro) {
            alert("Erro ao criar projeto");
            console.log(erro);
        }
    }

    return (
        <div>
            <div className="form-container">
                <Link to="/home" className='btn-voltar'>Voltar</Link>
                <h1 className="titulo">CRIAR PROJETO</h1>

                <label>Título do Projeto</label>
                <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="Ex: Projeto de pesquisa"
                />

                <label>Área de atuação</label>
                <select
                    className="input"
                    value={areaSelecionada}
                    onChange={(e) => setAreaSelecionada(e.target.value)}
                >
                    <option value="">Selecione uma área de atuação</option>

                    {areas.map(area => (
                        <option key={area.id} value={area.id}>
                            {area.area}
                        </option>
                    ))}
                </select>

                <label>Estágio de desenvolvimento</label>
                <select
                    className="input"
                    value={estagioSelecionado}
                    onChange={(e) => setEstagioSelecionado(e.target.value)}
                >
                    <option value="">Selecione um estágio de desenvolvimento</option>

                    {estagios.map(estagio => (
                        <option key={estagio.id} value={estagio.id}>
                            {estagio.stage}
                        </option>
                    ))}
                </select>

                <label>Descrição do projeto</label>
                <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="textarea"
                    placeholder="Fale sobre seu projeto!"
                />

                <div className="linha">
                    <div className="coluna">
                        <label>Fundos Atuais:</label>
                        <input
                            value={fundo}
                            onChange={handleFundo}
                            className="input"
                            placeholder="Fundos atuais (R$)"
                        />
                    </div>

                    <div className="coluna">
                        <label>Meta de fundos:</label>
                        <input
                            value={meta}
                            onChange={handleMeta}
                            className="input"
                            placeholder="Meta de fundos (R$)"
                        />
                    </div>

                    <div className="coluna">
                        <label>Imagem do projeto</label>
                        <input
                            onChange={handleImage}
                            type="file"
                            className="input"
                        />
                    </div>
                </div>

                <label>Membros do projeto</label>
                <button onClick={addMember} className="btn-add">+ Adicionar membro</button>

                {membro.map((nome, index) => (
                    <div key={index} className="membro-linha">
                        <input
                            type="text"
                            className="input"
                            placeholder="Nome do membro"
                            value={nome}
                            onChange={(e) => atualizarMembro(index, e.target.value)}
                        />

                        <div className="icons">
                            <span
                                onClick={() => removerMembro(index)}
                                className="material-symbols-outlined"
                            >
                                delete
                            </span>
                        </div>
                    </div>
                ))}

                <button onClick={create} className="btn-criar">CRIAR PROJETO</button>
            </div>
        </div>
    );
}

export default FormularioCriarProjeto;
