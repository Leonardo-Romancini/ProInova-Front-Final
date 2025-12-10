import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FormularioArea from '../../components/FormularioArea'

function Area() {

    return (
        <div className="body">
            <Navbar></Navbar>
            <FormularioArea></FormularioArea>
            <Footer></Footer>
        </div>
    )
}

export default Area;