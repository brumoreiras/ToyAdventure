import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



import './SingIn.css'
import Menu from '../../Components/Menu/Menu'
import InputForms from '../../Components/Input Forms/InputForms.js'
import Button from '../../Components/Button/Button.js';
import SuccessRegister from '../Alerta Sucesso/Cadastro/SuccessRegister.js';


export default function SingIn({ }) {

    // essa tela é de cadastro devo reestruturar e escrever outros nomes
    const nav = useNavigate()
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        grupo: '',
        email: '',
        senha: ''
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        setIsModalOpen(true)

    }


    return (
        <div className='container__page'>
            <Menu />
            <div className='container__register'>
                <form onSubmit={handleSubmit}>
                    <div className='titulo'>
                        <h1>Cadastrar usuário no sistema</h1>
                    </div>

                    <div className='container__input__dados__pessoais'>
                        <h2>Dados cadastrais</h2>
                        <h3>Dados pessoais</h3>
                        <div className='container__input'>
                            <InputForms
                                placeholderInput='Nome Completo'
                                type='text'
                                name='nome'
                                value={formData.nome}
                                onChange={(value) => handleInputChange('nome', value)}
                            />
                            <InputForms
                                placeholderInput='CPF'
                                type='text'
                                name='cpf'
                                value={formData.cpf}
                                onChange={(value) => handleInputChange('cpf', value)}
                            />
                        </div>
                    </div>
                    <div className='container__grupo'>
                        <h2>Permissões do sistema / Grupo</h2>
                        <div className='container__radio__button container__input'>
                            <InputForms
                                placeholderInput='Administrador'
                                type='radio'
                                name='grupo'
                                value='administrador'
                                onChange={(value) => handleInputChange('grupo', value)}
                            />
                            <InputForms
                                placeholderInput='Estoquista'
                                type='radio'
                                name='grupo'
                                value='estoquista'
                                onChange={(value) => handleInputChange('grupo', value)}
                            />
                        </div>
                    </div>
                    <div className='container__input__dados__pessoais'>
                        <h3>E-mail</h3>
                        <div className='container__input'>
                            <InputForms
                                placeholderInput='E-mail'
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={(value) => handleInputChange('email', value)}
                            />
                            <InputForms
                                placeholderInput='Confirme sua e-mail'
                                type='email'
                                name='confirmarEmail'
                                value={formData.confirmarEmail}
                                onChange={(value) => handleInputChange('confirmarEmail', value)}
                            />
                        </div>
                    </div>
                    <div className='container__input__dados__pessoais'>
                        <h3>Senha</h3>
                        <div className='container__input'>
                            <InputForms
                                placeholderInput='Senha'
                                type='password'
                                name='senha'
                                value={formData.senha}
                                onChange={(value) => handleInputChange('senha', value)}
                            />
                            <InputForms
                                placeholderInput='Confirme sua senha'
                                type='password'
                                name='confirmarSenha'
                                value={formData.confirmarSenha}
                                onChange={(value) => handleInputChange('confirmarSenha', value)}
                            />
                        </div>
                    </div>
                    <div className='container__button'>
                        <Button
                            styleType='dangerYes'
                            children='Salvar'
                            type='submit'
                        />
                        <Button
                            styleType='dangerNo'
                            children='Cancelar'
                            onClick={() => nav('/lista-de-usuario')}
                        />
                    </div>
                </form>
            </div>
            {isModalOpen && <SuccessRegister name={formData.nome} />}
        </div>
    )
}