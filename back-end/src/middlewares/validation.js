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
    }
}

