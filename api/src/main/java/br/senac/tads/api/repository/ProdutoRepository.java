package br.senac.tads.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senac.tads.api.domain.produto.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	@SuppressWarnings("null")
	public Optional<Produto> findById(Long cod);

}