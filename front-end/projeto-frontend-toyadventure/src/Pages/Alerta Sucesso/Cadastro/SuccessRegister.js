import './SuccessRegister.css';

export default function SuccessRegister({ name }) {
    return (
        <div className='container_SuccessRegister'>
            <Alert
                titulo='Alerta'
                texto={`O cadastro do usuário ${name}, foi realizado com sucesso!`}
                botoes={[
                    { texto: 'Fechar', styleType: 'success', onClick: () => console.log('Botão Sim clicado') }
                ]}
            />
        </div>
    )
}

