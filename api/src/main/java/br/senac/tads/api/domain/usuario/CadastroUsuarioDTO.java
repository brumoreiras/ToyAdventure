package br.senac.tads.api.domain.usuario;

public record CadastroUsuarioDTO(String nome, String cpf, String email, String senha, String confirmacaoSenha,
		TipoUsuario tipo, Boolean ativo) {
}