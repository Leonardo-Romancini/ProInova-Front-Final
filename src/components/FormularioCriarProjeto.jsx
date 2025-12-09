import React, { useEffect, useState } from 'react'
import "../components/css/FormularioCriarProjeto.css"
import { Link } from "react-router-dom";

function FormularioCriarProjeto() {
    const [titulo,setTitulo] = useState("");
    const [descricao,setDescricao]=useState("");
    const [imagem, setImagem]=useState("");
    const [areaEstagio, setAreaEstagio]=useState("")
    const [areaAtuacao, setAreaAtuacao]=useState("")
    const [fundo, setFundo] = useState("");
    const [meta, setMeta] = useState("");
    const [membro, setMembro] = useState([]);

    function formatarMoeda(valor) {
        valor = valor.replace(/\D/g, "");
        const numero = Number(valor);
        const formatado = (numero / 100).toFixed(2);

        return formatado
            .replace(".", ",")
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
        const novos = membro.filter((_, i) => i !== index);
        setMembro(novos);
    }

    async function create() {
        try {
            const response = await axios.post("http://localhost:8080/projects", {
                "title": titulo,
                "description": "Descrição detalhada",
                "currentFund": 500.00,
                "fundGoal": 1000.00,
                "members": ["João", "Maria"],
                "imageUrl": "/uploads/filename",
                "activityAreaId": 1,
                "devStageId": 1
            })

        } catch (erro) {
            alert("Erro ao criar projeto")
            console.log(erro)
        }
    }

    return (
        <div>
            <div className="form-container">
                <Link to="/home" className='btn-voltar'>Voltar</Link>
                <h1 className="titulo">CRIAR PROJETO</h1>

                <label>Título do Projeto</label>
                <input value={titulo} type="text" className="input" placeholder="Ex: Projeto de pesquisa" />

                <label>Área de atuação</label>
                <select className="input">
                    <option>Selecione uma área de atuação</option>
                </select>

                <label>Estágio de desenvolvimento</label>
                <select className="input">
                    <option>Selecione um estágio de desenvolvimento</option>
                </select>

                <label>Descrição do projeto</label>
                <textarea className="textarea" placeholder="Fale sobre seu projeto!" />

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
                        <input type="file" className="input" />
                    </div>
                </div>

                <label>Membros do projeto</label>
                <button onClick={addMember} className="btn-add">+ Adicionar membro</button>

                {/* for */}
                {membro.map((membro, index) => (
                    <div key={index} className="membro-linha">
                        <input
                            type="text"
                            className="input"
                            placeholder="Nome do membro"
                            value={membro}
                            onChange={(e) => atualizarMembro(index, e.target.value)}
                        />

                        <div className="icons">
                            <span onClick={() => removerMembro(index)} className="material-symbols-outlined">delete</span>
                        </div>
                    </div>
                ))}


                <button onClick={() => create()} className="btn-criar">CRIAR PROJETO</button>
            </div>
        </div>
    )
}

export default FormularioCriarProjeto;
