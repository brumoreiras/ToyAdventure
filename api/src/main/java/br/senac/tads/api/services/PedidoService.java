package br.senac.tads.api.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.senac.tads.api.domain.pedido.StatusPedido;
import br.senac.tads.api.entities.Pedido;
import br.senac.tads.api.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }

    public Pedido criarPedido(Pedido pedido) {
        pedido.setDataPedido(LocalDate.now());
        LocalDate dataEntrega = LocalDate.now().plus(7, ChronoUnit.DAYS);
        pedido.setDataEntrega(dataEntrega);
        return pedidoRepository.save(pedido);
    }

    public Pedido atualizarPedido(Pedido pedido) {
        Pedido pedidoExistente = pedidoRepository.findById(pedido.getIdPedido()).orElse(null);
        if (pedidoExistente != null) {
            pedidoExistente.setDataPedido(pedido.getDataPedido());
            pedidoExistente.setValorTotal(pedido.getValorTotal());
            pedidoExistente.setStatus(pedido.getStatus());
            pedidoExistente.setCliente(pedido.getCliente());
            pedidoExistente.setObservacao(pedido.getObservacao());
            pedidoExistente.setQuantidade(pedido.getQuantidade());
            return pedidoRepository.save(pedidoExistente);
        } else {
            throw new RuntimeException("Pedido não encontrado com o ID: " + pedido.getIdPedido());
        }
    }

    public void excluirPedido(Long id) {
        pedidoRepository.deleteById(id);
    }

    public Pedido buscarPedidoPorId(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public void registrarEtapaEntrega(Long id, StatusPedido novoStatus) {
        Pedido pedido = pedidoRepository.findById(id).orElse(null);
        if (pedido != null) {
            pedido.setStatus(novoStatus);
            pedidoRepository.save(pedido);
        } else {
            throw new RuntimeException("Pedido não encontrado com o ID: " + id);
        }
    }
}
