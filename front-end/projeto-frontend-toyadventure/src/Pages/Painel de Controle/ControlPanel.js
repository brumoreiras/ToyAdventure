import ListaProdutos from '../../Components/Control Panel/ButtonControlPanel'
import './ControlPanel.css'
import { useNavigate } from 'react-router-dom'

export default function ControlPanel() {
    const navigate = useNavigate();
    return (
        <div className="painel-controle-container">
            <div className="painel-titulo">Painel de Controle</div>
            <div className="botoes-container">
                {/* <button className="botao">Botão 1</button>
        <button className="botao">Botão 2</button>
        <button className="botao">Botão 3</button> */}
                <ListaProdutos
                    titulo='Listar Produto'
                />
                <ListaProdutos
                    titulo='Listar Usuário'
                    onClick={() => navigate('/lista-de-usuario')}

                />
                <ListaProdutos
                    titulo='Listar Pedidos'
                />
            </div>
        </div>
    )
}