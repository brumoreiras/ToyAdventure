package br.senac.tads.api.entities;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import br.senac.tads.api.domain.usuario.LogarUsuarioDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.EqualsAndHashCode;

@Table(name = "tb_usuarios")
@Entity(name = "Usuario")
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "CPF obrigatório")
	@Pattern(regexp = "^[0-9]{11}$", message = "CPF inválido")
	private String cpf;

	@NotBlank(message = "Nome obrigatório")
	@Pattern(regexp = "^[a-zA-Z\\s]{3,}$", message = "Nome inválido")
	private String nome;

	@NotBlank(message = "Email obrigatório")
	@Email(message = "Email inválido")
	@Column(unique = true, nullable = false)
	private String email;

	@NotBlank(message = "Senha obrigatória")
	private String hashSenha;

	private Boolean ativo;

	@ManyToOne
	@JoinColumn(name = "permissao_id", referencedColumnName = "id") // Referencia correta para a chave primária
																	// Permissao
	private Permissao permissao;

	public Permissao getPermissao() {
		return permissao;
	}

	public void setPermissao(Permissao permissao) {
		this.permissao = permissao;
	}

	public Usuario(String email) {
		this.email = email;
	}

	public Usuario(LogarUsuarioDTO usuario) {
		this.email = usuario.email();
		this.hashSenha = usuario.senha();
	}

	public Usuario() {
	}

	public Usuario(String nome, String cpf, String email, String hashSenha, Permissao permissao, Boolean ativo) {
		this.nome = nome;
		this.cpf = cpf;
		this.email = email;
		this.hashSenha = hashSenha;
		this.permissao = permissao;
		this.ativo = ativo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHashSenha() {
		return hashSenha;
	}

	public void setHashSenha(String hashSenha) {
		this.hashSenha = hashSenha;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	@Override
	public Set<Permissao> getAuthorities() {
		return Set.of(permissao);
	}

	@Override
	public String getPassword() {
		return hashSenha;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return ativo;
	}
}
