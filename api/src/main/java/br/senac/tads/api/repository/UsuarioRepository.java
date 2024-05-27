package br.senac.tads.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.senac.tads.api.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByEmail(String email);

	public boolean existsByEmail(String email);

	Iterable<Usuario> findByNomeContaining(String nome);

}