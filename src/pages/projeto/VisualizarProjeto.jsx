import React from 'react'
import Navbar from "../../components/Navbar";
import Footer from '../../components/Footer'
import ViewProjeto from '../../components/ViewProjeto';

function VisualizarProjeto() {
  return (
    <div className="body">
        <Navbar></Navbar>
        <ViewProjeto></ViewProjeto>
        <Footer></Footer>
    </div>
  )
}

export default VisualizarProjeto