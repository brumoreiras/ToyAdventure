package br.senac.tads.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.domain.usuario.CadastroUsuarioDTO;
import br.senac.tads.api.domain.usuario.LogarUsuarioDTO;
import br.senac.tads.api.domain.usuario.LoginResponseDTO;
import br.senac.tads.api.domain.usuario.Usuario;
import br.senac.tads.api.repository.UsuarioRepository;
import br.senac.tads.api.services.TokenService;
import jakarta.validation.Valid;

@RestController
public class AuthorizationController {

	@Autowired
	private AuthenticationManager authorizationManager;

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private TokenService tokenService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LogarUsuarioDTO data) {
		var usuarioSenha = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
		var auth = this.authorizationManager.authenticate(usuarioSenha);
		var token = this.tokenService.generateToken((Usuario) auth.getPrincipal());
		return ResponseEntity.ok(new LoginResponseDTO(token));
	}

	@PostMapping("/cadastrar")
	public ResponseEntity<String> cadastrarUsuario(@RequestBody @Valid CadastroUsuarioDTO usuario) {
		if (this.repository.findByEmail(usuario.email()).isEmpty()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado");
		}

		// Validação de senha e com a confirmação de senha
		if (!usuario.senha().equals(usuario.confirmacaoSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("As senhas não conferem");
		}

		String encodedPassword = new BCryptPasswordEncoder().encode(usuario.senha());

		/*
		 * String nome, String cpf, String email, String senha, TipoUsuario tipo,
		 * Boolean ativo) {
		 */ var novoUsuario = new Usuario(usuario.nome(), usuario.cpf(), usuario.email(), encodedPassword,
				usuario.tipo(), usuario.ativo());
		this.repository.save(novoUsuario);
		return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso");
	}

}
