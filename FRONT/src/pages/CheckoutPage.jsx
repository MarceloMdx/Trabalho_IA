import { Link } from 'react-router-dom';
import AlertErro from '../components/AlertErro';
import CheckoutForm from '../components/CheckoutForm';
import FeedbackAnalise from '../components/FeedbackAnalise';
import LoadingAnalise from '../components/LoadingAnalise';
import ResumoPedido from '../components/ResumoPedido';
import { useLoja } from '../context/LojaContext';

function CheckoutPage() {
  const { produtos, carrinho, analiseIA, carregando, erro, finalizar } = useLoja();
  const carrinhoVazio = carrinho.length === 0;

  if (carrinhoVazio && !analiseIA) {
    return (
      <section className="page" aria-labelledby="checkout-heading">
        <header className="page__header">
          <h2 id="checkout-heading" className="page__title">
            Checkout
          </h2>
        </header>

        <div className="page__content">
          <p className="placeholder" role="status">
            Seu carrinho está vazio. Adicione produtos antes de finalizar o pedido.
          </p>
          <p className="page__action">
            <Link to="/produtos" className="btn btn--primary btn--inline">
              Ver produtos
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page" aria-labelledby="checkout-heading">
      <header className="page__header">
        <h2 id="checkout-heading" className="page__title">
          Checkout
        </h2>
        <p className="page__description">
          Informe os dados de entrega e confirme o pedido para receber a análise da IA.
        </p>
      </header>

      <div className="checkout-page">
        <div className="checkout-page__form">
          <ResumoPedido produtos={produtos} carrinho={carrinho} />

          <CheckoutForm
            produtos={produtos}
            carrinho={carrinho}
            onSubmit={finalizar}
            desabilitado={carregando}
          />
        </div>

        <section
          className="checkout-page__analise app__section"
          aria-labelledby="analise-heading"
          aria-live="polite"
          aria-busy={carregando}
        >
          <h3 id="analise-heading" className="section__title">
            Análise da IA
          </h3>

          {carregando && <LoadingAnalise />}

          {!carregando && erro && <AlertErro mensagem={erro} />}

          {!carregando && !erro && analiseIA && <FeedbackAnalise dados={analiseIA} />}

          {!carregando && !erro && !analiseIA && (
            <p className="placeholder" role="status">
              Confirme o pedido para ver o perfil do cliente, recomendações e cupom gerados
              pelo n8n.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}

export default CheckoutPage;
