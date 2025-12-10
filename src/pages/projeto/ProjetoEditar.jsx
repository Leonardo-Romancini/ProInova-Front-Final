import React from 'react'
import Navbar from "../../components/Navbar";
import FormularioEditarProjeto from '../../components/FormularioEditarProjeto';
import Footer from '../../components/Footer'

function ProjetoEditar() {
  return (
    <div className="body">
        <Navbar></Navbar>
        <FormularioEditarProjeto></FormularioEditarProjeto>
        <Footer></Footer>
    </div>
  )
}

export default ProjetoEditar