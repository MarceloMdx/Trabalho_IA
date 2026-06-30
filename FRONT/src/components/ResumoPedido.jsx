import { calcularTotal, formatarMoeda, obterNomesProdutos } from '../utils/format';

function ResumoPedido({ produtos, carrinho }) {
  const total = calcularTotal(produtos, carrinho);
  const nomes = obterNomesProdutos(produtos, carrinho);

  return (
    <section className="resumo-pedido" aria-labelledby="resumo-heading">
      <h3 id="resumo-heading" className="checkout-form__subtitle">
        Resumo do pedido
      </h3>

      <ul className="resumo-pedido__lista">
        {nomes.map((nome) => (
          <li key={nome}>{nome}</li>
        ))}
      </ul>

      <p className="resumo-pedido__total">
        <strong>Total:</strong>{' '}
        <span aria-label={`Total do pedido: ${formatarMoeda(total)}`}>
          {formatarMoeda(total)}
        </span>
      </p>
    </section>
  );
}

export default ResumoPedido;
