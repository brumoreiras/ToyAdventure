import './Header.css'
import Logo from './Logo.png'
import AccontCircle from './account_circle.png'

export default function Header({}){
    return(
        <div className='container__header'>
            <img src={Logo} alt='imagem teste' />
            <div className='user__name'>
                <p>Administrador/Estoquista</p>
               <img className='customer' src={AccontCircle} />
            </div>
        </div>
    )
}