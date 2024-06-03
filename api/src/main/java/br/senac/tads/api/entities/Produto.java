package br.senac.tads.api.entities;

import java.util.List;

import br.senac.tads.api.domain.produto.CadastroProduto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.EqualsAndHashCode;

@Table(name = "tb_produtos")
@Entity(name = "produto")
@EqualsAndHashCode(of = "id")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	// @NotBlank(message = "Nome obrigatório")
	String nome;

	// @NotBlank(message = "Preço obrigatório")
	Double preco;

	// @NotBlank(message = "Quantidade obrigatória")
	Long quantidade;

	String descricao;
	String avaliacao;
	Boolean ativo;

	@OneToMany(mappedBy = "produto", cascade = CascadeType.ALL)
	private List<Imagem> imagens;

	public List<Imagem> getImagens() {
		return imagens;
	}

	public void setImagens(List<Imagem> imagens) {
		this.imagens = imagens;
	}

	public Produto() {
	}

	public Produto(Long id, @NotBlank(message = "Nome obrigatório") String nome,
			@NotBlank(message = "Preço obrigatório") Double preco,
			@NotBlank(message = "Quantidade obrigatória") Long quantidade, String descricao, String avaliacao,
			Boolean ativo, List<Imagem> imagens) {
		this.id = id;
		this.nome = nome;
		this.preco = preco;
		this.quantidade = quantidade;
		this.descricao = descricao;
		this.avaliacao = avaliacao;
		this.ativo = ativo;
		this.imagens = imagens;
	}

	public Produto(Long id, @NotBlank(message = "Nome obrigatório") String nome,
			@NotBlank(message = "Preço obrigatório") Double preco,
			@NotBlank(message = "Quantidade obrigatória") Long quantidade, String descricao, String avaliacao) {
		this.id = id;
		this.nome = nome;
		this.preco = preco;
		this.quantidade = quantidade;
		this.descricao = descricao;
		this.avaliacao = avaliacao;
		this.ativo = true;
		this.imagens = null;
	}

	public Produto(Long id, String nome, String descricao, Double preco, Boolean ativo, List<Imagem> imagens) {
		this.id = id;
		this.nome = nome;
		this.descricao = descricao;
		this.preco = preco;
		this.ativo = ativo;
		this.imagens = imagens;
	}

	public Produto(CadastroProduto produto) {
		this.nome = produto.nome();
		this.descricao = produto.descricao();
		this.preco = produto.preco();
		this.quantidade = produto.quantidade();
		this.avaliacao = produto.avaliacao();
		this.ativo = true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Long quantidade) {
		this.quantidade = quantidade;
	}

	public String getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(String avaliacao) {
		this.avaliacao = avaliacao;
	}
}
