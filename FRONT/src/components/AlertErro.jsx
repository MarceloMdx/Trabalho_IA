function AlertErro({ mensagem }) {
  return (
    <div className="alert alert--error" role="alert">
      <strong>Erro ao processar pedido:</strong>
      <p>{mensagem}</p>
    </div>
  );
}

export default AlertErro;
