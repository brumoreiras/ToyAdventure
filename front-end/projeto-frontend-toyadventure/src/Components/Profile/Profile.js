
import React from 'react'
import './Profile.css'
import icon_profile from './logout.svg'
export default function Profile({ name, toggleModal }) {

    const handleLogout = () => {
        // Lógica para redirecionar para a página de login
        console.log("Redirecionando para a página de login...");
    };

    const handleOutsideClick = (e) => {
        // Fecha o modal se o clique estiver fora do modal
        if (!e.target.closest('.container__profile')) {
            toggleModal();
        }
    };

    return (
        <div className='container__profile'>
            <div className='container__name'>
                <p>Bruno Moreira</p>
            </div>
            <div className='container__logout'>
                <img src={icon_profile} /><p>Sair</p>
            </div>
        </div>
    )
}