package br.senac.tads.api.domain.produto;

import java.util.List;

public record ProdutoView(Long id, String nome, String descricao, Double preco, Long quantidade, String avaliacao,
		Boolean ativo, List<ImagemView> imagens) {
}
