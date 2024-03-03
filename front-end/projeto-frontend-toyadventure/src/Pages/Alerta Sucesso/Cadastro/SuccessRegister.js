import './SuccessRegister.css';
import Alert from '../../../Components/Alert/Alert.js'
import { useNavigate } from 'react-router-dom'



export default function SuccessRegister({ name }) {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate('/lista-de-usuario')
    };

    return (
        <>
            <div className={'blur-background'} ></div>

            <Alert
                titulo='Alerta'
                texto={`O cadastro do usuário ${name}, foi realizado com sucesso!`}
                botoes={[
                    {
                        texto: 'Fechar',
                        styleType: 'success',
                        onClick: handleGoBack
                    }
                ]}
            />

        </>

    )
}

