import { useState } from 'react';

const API_URL = 'http://localhost:8080/pedidos';

const CARRINHO = {
  produtos: ['Notebook', 'Mouse Gamer'],
  valorTotal: 820,
};

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

function CheckoutForm({ onPedidoConfirmado, onErro, onLoadingChange }) {
  const [cliente, setCliente] = useState('');
  const [cidade, setCidade] = useState('');
  const [carregando, setCarregando] = useState(false);

  const atualizarLoading = (loading) => {
    setCarregando(loading);
    onLoadingChange(loading);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      cliente: cliente.trim(),
      cidade: cidade.trim(),
      valorTotal: CARRINHO.valorTotal,
      produtos: CARRINHO.produtos,
    };

    atualizarLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const textoErro = await response.text().catch(() => '');
        throw new Error(
          textoErro || `Servidor respondeu com status ${response.status}.`
        );
      }

      const dados = await response.json();
      onPedidoConfirmado(dados);
    } catch (error) {
      if (error.name === 'TypeError') {
        onErro(
          'Não foi possível conectar ao servidor. Verifique se o Spring Boot está rodando em http://localhost:8080.'
        );
      } else {
        onErro(error.message || 'Ocorreu um erro inesperado ao enviar o pedido.');
      }
    } finally {
      atualizarLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <section className="checkout-form__cart" aria-labelledby="cart-heading">
        <h3 id="cart-heading" className="checkout-form__subtitle">
          Carrinho
        </h3>
        <ul className="cart-list">
          {CARRINHO.produtos.map((produto) => (
            <li key={produto} className="cart-list__item">
              {produto}
            </li>
          ))}
        </ul>
        <p className="cart-total">
          <strong>Total:</strong>{' '}
          <span aria-label={`Total do pedido: ${formatarMoeda(CARRINHO.valorTotal)}`}>
            {formatarMoeda(CARRINHO.valorTotal)}
          </span>
        </p>
      </section>

      <section className="checkout-form__fields" aria-labelledby="fields-heading">
        <h3 id="fields-heading" className="checkout-form__subtitle">
          Dados de entrega
        </h3>

        <div className="form-group">
          <label htmlFor="cliente">
            Nome do cliente
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="cliente"
            name="cliente"
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
            aria-required="true"
            autoComplete="name"
            placeholder="Ex.: Maria Silva"
            disabled={carregando}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cidade">
            Cidade
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
            aria-required="true"
            autoComplete="address-level2"
            placeholder="Ex.: São Paulo"
            disabled={carregando}
          />
        </div>
      </section>

      <button
        type="submit"
        className="btn btn--primary"
        disabled={carregando || !cliente.trim() || !cidade.trim()}
        aria-busy={carregando}
      >
        {carregando ? 'Processando...' : 'Confirmar Pedido'}
      </button>
    </form>
  );
}

export default CheckoutForm;
