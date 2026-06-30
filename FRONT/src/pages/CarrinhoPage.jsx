import { Link } from 'react-router-dom';
import Carrinho from '../components/Carrinho';
import { useLoja } from '../context/LojaContext';

function CarrinhoPage() {
  const { produtos, carrinho, removerProduto, carregando } = useLoja();
  const carrinhoVazio = carrinho.length === 0;

  return (
    <section className="page" aria-labelledby="carrinho-heading">
      <header className="page__header">
        <h2 id="carrinho-heading" className="page__title">
          Carrinho
        </h2>
        <p className="page__description">
          Revise os itens selecionados antes de ir para o checkout.
        </p>
      </header>

      <div className="page__content">
        <Carrinho
          produtos={produtos}
          carrinho={carrinho}
          onRemover={removerProduto}
          desabilitado={carregando}
          variant="page"
        />

        <div className="page__actions">
          <Link to="/produtos" className="btn btn--secondary">
            Continuar comprando
          </Link>

          {!carrinhoVazio && (
            <Link to="/checkout" className="btn btn--primary">
              Ir para checkout
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default CarrinhoPage;
