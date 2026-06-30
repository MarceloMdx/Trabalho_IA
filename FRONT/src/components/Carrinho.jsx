import { calcularTotal, formatarMoeda, obterNomesProdutos } from '../utils/format';

function Carrinho({ produtos, carrinho, onRemover, desabilitado, variant = 'embedded' }) {
  const nomes = obterNomesProdutos(produtos, carrinho);
  const total = calcularTotal(produtos, carrinho);
  const isPage = variant === 'page';

  return (
    <section
      className={isPage ? 'carrinho-page' : 'checkout-form__cart'}
      aria-labelledby={isPage ? undefined : 'cart-heading'}
      aria-label={isPage ? 'Itens do carrinho' : undefined}
    >
      {!isPage && (
        <h3 id="cart-heading" className="checkout-form__subtitle">
          Carrinho
        </h3>
      )}

      {carrinho.length === 0 ? (
        <p className="cart-empty" role="status">
          Seu carrinho está vazio. Adicione produtos do catálogo.
        </p>
      ) : (
        <>
          <ul className="cart-list" aria-label="Itens do carrinho">
            {carrinho.map((id) => {
              const produto = produtos.find((item) => item.id === id);
              if (!produto) return null;

              return (
                <li key={id} className="cart-list__item">
                  <span>{produto.nome}</span>
                  <span className="cart-list__preco">{formatarMoeda(produto.preco)}</span>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => onRemover(id)}
                    disabled={desabilitado}
                    aria-label={`Remover ${produto.nome} do carrinho`}
                  >
                    Remover
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="cart-total">
            <strong>Total:</strong>{' '}
            <span aria-label={`Total do pedido: ${formatarMoeda(total)}`}>
              {formatarMoeda(total)}
            </span>
          </p>

          <p className="sr-only" aria-live="polite">
            Carrinho com {carrinho.length}{' '}
            {carrinho.length === 1 ? 'item' : 'itens'}: {nomes.join(', ')}. Total{' '}
            {formatarMoeda(total)}.
          </p>
        </>
      )}
    </section>
  );
}

export default Carrinho;
