import Alert from '../../Components/Alert/Alert.js';
import './FormsChange.css';
import InputForms from '../Components/Input Forms/InputForms.js'

export default function FormsChange({ }) {
    return (
        <div className='container_FormsChange'>
            
       <div className='titulo'></div>
       <div className='sub__subtitulo'></div>
       <div className='titulo__container__input'>
        <h2>Dados pessoais</h2>
        <InputForms/>
       </div>

        </div>
    )
}