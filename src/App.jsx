import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import FormularioInicial from './components/FormularioInicial'

function App() {

  return (
    <>
    <HashRouter>
        {/* <Layout> */}
        <Routes>
          {/* <Route element={<Layout />}> */}
            <Route exact path="/*" element={<Home/>} />
         
            <Route exact path="/formInicial" element={<FormularioInicial/>} />
          {/* </Route> */}
            {/* <Route exact path="/consultaPadronGeneral" element={<ConsultaPadron/>} /> */}
        </Routes>
     
    </HashRouter>
    </>
  )
}

export default App
