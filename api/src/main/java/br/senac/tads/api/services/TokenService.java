package br.senac.tads.api.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import br.senac.tads.api.domain.usuario.Usuario;

@Service
public class TokenService {

	@Value("${api.security.token.secret}")
	private String secret;

	public String generateToken(Usuario usuario) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("API Senac")
					.withSubject(usuario.getEmail())
					.withExpiresAt(getExpirationTime())
					.sign(algorithm);
			return token;
		} catch (JWTCreationException exception) {
			throw new RuntimeException("Erro ao gerar token", exception);
		}
	}

	public String validarToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			return JWT.require(algorithm)
					.withIssuer("API Senac")
					.build()
					.verify(token)
					.getSubject();
		} catch (JWTVerificationException exception) {
			throw new RuntimeException("Token inválido", exception);
		}
	}

	private Instant getExpirationTime() {
		return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.ofHours(-3));
	}
}
