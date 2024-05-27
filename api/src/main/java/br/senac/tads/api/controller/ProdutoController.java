package br.senac.tads.api.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.senac.tads.api.domain.produto.CadastroProduto;
import br.senac.tads.api.entities.Imagem;
import br.senac.tads.api.entities.Produto;
import br.senac.tads.api.services.ProdutoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")

public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	@GetMapping
	public ResponseEntity<List<Produto>> listarProdutos() {
		return ResponseEntity.ok(produtoService.buscarTodos());
	}

	@GetMapping("/{cod}")
	public ResponseEntity<Produto> buscarProduto(@PathVariable Long cod) {
		Produto produto = produtoService.buscarPorId(cod);
		if (produto == null || produto.getId() == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(produto);
	}

	@PostMapping()
	public ResponseEntity<String> cadastrarProduto(@RequestBody CadastroProduto produto) {
		Produto novoProduto = new Produto(produto);
		produtoService.salvar(novoProduto);
		return ResponseEntity.status(HttpStatus.CREATED).body("Produto cadastrado com sucesso");
	}

	@PostMapping("/{id}/imagens")
	public Imagem adicionarImagem(@PathVariable Long id, @RequestParam("file") MultipartFile file,
			@RequestParam("principal") boolean principal) throws IOException {
		return produtoService.salvarImagem(id, file, principal);
	}

	@DeleteMapping("/{cod}")
	public ResponseEntity<String> deletarProduto(@PathVariable Long cod) {
		produtoService.deletar(cod);
		return ResponseEntity.status(HttpStatus.OK).body("Produto deletado com sucesso");
	}

	@PutMapping("/{cod}")
	public ResponseEntity<String> editarProduto(@PathVariable Long cod, @RequestBody Produto produto) {
		produtoService.atualizar(cod, produto);
		return ResponseEntity.status(HttpStatus.OK).body("Produto atualizado com sucesso");
	}

	@PostMapping("/visualizar/{cod}")
	public ResponseEntity<Produto> visualizarProduto(Long cod) {
		Produto produto = produtoService.buscarPorId(cod);
		return ResponseEntity.ok(produto);
	}

}
