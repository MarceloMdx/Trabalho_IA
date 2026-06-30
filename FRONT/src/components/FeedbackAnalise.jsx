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
        {/* Texto "Concluído" + ícone evitam comunicar sucesso só pela cor verde */}
        <h3 id="feedback-title" className="feedback__title">
          <span className="feedback__status-icon" aria-hidden="true">✓</span>
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
        <blockquote className="feedback__mensagem">
          <p>
            <span className="sr-only">Mensagem personalizada da IA: </span>
            {mensagemIA}
          </p>
        </blockquote>
      )}

      {cupomDesconto && (
        <section className="feedback__cupom" aria-labelledby="cupom-label">
          <h4 id="cupom-label" className="feedback__label">
            Cupom de desconto
          </h4>
          <code className="feedback__codigo">{cupomDesconto}</code>
        </section>
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
