export function coletarDados(inputs) {
    const dados = {};
    inputs.forEach(input => {
        if (input.validity.valid) {
            const tipo = input.dataset.tipo;
            if (tipo === 'admin' || tipo === 'estoquista') {
                dados['grupo'] = input.value;
            } else {
                dados[tipo] = input.value;
            }
        }
    });
    return dados;
}


const formulario = document.querySelector('form');
if (formulario) {
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const inputs = document.querySelectorAll('input');
        const dados = coletarDados(inputs);

        if (Object.keys(dados).length > 0) {
            console.log('Dados a serem enviados para o banco de dados:', dados);

            cadastroSucesso(confEmail, confSenha);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
}
