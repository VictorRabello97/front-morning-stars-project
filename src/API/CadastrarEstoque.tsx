export default async function cadastrarEstoque(dados: any) {
  const url = 'https://localhost:7060/api/Estoque';

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}