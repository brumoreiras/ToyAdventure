export default class User {

	private nome: string;
	private cpf: number;
	private email: string;
	private senha: string;
	private confirmacaoSenha: string;
	private permissao: string;
	private ativo: number;

	constructor(nome: string, cpf: number, email: string, senha: string, confirmacaoSenha: string, permissao: string, ativo: number) {
		this.nome = nome;
		this.cpf = cpf;
		this.email = email;
		this.senha = senha;
		this.confirmacaoSenha = confirmacaoSenha;
		this.permissao = permissao;
		this.ativo = ativo;
	}


	public getName(): string {
		return this.nome;
	}

	public getCpf(): number {
		return this.cpf;
	}

	public getEmail(): string {
		return this.email;
	}

	public getPassword(): string {
		return this.senha;
	}

	public getConfirmPassword(): string {
		return this.confirmacaoSenha;
	}

	public getPermission(): string {
		return this.permissao;
	}

	public getActive(): number {
		return this.ativo;
	}

	public setName(nome: string) {
		this.nome = nome;
	}

	public setCpf(cpf: number) {
		this.cpf = cpf;
	}

	public setEmail(email: string) {
		this.email = email;
	}

	public setPassword(senha: string) {
		this.senha = senha;
	}

	public setConfirmPassword(confirmacaoSenha: string) {
		this.confirmacaoSenha = confirmacaoSenha;
	}

	public setPermission(permissao: string) {
		this.permissao = permissao;
	}

	public setActive(ativo: number) {
		this.ativo = ativo;
	}

	
}