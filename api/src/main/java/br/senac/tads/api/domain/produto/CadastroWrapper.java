package br.senac.tads.api.domain.produto;

import java.util.List;

public class CadastroWrapper {
	private CadastroProduto produto;
	private List<Imagem> imagens;

	// Getters and setters
	public CadastroProduto getProduto() {
		return produto;
	}

	public void setProduto(CadastroProduto produto) {
		this.produto = produto;
	}

	public List<Imagem> getImagens() {
		return imagens;
	}

	public void setImagens(List<Imagem> imagens) {
		this.imagens = imagens;
	}

	// Inner class for Imagem
	public static class Imagem {
		private String base64;
		private boolean principal;

		// Getters and setters
		public String getBase64() {
			return base64;
		}

		public void setBase64(String base64) {
			this.base64 = base64;
		}

		public boolean isPrincipal() {
			return principal;
		}

		public void setPrincipal(boolean principal) {
			this.principal = principal;
		}
	}
}