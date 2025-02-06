import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FormularioInicial from './components/FormularioInicial'
import PreInscripcionExitosa from './pages/PreInscripcionExitosa'
import ListarPreInscriptos from './pages/ListarPreInscriptos'
import Inscripcion from './components/Inscripcion'

function App() {

  return (
    <>
    <HashRouter>
        {/* <Layout> */}
        <Routes>
          {/* <Route element={<Layout />}> */}
            <Route exact path="/*" element={<Home/>} />
            {/* <Route exact path="/formInicial" element={<FormularioInicial/>} /> */}
            <Route exact path="/formInicial" element={<Inscripcion/>} />
            <Route exact path="/preinscripcionExitosa" element={<PreInscripcionExitosa/>} />
            <Route exact path="/listarPreInscriptos" element={<ListarPreInscriptos/>} />
          {/* </Route> */}
            {/* <Route exact path="/consultaPadronGeneral" element={<ConsultaPadron/>} /> */}
        </Routes>
     
    </HashRouter>
    </>
  )
}

export default App
