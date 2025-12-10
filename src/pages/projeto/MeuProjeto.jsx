import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HomeProjetosUsuario from '../../components/HomeProjetosUsuario';
import Login from '../../pages/login/Login'
import { BrowserRouter } from 'react-router-dom'


function MeuProjeto () {

    return (
    <>
        <div className="home">
          <Navbar />
            <HomeProjetosUsuario></HomeProjetosUsuario>
          <Footer></Footer>
        </div>
    </>
  )
}

export default MeuProjeto