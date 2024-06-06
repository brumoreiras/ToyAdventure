import { Browser, BrowserContext, chromium, Page } from 'playwright';
import User from './user'; // Import the 'User' class from the appropriate module


export class ToyAdventureDriver {

	private browser: Browser;
	private page: Page;
	private context: BrowserContext;
	private homeUrl: string = 'http://localhost:5500/';

	public async init() {
		this.browser = await chromium.launch();
		this.context = await this.browser.newContext();
		this.page = await this.context.newPage();
	}

	public async close() {
		await this.page.close();
		await this.context.close();
		await this.browser.close();
	}

	public async goToHome() {
		await this.page.goto(this.homeUrl);
	}

	public async login(email: string, password: string) {
		await this.page.fill('input[name="email"]', email);
		await this.page.fill('input[name="password"]', password);
		await this.page.click('button[type="submit"]');
	}

	public async register(usuario: User) {
		await this.page.fill('input[name="name"]', usuario.getName());
		await this.page.fill('input[name="email"]', usuario.getEmail());
		await this.page.fill('input[name="password"]', usuario.getPassword());
		await this.page.fill('input[name="confirmPassword"]', usuario.getPassword());
		await this.page.selectOption('select[name="permission"]', { label: usuario.getPermission() });

		await this.page.click('button[type="submit"]');
	}

	public async getPageUrl() {
		return this.page.url();
	}









}