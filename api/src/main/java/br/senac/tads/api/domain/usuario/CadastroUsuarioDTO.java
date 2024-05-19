package br.senac.tads.api.domain.usuario;

import br.senac.tads.api.entities.Permissao;

public record CadastroUsuarioDTO(String nome, String cpf, String email, String senha, String confirmacaoSenha,
		Permissao permissao, Boolean ativo) {
}