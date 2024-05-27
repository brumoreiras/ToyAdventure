
export let user = {}

export const getUsuario = document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn__alterar')) {
        const id = event.target.dataset.id; // Obtém o ID do usuário a partir do atributo data-id
        console.log('Clicou e pegou id :::> ', id)
        try {
            const token = localStorage.getItem('token');
            // console.log('token :::> ', token)
            // Faz uma requisição para obter os dados do usuário com o ID
            const response = await fetch(`https://toyadventure.onrender.com/usuario/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'aplication/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter os dados do usuário');
            }

            const usuario = await response.json();
            user = usuario;
            // console.log('Usuario :::> ', usuario);
            // console.log('Usuario user ::::> ', user);
            // Preenche os campos do formulário com os dados do usuário obtidos

            // Define o ID do usuário no atributo data-id do formulário
            formulario.dataset.id = id;
        } catch (error) {
            console.error('Ocorreu um erro ao obter os dados do usuário:', error);
        }
    }
});