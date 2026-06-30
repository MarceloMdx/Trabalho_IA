import { useState } from 'react';
import CheckoutForm from './components/CheckoutForm';
import FeedbackAnalise from './components/FeedbackAnalise';

function App() {
  const [analiseIA, setAnaliseIA] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handlePedidoConfirmado = (dados) => {
    setAnaliseIA(dados);
    setErro(null);
  };

  const handleErro = (mensagem) => {
    setAnaliseIA(null);
    setErro(mensagem);
  };

  const handleLoadingChange = (loading) => {
    setCarregando(loading);
    if (loading) {
      setErro(null);
      setAnaliseIA(null);
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Loja Virtual Tech</h1>
        <p className="app__subtitle">
          Finalize seu pedido e receba recomendações personalizadas com Inteligência Artificial.
        </p>
      </header>

      <main className="app__main">
        <div className="app__grid">
          <section className="app__section" aria-labelledby="checkout-heading">
            <h2 id="checkout-heading" className="section__title">
              Checkout
            </h2>
            <CheckoutForm
              onPedidoConfirmado={handlePedidoConfirmado}
              onErro={handleErro}
              onLoadingChange={handleLoadingChange}
            />
          </section>

          <section
            className="app__section"
            aria-labelledby="analise-heading"
            aria-live="polite"
            aria-busy={carregando}
          >
            <h2 id="analise-heading" className="section__title">
              Análise da IA
            </h2>

            {carregando && (
              <div className="loading" role="status">
                <span className="loading__spinner" aria-hidden="true" />
                <p className="loading__text">Carregando / Analisando com IA...</p>
              </div>
            )}

            {!carregando && erro && (
              <div className="alert alert--error" role="alert">
                <strong>Erro ao processar pedido:</strong> {erro}
              </div>
            )}

            {!carregando && !erro && analiseIA && (
              <FeedbackAnalise dados={analiseIA} />
            )}

            {!carregando && !erro && !analiseIA && (
              <p className="placeholder">
                Preencha o formulário e confirme seu pedido para ver a análise personalizada.
              </p>
            )}
          </section>
        </div>
      </main>

      <footer className="app__footer">
        <p>Integração: React · Spring Boot · n8n · IA</p>
      </footer>
    </div>
  );
}

export default App;
