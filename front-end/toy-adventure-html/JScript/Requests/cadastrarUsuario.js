function navigate(route) {
    window.location.href = route;
}

export async function aoSalvar(dados) {
    console.log('O que está sendo recebido:::> ', dados)
    const { nome, cpf, email, grupo, senha } = dados;
    console.table(dados)

    try {
        const response = await fetch("http://localhost:3033/usuario", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome, cpf, email, grupo, senha,
            })
        })

        if (response.ok) {
            navigate("/ToyAdventure/front-end/toy-adventure-html/Pages/listar-usuario.html");
            console.table('Retorno dos dados', dados)
        } else {
            console.log("Erro ao cadastrar usuário:", response.statusText);
        }

        const data = await response.json();
        console.log('resposta::: ',  await response.json());
    } catch (error) {
        console.error('Ocorreu um erro ao cadastrar usuário:', error);
    }
}



//Eu preciso coletar os dados enviar para api cadastrar no banco não preciso fazer o direcionamento de paginas por aqui