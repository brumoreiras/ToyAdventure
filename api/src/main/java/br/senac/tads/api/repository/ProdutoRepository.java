package br.senac.tads.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.senac.tads.api.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
	@SuppressWarnings("null")
	public Optional<Produto> findById(Long id);

	@Query(value = "SELECT * FROM tb_produtos ORDER BY id DESC LIMIT ?1 OFFSET ?2", nativeQuery = true)
	public List<Produto> listarProdutosPaginado(int offset, int pageSize);

}