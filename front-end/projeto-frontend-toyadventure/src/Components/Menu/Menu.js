import { Link } from 'react-router-dom';
import './Menu.css'
import Home from './home.svg'
import Produto from './box.svg'
import User from './profile-person.svg'
import Pedido from './bag.svg'

export default function Menu({ }) {
    return (
        <div className='container__menu'>
            <div className='container__options'>
                <h1>Menu</h1>
                <Link to='/painel-controle'>
                    <div className='container__options__home' >
                        <img src={Home} /><p>Home</p>
                    </div>
                </Link>
                <Link to='/lista-produto'>
                    <div className='container__options__produto' >
                        <img src={Produto} /><p>Produto</p>
                    </div>
                </Link>
                <Link to='/lista-de-usuario'>
                    <div className='container__options__user' >
                        <img src={User} /><p>Usuário</p>
                    </div>
                </Link>
                <Link to='/lista-pedidos'>
                    <div className='container__options__pedido' >
                        <img src={Pedido} /><p>Pedidos</p>
                    </div>
                </Link>

            </div>
        </div>
    )
}