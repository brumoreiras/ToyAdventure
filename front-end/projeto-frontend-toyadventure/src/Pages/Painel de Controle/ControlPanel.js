import ListaProdutos from '../../Components/Control Panel/ButtonControlPanel.js'
import './ControlPanel.css'

export default function ControlPanel() {
    return (
        <div className='container__body'>
        <div className="painel-controle-container">
            <div className="painel-titulo">Painel de Controle</div>
            <div className="botoes-container">
                <ListaProdutos
                    router='/lista-produtos'
                    titulo='Listar Produto'
                />
                <ListaProdutos
                    router='/lista-de-usuario'
                    titulo='Listar Usuário'

                />
                <ListaProdutos
                    router='/lista-pedidos'
                    titulo='Listar Pedidos'
                />
            </div>
        </div>
        </div>
    )
}