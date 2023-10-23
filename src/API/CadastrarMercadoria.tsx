export default async function cadastrarMercadoria(dados: any) {
  const url = 'https://localhost:7060/api/Mercadoria';

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