package com.lojavirtual.api.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cliente;

    private String cidade;

    private Double valorTotal;

    @ElementCollection
    @CollectionTable(name = "tb_pedido_produtos", joinColumns = @JoinColumn(name = "pedido_id"))
    @Column(name = "produto")
    private List<String> produtos = new ArrayList<>();

    private String perfilCliente;

    @Column(columnDefinition = "TEXT")
    private String recomendacoes;

    private String cupomDesconto;

    @Column(columnDefinition = "TEXT")
    private String mensagemIA;

    public Pedido() {
    }

    public Pedido(Long id, String cliente, String cidade, Double valorTotal, List<String> produtos,
                  String perfilCliente, String recomendacoes, String cupomDesconto, String mensagemIA) {
        this.id = id;
        this.cliente = cliente;
        this.cidade = cidade;
        this.valorTotal = valorTotal;
        this.produtos = produtos != null ? produtos : new ArrayList<>();
        this.perfilCliente = perfilCliente;
        this.recomendacoes = recomendacoes;
        this.cupomDesconto = cupomDesconto;
        this.mensagemIA = mensagemIA;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<String> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<String> produtos) {
        this.produtos = produtos;
    }

    public String getPerfilCliente() {
        return perfilCliente;
    }

    public void setPerfilCliente(String perfilCliente) {
        this.perfilCliente = perfilCliente;
    }

    public String getRecomendacoes() {
        return recomendacoes;
    }

    public void setRecomendacoes(String recomendacoes) {
        this.recomendacoes = recomendacoes;
    }

    public String getCupomDesconto() {
        return cupomDesconto;
    }

    public void setCupomDesconto(String cupomDesconto) {
        this.cupomDesconto = cupomDesconto;
    }

    public String getMensagemIA() {
        return mensagemIA;
    }

    public void setMensagemIA(String mensagemIA) {
        this.mensagemIA = mensagemIA;
    }
}
