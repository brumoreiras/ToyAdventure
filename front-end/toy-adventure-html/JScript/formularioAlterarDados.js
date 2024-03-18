// Função para preencher os campos do formulário com os dados do usuário
import { user } from "./Requests/getUsuario.js";


export function preencherFormularioComDadosDoUsuario() {
    document.getElementById('nome').value = user.nome;
    document.getElementById('senha').value = user.senha;
}

document.addEventListener('DOMContentLoaded', () => {
    preencherFormularioComDadosDoUsuario();
});