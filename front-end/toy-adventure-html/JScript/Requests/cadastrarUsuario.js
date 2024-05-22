function navigate(route) {
    window.location.href = route;
}

export async function aoSalvar(dados) {
    // console.log('O que está sendo recebido:::> ', dados)
    // const { nome, cpf, email, grupo, senha } = dados;
    // console.table(dados)


    // debugger;

    try {
        // const token = localStorage.getItem('token');
        // console.log('token :::> ', token)

        const response = await fetch("https://toyadventure.onrender.com/usuario/cadastrar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })

        if (response.ok) {
           /*  navigate("/ToyAdventure/front-end/toy-adventure-html/Pages/listar-usuario.html"); */
            navigate("/Pages/listar-usuario.html");
            console.table('Retorno dos dados', dados)
        } else {

            alert("Erro ao cadastrar usuário:", response.statusText);
            console.log("Erro ao cadastrar usuário:", response.statusText);
        }

        const data = await response.json();
        console.log('resposta::: ',  await response.json());
    } catch (error) {

        console.error('Ocorreu um erro ao cadastrar usuário:', error);
    }
}
