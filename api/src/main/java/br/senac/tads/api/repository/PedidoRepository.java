package br.senac.tads.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.senac.tads.api.entities.Pedido;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}