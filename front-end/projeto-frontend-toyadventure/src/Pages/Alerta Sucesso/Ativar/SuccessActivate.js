import './SucessActivate.css'

export default function SucessActivate({}){
    return (
        <div className='container_SucessActivate'>

            <Alert
                titulo='Alerta'
                texto='O acesso do usuário foi Ativado com sucesso!'
                botoes={[
                    { texto: 'Fechar', styleType: 'success', onClick: () => console.log('Botão Sim clicado') }
                ]}
            />
        </div>
    )
}