function parseRecomendacoes(recomendacoes) {
  if (!recomendacoes || typeof recomendacoes !== 'string') {
    return [];
  }

  return recomendacoes
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function FeedbackAnalise({ dados }) {
  const {
    id,
    perfilCliente,
    recomendacoes,
    cupomDesconto,
    mensagemIA,
  } = dados;

  const listaRecomendacoes = parseRecomendacoes(recomendacoes);

  return (
    <article className="feedback" aria-labelledby="feedback-title">
      <header className="feedback__header">
        <h3 id="feedback-title" className="feedback__title">
          Pedido #{id} — Análise concluída
        </h3>
        {perfilCliente && (
          <p className="feedback__perfil">
            <span className="feedback__label">Perfil do cliente:</span>{' '}
            <strong>{perfilCliente}</strong>
          </p>
        )}
      </header>

      {mensagemIA && (
        <blockquote className="feedback__mensagem">
          <p>{mensagemIA}</p>
        </blockquote>
      )}

      {cupomDesconto && (
        <div className="feedback__cupom" role="region" aria-label="Cupom de desconto">
          <span className="feedback__label">Cupom de desconto:</span>
          <code className="feedback__codigo">{cupomDesconto}</code>
        </div>
      )}

      {listaRecomendacoes.length > 0 && (
        <section className="feedback__recomendacoes" aria-labelledby="recomendacoes-heading">
          <h4 id="recomendacoes-heading" className="feedback__subtitle">
            Recomendações para você
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
