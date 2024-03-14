import { useState, useEffect } from 'react';
import './FormsChange.css';
import InputForms from '../../Components/Input Forms/InputForms.js'
import Button from '../../Components/Button/Button.js'
import { useNavigate } from 'react-router-dom'
import RadioButton from '../../Components/RadioButton/RadioButton.js'
import axios from 'axios'

export default function FormsChange({ user, onClose }) {
    const [adminChecked, setAdminChecked] = useState(false);
    const [estoquistaChecked, setEstoquistaChecked] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        grupo: '',
        senha: '',
        confirmarSenha: ''
    });
    console.log('dados recebidos::: ', formData)

    useEffect(() => {
        if (user) {
            setAdminChecked(user.grupo === 'administrador');
            setEstoquistaChecked(user.grupo === 'estoquista');
            setFormData({
                id: user.id,
                nome: user.nome || '',
                cpf: user.cpf || '',
                grupo: user.grupo || '',
                senha: '',
                confirmarSenha: ''
            });

            console.log('USER RECEBIDO PARA TESTE :::::>>> ', user)
        }
    }, [user]);

    const handleInputChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAdminChange = () => {
        setAdminChecked(true);
        setEstoquistaChecked(false);
        setFormData((prevState) => ({
            ...prevState,
            grupo: 'administrador',
        }));
    };

    const handleEstoquistaChange = () => {
        setAdminChecked(false);
        setEstoquistaChecked(true);
        setFormData((prevState) => ({
            ...prevState,
            grupo: 'estoquista',
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();


        try {
            const response = await axios.put(`http://localhost:3033/alterar-usuario?id=${user.id}`, formData, {
                withCredentials: true,  // Isso incluirá as credenciais na requisição
            });
            
            if (response.status === 200) {
                console.log('Usuário atualizado com sucesso.');
                onClose(); // Fechar o modal após a atualização bem-sucedida
            } else {
                console.error('Falha ao atualizar usuário:', response.data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    }

    return (
        <>
            <div className={'blur-background'}></div>
            <div className={'container_FormsChange'}>
                <form onSubmit={handleSubmit}>
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
                            {/*  <InputForms
                                placeholderInput='CPF'
                                type='text'
                                name='cpf'
                                value={formData.cpf}
                                onChange={(value) => handleInputChange('cpf', value)}
                            /> */}
                        </div>
                    </div>
                    <div className='container__grupo'>
                        <h2>Permissões do sistema / Grupo</h2>
                        <div className='container__radio__button'>
                            <RadioButton
                                name='admin'
                                value='administrador'
                                nameValue='Administrador'
                                checked={adminChecked}
                                onChange={handleAdminChange}
                            />
                            <RadioButton
                                name='estoquista'
                                value='estoquista'
                                nameValue='Estoquista'
                                checked={estoquistaChecked}
                                onChange={handleEstoquistaChange}
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
                            onClick={onClose}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}