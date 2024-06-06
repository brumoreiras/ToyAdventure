window.addEventListener('load', carregarProduto(window.location.search.split('=')[1]));

async function carregarProduto(produtoId) {

	console.log(produtoId);
	const token = localStorage.getItem('token');

	var nome = document.getElementById("nome");
	var preco = document.getElementById("preco");
	var descricao = document.getElementById("descricao");
	var avaliacao = document.getElementById("avaliacao");
	// var quantidade = document.getElementById("quantidade");
	var containerImagens = document.getElementById("carrossel");

	containerImagens.innerHTML = '';


	try {
		const token = localStorage.getItem('token');

		const response = await fetch(`https://toyadventure.onrender.com/produtos/${produtoId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});

		if (response.ok) {
			const produto = await response.json();

			console.log(produto);

			nome.innerHTML = produto.nome;
			preco.innerHTML = `R$ ${produto.preco.toFixed(2)}`;
			descricao.innerHTML = produto.descricao;
			avaliacao.innerHTML = produto.avaliacao;
			// quantidade.innerHTML = produto.quantidade;


			



			produto.imagens.forEach(function (imagem) {
				var img = document.createElement('img');
				img.src = `${imagem.url}`;
				img.alt = produto.nome;
				img.classList.add('d-block', 'w-100');
				img.onclick = function () {
					changeImage(img);
				};
				containerImagens.appendChild(img);

				if (imagem.principal) {
					document.getElementById('img-marq-principal').src = `${imagem.url}`;
				}
			});

		} else {
			console.error('Erro ao carregar o produto:', response.statusText);
		}
	}
	catch (error) {
		console.error('Ocorreu um erro ao carregar o produto:', error);
	}



}