import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HomeProjetos from '../../components/HomeProjetos';
import Login from '../../pages/login/Login'
import { BrowserRouter } from 'react-router-dom'


function Home() {

  return (
    <>
        <Navbar />
        <div className="home">
          <HomeProjetos></HomeProjetos>
          <Footer></Footer>
        </div>
    </>
  )
}

export default Home
