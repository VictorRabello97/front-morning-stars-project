async function deletarMercadoria(id: number) {
  const url = `https://localhost:7060/api/Mercadoria/${id}`;

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export default deletarMercadoria;
