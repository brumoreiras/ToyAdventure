package br.senac.tads.api.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.domain.produto.CadastroProduto;
import br.senac.tads.api.domain.produto.Produto;
import br.senac.tads.api.repository.ProdutoRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")

public class ProdutoController {

	private final ProdutoRepository repository;

	public ProdutoController(ProdutoRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public ResponseEntity<List<Produto>> listarProdutos() {
		return ResponseEntity.ok(repository.findAll());
	}

	@PostMapping("/cadastrar")
	public ResponseEntity<String> cadastrarProduto(@RequestBody CadastroProduto produto) {
		Produto novoProduto = new Produto(produto);
		repository.save(novoProduto);
		return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com sucesso");
	}

	@PostMapping("/editar/{cod}")
	public ResponseEntity<String> editarProduto(@PathVariable Long cod, @RequestBody Produto produto) {
		Produto produtoEditado = repository.findById(cod).get();
		produtoEditado.setNome(produto.getNome());
		produtoEditado.setDescricao(produto.getDescricao());
		produtoEditado.setAtivo(produto.getAtivo());
		produtoEditado.setPreco(produto.getPreco());
		repository.save(produtoEditado);
		return ResponseEntity.status(HttpStatus.OK).body("Produto editado com sucesso");
	}

	@PostMapping("/visualizar/{cod}")
	public ResponseEntity<Produto> visualizarProduto(Long cod) {
		Produto produto = repository.findById(cod).get();
		return ResponseEntity.ok(produto);
	}

}
