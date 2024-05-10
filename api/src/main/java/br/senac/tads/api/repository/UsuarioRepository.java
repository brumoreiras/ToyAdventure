package br.senac.tads.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import br.senac.tads.api.domain.usuario.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	public Optional<Usuario> findByEmail(String email);

	public Optional<Usuario> findById(String id);

	UserDetails findByLogin(String login);

}