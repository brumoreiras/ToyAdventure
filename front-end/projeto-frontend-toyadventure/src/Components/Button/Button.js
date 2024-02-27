/*
Preparar o botão quando for usar passando uma função callback para poder ter uma ação
Para usar o botão ele espera receber os seguintes parametros
O estilo, uma função callback que realiza a ação o nome do botão.
*/
import './Button.css'

const buttonStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    dangerYes: 'btn-danger-yes',
    dangerNo: 'btn-danger-no',
    add: 'btn-add'

};


export default function Button({ styleType, children, onClick }) {

    const style = buttonStyles[styleType] || buttonStyles.primary;

    return (
        <button className={`btn ${style}`} onClick={onClick}>
            {children}
        </button>
    );
}