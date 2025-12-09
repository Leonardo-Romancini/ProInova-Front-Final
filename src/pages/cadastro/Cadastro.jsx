import { useState } from 'react'
import FormularioCadastro from '../../components/FormularioCadastro'


function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FormularioCadastro></FormularioCadastro>
    </>
  )
}

export default Home
