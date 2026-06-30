import { useRef, useState } from 'react';
import { calcularTotal, obterNomesProdutos } from '../utils/format';

function CheckoutForm({ produtos, carrinho, onSubmit, desabilitado }) {
  const [cliente, setCliente] = useState('');
  const [cidade, setCidade] = useState('');
  const [erros, setErros] = useState({});
  const clienteRef = useRef(null);
  const cidadeRef = useRef(null);

  const valorTotal = calcularTotal(produtos, carrinho);

  const validarCampos = () => {
    const novosErros = {};

    if (!cliente.trim()) {
      novosErros.cliente = 'Informe o nome do cliente.';
    }

    if (!cidade.trim()) {
      novosErros.cidade = 'Informe a cidade de entrega.';
    }

    setErros(novosErros);
    return novosErros;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const novosErros = validarCampos();

    if (Object.keys(novosErros).length > 0) {
      // Foco no primeiro campo inválido após re-render com mensagens de erro
      requestAnimationFrame(() => {
        if (novosErros.cliente) {
          clienteRef.current?.focus();
        } else if (novosErros.cidade) {
          cidadeRef.current?.focus();
        }
      });
      return;
    }

    const payload = {
      cliente: cliente.trim(),
      cidade: cidade.trim(),
      valorTotal,
      produtos: obterNomesProdutos(produtos, carrinho),
    };

    await onSubmit(payload);
  };

  return (
    <form
      className="checkout-form"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="checkout-instrucoes"
    >
      <p id="checkout-instrucoes" className="sr-only">
        Preencha os dados de entrega e confirme o pedido. Campos com asterisco são obrigatórios.
      </p>

      <fieldset className="checkout-form__fields" disabled={desabilitado}>
        <legend className="checkout-form__subtitle">Dados de entrega</legend>

        <div className="form-group">
          <label htmlFor="cliente">
            Nome do cliente
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (obrigatório)</span>
          </label>
          <input
            ref={clienteRef}
            id="cliente"
            name="cliente"
            type="text"
            value={cliente}
            onChange={(e) => {
              setCliente(e.target.value);
              if (erros.cliente) setErros((prev) => ({ ...prev, cliente: undefined }));
            }}
            required
            aria-required="true"
            aria-invalid={Boolean(erros.cliente)}
            aria-describedby={erros.cliente ? 'erro-cliente' : undefined}
            autoComplete="name"
            placeholder="Ex.: Maria"
            disabled={desabilitado}
          />
          {erros.cliente && (
            <p className="form-error" id="erro-cliente" role="alert">
              {/* Ícone via CSS (::before) reforça erro além da cor vermelha */}
              <span className="form-error__text">{erros.cliente}</span>
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cidade">
            Cidade
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (obrigatório)</span>
          </label>
          <input
            ref={cidadeRef}
            id="cidade"
            name="cidade"
            type="text"
            value={cidade}
            onChange={(e) => {
              setCidade(e.target.value);
              if (erros.cidade) setErros((prev) => ({ ...prev, cidade: undefined }));
            }}
            required
            aria-required="true"
            aria-invalid={Boolean(erros.cidade)}
            aria-describedby={erros.cidade ? 'erro-cidade' : undefined}
            autoComplete="address-level2"
            placeholder="Ex.: Petrópolis"
            disabled={desabilitado}
          />
          {erros.cidade && (
            <p className="form-error" id="erro-cidade" role="alert">
              <span className="form-error__text">{erros.cidade}</span>
            </p>
          )}
        </div>
      </fieldset>

      {/* aria-busy comunica estado de carregamento; texto alterna para leitores de tela */}
      <button
        type="submit"
        className="btn btn--primary"
        disabled={desabilitado}
        aria-busy={desabilitado}
      >
        {desabilitado ? 'Processando pedido…' : 'Confirmar Pedido'}
      </button>
    </form>
  );
}

export default CheckoutForm;
