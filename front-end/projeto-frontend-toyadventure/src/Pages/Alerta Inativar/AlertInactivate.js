import './AlertInactivate.css';

export default function AlertInactivate({ }) {
    return (
        <div className='container_AlertInactivate'>

            <Alert
                titulo='Alerta'
                texto='Tem certeza de que deseja Inativar este usuário? Ao inativar este usuário, ele perderá o acesso ao sistema e aos módulos associados ao seu grupo.'
                botoes={[
                    { texto: 'Sim', styleType: 'dangerYes', onClick: () => console.log('Botão Sim clicado') },
                    { texto: 'Não', styleType: 'dangerNo', onClick: () => console.log('Botão não clicado') },
                ]}
            />
        </div>
    )
}