export function gerarTabelaUsuarios(usuarios) {
    // Elemento HTML da tabela
    const tabela = document.getElementById('create_list');

    // Limpa o conteúdo atual da tabela
    tabela.innerHTML = '';

    // Percorre cada usuário e cria uma linha na tabela para cada um
    usuarios.forEach(usuario => {
        // Cria uma nova linha na tabela
        const row = document.createElement('tr');

        // Adiciona as células da linha com os dados do usuário
        row.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.grupo}</td>
            <td>${usuario.ativo ? 'Ativo' : 'Inativo'}</td>
            <td class="button-cell">
                    <button  class="btn__alterar open-modal" data-id="${usuario.id}">Alterar</button>
            </td>
            <td class="button-cell">
                <button class="btn__desativar ${usuario.ativo ? 'desativar' : 'ativar'}" 
                        data-id="${usuario.id}" 
                        data-ativo="${usuario.ativo}">
                    ${usuario.ativo ? 'Desativar' : 'Ativar'}
                </button>
            </td>
        `;

        // Adiciona a linha à tabela
        tabela.appendChild(row);

        const openModalButton = row.querySelector(".open-modal");
        openModalButton.addEventListener("click", () => {
            document.getElementById('nome').value = usuario.nome;
            document.getElementById('senha').value = usuario.senha;
            console.log('usuario :::> ', usuario.id)

            const modal = document.querySelector("#modal");
            const fade = document.querySelector("#fade");


            modal.classList.remove("hide");
            fade.classList.remove("hide");
        });

    
        
    });


}

function definirRotuloBotaoDesativar(usuario) {
    return usuario.ativo ? 'Desativar' : 'Ativar';
}