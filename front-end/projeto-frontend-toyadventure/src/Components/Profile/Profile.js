
import React from 'react'
import './Profile.css'
import icon_profile from './logout.svg'
import { Link } from 'react-router-dom';

export default function Profile({ name, toggleModal }) {


    return (
        <div className='container__profile'>
            <div className='container__name'>
                <p>Bruno Moreira</p>
            </div>
            <Link to="/">
                <div className='container__logout'>
                    <img src={icon_profile} />Sair
                </div>
            </Link>
        </div>
    )
}