import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import './Header.css'
import Logo from './Logo.png'
import AccontCircle from './account_circle.png'
import Profile from '../Profile/Profile.js'

export default function Header({ }) { //Preciso renderizar um nome para indicar quem está logado
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation()
    const isLoginPage = location.pathname === '/'

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    /*const handleLogout = () => {
          setIsModalOpen(false)
          console.log("Redirecionando para a página de login...");
      }; */

    return (
        <div className='container__header'>
            <img src={Logo} alt='imagem teste' />
            {!isLoginPage && (
                <div className='user__name' onClick={toggleModal}>
                    <p>Administrador/Estoquista</p>
                    <img className='customer' src={AccontCircle} />
                </div>
            )}

            {!isLoginPage && isModalOpen && <Profile toggleModal={toggleModal} />}



        </div>
    )
}