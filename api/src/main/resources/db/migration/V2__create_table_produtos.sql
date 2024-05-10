CREATE TABLE produtos(
	id SERIAL NOT NULL,
	nome VARCHAR(200) NOT NULL,
	descricao VARCHAR(2000) NOT NULL,
	preco DECIMAL(10,2) NOT NULL,
	categoria INTEGER NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE produtos_quantidade(
	id SERIAL NOT NULL,
	produto_id INTEGER NOT NULL,
	quantidade INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE imagens(
	id SERIAL NOT NULL,
	produto_id INTEGER NOT NULL,
	caminho VARCHAR(2000) NOT NULL,
	principal BOOLEAN NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE avaliacoes(
	id SERIAL NOT NULL,
	produto_id INTEGER NOT NULL,
	usuario_id INTEGER NOT NULL,
	nota INTEGER NOT NULL,
	comentario VARCHAR(2000) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (produto_id) REFERENCES produtos(id),
	FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);