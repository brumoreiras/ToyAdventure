package br.senac.tads.api.domain.usuario;

public record ListaUsuario(String id, String nome, String cpf, String email, TipoUsuario tipo, Boolean ativo) {

}
