document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchPedidoById(searchTerm);
        } else {
            fetchPedidos();
        }
    });

    fetchPedidos();
});

function fetchPedidos() {
    fetch('http://localhost:8081/pedidos')
        .then(response => response.json())
        .then(data => {
            renderPedidos(data);
        })
        .catch(error => console.error('Erro ao buscar pedidos:', error));
}

function searchPedidoById(id) {
    fetch(`http://localhost:8081/pedidos/${id}`)
        .then(response => response.json())
        .then(pedido => {
            if (pedido) {
                renderPedidos([pedido]);
            } else {
                alert('Pedido não encontrado.');
            }
        })
        .catch(error => console.error('Erro ao buscar pedido:', error));
}

function renderPedidos(pedidos) {
    let tbody = document.getElementById('create_list_produto');
    tbody.innerHTML = '';
    pedidos.forEach(pedido => {
        let row = `<tr data-id="${pedido.idPedido}">
            <td>${pedido.idPedido}</td>
            <td>${formatDate(pedido.dataPedido)}</td>
            <td>${formatDate(pedido.dataEntrega)}</td>
            <td>${pedido.quantidade || 0}</td>
            <td>R$ ${pedido.valorTotal}</td>
            <td>${pedido.status}</td>
            <td style="text-align: center;" class="button-cell">
                <a class="btn__alterar" href="cadastrar-produto.html?id=${pedido.idPedido}">Alterar</a> <!-- Alteração do href para encaminhar para cadastrar-produto.html -->
            </td>
            <td style="text-align: center;">
                <a href="../../Ecommerce/Pages/detalhe-produto.html?id=${pedido.idPedido}"><img src="../Images/icones/inventory.svg" alt="Detalhes"></a>
                <img src="../Images/icones/delete.svg" alt="Deletar" class="delete-icon" data-id="${pedido.idPedido}">
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });

    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const pedidoId = event.target.getAttribute('data-id');
            const pedidoRow = document.querySelector(`tr[data-id="${pedidoId}"]`);
            if (pedidoRow) {
                pedidoRow.remove();
            }

            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8081/pedidos/${pedidoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao deletar pedido do banco de dados');
                }

                console.log(`Pedido ${pedidoId} deletado com sucesso.`);
            } catch (error) {
                console.error('Erro ao deletar pedido:', error);
            }
        });
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}
