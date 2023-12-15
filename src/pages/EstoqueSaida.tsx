import { useEffect, useState } from "react";
import EstoqueService from "../API/MostrarEstoque";
import deletarEstoque from "../API/DeletarEstoque";

function EstoqueSaida() {

    type Mercadorias = {
        id: number,
        quantidade: number,
        local: string,
        operacao: string,
        mercadoriaId: number,
        dataRegistro: string,
        mercadoria: {
            nome: string
        }
    }

    const estoqueService = new EstoqueService();


    const [estoque, setEstoque] = useState<Mercadorias[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await estoqueService.estoqueSaida()
            setEstoque(data);
        }

        fetchData();
    }, []);

    const handleExcluirSaida = async (mercadoriaId: any) => {
        try {
            await deletarEstoque(mercadoriaId);

            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir a mercadoria:', error);
        }
    };

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const formattedDate = date.toLocaleDateString(undefined, options);
        return formattedDate;
    }

    return (
        <div className="relative overflow-x-auto h-screen w-screen dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 ml-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-300">
                        <li>
                            <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
                        </li>
                        <li>
                            <a href="/mercadorias" className="mr-4 hover:underline md:mr-6">Mercadorias</a>
                        </li>
                        <li>
                            <a href="/grafico" className="mr-4 hover:underline md:mr-6 ">Gráfico</a>
                        </li>
                        <li>
                            <a href="/estoqueEntrada" className="mr-4 hover:underline md:mr-6 ">Historico de Entradas</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-gray-300 font-bold flex ml-6 mb-4 mt-16 text-2xl">
                Historico de Saídas
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Valor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Operação
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data da Despesa
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Excluir Despesa
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((estoque) => (
                        <tr key={estoque.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {estoque.quantidade}
                            </td>
                            <td className="px-6 py-4">
                                {estoque.local}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {estoque.operacao}
                            </td>
                            <td className="px-6 py-4">
                                {estoque.mercadoria.nome}
                            </td>

                            <td className="px-6 py-4">
                                {formatDate(estoque.dataRegistro)}
                            </td>
                            <td className="px-6 py-4 ">
                                <button className=" bg-red-600 hover:bg-red-900 text-white font-semibold py-2 px-4 border w-32 border-gray-400 rounded shadow"
                                    onClick={() => handleExcluirSaida(estoque.id)}

                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <span className="block text-sm mt-12 text-gray-500 sm:text-center dark:text-gray-400">© 2023 Victor Rabello</span>

        </div>
    )
}


export default EstoqueSaida

