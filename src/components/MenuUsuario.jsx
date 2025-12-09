import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/css/Home.css"

function MenuUsuario() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/home";
    }
    useEffect(() => {
        async function loadUser() {
            try {
                const response = await axios.get("http://localhost:8080/user", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        }

        loadUser();
    }, []);
    return (
        <>
            {/* Ícone no header */}
            <span onClick={() => setOpen(true)} className="material-symbols-outlined">
                account_circle
            </span>

            {/* Overlay para clicar fora e fechar */}
            {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

            {/* MENU LATERAL */}
            <div className={`sidebar ${open ? "open" : ""}`}>

                {/* TOPO */}
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <div>
                            <p className="user-name">{user?.name}</p>
                            <p className="user-email">{user?.username}</p>
                        </div>
                    </div>


                    <p className="section-title"><b>PROJETOS</b></p>
                    <div className="menu-item">
                        <span className="material-symbols-outlined">add</span>
                        <Link to="/projeto-criar">Criar projeto</Link>
                    </div>
                    <div className="menu-item">
                        <span className="material-symbols-outlined">
                            view_list
                        </span>
                        <a href="/meus-projetos">Meus projetos</a>
                    </div>
                    {user?.role === "ADMIN" && (
                        <div className="menu-item">
                            <span className="material-symbols-outlined">
                                checklist_rtl
                            </span>
                            <Link to="/estagio">Estágios de Dev</Link>
                        </div>
                        
                    )}
                    {user?.role === "ADMIN" && (
                        <div className="menu-item">
                            <span className="material-symbols-outlined">
                                checklist_rtl
                            </span>
                            <Link to="/area">Área de atuação</Link>
                        </div>
                        
                    )}
                    <p className="section-title"><b>MINHA CONTA</b></p>

                    <div className="menu-item">
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                       <Link to="/configuracoes">Configurações</Link>
                    </div>

                </div>

                {/* RODAPÉ */}
                <div className="sidebar-footer" onClick={logout}>
                    <p className="logout-text">Sair</p>
                    <span className="material-symbols-outlined">logout</span>

                </div>

            </div>
        </>
    );
}

export default MenuUsuario;