import { user } from "./getUsuario.js";

const formulario = document.getElementById('formulario');

if (formulario) {
    formulario.addEventListener('submit', async (evento) => {
        
        /* evento.preventDefault(); */ // Evita o comportamento padrão de recarregar a página ao enviar o formulário

        console.log('Clicou no botão de salvar :::> ', user);

        // Obtém o ID do usuário do formulário
        const id = formulario.dataset.id;
        console.log('Id do usuario dentro de req :::> ', id);

        // Verifica se o ID foi obtido corretamente
        if (!id) {
            console.error('ID do usuário não encontrado.');
            return;
        }
        // Obtém os valores dos campos do formulário
        const nome = formulario.querySelector('#nome').value;
        const senha = formulario.querySelector('#senha').value;
        let grupo = ''; // Declarando a variável grupo aqui

        // Obtém o grupo selecionado
        const grupoSelecionado = document.querySelector('input[name="permissao"]:checked');

        // Verifica se alguma opção foi selecionada
        if (grupoSelecionado) {
            grupo = grupoSelecionado.value; // Atribui o valor do grupo selecionado
            console.log('Grupo selecionado:', grupo);
        } else {
            console.error('Nenhuma opção de grupo selecionada.');
            return; // Interrompe a execução da função
        }

        // Envia uma requisição para atualizar os dados do usuário
        await atualizarUsuario(id, nome, senha, grupo);

        // Emite um alerta após o envio do formulário
        /* alert('Formulário enviado com sucesso!'); */
    });
}


// Função para enviar uma requisição para atualizar os dados do usuário
async function atualizarUsuario(id, nome, senha, grupo) {
    console.log('ID do usuário:', id)
    console.log('ID do usuário:', nome)
    console.log('ID do usuário:', senha)
    console.log('ID do usuário:', grupo)

   
    try {
        const token = localStorage.getItem('token');
        console.log('token :::> ', token)
   
        const response = await fetch(`http://localhost:3033/alterar-usuario?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nome, senha, grupo })
        });

        if (response.ok) {
            console.log('Usuário atualizado com sucesso.');
        } else {
            console.error('Erro ao atualizar usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Ocorreu um erro ao atualizar o usuário:', error);
    }
}
