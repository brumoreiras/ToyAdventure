
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './UserList.css'
import Menu from '../../Components/Menu/Menu.js'
import Button from '../../Components/Button/Button.js'

import axios from 'axios'



import FormsChange from '../Formulario Alterar/FormsChange.js'

export default function UserList() {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3033/listar-usuario')
                setUsers(response.data)
                console.log(response)
            } catch (error) {
                console.error('Erro ao buscar usuários:', error)
            }
        }

        fetchUsers()
    }, [])

    const handleStatusChange = async (userId, currentStatus) => {
        console.log('userId:', userId);
        try {
            const newStatus = !currentStatus;
            const response = await axios.put(`http://localhost:3033/alterar-status?id=${userId}`, { ativo: newStatus });


            if (response.status === 200) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? { ...user, ativo: newStatus } : user
                    )
                );
            } else {
                console.error('Falha ao alterar status do usuário:', response.data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao alterar status do usuário:', error);
        }
    };


    return (
        <div className='container__user'>
            <Menu />
            <div className='container'>
                <div className='container__header__list'>
                    <h1>Consulta Usuário</h1>
                    <div className='input__seach'>
                        <input
                            type='text'
                            placeholder='Pesquisar usuário'
                        />
                        {/* <img src={search} /> */}
                    </div>
                    <Button
                        styleType='add'
                        children='Adicionar'
                        onClick={() => navigate('/cadastrar-usuario')}
                    />
                </div>
                <div className='container__subtitle'>
                    <h3>Lista de Usuário</h3>
                </div>

                <div className='container__table'>
                    <table>
                        <thead className='table__header'>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Grupo</th>
                                <th>Status</th>
                                <th>Alterar</th>
                                <th>Alterar Status</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map(user => (
                                
                                <tr key={user.id}>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.grupo}</td>
                                    <td>{user.ativo ? 'Ativo' : 'Inativo'}</td>

                                    <td className="button-cell">
                                        <Button
                                            styleType='alter'
                                            children='Alterar'
                                            onClick={() => {
                                                setSelectedUser(user)
                                                console.log('select :::: ', setSelectedUser(user))
                                                setIsModalOpen(true)
                                            }}
                                        />
                                    </td>
                                    <td className="button-cell">
                                        <Button
                                            styleType={user.ativo ? 'dangerNo' : 'add'}
                                            children={user.ativo ? 'Desativar' : 'Ativar'}
                                            onClick={() => {
                                                handleStatusChange(user.id, user.ativo)
                                                console.log('user id:::::: ', user.id)
                                            }}

                                        />
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                {users.length === 0 && (
                    <div className='info_user'>
                        <p>Não possui mais registros</p>
                    </div>
                )}
            </div>

            {isModalOpen && <FormsChange
                user={selectedUser}
                onClose={() => setIsModalOpen(false)}
            />
            }
        </div>
    )
}