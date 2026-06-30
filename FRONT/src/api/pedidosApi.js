const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

async function tratarResposta(response) {
  if (!response.ok) {
    const textoErro = await response.text().catch(() => '');
    throw new Error(textoErro || `Servidor respondeu com status ${response.status}.`);
  }

  return response.json();
}

export function pedidoTemAnalise(pedido) {
  if (!pedido) return false;

  return Boolean(
    pedido.perfilCliente ||
      pedido.mensagemIA ||
      pedido.recomendacoes ||
      pedido.cupomDesconto
  );
}

export async function criarPedido(payload) {
  const response = await fetch(`${API_BASE}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return tratarResposta(response);
}

export async function buscarPedido(id) {
  const response = await fetch(`${API_BASE}/pedidos/${id}`);
  return tratarResposta(response);
}

export async function aguardarAnalise(id, { intervaloMs = 2000, maxTentativas = 30 } = {}) {
  if (maxTentativas <= 0) {
    throw new Error('Tempo esgotado aguardando análise da IA.');
  }

  for (let tentativa = 0; tentativa < maxTentativas; tentativa += 1) {
    const pedido = await buscarPedido(id);

    if (pedidoTemAnalise(pedido)) {
      return pedido;
    }

    if (tentativa < maxTentativas - 1) {
      await new Promise((resolve) => {
        setTimeout(resolve, intervaloMs);
      });
    }
  }

  throw new Error(
    'A análise da IA ainda não foi concluída. Verifique se o n8n está ativo e tente novamente.'
  );
}

export async function finalizarPedido(payload) {
  const pedidoCriado = await criarPedido(payload);

  if (pedidoTemAnalise(pedidoCriado)) {
    return pedidoCriado;
  }

  if (!pedidoCriado?.id) {
    throw new Error('Pedido criado, mas o servidor não retornou o identificador.');
  }

  return aguardarAnalise(pedidoCriado.id);
}
