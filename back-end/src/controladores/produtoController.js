const pool = require('../conexao.js');
const multer = require('multer');
const path = require('path');

// Configuração do armazenamento das imagens com o Multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

module.exports = {
    async cadastroProdutos(req, res) {
        const { nome, avaliacao, descricao, preco, qtd_estoque } = req.value;

        try {
            const dados = await pool.query(
                'SELECT * FROM produtos WHERE nome = $1',
                [nome]
            );

            if (dados.rows.length > 0) {
                return res.status(400).json({ mensagem: 'Produto já cadastrado' });
            }

            // Realizar o upload da imagem
            upload(req, res, async (err) => {
                if (err) {
                    console.error('Erro ao fazer upload da imagem:', err);
                    return res.status(500).json({ mensagem: 'Erro interno do servidor ao fazer upload da imagem' });
                }

                // Caminho da imagem no servidor
                const caminhoImagem = req.file.path;

                // Inserir o produto no banco de dados
                const cadastrarProduto = await pool.query(
                    'INSERT INTO produtos (nome, avaliacao, descricao, preco, qtd_estoque) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                    [nome, avaliacao, descricao, preco, qtd_estoque]
                );

                const produtoId = cadastrarProduto.rows[0].id;

                // Inserir a imagem associada ao produto na tabela de imagens
                await pool.query(
                    'INSERT INTO imagens (produto_id, caminho, padrao) VALUES ($1, $2, $3)',
                    [produtoId, caminhoImagem, false]
                );

                return res.status(201).json({ id: produtoId, nome, avaliacao, descricao, preco, qtd_estoque, caminhoImagem });
            });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
};
