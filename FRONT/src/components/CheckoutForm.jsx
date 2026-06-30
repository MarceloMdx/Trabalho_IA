import { useState } from 'react';
import { calcularTotal, obterNomesProdutos } from '../utils/format';

function CheckoutForm({ produtos, carrinho, onSubmit, desabilitado }) {
  const [cliente, setCliente] = useState('');
  const [cidade, setCidade] = useState('');
  const [erros, setErros] = useState({});

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
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validarCampos()) {
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
              {erros.cliente}
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
              {erros.cidade}
            </p>
          )}
        </div>
      </fieldset>

      <button
        type="submit"
        className="btn btn--primary"
        disabled={desabilitado}
        aria-busy={desabilitado}
      >
        {desabilitado ? 'Processando...' : 'Confirmar Pedido'}
      </button>
    </form>
  );
}

export default CheckoutForm;
