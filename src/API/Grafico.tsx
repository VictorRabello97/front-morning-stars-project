async function estoquePeriodo(ano: string, mercadoria: string) {
    const url = `https://localhost:7060/api/Estoque/informacoesEstoque?ano=${ano}&mercadoriaId=${mercadoria}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}



export default estoquePeriodo;

