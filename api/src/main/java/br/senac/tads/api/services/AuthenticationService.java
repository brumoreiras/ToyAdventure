package br.senac.tads.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

	@Autowired
	private TokenService tokenService;

	public String authenticate(Authentication authentication) {
		return tokenService.generateToken(authentication);
	}
}
