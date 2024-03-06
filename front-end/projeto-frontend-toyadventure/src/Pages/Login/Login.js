import Button from '../../Components/Button/Button.js'
import InputLogin from '../../Components/InputLogin/InputLogin.js'
import './Login.css'
import logo from './ToyAdventure.svg'
import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


return (
    <div className='container__login'>
        <div className='container__info'>
            <div className='container__titulo'>
                <img src={logo} />
                <span>Entre para começar sua jornada de gerenciamento! </span>
            </div>
            <div className='container__texto'>
                <span>Bem-vindo ao ToyAdventure, seu portal para explorar um mundo de diversão e gerenciar com facilidade o estoque de produtos, usuários administrativos e do sistema. </span>
            </div>
        </div>
        <div className='container__inputs'>
            <h1>Login</h1>
            <div className='container__input__login'>

                <InputLogin
                    type="email"
                    obrigatorio={true}
                    label="E-mail"
                    placeholder="exemplo@exemplo.com.br"
                    valor={email}
                    aoAlterado={valor => setEmail(valor)}
                />

                <InputLogin
                    type="password"
                    obrigatorio={true}
                    label="Senha"
                    placeholder="Digite sua senha"
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)}
                />
            </div>
            <div className='container__buttons'>
                <Button
                    styleType='primary'
                    children='OK'
                />
                <Button
                    styleType='secondary'
                    children='Cancelar'

                />
            </div>

        </div>
    </div>

)
}