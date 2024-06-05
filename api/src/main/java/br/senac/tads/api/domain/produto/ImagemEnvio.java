package br.senac.tads.api.domain.produto;

import org.springframework.web.multipart.MultipartFile;

public class ImagemEnvio {

	private MultipartFile imagem;
	private boolean principal;

	public MultipartFile getImagem() {
		return imagem;
	}

	public void setImagem(MultipartFile imagem) {
		this.imagem = imagem;
	}

	public boolean isPrincipal() {
		return principal;
	}

	public void setPrincipal(boolean principal) {
		this.principal = principal;
	}

	public ImagemEnvio(MultipartFile imagem, boolean principal) {
		this.imagem = imagem;
		this.principal = principal;
	}

	public ImagemEnvio() {
	}

}
