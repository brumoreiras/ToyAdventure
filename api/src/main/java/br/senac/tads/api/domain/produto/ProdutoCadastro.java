package br.senac.tads.api.domain.produto;

import java.util.List;

public record ProdutoCadastro(CadastroProduto produto, List<ImagemEnvio> imagens) {
}
