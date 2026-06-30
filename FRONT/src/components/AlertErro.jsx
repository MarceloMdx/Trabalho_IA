function AlertErro({ mensagem }) {
  return (
    <div className="alert alert--error" role="alert" aria-live="assertive">
      <strong>Erro ao processar pedido:</strong>
      <p>{mensagem}</p>
    </div>
  );
}

export default AlertErro;
