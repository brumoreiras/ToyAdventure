const pool = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async authentication(req, res) {
        const { email, senha } = req.body;

        try {
            const usuario = await pool.query(
                'SELECT * FROM usuarios WHERE email = $1',
                [email]
            );

            if (usuario.rowCount < 1) {
                return res.status(404).json({ mensagem: 'E-mail ou senha inválidos!' });
            }

            const validaSenha = await bcrypt.compare(senha, usuario.rows[0].senha);

            if (!validaSenha) {
                return res.status(400).json({ mensagem: 'E-mail ou senha inválidos!' });
            }


            const { senha: _, ...usuarioLogado } = usuario.rows[0];

            const token = jwt.sign(
                {
                    id: usuario.rows[0].id
                },
                'TESTEOK',
                { expiresIn: '1h' }
            );

            return res.status(200).json({ usuario: usuarioLogado, token });

        } catch (error) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    },

    async validaToken(req, res, next) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ mensagem: 'Token não fornecido.' });
        }

        const token = authorization.split(' ')[1];

        try {
            const tokenUsuario = jwt.verify(token, 'TESTEOK')
            console.log('token do usuario ', tokenUsuario)
            const { id } = jwt.verify(token, 'TESTEOK')

            const { rows, rowCount } = await pool.query(
                'SELECT * FROM usuarios WHERE id = $1',
                [id]
            )

            if (rowCount < 1) {
                return res.status(401).json({ mensagem: 'Usuário não encontrado' })
            }

            req.usuario = rows[0]
            console.log(req.usuario)
            next();
        } catch (error) {
            return res.status(403).json({ mensagem: 'Token inválido.' });
        }
    }


}
