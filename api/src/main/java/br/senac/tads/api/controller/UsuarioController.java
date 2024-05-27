package br.senac.tads.api.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.domain.usuario.CadastroUsuarioDTO;
import br.senac.tads.api.domain.usuario.ListaUsuario;
import br.senac.tads.api.entities.Permissao;
import br.senac.tads.api.entities.Usuario;
import br.senac.tads.api.repository.PermissaoRepository;
import br.senac.tads.api.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private PermissaoRepository permissaoRepository;

	// Método para Lista todos os usuários
	@GetMapping
	public ResponseEntity<Iterable<ListaUsuario>> listarUsuarios() {
		Iterable<Usuario> usuarios = repository.findAll();

		var lista = new ArrayList<ListaUsuario>();
		for (Usuario usuario : usuarios) {
			lista.add(new ListaUsuario(
					usuario.getId().toString(),
					usuario.getNome(),
					usuario.getCpf(),
					usuario.getEmail(),
					usuario.getPermissao() != null ? usuario.getPermissao().getNome() : null,
					usuario.getAtivo()));
		}
		return ResponseEntity.ok(lista);
	}

	public record getUsuario(String id, String nome, String permissao, boolean ativo) {
	}

	// Obter um usuário pelo ID
	@GetMapping("/{id}")
	public ResponseEntity<getUsuario> obterUsuario(@PathVariable Long id) {
		return repository.findById(id).map(usuario -> ResponseEntity.ok(new getUsuario(usuario.getId().toString(),
				usuario.getNome(), usuario.getPermissao().getNome(), usuario.getAtivo())))
				.orElse(ResponseEntity.notFound().build());
	}

	// Pesquisar um usuário por nome
	@GetMapping("/pesquisar")
	public ResponseEntity<Iterable<Usuario>> pesquisarUsuario(@RequestBody String nome) {
		Iterable<Usuario> usuarios = repository.findByNomeContaining(nome);
		return ResponseEntity.ok(usuarios);
	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/cadastrar")
	public ResponseEntity cadastrarUsuario(@RequestBody @Valid CadastroUsuarioDTO usuario) {

		// Verifica se o e-mail já está cadastrado
		if (this.repository.existsByEmail(usuario.email())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("E-mail já cadastrado");
		}

		// Validação de senha e com a confirmação de senha
		if (!usuario.senha().equals(usuario.confirmacaoSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("As senhas não conferem");
		}
		System.out.println(usuario.permissao());

		// Verifica se a permissão já existe -- falta verificar existe no Enum - upcase
		Permissao permissaoExistente = permissaoRepository.findByNome(usuario.permissao());
		Permissao permissao;
		if (permissaoExistente == null) {
			// Adiciona a permissão se não existir
			permissao = new Permissao(usuario.permissao());
			permissaoRepository.save(permissao);
		} else {
			permissao = permissaoExistente;
		}

		// Cria um novo usuário com a permissão existente ou nova
		String encodedPassword = new BCryptPasswordEncoder().encode(usuario.senha());
		var novoUsuario = new Usuario(usuario.nome(), usuario.cpf(), usuario.email(), encodedPassword,
				permissao, usuario.ativo());
		this.repository.save(novoUsuario);

		return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso");
	}

	// Método para deletar um usuário
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
		if (!repository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	public record AtualizarUsuarioDTO(String nome, String senha, String permissao) {
	}

	// Método para atualizar um usuário
	// Apenas o administrador pode atualizar qualquer usuário
	// outros usuários só podem atualizar a si mesmos e não podem alterar a
	// permissão e o status

	@PutMapping("/{id}")
	public ResponseEntity<String> atualizarUsuario(@PathVariable Long id,
			@RequestBody AtualizarUsuarioDTO usuario) {
		Usuario usuarioAtual = repository.findById(id).get();
		if (usuarioAtual == null) {
			return ResponseEntity.notFound().build();
		}

		usuarioAtual.setNome(usuario.nome());
		if (usuario.senha() != null) {
			String encodedPassword = new BCryptPasswordEncoder().encode(usuario.senha());
			usuarioAtual.setHashSenha(encodedPassword);
		}

		Permissao permissao = permissaoRepository.findByNome(usuario.permissao());
		if (permissao != null) {
			usuarioAtual.setPermissao(permissao);
		}
		repository.save(usuarioAtual);

		return ResponseEntity.ok("Usuário atualizado com sucesso");
	}

	// DTO Record para atualizar a senha de um usuário
	public record AtualizarSenhaDTO(
			@NotBlank(message = "Senha atual não pode ser nula ou vazia") String senhaAtual,
			@NotBlank(message = "Nova senha não pode ser nula ou vazia") String novaSenha,
			@NotBlank(message = "Confirmação de senha não pode ser nula ou vazia") String confirmacaoSenha) {

		// Validação de senha e com a confirmação de senha
		public AtualizarSenhaDTO {
			if (!novaSenha.equals(confirmacaoSenha)) {
				throw new IllegalArgumentException("As senhas não conferem");
			}

			if (senhaAtual.equals(novaSenha)) {
				throw new IllegalArgumentException("A nova senha não pode ser igual à senha atual");
			}
		}
	}

	// Método para atualizar a senha de um usuário
	@PutMapping("/{id}/senha")
	public ResponseEntity<String> atualizarSenha(@PathVariable Long id,
			@RequestBody @Valid AtualizarSenhaDTO senha) {
		Usuario usuario = repository.findById(id).get();
		if (!new BCryptPasswordEncoder().matches(senha.senhaAtual(), usuario.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha atual inválida");
		}
		String encodedPassword = new BCryptPasswordEncoder().encode(senha.novaSenha());
		usuario.setHashSenha(encodedPassword);
		repository.save(usuario);
		return ResponseEntity.ok("Senha atualizada com sucesso");
	}

	// Método para atualizar o status de um usuário
	public record AtualizarStatusDTO(Boolean ativo) {
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<String> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusDTO status) {
		Usuario usuario = repository.findById(id).get();
		usuario.setAtivo(status.ativo());
		repository.save(usuario);
		return ResponseEntity.ok("Status atualizado com sucesso");
	}
}
