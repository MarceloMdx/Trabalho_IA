function LoadingAnalise() {
  return (
    <div className="loading" role="status" aria-labelledby="loading-text">
      <span className="loading__spinner" aria-hidden="true" />
      <p id="loading-text" className="loading__text">
        Processando pedido e analisando com IA...
      </p>
      <p className="loading__hint">
        Aguardando resposta do n8n. Isso pode levar alguns segundos.
      </p>
    </div>
  );
}

export default LoadingAnalise;
