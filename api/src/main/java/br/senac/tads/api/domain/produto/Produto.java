package br.senac.tads.api.domain.produto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;

@Table(name = "produtos")
@Entity(name = "Produto")
@EqualsAndHashCode(of = "cod")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long cod;
	String nome;
	String descricao;
	Double preco;
	Boolean ativo;
	
	public Produto() {
	}

	public Produto(Long cod, String nome, String descricao, Double preco, Boolean ativo) {
		this.cod = cod;
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.ativo = ativo;
	}

	public Produto(CadastroProduto produto) {
		this.nome = produto.nome();
		this.descricao = produto.descricao();
		this.preco = produto.preco();
		this.ativo = true;
	}

	public Long getId() {
		return cod;
	}

	public void setId(Long cod) {
		this.cod = cod;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Double getPreco() {
		return preco;
	}

	public void setPreco(Double preco) {
		this.preco = preco;
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	



}
