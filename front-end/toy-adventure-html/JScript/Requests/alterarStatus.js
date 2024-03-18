import { carregarUsuarios } from './listarUsuario.js';

async function alterarStatusUsuario(id, ativo, botao) {
    
    console.log('id enviado req ::: ', id)
    console.log('status ativo req ::: ', ativo)
    console.log('botao req ::: ', botao)



    try {
        const response = await fetch(`http://localhost:3033/alterar-status?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ativo }) // Passando diretamente o valor booleano
        });
        
        if (response.ok) {
            console.log(`Usuário ${ativo ? 'ativado' : 'desativado'} com sucesso.`);
            
            carregarUsuarios();
       
            if (ativo) {
                botao.textContent = 'Desativar';
                botao.classList.remove('btn__ativar');
                botao.classList.add('btn__desativar');
            } else {
                botao.textContent = 'Ativar';
                botao.classList.remove('btn__desativar');
                botao.classList.add('btn__ativar');
            }
            botao.dataset.ativo = ativo.toString(); // Opcional, se precisar usar essa informação no futuro
        } else {
            console.error('Erro ao alterar o status do usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Ocorreu um erro ao alterar o status do usuário:', error);
    }
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn__desativar') || event.target.classList.contains('btn__ativar')) {
        const id = event.target.dataset.id;
        const ativo = event.target.dataset.ativo === 'true'; 

        console.log('id enviado ::: ', id)
        console.log('status ativo ::: ', ativo)
        alterarStatusUsuario(id, ativo, event.target);
    }
});
