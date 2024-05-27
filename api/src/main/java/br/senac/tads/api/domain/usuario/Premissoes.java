package br.senac.tads.api.domain.usuario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Premissoes {

	ADMINISTRADOR("Administrador"),
	CLIENTE("Cliente"),
	ESTOQUISTA("Estoquista");

	private String tipo;

	Premissoes(String tipo) {
		this.tipo = tipo;
	}

	@JsonValue
	public String getTipo() {
		return tipo;
	}

	@JsonCreator
	public static Premissoes fromString(String tipo) {
		for (Premissoes permissao : Premissoes.values()) {
			if (permissao.getTipo().equalsIgnoreCase(tipo)) {
				return permissao;
			}
		}
		throw new IllegalArgumentException("Unknown value: " + tipo);
	}
}
