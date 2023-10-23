class EstoqueService {

    public async estoqueEntrada() {
        const response = await fetch("https://localhost:7060/api/Estoque?operacao=entrada");
        const data = await response.json();
        return data;
    }

    public async estoqueSaida() {
        const response = await fetch("https://localhost:7060/api/Estoque?operacao=saida");
        const data = await response.json();
        return data;
    }

}

export default EstoqueService;


