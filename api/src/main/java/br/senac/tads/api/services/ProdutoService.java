package br.senac.tads.api.services;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;

import br.senac.tads.api.entities.Imagem;
import br.senac.tads.api.entities.Produto;
import br.senac.tads.api.repository.ImagemRepository;
import br.senac.tads.api.repository.ProdutoRepository;

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

	// salvar uma imagem
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

	private String uploadImagem(MultipartFile file) throws IOException {
		String blobName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
		BlobClient blobClient = blobContainerClient.getBlobClient(blobName);

		blobClient.upload(file.getInputStream(), file.getSize(), true);

		return blobClient.getBlobUrl();
	}

}
