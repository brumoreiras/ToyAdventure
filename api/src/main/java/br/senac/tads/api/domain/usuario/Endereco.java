package br.senac.tads.api.domain.usuario;

public record Endereco( String cep, String logradouro, String complemento, String bairro, String cidade, String estado) {

	public Endereco {
		if (cep == null || cep.isBlank()) {
			throw new IllegalArgumentException("CEP não pode ser nulo ou vazio");
		}
		if (logradouro == null || logradouro.isBlank()) {
			throw new IllegalArgumentException("Logradouro não pode ser nulo ou vazio");
		}
		if (bairro == null || bairro.isBlank()) {
			throw new IllegalArgumentException("Bairro não pode ser nulo ou vazio");
		}
		if (cidade == null || cidade.isBlank()) {
			throw new IllegalArgumentException("Cidade não pode ser nula ou vazia");
		}
		if (estado == null || estado.isBlank()) {
			throw new IllegalArgumentException("Estado não pode ser nulo ou vazio");
		}
	}
}
