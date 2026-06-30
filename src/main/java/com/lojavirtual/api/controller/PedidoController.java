package com.lojavirtual.api.controller;

import com.lojavirtual.api.dto.AnalisePedidoDTO;
import com.lojavirtual.api.model.Pedido;
import com.lojavirtual.api.repository.PedidoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private static final Logger log = LoggerFactory.getLogger(PedidoController.class);

    private static final String N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/seu-id";

    private final PedidoRepository pedidoRepository;
    private final RestTemplate restTemplate;

    public PedidoController(PedidoRepository pedidoRepository, RestTemplate restTemplate) {
        this.pedidoRepository = pedidoRepository;
        this.restTemplate = restTemplate;
    }

    @PostMapping
    public ResponseEntity<Pedido> criarPedido(@RequestBody Pedido pedido) {
        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        CompletableFuture.runAsync(() -> {
            try {
                restTemplate.postForEntity(N8N_WEBHOOK_URL, pedidoSalvo, String.class);
                log.info("Pedido {} enviado ao webhook n8n com sucesso.", pedidoSalvo.getId());
            } catch (Exception ex) {
                log.error("Falha ao enviar pedido {} ao webhook n8n: {}", pedidoSalvo.getId(), ex.getMessage());
            }
        });

        return ResponseEntity.ok(pedidoSalvo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable Long id) {
        return pedidoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/analise")
    public ResponseEntity<Pedido> atualizarAnalise(@PathVariable Long id,
                                                   @RequestBody AnalisePedidoDTO analise) {
        return pedidoRepository.findById(id)
                .map(pedido -> {
                    pedido.setPerfilCliente(analise.perfilCliente());
                    pedido.setRecomendacoes(analise.recomendacoes());
                    pedido.setCupomDesconto(analise.cupomDesconto());
                    pedido.setMensagemIA(analise.mensagemIA());

                    Pedido pedidoAtualizado = pedidoRepository.save(pedido);
                    return ResponseEntity.ok(pedidoAtualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
