import './SuccessChange.css'

export default function SuccessChange({ }) {
    return (
        <div className='container_SuccessChange'>

            <Alert
                titulo='Alerta'
                texto='Os dados foram alterados com sucesso!'
                botoes={[
                    { texto: 'Fechar', styleType: 'success', onClick: () => console.log('Botão Sim clicado') }
                    
                ]}
            />
        </div>
    )
}
