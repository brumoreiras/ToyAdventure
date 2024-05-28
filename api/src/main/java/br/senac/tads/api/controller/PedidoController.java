package br.senac.tads.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.senac.tads.api.entities.Pedido;
import br.senac.tads.api.services.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public ResponseEntity<List<Pedido>> listarPedidos() {
        List<Pedido> pedidos = pedidoService.listarPedidos();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        Pedido pedidoSalvo = pedidoService.criarPedido(pedido);
        return new ResponseEntity<>(pedidoSalvo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pedido> atualizarPedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        pedido.setId(id);
        Pedido pedidoAtualizado = pedidoService.atualizarPedido(pedido);
        return new ResponseEntity<>(pedidoAtualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirPedido(@PathVariable Long id) {
        pedidoService.excluirPedido(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedidoPorId(@PathVariable Long id) {
        Pedido pedido = pedidoService.buscarPedidoPorId(id);
        if (pedido != null) {
            return new ResponseEntity<>(pedido, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
