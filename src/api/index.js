const API_URL = 'http://localhost:3001';
const TRANSACTIONS_URI = `${API_URL}/transactions`;
const ACCOUNT_URI = `${API_URL}/account`;

const connect = (uri, options = {}) => {
    return fetch(uri, options).then(async (resp) => {
        if (resp.ok) {
            const dados = await resp.json();
            return dados;
        }

        console.log(resp);
        throw new Error(resp);
    });
};

const listTransactions = () => connect(TRANSACTIONS_URI);
const searchBalance = () => connect(ACCOUNT_URI).then(dados => dados.balance);

const toUpdateBalance = (balance) => connect(ACCOUNT_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ balance }),
});

const updateTransactions = (dados) => connect(TRANSACTIONS_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(dados),
});

export default {
    listTransactions,
    searchBalance,
    toUpdateBalance,
    updateTransactions,
};
