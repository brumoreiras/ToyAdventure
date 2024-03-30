const pool = require('../conexao.js');

module.exports = {

    async cadastroProdutos(req, res) {
        const { nome, avaliacao, descricao, preco, qtd_estoque } = req.body;

        try{
            const dados = await pool.query(
                'SELECT * FROM produtos WHERE nome = $1',
                [nome]
            )

            if(dados.rows.length > 0){
                return res.status(400).json({ mensagem: 'Produto já cadastrado' })
            }

            const cadastrarProduto = await pool.query(
                'INSERT INTO produtos (nome, avaliacao, descricao, preco, qtd_estoque) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, avaliacao, descricao, preco, qtd_estoque',
                [nome, avaliacao, descricao, preco, qtd_estoque]
            )

            return res.status(201).json(cadastrarProduto.rows[0])
        } catch(error){
            console.error('Erro ao cadastrar produto:', error)
            return res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }
}