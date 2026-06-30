export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

export function calcularTotal(produtos, idsSelecionados) {
  return idsSelecionados.reduce((total, id) => {
    const produto = produtos.find((item) => item.id === id);
    return total + (produto?.preco ?? 0);
  }, 0);
}

export function obterNomesProdutos(produtos, idsSelecionados) {
  return idsSelecionados
    .map((id) => produtos.find((item) => item.id === id)?.nome)
    .filter(Boolean);
}
