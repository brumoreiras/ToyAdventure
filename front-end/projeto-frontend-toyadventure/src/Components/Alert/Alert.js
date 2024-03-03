import Button from '../Button/Button'
import './Alert.css'
export default function Alert({ titulo, texto, botoes }) {
    return (
        <div className="container__Alert">

            <h1 className='titulo'>{titulo}</h1>
            <p className='paragrafo'>{texto}</p>
            <div className='button'>
                {botoes.map((btn, index) => (
                    <Button
                        key={index}
                        styleType={btn.styleType}
                        onClick={btn.onClick}>
                        {btn.texto}
                    </Button>
                ))}
            </div>

        </div>
    )
}