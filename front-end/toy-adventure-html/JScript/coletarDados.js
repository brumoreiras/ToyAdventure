import { aoSalvar } from './Requests/cadastrarUsuario.js'

export function coletarDados(inputs) {
    const dados = {};
    let grupoDefinido = false; // Variável para controlar se o grupo já foi definido
    inputs.forEach(input => {
        if (input.validity.valid) {
            const tipo = input.dataset.tipo;
            if ((tipo === 'admin' || tipo === 'estoquista') && !grupoDefinido) {
                dados['grupo'] = input.value;
                grupoDefinido = true; // Define a variável como true para indicar que o grupo foi definido
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
            aoSalvar(dados);

        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
}
