package br.senac.tads.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.repository.ImagemRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos/{id}/imagens")
public class imagemController {

	@Autowired
	private ImagemRepository imagemRepository;

	@DeleteMapping("/{id2}")
	public ResponseEntity<String> deletarImagem(@PathVariable Long id2) {
		imagemRepository.deleteById(id2);
		return ResponseEntity.ok("Imagem deletada com sucesso");
	}

}
