// Obter elementos do DOM
const accountIcon = document.getElementById('account-icon');
const profileMenu = document.getElementById('profile-menuu');
const usernameElement = document.getElementById('username');
const usernameElementHeader = document.getElementById('user-name');
const groupElement = document.getElementById('group');
const logoutButton = document.getElementById('logout');

// Adicionar evento de clique no ícone de conta
accountIcon.addEventListener('click', () => {
    // Alternar a visibilidade do menu
    profileMenu.classList.toggle('show');
});

// Adicionar evento de clique no botão de logout
logoutButton.addEventListener('click', () => {
    // Limpar o localStorage e redirecionar para a página de login, por exemplo
    localStorage.clear();
    window.location.href = "/front-end/toy-adventure-html/";
});

// Função para preencher o menu com informações do usuário
function fillProfileMenu(usuario) {
    usernameElementHeader.textContent = usuario.nome
    usernameElement.textContent = `Nome: ${usuario.nome}`
    groupElement.textContent = `Grupo: ${usuario.grupo}`;
}

// Supondo que você tenha as informações do usuário armazenadas no localStorage
// const usuario = JSON.parse(localStorage.getItem('usuario'));

// if (usuario) {
//     fillProfileMenu(usuario);
// }
