package br.senac.tads.api.domain.pedido;

public enum StatusPedido {

    PENDENTE,
    AGUARDANDO_PAGAMENTO,
    PAGAMENTO_REJEITADO,
    PAGAMENTO_SUCESSO,
    AGUARDANDO_RETIRADA,
    EM_TRANSITO,
    ENTREGUE,
    EM_ANDAMENTO,
    CONCLUIDO,
    CANCELADO;

    // ALGUNS estão parecidos mudar de acordo se preferir.
}
