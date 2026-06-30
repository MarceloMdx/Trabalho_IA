import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { finalizarPedido } from '../api/pedidosApi';
import { CARRINHO_INICIAL, PRODUTOS } from '../constants/produtos';

const LojaContext = createContext(null);

export function LojaProvider({ children }) {
  const [carrinho, setCarrinho] = useState(CARRINHO_INICIAL);
  const [analiseIA, setAnaliseIA] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const adicionarProduto = useCallback((id) => {
    setCarrinho((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removerProduto = useCallback((id) => {
    setCarrinho((prev) => prev.filter((item) => item !== id));
  }, []);

  const finalizar = useCallback(async (payload) => {
    setCarregando(true);
    setErro(null);
    setAnaliseIA(null);

    try {
      const pedidoComAnalise = await finalizarPedido(payload);
      setAnaliseIA(pedidoComAnalise);
      return pedidoComAnalise;
    } catch (error) {
      const mensagem =
        error.name === 'TypeError'
          ? 'Não foi possível conectar ao servidor. Verifique se o Spring Boot está rodando em http://localhost:8080.'
          : error.message || 'Ocorreu um erro inesperado ao enviar o pedido.';

      setErro(mensagem);
      throw error;
    } finally {
      setCarregando(false);
    }
  }, []);

  const limparAnalise = useCallback(() => {
    setAnaliseIA(null);
    setErro(null);
  }, []);

  const value = useMemo(
    () => ({
      produtos: PRODUTOS,
      carrinho,
      analiseIA,
      carregando,
      erro,
      adicionarProduto,
      removerProduto,
      finalizar,
      limparAnalise,
    }),
    [carrinho, analiseIA, carregando, erro, adicionarProduto, removerProduto, finalizar, limparAnalise]
  );

  return <LojaContext.Provider value={value}>{children}</LojaContext.Provider>;
}

export function useLoja() {
  const context = useContext(LojaContext);

  if (!context) {
    throw new Error('useLoja deve ser usado dentro de LojaProvider.');
  }

  return context;
}
