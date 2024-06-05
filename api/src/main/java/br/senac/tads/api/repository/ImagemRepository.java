package br.senac.tads.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senac.tads.api.entities.Imagem;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {
	@SuppressWarnings("null")
	public Optional<Imagem> findById(Long id);

	public List<Imagem> findByProdutoId(Long id);

	// SELECIONAR TODAS AS IMAGENS DE UM PRODUTO PELO ID DO PRODUTO ECXETO A UMA
	// IMAGEM PELO ID DA IMAGEM E MARCAR COMO NÃO PRINCIPAL
	public List<Imagem> findByProdutoIdAndIdNot(Long produtoId, Long id);

	// SELECIONAR TODAS AS IMAGENS DE UM PRODUTO PELO ID DO PRODUTO E MARCAR COMO
	// NÃO PRINCIPAL
	public List<Imagem> findByProdutoIdAndPrincipalIsFalse(Long produtoId);

}
