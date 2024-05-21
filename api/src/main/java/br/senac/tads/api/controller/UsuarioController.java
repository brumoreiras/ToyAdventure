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
import br.senac.tads.api.domain.usuario.Premissoes;
import br.senac.tads.api.entities.Permissao;
import br.senac.tads.api.entities.Usuario;
import br.senac.tads.api.repository.PermissaoRepository;
import br.senac.tads.api.repository.UsuarioRepository;
import jakarta.validation.Valid;

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

	// Obter um usuário pelo ID
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> obterUsuario(@PathVariable Long id) {
		return repository.findById(id).map(usuario -> ResponseEntity.ok(usuario))
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

		// Verifica se a permissão já existe -- falta verificar existe no Enum-
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

	// Método para atualizar um usuário
	// Apenas o administrador pode atualizar qualquer usuário
	// outros usuários só podem atualizar a si mesmos e não podem alterar a
	// permissão e o status
	@SuppressWarnings("unlikely-arg-type")
	@PutMapping("/{id}")
	public ResponseEntity<String> atualizarUsuario(@PathVariable Long id,
			@RequestBody Usuario usuario) {
		if (!repository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		// Se o usuário não for administrador, ele só pode atualizar a si mesmo
		// e não pode alterar a permissão e o status
		if (!usuario.getPermissao().getNome().equals(Premissoes.ADMINISTRADOR)) {
			Usuario usuarioLogado = repository.findById(id).get();
			if (!usuarioLogado.getId().equals(usuario.getId())) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Você não tem permissão para atualizar este usuário");
			}
			usuario.setPermissao(usuarioLogado.getPermissao()); // Changed method call from setPermissoes() to
																// setPermissao()
			usuario.setAtivo(usuarioLogado.getAtivo());
		}

		usuario.setId(id);
		usuario = repository.save(usuario);
		return ResponseEntity.ok("Usuário atualizado com sucesso");
	}

	// DTO Record para atualizar a senha de um usuário
	public record AtualizarSenhaDTO(String senhaAtual, String novaSenha, String confirmacaoSenha) {
	}

	// Método para atualizar a senha de um usuário
	@PutMapping("/{id}/senha")
	public ResponseEntity<String> atualizarSenha(@PathVariable Long id,
			@RequestBody AtualizarSenhaDTO senha) {
		Usuario usuario = repository.findById(id).get();
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!encoder.matches(senha.senhaAtual(), usuario.getHashSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Senha atual incorreta");
		}
		if (!senha.novaSenha().equals(senha.confirmacaoSenha())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("As senhas não conferem");
		}
		usuario.setHashSenha(encoder.encode(senha.novaSenha()));
		repository.save(usuario);
		return ResponseEntity.ok("Senha atualizada com sucesso");
	}

	// Método para atualizar o status de um usuário
	@PutMapping("/{id}/status")
	public ResponseEntity<String> atualizarStatus(@PathVariable Long id, @RequestBody Boolean ativo) {
		Usuario usuario = repository.findById(id).get();
		usuario.setAtivo(ativo);
		repository.save(usuario);
		return ResponseEntity.ok("Status atualizado com sucesso");
	}
}
