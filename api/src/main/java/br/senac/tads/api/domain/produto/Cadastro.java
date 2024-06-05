package br.senac.tads.api.domain.produto;

import org.springframework.web.multipart.MultipartFile;

import br.senac.tads.api.entities.Produto;

public record Cadastro(Produto produto, MultipartFile file, boolean principal) {
}
