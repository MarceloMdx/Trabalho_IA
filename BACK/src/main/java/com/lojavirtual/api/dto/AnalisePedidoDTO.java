package com.lojavirtual.api.dto;

public record AnalisePedidoDTO(
        String perfilCliente,
        String recomendacoes,
        String cupomDesconto,
        String mensagemIA
) {
}
