CREATE DATABASE toyadventure02;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    grupo VARCHAR(20) NOT NULL CHECK (grupo IN ('admin', 'estoquista')),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para armazenar os produtos
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    avaliacao NUMERIC(2,1) CHECK (avaliacao >= 1 AND avaliacao <= 5),
    descricao TEXT NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    qtd_estoque INT NOT NULL
);

-- Tabela para armazenar as imagens dos produtos
CREATE TABLE imagens (
    id SERIAL PRIMARY KEY,
    produto_id INT REFERENCES produtos(id),
    caminho VARCHAR(255) NOT NULL,
    padrao BOOLEAN NOT NULL DEFAULT FALSE
);
