package br.senac.tads.api.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.domain.produto.CadastroProduto;
import br.senac.tads.api.domain.produto.ImagemEnvio;
import br.senac.tads.api.domain.produto.ListarProduto;
import br.senac.tads.api.domain.produto.ProdutoView;
import br.senac.tads.api.entities.Imagem;
import br.senac.tads.api.entities.Produto;
import br.senac.tads.api.services.ProdutoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")

public class ProdutoController {

	@Autowired
	private ProdutoService produtoService;

	/*
	 * @GetMapping("/listar")
	 * public ResponseEntity<List<ProdutoView>> listarProdutos() {
	 * List<ProdutoView> produtos = produtoService.listarProdutos();
	 * return ResponseEntity.ok(produtos);
	 * }
	 * 
	 */

	@GetMapping("/{id}")
	public ResponseEntity<ProdutoView> visualizarProduto(@PathVariable Long id) {
		System.out.println("ID: " + id);
		ProdutoView produto = produtoService.visualizarProduto(id);
		return ResponseEntity.ok(produto);
	}

	// Obter ProdutO PAGINADO EM 10 ITENS - RESQUEST PARAM
	@GetMapping()
	public ResponseEntity<List<ListarProduto>> listarProdutosPaginado(@RequestParam(defaultValue = "1") int pagina,
			@RequestParam(defaultValue = "") String busca) {
		List<ListarProduto> produtos = produtoService.listarProdutosPaginado(pagina, busca);
		return ResponseEntity.ok(produtos);
	}

	@PostMapping()
	public ResponseEntity<String> cadastrarProduto(@RequestBody CadastroProduto produto) {
		Produto novoProduto = new Produto(produto);
		novoProduto = produtoService.salvar(novoProduto);
		return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto.getId().toString());
	}

	@PostMapping(value = "/{id}/imagens", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public Imagem adicionarImagem(@PathVariable Long id, @RequestBody @ModelAttribute ImagemEnvio imagem)
			throws IOException {
		return produtoService.salvarImagem(id, imagem.getImagem(), imagem.isPrincipal());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletarProduto(@PathVariable Long id) {
		produtoService.deletar(id);
		return ResponseEntity.status(HttpStatus.OK).body("Produto deletado com sucesso");
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> editarProduto(@PathVariable Long id, @RequestBody CadastroProduto produto) {
		produtoService.atualizar(id, produto);
		return ResponseEntity.status(HttpStatus.OK).body("Produto atualizado com sucesso");
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<String> alterarStatus(@PathVariable Long id, @RequestBody Boolean ativo) {
		produtoService.alterarStatus(id, ativo);
		return ResponseEntity.status(HttpStatus.OK).body("Status alterado com sucesso");
	}

	/*
	 * @GetMapping("/{id}")
	 * public ResponseEntity<Produto> buscarProduto(@PathVariable Long id) {
	 * Produto produto = produtoService.buscarPorId(id);
	 * if (produto == null || produto.getId() == null) {
	 * return ResponseEntity.notFound().build();
	 * }
	 * return ResponseEntity.ok(produto);
	 * }
	 * 
	 * @PostMapping("/cadastrar")
	 * public ResponseEntity<String> cadastrarProduto(@RequestBody CadastroWrapper
	 * produto) throws IOException {
	 * 
	 * // Ver se o produto está vindo corretamente
	 * System.out.println("Produto: " + produto.getProduto().nome());
	 * 
	 * // Ver se as imagens estão vindo corretamente
	 * System.out.println("Imagens: " + produto.getImagens().size());
	 * for (CadastroWrapper.Imagem imagem : produto.getImagens()) {
	 * System.out.println("Imagem: " + imagem.getBase64());
	 * }
	 * 
	 * Produto novoProduto = produtoService.salvarProduct(produto);
	 * return ResponseEntity.status(HttpStatus.CREATED).
	 * body("Produto cadastrado com sucesso");
	 * }
	 * 
	 * @PostMapping(value = "/teste1", consumes = {
	 * MediaType.MULTIPART_FORM_DATA_VALUE })
	 * public ResponseEntity<Produto>
	 * cadastrarProdutoComImagens(@RequestParam("produto") String produtoJson,
	 * 
	 * @RequestParam("files") List<MultipartFile> files,
	 * 
	 * @RequestParam("principais") List<Boolean> principais) throws IOException {
	 * 
	 * System.out.println("Recebendo produto: " + produtoJson);
	 * 
	 * System.out.println("Recebendo arquivos: " + files.size()); // Log para
	 * // verificar o recebimento dos arquivos
	 * for (MultipartFile file : files) {
	 * System.out.println("Arquivo: " + file.getOriginalFilename());
	 * }
	 * CadastroProduto cadastroProduto = new ObjectMapper().readValue(produtoJson,
	 * CadastroProduto.class);
	 * 
	 * Produto novoProduto = produtoService.salvarProdutoComImagens(cadastroProduto,
	 * files, principais);
	 * return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
	 * }
	 * 
	 * @PostMapping(value = "/teste", consumes = {
	 * MediaType.MULTIPART_FORM_DATA_VALUE })
	 * public ResponseEntity<Produto>
	 * cadastrarProdutoComImagens(@RequestParam("produto") String produtoJson,
	 * 
	 * @RequestParam("files") MultipartFile files,
	 * 
	 * @RequestParam("principais") Boolean principais) throws IOException {
	 * 
	 * CadastroProduto cadastroProduto = new ObjectMapper().readValue(produtoJson,
	 * CadastroProduto.class);
	 * 
	 * Produto novoProduto = produtoService.salvarProdutoComImagens(cadastroProduto,
	 * files, principais);
	 * return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
	 * }
	 */

}
