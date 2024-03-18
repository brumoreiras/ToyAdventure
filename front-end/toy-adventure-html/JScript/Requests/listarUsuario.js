import { gerarTabelaUsuarios } from "../listarUsuarioDoBanco.js";

export async function carregarUsuarios() {
    try {
        // Faz a requisição para obter a lista de usuários
        const response = await fetch("http://localhost:3033/listar-usuario");
        if (!response.ok) {
            throw new Error('Erro ao carregar usuários');
        }

        // Obtém os dados dos usuários
        const usuarios = await response.json();

        // Chama a função para gerar a tabela com os usuários obtidos
        gerarTabelaUsuarios(usuarios);
    } catch (error) {
        console.error('Ocorreu um erro ao carregar os usuários:', error);
    }
}

// Carrega os usuários quando a página é carregada
window.addEventListener('load', carregarUsuarios);