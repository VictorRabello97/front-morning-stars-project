import { useEffect, useState } from "react";
import deletarMercadoria from "../API/DeletarMercadoria";
import mostrarMercadorias from "../API/MostrarMercadorias";

function Mercadoria() {

    type Mercadorias = {
        id: number,
        nome: string,
        fabricante: string,
        tipo: string,
        numeroDeRegistro: number,
        descricao: string,
    }

    const [mercadorias, setMercadorias] = useState<Mercadorias[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await mostrarMercadorias();
            setMercadorias(data);
        }

        fetchData();
    }, []);

    const [mostrarErro, setMostrarErro] = useState('');

    const handleExcluirMercadoria = async (mercadoriaId: any) => {
        try {
            await deletarMercadoria(mercadoriaId);

            window.location.reload();
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                setMostrarErro("")
            }, 4000,);
            setMostrarErro(" * Não é possivel excluir uma mercadoria que possui estoque")
        }
    };

    return (
        <div className="relative overflow-x-auto h-screen w-screen dark:bg-gray-900">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 ml-4">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-300">
                        <li>
                            <a href="/" className="mr-4 hover:underline md:mr-6 ">Home</a>
                        </li>
                        <li>
                            <a href="/estoqueEntrada" className="mr-4 hover:underline md:mr-6">Historico de Entradas</a>
                        </li>
                        <li>
                            <a href="/estoqueSaida" className="mr-4 hover:underline md:mr-6">Historico de Saidas</a>
                        </li>
                        <li>
                            <a href="/grafico" className="mr-4 hover:underline md:mr-6 ">Gráfico</a>
                        </li>
                    </ul>


                </div>
            </div>

            <div className="text-gray-300 font-bold flex ml-6 mb-4 mt-16 text-2xl">
                Mercadorias Cadastradas

                {mostrarErro && (
                    <div className="text-red-500 text-base flex justify-center items-center p-4 ml-56 font-bold" >
                        {mostrarErro}
                    </div>)}
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome da Mercadoria
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fabricante
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tipo
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Descrição
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Excluir Mercadoria
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {mercadorias.map((mercadoria) => (
                        <tr key={mercadoria.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {mercadoria.nome}
                            </td>
                            <td className="px-6 py-4">
                                {mercadoria.fabricante}
                            </td>
                            <td className="px-6 py-4">
                                {mercadoria.tipo}
                            </td>
                            <td className="px-6 py-4">
                                {mercadoria.descricao}
                            </td>
                            <td className="px-6 py-4 ">
                                <button className=" bg-red-600 hover:bg-red-900 text-white font-semibold py-2 px-4 border w-32 border-gray-400 rounded shadow"
                                    onClick={() => handleExcluirMercadoria(mercadoria.id)}

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


export default Mercadoria

