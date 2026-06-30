import { formatarMoeda } from '../utils/format';

function CatalogoProdutos({ produtos, carrinho, onAdicionar, desabilitado }) {
  return (
    <section className="catalogo" aria-labelledby="catalogo-heading">
      <div className="catalogo__header">
        <h2 id="catalogo-heading" className="section__subtitle">
          Produtos em destaque
        </h2>
        <p id="catalogo-descricao" className="section__hint">
          Ofertas selecionadas para você finalizar sua compra com recomendações da IA.
        </p>
      </div>

      <ul className="catalogo-grid" aria-describedby="catalogo-descricao">
        {produtos.map((produto) => {
          const noCarrinho = carrinho.includes(produto.id);

          return (
            <li key={produto.id} className="catalogo-grid__item">
              <article className="produto-card" aria-labelledby={`produto-${produto.id}`}>
                <div className="produto-card__imagem">
                  <img src={produto.imagem} alt={produto.nome} />
                </div>

                <div className="produto-card__conteudo">
                  <span className="produto-card__tag">Frete grátis</span>

                  <h3 id={`produto-${produto.id}`} className="produto-card__nome">
                    {produto.nome}
                  </h3>

                  <p className="produto-card__preco">
                    {formatarMoeda(produto.preco)}
                  </p>

                  <p className="produto-card__parcelamento">
                    em até 10x sem juros
                  </p>

                  <button
                    type="button"
                    className={noCarrinho ? 'btn-produto btn-produto--adicionado' : 'btn-produto'}
                    onClick={() => onAdicionar(produto.id)}
                    disabled={desabilitado || noCarrinho}
                    aria-pressed={noCarrinho}
                  >
                    {noCarrinho ? 'Adicionado' : 'Adicionar ao carrinho'}
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CatalogoProdutos;