import { test, expect } from "@playwright/test";
import { ToyAdventureDriver } from "./toyadventure-driver";

test.describe('Toy Adventure', () => {
	let driver: ToyAdventureDriver;

	// Inicialização driver
	test.beforeAll(async () => {
		driver = new ToyAdventureDriver();
		await driver.init();
	});

	// Teste de acesso à página inicial
	test('Acessar a página inicial', async () => {
		await driver.goToHome();
	});

	// Teste de login com sucesso
	test('Login com sucesso', async () => {
		await driver.goToHome();
		await driver.login('ldss@mail.com', 'Senha@1234');

		const url = await driver.getPageUrl();
		expect(url).toBe('http://localhost:5500/Pages/painel-de-controle.html');
	});

	// Teste de login com falha

	// Teste de registro com sucesso
	
	// Teste de registro com falha


	// Finalização driver
	test.afterAll(async () => {
		await driver.close();
	});
});