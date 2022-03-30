import React, { useEffect, useState } from 'react';
import Account from './account/Account';
import Transactions from './transaction/Transactions';
import api from './api';
import './App.css';

export const calculateNewBalance = (values, saldo) => {
  if (values.transaction === 'deposito') {
    return saldo + parseInt(values.valor)
  } else {
    return saldo - parseInt(values.valor);
  };
};

function App() {
  const [saldo, atualizarSaldo] = useState(1000);
  const [transacoes, atualizarTransacoes] = useState([]);

  async function carregarTransacoes() {
    const transacoes = await api.listaTransacoes();
    atualizarTransacoes(transacoes);
  };

  async function obterSaldo() {
    atualizarSaldo(await api.buscaSaldo());
  };

  function realizarTransacao(values) {
    const novoSaldo = calculateNewBalance(values, saldo);

    api.atualizaSaldo(novoSaldo).catch((error) => console.error(error))
    api.atualizaTransacoes(values).catch((error) => console.error(error))

    atualizarSaldo(novoSaldo);
    atualizarTransacoes([values]);
  };

  useEffect(() => {
    obterSaldo();
    carregarTransacoes();
  }, [saldo]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ByteBank</h1>
      </header>

      <Conta saldo={saldo} realizarTransacao={realizarTransacao}/>
      <Transacoes transacoes={transacoes} />
    </div>
  );
};

export default App;
