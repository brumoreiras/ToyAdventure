package br.senac.tads.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.senac.tads.api.entities.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

	@Query("SELECT p FROM Permissao p WHERE p.nome = :nome")
	Permissao findByNome(@Param("nome") String nome);
}
