// --------------------- Vetor com os inputs ---------------------------------------
const inputs = document.querySelectorAll('input')
console.log('meus inputs:::: ', inputs)

inputs.forEach(input => {
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})

function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('erro')
        input.parentElement.querySelector('.mensagem-erro').innerHTML = ''

    } else {
        input.parentElement.classList.add('erro')
        input.parentElement.querySelector('.mensagem-erro').innerHTML = mostraMensagemErro(tipoDeInput, input)
    }

}

// ------------------- Array com os erros para que seja tratado. ---------------------------
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',

]

// ------------------- Objeto com os erros --------------------------------------

const mensagemErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },
    cpf: {
        valueMissing: 'O campo CPF não pode estar vazio.',
        patternMismatch: 'CPF inválido. Digite no formato xxx.xxx.xxx-xx.'
    },
    admin: {
        valueMissing: 'Selecione um tipo de usuário.'
    },
    estoquista: {
        valueMissing: 'Selecione um tipo de usuário.'
    },
    email: {
        valueMissing: 'O campo email não opde estar vazio.',
        typeMismatch: 'O email digitado não é valido.'
    },
    confirmeEmail: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email digitado não é valido.',
        customError: 'O e-mail digitado não confere.'
    },
    password: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 à 8 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter caractere especial.'
    },
    confirmePassword: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 à 8 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter caractere especial.',
        customError: 'A senha digita não confere.'
    }
}
// --------------- Responsável em validar as funções e retornar os erros se necessario --------------------------
const validadores = {
    cpf: input => validaCPF(input),
    admin: input => validaTipoUsuario(input),
    estoquista: input => validaTipoUsuario(input),
    confirmeEmail: input => validaEmail(input),
    confirmePassword: input => validaSenha(input)
}


function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (var i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

function validaCPF(input) {
    const cpfValue = input.value.replace(/\D/g, '');
    if (!TestaCPF(cpfValue)) {
        input.setCustomValidity('CPF inválido. Digite no formato xxx.xxx.xxx-xx');
    } else {
        input.setCustomValidity('');
    }
}


function validaTipoUsuario(input) {
    const adminRadio = document.querySelector('input[data-tipo="admin"]:checked');
    const estoquistaRadio = document.querySelector('input[data-tipo="estoquista"]:checked');

    if (!adminRadio && !estoquistaRadio) {
        input.setCustomValidity('Selecione um tipo de usuário.');
    } else {
        input.setCustomValidity('');
    }
}


// ------------------- Validação de e-mail, aqui verifica se os campos são iguais ------------------------------
function validaEmail(input) {
    const email = document.querySelector('.input__forms[data-tipo="email"]').value;

    const confirmeEmail = input.value

    console.log('email::: ', email)
    console.log('confirmeemail::: ', confirmeEmail)

    let inf = ''

    if (email == confirmeEmail) {
        inf = ''
        input.setCustomValidity('')
        return

    } else {
        inf = 'O e-mail digitado não confere.'
        input.setCustomValidity('O e-mail digitado não confere.')
        return
    }
}
// ------------------- Validação de senha, aqui verifica se os campos são iguais ------------------------------
function validaSenha(input) {
    const password = document.querySelector('.input__forms[data-tipo="password"]').value;
    const confirmePassword = input.value

    let inf = ''

    if (password == confirmePassword) {
        inf = ''
        input.setCustomValidity('')
        return

    } else {
        inf = 'A senha digita não confere.'
        input.setCustomValidity('A senha digita não confere.')
        return
    }
}
// ---------------------- responsável em verificar se o input atende as normas -------------------------------
function mostraMensagemErro(tipoDeInput, input) {
    let mensagem = ''

    tiposDeErro.forEach(erro => {

        if (input.validity[erro]) {
            mensagem = mensagemErro[tipoDeInput][erro]
        }
    })

    return mensagem
}

const confEmail = document.getElementById('confirme-email')
const confSenha = document.getElementById('confirme-password')

function cadastroSucesso(confEmail, confSenha) {

    const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin') || '[]')

    dadosLogin.push({
        email: confEmail.value,
        senha: confSenha.value
    })

    localStorage.setItem('dadosLogin', JSON.stringify(dadosLogin))
}

// --------------------- Autenticação de login -------------------------------

const inputEmail = document.getElementById('emailL')
const inputSenha = document.getElementById('senhaA')

const botaoEntrou = document.getElementById('fomrLogin')

if (botaoEntrou) {
    botaoEntrou.addEventListener('submit', (e) => {
        e.preventDefault()

        let listLogin = []
        let objLogin = {
            emails: '',
            senhas: ''
        }

        listLogin = JSON.parse(localStorage.getItem('dadosLogin'))

        listLogin.forEach((item) => {
            if (inputEmail.value == item.email && inputSenha.value == item.senha) {

                objLogin = {
                    emails: item.email,
                    senhas: item.senha
                }
            }

        })
        if (inputEmail.value == objLogin.emails && inputSenha.value == objLogin.senhas) {
            window.location.replace("/paginas/bemVindo.html")
            return
        } else {
            alert('Acesso negado')
            return
        }

    })

}
