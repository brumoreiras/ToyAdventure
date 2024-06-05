package br.senac.tads.api.repository;

import br.senac.tads.api.repository.PedidoRepository;
import br.senac.tads.api.domain.pedido.Pedido;
// import br.senac.tads.api.domain.produto.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}