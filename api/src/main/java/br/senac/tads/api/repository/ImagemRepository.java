package br.senac.tads.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senac.tads.api.entities.Imagem;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {
	@SuppressWarnings("null")
	public Optional<Imagem> findById(Long cod);

}
