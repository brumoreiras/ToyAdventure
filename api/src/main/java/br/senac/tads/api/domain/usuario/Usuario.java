package br.senac.tads.api.domain.usuario;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.EqualsAndHashCode;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@EqualsAndHashCode(of = "id")

public class Usuario implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@NotBlank(message = "CPF obrigatório")
	@Pattern(regexp = "^[0-9]{11}$", message = "CPF inválido")
	private String cpf;

	@NotBlank(message = "Nome obrigatório")
	@Pattern(regexp = "^[a-zA-Z\\s]{3,}$", message = "Nome inválido")
	private String nome;

	@NotBlank(message = "Email obrigatório")
	@Email(message = "Email inválido")
	private String email;

	// Validação de senha se é igual a confirmação de senha
	@NotBlank(message = "Senha obrigatória")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Senha inválida")
	private String senha;

	private Boolean ativo;
	private TipoUsuario tipo;

	public Usuario(String email) {
		this.email = email;
	}

	public Usuario(LogarUsuarioDTO usuario) {
		this.email = usuario.email();
		this.senha = usuario.senha();
	}

	public Usuario(String id, String cpf, String nome, String email, String senha, Boolean ativo, TipoUsuario tipo) {
		this.id = id;
		this.cpf = cpf;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.ativo = ativo;
		this.tipo = tipo;
	}

	public Usuario(String nome, String cpf, String email, String senha, TipoUsuario tipo, Boolean ativo) {
		this.nome = nome;
		this.cpf = cpf;
		this.email = email;
		this.senha = senha;
		this.tipo = tipo;
		this.ativo = ativo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public TipoUsuario getTipo() {
		return tipo;
	}

	public void setTipo(TipoUsuario tipo) {
		this.tipo = tipo;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if (this.tipo == TipoUsuario.ADMINISTRADOR)
			return List.of(new SimpleGrantedAuthority("ROLE_ADMINISTRADOR"),
					new SimpleGrantedAuthority("ROLE_ESTOQUISTA"));
		if (this.tipo == TipoUsuario.ESTOQUISTA)
			return List.of((new SimpleGrantedAuthority("ROLE_ESTOQUISTA")));
		return List.of((new SimpleGrantedAuthority("ROLE_CLIENTE")));
	}

	@Override
	public String getPassword() {
		return senha;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// expiração de credenciais em 24 horas
		return false;
	}

	@Override
	public boolean isEnabled() {
		return ativo;
	}

}
