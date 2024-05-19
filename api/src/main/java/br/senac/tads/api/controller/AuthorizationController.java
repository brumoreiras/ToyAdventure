package br.senac.tads.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.domain.usuario.LogarUsuarioDTO;
import br.senac.tads.api.domain.usuario.LoginResponseDTO;
import br.senac.tads.api.entities.Usuario;
import br.senac.tads.api.repository.UsuarioRepository;
import br.senac.tads.api.services.AuthenticationService;

@CrossOrigin(origins = "*")
@RestController
public class AuthorizationController {

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("authenticate")
	public String authenticate(Authentication authentication) {
		return authenticationService.authenticate(authentication);
	}

	@PostMapping("login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody LogarUsuarioDTO usuario) {
		var usuarioOptional = this.repository.findByEmail(usuario.email());
		if (usuarioOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponseDTO("Usuário não encontrado"));
		}

		Usuario usuarioEncontrado = usuarioOptional.get();
		if (!new BCryptPasswordEncoder().matches(usuario.senha(), usuarioEncontrado.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponseDTO("Senha inválida"));
		}

		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				usuarioEncontrado.getEmail(),
				usuarioEncontrado.getPassword());

		Authentication authentication = token;
		String jwt = this.authenticationService.authenticate(authentication);

		return ResponseEntity.ok(new LoginResponseDTO(jwt));
	}
}
