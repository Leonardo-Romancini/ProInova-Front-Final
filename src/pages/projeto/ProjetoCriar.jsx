import React from 'react'
import Navbar from "../../components/Navbar";
import FormularioCriarProjeto from '../../components/FormularioCriarProjeto';
import Footer from '../../components/Footer'

function ProjetoCriar() {
  return (
    <div className="body">
        <Navbar></Navbar>
        <FormularioCriarProjeto></FormularioCriarProjeto>
        <Footer></Footer>
    </div>
  )
}

export default ProjetoCriar