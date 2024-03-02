import Menu from '../../Components/Menu/Menu'
import './SingIn.css'
import InputForms from '../../Components/Input Forms/InputForms.js'
import Button from '../../Components/Button/Button.js';

export default function SingIn({ }) {
    return (
        <div className='container__page'>
            <Menu />
            <div className='container__register'>
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
                        />
                        <InputForms
                            placeholderInput='CPF'
                            type='text'
                        />
                    </div>
                </div>
                <div className='container__grupo'>
                    <h2>Permissões do sistema / Grupo</h2>
                    <div className='container__radio__button container__input'>
                        <InputForms
                            placeholderInput='Administrador'
                            type='radio'
                        />
                        <InputForms
                            placeholderInput='Estoquista'
                            type='radio'
                        />
                    </div>
                </div>
                <div className='container__input__dados__pessoais'>
                    <h3>E-mail</h3>
                    <div className='container__input'>
                        <InputForms
                            placeholderInput='E-mail'
                            type='email'
                        />
                        <InputForms
                            placeholderInput='Confirme sua e-mail'
                            type='email'
                        />
                    </div>
                </div>
                <div className='container__input__dados__pessoais'>
                    <h3>Senha</h3>
                    <div className='container__input'>
                        <InputForms
                            placeholderInput='Senha'
                            type='password'
                        />
                        <InputForms
                            placeholderInput='Confirme sua senha'
                            type='password'
                        />
                    </div>
                </div>
                <div className='container__button'>
                    <Button
                        styleType='dangerYes'
                        children='Salvar'
                        onClick
                    />
                    <Button
                        styleType='dangerNo'
                        children='Cancelar'
                        onClick
                    />
                </div>

            </div>
        </div>
    )
}