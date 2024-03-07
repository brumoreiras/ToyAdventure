import Button from '../../Components/Button/Button.js'
import InputLogin from '../../Components/InputLogin/InputLogin.js'
import './Login.css'
import logo from './ToyAdventure.svg'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    async function aoSalvar(evento) {
        evento.preventDefault()
        try {
            const response = await fetch("http://localhost:3033/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            })
            const data = await response.json();

            if (response.ok) {
                // Login válido
                navigate("/painel-controle");
                /* console.log("Login realizado com sucesso ",data.nomeUsuario); */
            } else {
                // Login inválido
                console.log("erro de acesso")
            }

            console.log(data);
            console.log(data.name)
            console.log(data)
        } catch (error) {
            console.error('Ocorreu um erro ao fazer login:', error);
        }

        console.log('botao clicado => ', email, senha)
    }

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
                        onClick={aoSalvar}
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