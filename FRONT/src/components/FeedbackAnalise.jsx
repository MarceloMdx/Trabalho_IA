function parseRecomendacoes(recomendacoes) {
  if (!recomendacoes) return [];

  if (Array.isArray(recomendacoes)) {
    return recomendacoes.filter(Boolean);
  }

  if (typeof recomendacoes === 'string') {
    return recomendacoes
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function FeedbackAnalise({ dados }) {
  const { id, cliente, perfilCliente, recomendacoes, cupomDesconto, mensagemIA } = dados;
  const listaRecomendacoes = parseRecomendacoes(recomendacoes);

  return (
    <article className="feedback" aria-labelledby="feedback-title">
      <header className="feedback__header">
        <h3 id="feedback-title" className="feedback__title">
          Pedido #{id} — Análise concluída
        </h3>
        {cliente && (
          <p className="feedback__cliente">
            <span className="feedback__label">Cliente:</span>{' '}
            <strong>{cliente}</strong>
          </p>
        )}
        {perfilCliente && (
          <p className="feedback__perfil">
            <span className="feedback__label">Perfil do cliente:</span>{' '}
            <strong>{perfilCliente}</strong>
          </p>
        )}
      </header>

      {mensagemIA && (
        <blockquote className="feedback__mensagem" cite="">
          <p>
            <span className="sr-only">Mensagem personalizada da IA: </span>
            {mensagemIA}
          </p>
        </blockquote>
      )}

      {cupomDesconto && (
        <div className="feedback__cupom" role="region" aria-labelledby="cupom-label">
          <span id="cupom-label" className="feedback__label">
            Cupom de desconto
          </span>
          <code className="feedback__codigo" aria-label={`Código do cupom: ${cupomDesconto}`}>
            {cupomDesconto}
          </code>
        </div>
      )}

      {listaRecomendacoes.length > 0 && (
        <section className="feedback__recomendacoes" aria-labelledby="recomendacoes-heading">
          <h4 id="recomendacoes-heading" className="feedback__subtitle">
            Produtos recomendados
          </h4>
          <ul className="recomendacoes-list">
            {listaRecomendacoes.map((item) => (
              <li key={item} className="recomendacoes-list__item">
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

export default FeedbackAnalise;
