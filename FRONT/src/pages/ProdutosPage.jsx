import { Link } from 'react-router-dom';
import CatalogoProdutos from '../components/CatalogoProdutos';
import { useLoja } from '../context/LojaContext';

function ProdutosPage() {
  const { produtos, carrinho, adicionarProduto, carregando } = useLoja();

  return (
    <section className="page" aria-labelledby="produtos-heading">
      <header className="page__header">
        <h2 id="produtos-heading" className="page__title">
          Produtos
        </h2>
        <p className="page__description">
          Escolha os itens desejados e adicione ao carrinho para continuar a compra.
        </p>
      </header>

      <div className="page__content">
        <CatalogoProdutos
          produtos={produtos}
          carrinho={carrinho}
          onAdicionar={adicionarProduto}
          desabilitado={carregando}
        />

        {carrinho.length > 0 && (
          <p className="page__action">
            <Link to="/carrinho" className="btn btn--primary btn--inline">
              Ver carrinho ({carrinho.length})
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default ProdutosPage;
