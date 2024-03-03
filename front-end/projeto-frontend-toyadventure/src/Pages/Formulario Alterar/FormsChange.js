import React, { useState } from 'react'
import './FormsChange.css';
import InputForms from '../../Components/Input Forms/InputForms.js'
import Button from '../../Components/Button/Button.js'
import { useNavigate } from 'react-router-dom'

export default function FormsChange({ }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        grupo: '',
        senha: '',
        confirmarSenha: ''
    })

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function enviarDados(event) {
        event.preventDefault();

        console.log('Dados do formulário:', formData);
        console.log('teste deu certo');
    }

    return (
        <>
            <div className={'blur-background'}></div>
            <div className={'container_FormsChange'}>
                <form onSubmit={enviarDados}>
                    <div className='titulo'>
                        <h1>Alterar dados cadastrais</h1>
                    </div>

                    <div className='container__input__dados__pessoais'>
                        <h2>Dados pessoais</h2>
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
                            onClick={() => navigate(-1)}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}