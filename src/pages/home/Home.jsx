import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HomeProjetos from '../../components/HomeProjetos';
import Login from '../../pages/login/Login'
import { BrowserRouter } from 'react-router-dom'


function Home() {

  return (
    <>
        <div className="home">
          <Navbar />
          <HomeProjetos></HomeProjetos>
          <Footer></Footer>
        </div>
    </>
  )
}

export default Home
