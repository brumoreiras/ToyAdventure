import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Login/Login.js'
import ControlPanel from './Pages/Painel de Controle/ControlPanel.js'
import UserList from './Pages/Lista de Usuario/UserList.js'
import Header from './Components/Header/Header.js'
import FormsChange from './Pages/Formulario Alterar/FormsChange.js'
import SuccessRegister from './Pages/Alerta Sucesso/Cadastro/SuccessRegister.js'
import Register from './Pages/Register/Register.js'



export default function RouterApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/painel-controle' element={<ControlPanel />} />
                <Route path='/lista-de-usuario' element={<UserList />} />
                <Route path='/cadastrar-usuario' element={<Register />} />
                <Route path='/modal' element={<FormsChange />} />
                <Route path="/sucesso" element={<SuccessRegister />} />

            </Routes>
        </BrowserRouter>
    )
}
