import { coletarDados } from "../coletarDados";

function navigate(route) {
    window.location.href = route;
}

async function aoSalvar(evento) {
    evento.preventDefault();
    const { nome, email, grupo, senha } = coletarDados();

    try {
        const response = await fetch("http://localhost:3033/usuario", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome, email, senha, grupo
            })
        });

        if (response.ok) {
            navigate("/lista-usuario");
        } else {
            console.log("Erro ao cadastrar usuário:", response.statusText);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ocorreu um erro ao cadastrar usuário:', error);
    }
}

const formulario = document.querySelector('form');
if (formulario) {
    formulario.addEventListener('submit', aoSalvar);
}
