import './AlertActivation.css';
import Alert from '../../Components/Alert/Alert.js';

export default function AlertActivation({ }) {
    return (
        <div className='container_AlertActivation'>

            <Alert
                titulo='Alerta'
                texto='Tem certeza de que deseja Ativar este usuário? Ao ativar este usuário, ele terá acesso ao sistema e aos módulos de acordo com o grupo em que está cadastrado.'
                botoes={[
                    { texto: 'Sim', styleType: 'dangerYes', onClick: () => console.log('Botão Sim clicado') },
                    { texto: 'Não', styleType: 'dangerNo', onClick: () => console.log('Botão não clicado') },
                ]}
            />
        </div>
    )
}



