function deletarUsuario(id) {
    const modal = document.querySelector("#mdl_confirm");
    modal.showModal();

    const btn_confirm = modal.querySelector('.btn_confirm_delete');
    const btn_cancel = modal.querySelector('.btn_cancel_delete');
    
    // Função para remover usuário
    const confirmDelete = (event) => {
		event.preventDefault();
		try {
			const token = localStorage.getItem('token');
			const response = fetch(`https://toyadventure.onrender.com/usuario/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			});
			if (response.ok) {
				modal.close();
				console.log(`Usuário deletado com sucesso.`);
				carregarUsuarios();
			}
			else {
				modal.close();
				console.error('Erro ao deletar o usuário:', response.statusText);
			}
		}
		catch (error) {
			modal.close();
			console.error('Ocorreu um erro ao deletar o usuário:', error);
		}
    };

    // Função para cancelar remoção
    const cancelDelete = (event) => {
		event.preventDefault();
        modal.close();
    };

	// Função para fechar o modal ao clicar fora dele
	const closeModalOutsideClick = (event) => {
		if (event.target === modal) {
			modal.close();
		}
	};

    // Remove event listeners anteriores para evitar múltiplos alertas
    btn_confirm.removeEventListener('click', confirmDelete);
    btn_cancel.removeEventListener('click', cancelDelete);
	modal.removeEventListener('click', closeModalOutsideClick);

    // Adiciona os novos event listeners
    btn_confirm.addEventListener('click', confirmDelete);
    btn_cancel.addEventListener('click', cancelDelete);
	modal.addEventListener('click', closeModalOutsideClick);
}
