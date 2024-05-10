package br.senac.tads.api.controller;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.domain.usuario.ListaUsuario;
import br.senac.tads.api.domain.usuario.Usuario;
import br.senac.tads.api.repository.UsuarioRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuario")

public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;
	private final PasswordEncoder encoder;

	public UsuarioController(UsuarioRepository repository, PasswordEncoder encoder) {
		this.repository = repository;
		this.encoder = encoder;
	}

	/*
	 * @Transactional
	 * 
	 * @PostMapping("/cadastrar")
	 * public ResponseEntity<String> cadastrarUsuario(@RequestBody
	 * CadastroUsuarioDTO usuario) {
	 * 
	 * usuario.setSenha(encoder.encode(usuario.getSenha()));
	 * 
	 * // Verifica se o e-mail já está cadastrado
	 * Optional<Usuario> optUsuario = repository.findByEmail(usuario.getEmail());
	 * if (optUsuario.isPresent()) {
	 * return
	 * ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado");
	 * }
	 * 
	 * // Cadastra o usuário
	 * val novoUsuario = new Usuario(usuario);
	 * repository.save(novoUsuario);
	 * 
	 * // Retorna o resultado
	 * return ResponseEntity.status(HttpStatus.CREATED).
	 * body("Usuário cadastrado com sucesso");
	 * 
	 * }
	 */

	// Método para logar o usuário
	/*
	 * @GetMapping("/login")
	 * public ResponseEntity<Boolean> logarUsuario(@RequestBody LogarUsuarioDTO
	 * usuario) {
	 * 
	 * // Consulta o usuário no banco de dados e retorna um Usuario ou um Optional
	 * // vazio
	 * Optional<Usuario> optUsuario = repository.findByEmail(usuario.email());
	 * 
	 * // Verifica se o usuário existe
	 * if (optUsuario.isEmpty()) {
	 * return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
	 * }
	 * 
	 * // Verifica se a senha está correta
	 * boolean valido = encoder.matches(usuario.senha(),
	 * optUsuario.get().getSenha());
	 * 
	 * // Retorna o resultado
	 * HttpStatus status = valido ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
	 * return ResponseEntity.status(status).body(valido);
	 * 
	 * }
	 */

	// Método para Lista todos os usuários
	@GetMapping
	public ResponseEntity<Iterable<ListaUsuario>> listarUsuarios() {
		Iterable<Usuario> usuarios = repository.findAll();

		// Use record para simplificar a criação de objetos imutáveis
		var lista = new ArrayList<ListaUsuario>();
		for (Usuario usuario : usuarios) {
			lista.add(new ListaUsuario(usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(),
					usuario.getTipo(), usuario.getAtivo()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(lista);
	}

	// Método para editar um usuário
	@PostMapping("/editar/{id}")
	@Transactional
	public ResponseEntity<String> editarUsuario(@PathVariable("id") String id, @RequestBody Usuario usuario) {

		// Verifica se o usuário existe
		Optional<Usuario> optUsuario = repository.findById(id);
		if (optUsuario.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
		}

		// Verifica se o e-mail já está cadastrado
		Optional<Usuario> optUsuarioEmail = repository.findByEmail(usuario.getEmail());
		if (optUsuarioEmail.isPresent() && optUsuarioEmail.get().getId() != id) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("E-mail já cadastrado");
		}

		// Verifica se a senha foi informada
		if (usuario.getSenha() != null) {
			usuario.setSenha(encoder.encode(usuario.getSenha()));
		}

		// Verifica se o tipo foi informado
		if (usuario.getTipo() == null) {
			usuario.setTipo(optUsuario.get().getTipo());
		}

		// Verifica se o ativo foi informado
		if (usuario.getAtivo() == null) {
			usuario.setAtivo(optUsuario.get().getAtivo());
		}

		// Verifica se o nome foi informado
		if (usuario.getNome() == null) {
			usuario.setNome(optUsuario.get().getNome());
		}

		// Verifica se o cpf foi informado
		if (usuario.getCpf() == null) {
			usuario.setCpf(optUsuario.get().getCpf());
		}

		// Atualiza o usuário
		repository.save(usuario);

		// Retorna o resultado
		return ResponseEntity.status(HttpStatus.OK).body("Usuário atualizado com sucesso");

	}
}
