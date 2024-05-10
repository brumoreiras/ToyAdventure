package br.senac.tads.api.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequestMapping("/upload")
public class UploadController {

	@PostMapping("/imagem")
	public ResponseEntity<String> uploadImagem(@RequestParam("imagem") MultipartFile imagem) {
		// Salvar a imagem no servidor
		String nomeArquivo = UUID.randomUUID().toString() + "_" + imagem.getOriginalFilename();

		// Resouces
		Path diretorio = Paths.get("src/main/resources/files/imgs");
		try {
			Files.write(diretorio.resolve(nomeArquivo), imagem.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem");
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(nomeArquivo);

	}

}
