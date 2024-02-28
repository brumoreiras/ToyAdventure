import './SucessInactivate.css'

export default function SucessInactivate({}){
    return (
        <div className='container_SucessInactivate'>

            <Alert
                titulo='Alerta'
                texto='O acesso do usuário foi Inativado com sucesso!'
                botoes={[
                    { texto: 'Fechar', styleType: 'success', onClick: () => console.log('Botão Sim clicado') }
                ]}
            />
        </div>
    )
}