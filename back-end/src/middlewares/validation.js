const bcrypt = require('bcrypt');

module.exports = {
    validaCampoCadastro(req, res, next) {
        const { nome, cpf, email, senha, grupo } = req.body;

        if (!nome || !email || !senha || !cpf || !grupo) {
            return res.status(400).json({ mensagem: 'Todos os campos (nome, cpf, email, senha, grupo) são obrigatórios para o cadastro.' });
        }
        console.log(req.body);
        console.log('validou campo cadastro')
        next();
    },

    validaCampoLogin(req, res, next) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Os campos de e-mail e senha são obrigatórios para o login.' });
        }
        console.log('validou campo login')

        next();
    },

    async validaAlteracaoUsuario(req, res, next) {
        const { nome, senha, grupo } = req.body;
        const usuarioLogado = req.usuario; // Supondo que você tenha um middleware para identificar o usuário logado

        try {
            // Verifica se todos os campos necessários estão presentes
            if (!nome || !senha || !grupo) {
                return res.status(400).json({ mensagem: 'Todos os campos (nome, cpf, senha, confirmação de senha, grupo) são obrigatórios para a alteração.' });
            }

            // Verifica se a senha foi alterada e se a confirmação de senha está correta
            if (senha !== confirmacaoSenha) {
                return res.status(400).json({ mensagem: 'A senha e a confirmação de senha não coincidem.' });
            }


            // Verifica se é permitido alterar o grupo
            if (grupo && grupo !== usuarioLogado.grupo) {
                return res.status(400).json({ mensagem: 'Apenas o grupo pode ser alterado (se não for o usuário logado).' });
            }

            // Verifica se a senha foi alterada para encriptá-la
            let senhaEncriptada = usuarioLogado.senha;
            if (senha !== usuarioLogado.senha) {
                senhaEncriptada = await bcrypt.hash(senha, 10);
            }

            req.usuario = { // Atualiza o objeto de usuário com as informações alteradas
                ...usuarioLogado,
                nome,
                senha: senhaEncriptada,
                grupo
            };

            next();
        } catch (error) {
            console.error('Erro ao validar alteração de usuário:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}
