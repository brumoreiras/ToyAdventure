package br.senac.tads.api.domain.produto;

public record ListarProduto(Long id, String nome, Double preco, Long quantidade, Boolean ativo) {
}
