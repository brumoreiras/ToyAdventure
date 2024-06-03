document.addEventListener("DOMContentLoaded", function () {
    var containerImagens = document.querySelector(".imagem__container");
    var inputFile = document.querySelector("#inputFile");
    var form = document.querySelector("form");

    // Prevenir a submissão do formulário para fins de teste
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
        });
    }

    // Open CHOOSE FILE
    document.querySelector("#btnUploadImagem").addEventListener("click", function () {
        inputFile.click();
    });

    inputFile.addEventListener("change", function (event) {
        var reader = new FileReader();
        reader.onload = function () {
            var caminhoImagem = reader.result;
            var imagemItem = document.createElement('div');
            imagemItem.classList.add('imagem__item');

            var img = document.createElement('img');
            img.src = caminhoImagem;
            img.alt = "imagem";
            img.dataset.file = event.target.files[0];  // Adicionando arquivo ao elemento
            img.classList.add('imagem__item');

            var inputRadio = document.createElement('input');
            inputRadio.type = 'radio';
            inputRadio.name = 'principal';
            inputRadio.classList.add('selecionar__checkbox');
            inputRadio.placeholder = 'Definir como imagem principal';

            imagemItem.appendChild(img);
            imagemItem.appendChild(inputRadio);
            containerImagens.appendChild(imagemItem);
        };
        reader.readAsDataURL(event.target.files[0]);
    });
});

function obterImagens() {
    var containerFotos = document.querySelectorAll(".imagem__item");
    var fotos = [];

    containerFotos.forEach(function (foto) {
        var imgElement = foto.querySelector("img");
        var inputElement = foto.querySelector("input[type='radio']");

        if (imgElement && inputElement) {
            var file = imgElement.dataset.file ? imgElement.dataset.file : null;
            var principal = inputElement.checked;

            fotos.push({
                file: file,
                principal: principal
            });
        }
    });

    return fotos;
}

function cadastrarProduto() {
    var nome = document.getElementById("nome_produto").value;
    var preco = document.getElementById("preco_produto").value;
    var descricao = document.getElementById("descricao_produto").value;
    var avaliacao = document.getElementById("avaliacao_produto").value;
    var quantidade = document.getElementById("quantidade_produto").value;

    var produto = {
        nome: nome,
        preco: parseFloat(preco),
        descricao: descricao,
        avaliacao: avaliacao,
        quantidade: parseInt(quantidade)
    };

    const token = localStorage.getItem('token');

    const id = async () => {
        const response = await fetch('http://localhost:8080/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(produto)
        });

        const data = await response.json();
        console.log(data);
        return data;
    }


    var imagens = obterImagens();

    if (imagens.length === 0) {
        alert('É necessário adicionar ao menos uma imagem.');
        return;
    }

    id().then(data => {
        console.log(data);
        imagens.forEach(function (foto) {
            if (foto.file) {

                var formData = new FormData();
                formData.append('file', foto.file);
               

                console.log(...formData.entries());
                // debugger;

                fetch(`http://localhost:8080/produtos/${data}/imagens?principal=${foto.principal}`, {
                    method: 'POST',
                    headers: {
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                            console.log('Imagem cadastrada com sucesso.');
                        } else {
                            response.json().then(error => {
                                console.error('Erro ao cadastrar a imagem:', error);
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Ocorreu um erro ao cadastrar a imagem:', error);
                    });
            }
        });
    });

    // var dados = new FormData();
    // dados.append('produto', JSON.stringify(produto)); // Convertendo objeto para JSON

    // imagens.forEach(function (foto) {
    //     if (foto.file) {
    //         dados.append('files', foto.file);  // Adicionando arquivo
    //     }
    //     dados.append('principais', foto.principal);  // Adicionando flag principal
    // });

    // console.log(...dados.entries());
    // console.log(dados.get('produto'));
    // console.log(dados.get('files'));

    // fetch('http://localhost:8080/produtos/teste', {
    //     method: 'POST',
    //     headers: {
    //         // 'Authorization': `Bearer ${token}`,
    //     },
    //     body: dados
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             console.log('Produto cadastrado com sucesso.');
    //             carregarProdutos();  // Função para recarregar a lista de produtos
    //         } else {
    //             response.json().then(error => {
    //                 console.error('Erro ao cadastrar o produto:', error);
    //             });
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Ocorreu um erro ao cadastrar o produto:', error);
    //     });
}

