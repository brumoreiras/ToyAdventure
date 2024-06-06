window.addEventListener('load', carregarProdutos(1));
// Carrega os usuários quando a página é carregada

function buscarProduto(busca) {

    busca = busca.trim();
    if (busca.length > 2) {
        document.getElementById('page-num').textContent = 1;
        carregarProdutos(1, busca);
    }
    if (busca.length === 0) {
        document.getElementById('page-num').textContent = 1;
        carregarProdutos(1);
    }
}


async function carregarProdutos(nextPage, busca) {
    try {
        const token = localStorage.getItem('token');

        // Faz a requisição para obter a lista de usuários
        const response = await fetch(`https://toyadventure.onrender.com/produtos?pagina=${nextPage}${busca ? `&busca=${busca}` : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar usuários');
        }

        const produtos = await response.json();
        document.getElementById('next-btn').disabled = produtos.length < 10;
        document.getElementById('prev-btn').disabled = nextPage === 1;
        // Chama a função para gerar a tabela com os usuários obtidos
        gerarTabelaProdutos(produtos);
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os usuários:', error);
    }
}

function gerarTabelaProdutos(produtos) {
    const tabela = document.getElementById('tabela-produtos');
    const tbody = tabela.querySelector('tbody');

    tbody.innerHTML = '';

    produtos.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.ativo ? 'Sim' : 'Não'}</td>
            <td className="button-cell" >
                <a class="btn__alterar" onclick="alterarProduto(${produto.id})">Alterar</a>
            </td>
            <td class="button-cell">
                <button class="btn__desativar ${produto.ativo ? 'desativar' : 'ativar'}" 
                        onclick="alterarStatusProduto(${produto.id}, ${produto.ativo}, this)">
                    ${produto.ativo ? 'Desativar' : 'Ativar'}
                </button>
            </td>
            <td>
                <a onclick="visualizarProduto(${produto.id})"><img
                    src="../Images/icones/inventory.svg" alt=""></a>
                <a onclick="deleteProduto(${produto.id})"><img src="../Images/icones/delete.svg"
                    alt="icone de uma lixeira para deletar dados cadastrados">
                </a>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function visualizarProduto(id) {
    console.log(id);
    window.location.href = `../Pages/detalhe-produtos.html?id=${id}`;
    // Redireciona para a página de visualização do produto
}

async function carregarProduto(id) {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`https://toyadventure.onrender.com/produtos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const produto = await response.json();


            console.log(produto);
            preencherCampos(produto);
        } else {
            console.error('Erro ao carregar o produto:', response.statusText);
        }
    }
    catch (error) {
        console.error('Ocorreu um erro ao carregar o produto:', error);
    }
}



async function alterarStatusProduto(id, ativo, botao) {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`https://toyadventure.onrender.com/produtos/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(!ativo)
        });

        if (response.ok) {
            console.log(`Produto ${ativo ? 'ativado' : 'desativado'} com sucesso.`);

            carregarProdutos(parseInt(document.getElementById('page-num').textContent));
        } else {
            console.error('Erro ao alterar o status do produto:', response.statusText);
        }
    } catch (error) {
        console.error('Ocorreu um erro ao alterar o status do produto:', error);
    }
}

async function deleteProduto(id) {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`https://toyadventure.onrender.com/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            carregarProdutos(parseInt(document.getElementById('page-num').textContent), document.getElementById('search-produto').value);
        } else {
            console.error('Erro ao deletar o produto:', response.statusText);
        }
    } catch (error) {
        console.error('Ocorreu um erro ao deletar o produto:', error);
    }
}

function nextPage() {
    const page = document.getElementById('page-num').textContent;
    carregarProdutos(parseInt(page) + 1, document.getElementById('search-produto').value);
    document.getElementById('page-num').textContent = parseInt(page) + 1;
}

function prevPage() {
    const page = document.getElementById('page-num').textContent;
    if (parseInt(page) > 1) {
        carregarProdutos(parseInt(page) - 1, document.getElementById('search-produto').value);
        document.getElementById('page-num').textContent = parseInt(page) - 1;
    }
}

// Editar produto - open modal 
async function alterarProduto(id) {

    const modal = document.querySelector("#mdl_produto");

    const token = localStorage.getItem('token');

    const produto = await fetch(`https://toyadventure.onrender.com/produtos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const produtoJson = await produto.json();

    // Preenche os campos do formulário com os dados do produto
    var pageForms = `
    <div class="modal-header">
        <h2>Editar Produto</h2>
        <button class="btn btn_cancel_edit">X</button>
    </div>
    <form id="form_editar" class="form">

        <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value="${produtoJson.nome}" required>
        </div>

        <div class="form-group">
            <label for="quantidade">Quantidade:</label>
            <input type="number" id="quantidade" name="quantidade" value="${produtoJson.quantidade}" required>
        </div>

        <div class="form-group">
            <label for="preco">Preço:</label>
            <input type="number" id="preco" name="preco" value="${produtoJson.preco}" required step="0.01">
        </div>

        <div class="form-group">
            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" required>${produtoJson.descricao}</textarea>
        </div>

        <div class="form-group">
            <label for="avaliacao">Avaliação:</label>
            <input type="text" id="avaliacao" name="avaliacao" value="${produtoJson.avaliacao}" required step="0.1">
        </div>
        <div class="button-group">
            <button type="button" class="btn_confirm_edit" onclick="editarProduto(${produtoJson.id})">Salvar Alterações</button>
        </div>
        <section class="container__imagens">
            <div class="container__addimg">
                <h3>Imagens</h3>
                <div class="imagem__add">
                    <input type="file" id="inputFile" accept="image/*" style="display: none;">
                    <button class="btn_upload">Adicionar Imagem</button>
                </div>
            </div>
                <div class="imagem__container">
                </div>
            </div>
        </section>
    </form>
    `;

    /*     <div class="imagem__item">
        <button class="btn__delete" onclick="deletarImagem(${produtoJson.imagens[0].id})">X</button>
        <img src="https://via.placeholder.com/100" alt="Imagem do produto" class="product__image">
        <input type="radio" name="principal" class="selecionar__checkbox" placeholder="Definir como imagem principal" onclick="definirPrincipal(${produtoJson.imagens[0].id})">
    </div> */

    modal.innerHTML = pageForms;

    modal.showModal();

    var containerImagens = document.querySelector(".imagem__container");
    containerImagens.innerHTML = '';
    carregarImagens(produtoJson.imagens);

}

async function editarProduto(id) {
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;
    const descricao = document.getElementById('descricao').value;
    const avaliacao = document.getElementById('avaliacao').value;

    const produto = {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        descricao,
        avaliacao
    };

    const token = localStorage.getItem('token');

    const response = await fetch(`https://toyadventure.onrender.com/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(produto)
    });

    if (response.ok) {
        console.log('Produto alterado com sucesso.');
        carregarProdutos(parseInt(document.getElementById('page-num').textContent));
    } else {
        console.error('Erro ao alterar o produto:', response.statusText);
    }

    const modal = document.querySelector("#mdl_produto");
    modal.close();
}

async function definirPrincipal(id) {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://toyadventure.onrender.com/imagens/${id}/principal`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        console.log('Imagem principal definida com sucesso.');
    } else {
        console.error('Erro ao definir a imagem principal:', response.statusText);
    }
}

function carregarImagens(imagens) {

    var containerImagens = document.querySelector(".imagem__container");

    imagens.forEach(function (foto) {
        var imagemItem = document.createElement('div');
        imagemItem.classList.add('imagem__item');

        var img = document.createElement('img');
        img.src = foto.url;
        img.alt = "Imagem do produto";
        img.dataset.file = foto.file;
        img.classList.add('product__image');

        var inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = 'principal';
        inputRadio.classList.add('selecionar__checkbox');
        inputRadio.placeholder = 'Definir como imagem principal';
        inputRadio.checked = foto.principal;
        inputRadio.onclick = function () {
            definirPrincipal(foto.id);
        }

        var btnRemover = document.createElement('button');
        btnRemover.classList.add('btn_remover');
        btnRemover.textContent = 'x';
        btnRemover.onclick = function () {
            removerImagem(foto.id);
        }

        imagemItem.appendChild(btnRemover);
        imagemItem.appendChild(img);
        imagemItem.appendChild(inputRadio);
        containerImagens.appendChild(imagemItem);
    });
}

async function obterImagens(idProduto) {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://toyadventure.onrender.com/produtos/${idProduto}/imagens`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const imagens = await response.json();
        return imagens;
    } else {
        console.error('Erro ao obter as imagens:', response.statusText);
    }
}

async function deletarImagem(idImagem) {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://toyadventure.onrender.com/imagens/${idImagem}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {

    } else {
        console.error('Erro ao deletar a imagem:', response.statusText);
    }
}






