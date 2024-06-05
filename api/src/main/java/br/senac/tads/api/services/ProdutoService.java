package br.senac.tads.api.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;

import br.senac.tads.api.domain.produto.CadastroProduto;
import br.senac.tads.api.domain.produto.CadastroWrapper;
import br.senac.tads.api.domain.produto.ImagemView;
import br.senac.tads.api.domain.produto.ListarProduto;
import br.senac.tads.api.domain.produto.ProdutoView;
import br.senac.tads.api.entities.Imagem;
import br.senac.tads.api.entities.Produto;
import br.senac.tads.api.repository.ImagemRepository;
import br.senac.tads.api.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private ImagemRepository imagemRepository;

	@Autowired
	private BlobContainerClient blobContainerClient;

	// Salvar um produto
	public Produto salvar(Produto produto) {
		return this.produtoRepository.save(produto);
	}

	private record Cadastro(Produto produto, MultipartFile file, boolean principal) {
	}

	// Salvar um produto q pode ter uma ou mais imagens
	// public Produto salvarProdutoImagem(Produto produto, List<MultipartFile>
	// files, List<Boolean> principais)
	// throws IOException {
	// Produto produtoSalvo = this.produtoRepository.save(produto);

	// Long idProduto = produtoSalvo.getId();

	// for (int i = 0; i < files.size(); i++) {
	// MultipartFile file = files.get(i);
	// Boolean principal = principais.get(i);

	// Imagem imagem = salvarImagem(idProduto, file, principal);
	// produtoSalvo.getImagens().add(imagem);
	// }
	// return produtoSalvo;
	// }

	public Produto salvarProduct(CadastroWrapper cadastro) throws IOException {
		Produto produto = new Produto(cadastro.getProduto());
		Produto produtoSalvo = this.produtoRepository.save(produto);

		if (cadastro.getImagens() != null && !cadastro.getImagens().isEmpty()) {
			for (CadastroWrapper.Imagem imagem : cadastro.getImagens()) {
				Imagem imagemSalva = salvarImagem(produtoSalvo.getId(), imagem.getBase64(), imagem.isPrincipal());
				produtoSalvo.getImagens().add(imagemSalva);
			}
		}

		return produtoSalvo;
	}

	// public Produto cadastrarProdutoComImagens(ProdutoCadastro produtoCadastro)
	// throws IOException {

	// Produto produto = new Produto(produtoCadastro.produto());
	// Produto produtoSalvo = this.produtoRepository.save(produto);

	// if (produtoCadastro.imagens() != null &&
	// !produtoCadastro.imagens().isEmpty()) {
	// for (ImagemEnvio imagemView : produtoCadastro.imagens()) {
	// String base64 = imagemView.base64();
	// Boolean principal = imagemView.principal();
	// if (base64 != null && !base64.isEmpty()) {
	// Imagem imagem = salvarImagem(produtoSalvo.getId(), base64, principal);
	// produtoSalvo.getImagens().add(imagem);
	// }
	// }
	// }

	// return produtoSalvo;
	// }

	@Transactional
	public Produto salvarProdutoComImagens(CadastroProduto cadastroProduto, List<MultipartFile> files,
			List<Boolean> principais) throws IOException {
		Produto produto = new Produto(cadastroProduto);
		Produto produtoSalvo = this.produtoRepository.save(produto);

		if (files != null && !files.isEmpty()) {
			for (int i = 0; i < files.size(); i++) {
				MultipartFile file = files.get(i);
				Boolean principal = principais.get(i);
				if (file != null && !file.isEmpty()) {
					String url = uploadImagem(file);
					Imagem imagem = new Imagem();
					imagem.setUrl(url);
					imagem.setPrincipal(principal);
					imagem.setProduto(produtoSalvo);
					this.imagemRepository.save(imagem);
				}
			}
		}

		return produtoSalvo;
	}

	public Produto salvaImagem(Cadastro cadastro) throws IOException {
		Produto produto = cadastro.produto();
		Produto produtoSalvo = this.produtoRepository.save(produto);

		if (cadastro.file() != null) {
			Imagem imagem = salvarImagem(produtoSalvo.getId(), cadastro.file(), cadastro.principal());
			produtoSalvo.getImagens().add(imagem);
		}

		return produtoSalvo;
	}

	// Buscar todos os produtos
	public List<Produto> buscarTodos() {
		return this.produtoRepository.findAll();
	}

	// Buscar um produto por id
	public Produto buscarPorId(Long id) {
		return this.produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
	}

	// Deletar um produto
	public void deletar(Long id) {
		this.produtoRepository.deleteById(id);
	}

	// Atualizar um produto
	public Produto atualizar(Long id, Produto produto) {
		Produto produtoAtualizado = this.produtoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Produto não encontrado"));
		produtoAtualizado.setNome(produto.getNome());
		produtoAtualizado.setPreco(produto.getPreco());
		// Set other properties as needed

		return this.produtoRepository.save(produtoAtualizado);
	}

	// salvar uma imagem com base64
	public Imagem salvarImagem(Long produtoId, String base64, boolean principal) throws IOException {
		Produto produto = produtoRepository.findById(produtoId)
				.orElseThrow(() -> new RuntimeException("Produto não encontrado"));

		String url = uploadImagem(base64);

		Imagem imagem = new Imagem();
		imagem.setUrl(url);
		imagem.setPrincipal(principal);
		imagem.setProduto(produto);

		return imagemRepository.save(imagem);
	}

	// salvar uma imagem
	@Transactional
	public Imagem salvarImagem(Long produtoId, MultipartFile file, boolean principal) throws IOException {
		Produto produto = produtoRepository.findById(produtoId)
				.orElseThrow(() -> new RuntimeException("Produto não encontrado"));

		String url = uploadImagem(file);

		Imagem imagem = new Imagem();
		imagem.setUrl(url);
		imagem.setPrincipal(principal);
		imagem.setProduto(produto);

		return imagemRepository.save(imagem);
	}

	// listar produtos paginadoS (10 itens por página)
	public List<ListarProduto> listarProdutosPaginado(int page, String busca) {
		int pageSize = 10;
		int offset = (page - 1) * pageSize;
		List<Produto> produtos = produtoRepository.listarProdutosPaginado(offset, pageSize, busca);
		return produtos.stream()
				.map(produto -> new ListarProduto(produto.getId(), produto.getNome(), produto.getPreco(),
						produto.getQuantidade(), produto.getAtivo()))
				.collect(Collectors.toList());
	}

	private String uploadImagem(MultipartFile file) throws IOException {
		String blobName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

		blobClient.upload(file.getInputStream(), file.getSize(), true);

		return blobClient.getBlobUrl();
	}

	public void deletarImagem(Long id) {
		Imagem imagem = imagemRepository.findById(id).orElseThrow(() -> new RuntimeException("Imagem não encontrada"));
		imagemRepository.delete(imagem);
	}

	private String uploadImagem(String base64) throws IOException {
		byte[] bytes = Base64.getDecoder().decode(base64);
		String blobName = UUID.randomUUID().toString() + ".png";
		BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

		blobClient.upload(new ByteArrayInputStream(bytes), bytes.length, true);

		return blobClient.getBlobUrl();
	}

	public ProdutoView buscarProdutoView(Long id) {
		Produto produto = produtoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Produto não encontrado"));

		List<ImagemView> imagens = produto.getImagens().stream()
				.map(imagem -> new ImagemView(imagem.getUrl(), imagem.isPrincipal(), imagem.getId()))
				.collect(Collectors.toList());

		ProdutoView produtoView = new ProdutoView(produto.getId(), produto.getNome(), produto.getDescricao(),
				produto.getPreco(), produto.getQuantidade(), produto.getAvaliacao(), produto.getAtivo(), imagens);

		return produtoView;

	}

	public List<ProdutoView> listarProdutos() {
		List<Produto> produtos = produtoRepository.findAll();
		return produtos
				.stream().map(produto -> new ProdutoView(produto.getId(), produto.getNome(), produto.getDescricao(),
						produto.getPreco(), produto.getQuantidade(), produto.getAvaliacao(), produto.getAtivo(),
						produto.getImagens().stream()
								.map(imagem -> new ImagemView(imagem.getUrl(), imagem.isPrincipal(), imagem.getId()))
								.collect(Collectors.toList())))
				.collect(Collectors.toList());
	}

	public ProdutoView visualizarProduto(Long id) {

		Produto produto = produtoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Produto não encontrado"));

		List<ImagemView> imagens = imagemRepository.findByProdutoId(id).stream()
				.map(imagem -> new ImagemView(imagem.getUrl(), imagem.isPrincipal(), imagem.getId()))
				.collect(Collectors.toList());

		return new ProdutoView(produto.getId(), produto.getNome(), produto.getDescricao(), produto.getPreco(),
				produto.getQuantidade(), produto.getAvaliacao(), produto.getAtivo(), imagens);
	}

	public Produto salvarProdutoComImagens(CadastroProduto cadastroProduto, MultipartFile file, Boolean principal)
			throws IOException {
		Produto produto = new Produto(cadastroProduto);
		Produto produtoSalvo = this.produtoRepository.save(produto);

		if (file != null) {
			String url = uploadImagem(file);
			Imagem imagem = new Imagem();
			imagem.setUrl(url);
			imagem.setPrincipal(principal);
			imagem.setProduto(produtoSalvo);
			this.imagemRepository.save(imagem);
		}

		return produtoSalvo;
	}

	@Transactional
	public void alterarStatus(Long id, Boolean ativo) {
		Produto produto = produtoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Produto não encontrado"));
		produto.setAtivo(ativo);
		produtoRepository.save(produto);
	}

}
