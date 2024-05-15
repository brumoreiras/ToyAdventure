package br.senac.tads.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.senac.tads.api.entities.Usuario;
import br.senac.tads.api.repository.UsuarioRepository;

@Service
public class UsuarioServices implements UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Optional<Usuario> optUsuario = usuarioRepository.findByEmail(email);
		if (optUsuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuário não encontrado");
		}
		Usuario usuario = optUsuario.get();
		return usuario;
	}

}
