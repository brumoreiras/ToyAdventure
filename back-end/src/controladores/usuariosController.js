const pool = require('../conexao.js');
const bcrypt = require('bcrypt');

module.exports = {

    async registrarUsuario(req, res) { // está cadastrando e criptografando a senha
        const { nome, cpf, email, senha, grupo } = req.body;

        try {
            const usuarioEncontrado = await pool.query(
                'SELECT * FROM usuarios WHERE email = $1',
                [email]
            );

            const crypSenha = await bcrypt.hash(senha, 10);

            if (usuarioEncontrado.rows.length > 0) {
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com e-mail informado' });
            }

            const cadastrarUsuario = await pool.query(
                'INSERT INTO usuarios (nome, cpf, email, senha, grupo) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, cpf, email, senha, grupo',
                [nome, cpf, email, crypSenha, grupo]
            );
            
            return res.status(201).json(cadastrarUsuario.rows[0]);

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async getUsuario(req, res) {
        //console.log('req usuario ', req.usuario);
        try {
            return res.json(req.usuario);
        } catch (error) {
            console.error("Simulando erro", error)
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async atualizarUsuario(req, res) { //foi alterado o codigo anterior 
        const { id } = req.usuario;
        const { nome, cpf, senha, grupo } = req.body;
    
        try {
            if (grupo && grupo !== req.usuario.grupo) {
                return res.status(403).json({ mensagem: 'Você não tem permissão para alterar o grupo do usuário' });
            }
    
            let crypSenha = req.usuario.senha; // Mantém a senha antiga se não for alterada
            if (senha) {
                crypSenha = await bcrypt.hash(senha, 10); // Criptografa a nova senha se fornecida
            }
    
            await pool.query(
                'UPDATE usuarios SET nome = $1, cpf = $2, senha = $3 WHERE id = $4',
                [nome, cpf, crypSenha, id]
            );
    
            return res.status(200).end();
    
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async listarUsuarios(req, res) { // foi implementado do zero 
        try {
            let query = 'SELECT nome, email, grupo, ativo FROM usuarios';
    
            console.log('Query executada:', query); // Log da query executada
    
            const usuarios = await pool.query(query);
            console.log('Número de usuários encontrados:', usuarios.rows.length); // Log do número de usuários encontrados
            return res.status(200).json(usuarios.rows);
    
        } catch (error) {
            console.error('Erro ao listar usuários:', error); // Log de erros
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async alterarStatusUsuario(req, res) { //implementado do zero 
        const { id } = req.params;
        const { ativo } = req.body;
    
        try {
            const { rowCount } = await pool.query(
                'UPDATE usuarios SET ativo = $1 WHERE id = $2',
                [ativo, id]
            );
    
            if (rowCount === 0) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }
    
            return res.status(200).json({ mensagem: 'Status do usuário alterado com sucesso.', ativo });
    
        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
    
    
}


