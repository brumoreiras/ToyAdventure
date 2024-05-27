package br.senac.tads.api.services;

import java.time.Instant;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class TokenService {

	@Value("${api.security.token.secret}")
	private String secret;

	private final String issuer = "API Senac";
	private final JwtEncoder encoder;

	public TokenService(JwtEncoder encoder) {
		this.encoder = encoder;
	}

	public String generateToken(Authentication authentication) {
		Instant now = Instant.now();
		long expiry = 3600L;

		// Obtem as roles do usuário autenticado
		var scopes = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		var claims = JwtClaimsSet.builder()
				.issuer(issuer)
				.subject(authentication.getName())
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiry))
				.claim("scope", scopes)
				.build();
		return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}

}
