import { useState } from 'react'
import FormularioLogin from '../../components/FormularioLogin'


function Login() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FormularioLogin></FormularioLogin>
    </>
  )
}

export default Login
