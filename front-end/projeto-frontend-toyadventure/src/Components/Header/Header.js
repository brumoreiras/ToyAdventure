import React, { useState } from 'react';
import './Header.css'
import Logo from './Logo.png'
import AccontCircle from './account_circle.png'
import Profile from '../Profile/Profile.js'

export default function Header({ }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='container__header'>
            <img src={Logo} alt='imagem teste' />
            <div className='user__name' onClick={toggleModal}>
                <p>Administrador/Estoquista</p>
                <img className='customer' src={AccontCircle} />
            </div>
            {isModalOpen && <Profile toggleModal={toggleModal} />}
        </div>
    )
}