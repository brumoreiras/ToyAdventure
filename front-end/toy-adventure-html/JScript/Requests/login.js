const button = document.getElementById('botao');
const form = document.getElementById('fomrLogin');

function navigate(route) {
    window.location.href = route;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('emailL').value;
    const senha = document.getElementById('senhaA').value;

    try {
        const response = await fetch("https://toyadventure.onrender.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            const { token, usuario } = data;

            // Armazenar token e informações do usuário no localStorage
            localStorage.setItem('token', token);
            // localStorage.setItem('usuario', JSON.stringify(usuario));

            // Login válido
            navigate("/Pages/painel-de-controle.html");
            /* console.log("Login realizado com sucesso ",data.nomeUsuario); */
        } else {
            alert('Se um cliente entrar com email e senha o mesmo deve ser rejeitado. Esta tela de login é apenas para usuários de backoffice');
            // Login inválido
            console.log("Erro de acesso");
        }
        
    } catch (error) {
        console.error('Ocorreu um erro ao fazer login:', error);
    }

    console.log('Botão clicado => ', email, senha);
});
