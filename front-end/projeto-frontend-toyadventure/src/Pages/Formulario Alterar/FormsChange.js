import Alert from '../../Components/Alert/Alert.js';
import './FormsChange.css';

export default function FormsChange({ }) {
    return (
        <div className='container_FormsChange'>
            
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