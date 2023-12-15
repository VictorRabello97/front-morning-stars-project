import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import mostrarMercadorias from '../API/MostrarMercadorias';
import estoquePeriodo from '../API/Grafico';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function GraficoEstoque() {

    type Mercadoria = {
        id: number,
        nome: string,
        fabricante: string,
        tipo: string,
        numeroDeRegistro: number,
        descricao: string,
    }

    type RetornoAPI = {
        id: number,
        operacao: string,
        quantidade: number,
        dataRegistro: string,
    }


    const [mercadorias, setMercadorias] = useState<Mercadoria[]>([]);

    const [anoSelecionado, setAnoSelecionado] = useState<string>('');

    const [mercadoriaSelecionada, setMercadoriaSelecionada] = useState<string>('');



    const handleMercadoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMercadoriaSelecionada(event.target.value);
    };

    const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAnoSelecionado(event.target.value);
    };


    const [dadosEntrada, setDadosEntrada] = useState<RetornoAPI[]>([]);


    const [dadosSaida, setDadosSaida] = useState<RetornoAPI[]>([]);





    useEffect(() => {
        async function fetchData() {
            const dadosAPI = await estoquePeriodo(anoSelecionado, mercadoriaSelecionada);

            if (Array.isArray(dadosAPI)) {
                const retornoEntrada = dadosAPI.filter((x: RetornoAPI) => x.operacao === 'entrada');
                setDadosEntrada(retornoEntrada);

                const retornoSaida = dadosAPI.filter((x: RetornoAPI) => x.operacao === 'saida');
                setDadosSaida(retornoSaida);



            } else {
                console.log("Erro no retorno")
            }
        }

        fetchData();
    }, [anoSelecionado, mercadoriaSelecionada]);

    useEffect(() => {
        async function fetchData() {
            const data = await mostrarMercadorias();
            setMercadorias(data);
        }

        fetchData();
    }, []);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as 'top',
            },
            title: {
                display: true,
                text: 'Informações do Estoque',
            },
        },
    };

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];

    const todosOsMeses = meses.map(nomeMes => {
        return {
            label: nomeMes,
            entrada: 0,
            saida: 0,
        };
    });

    dadosEntrada.forEach(item => {
        const date = new Date(item.dataRegistro);
        const monthIndex = date.getMonth();
        todosOsMeses[monthIndex].entrada += item.quantidade;
    });

    dadosSaida.forEach(item => {
        const date = new Date(item.dataRegistro);
        const indexMes = date.getMonth();
        todosOsMeses[indexMes].saida += item.quantidade;
    });

    const labels = todosOsMeses.map(mes => mes.label);
    const dataEntrada = todosOsMeses.map(mes => mes.entrada);
    const dataSaida = todosOsMeses.map(mes => mes.saida);

    const data = {
        labels,
        datasets: [
            {
                label: 'Entrada',
                data: dataEntrada,
                backgroundColor: 'blue',
            },
            {
                label: 'Saída',
                data: dataSaida,
                backgroundColor: 'red',
            },
        ],
    };
    return (

        <div className='bg-zinc-900 h-screen w-screen'>
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
                                <a href="/estoqueEntrada" className="mr-4 hover:underline md:mr-6 ">Historico de Entradas</a>
                            </li>
                            <li>
                                <a href="/estoqueSaida" className="mr-4 hover:underline md:mr-6 ">Historico de Saídas</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mb-4 ml-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" id="operacao">Selecione a Categoria:</label>
                    <select className=" border rounded py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline w-64" name="mercadoria" id="mercadoria"
                        onChange={handleMercadoriaChange}
                        value={mercadoriaSelecionada || ''}>
                        <option value="0"></option>
                        {mercadorias.map((mercadoria) => (
                            <option key={mercadoria.id} value={mercadoria.id}>
                                {mercadoria.nome}
                            </option>
                        ))}
                    </select>

                    <div className="mb-4 mt-2">
                        <label className="block text-gray-300 text-sm font-bold mb-2" id="operacao">Ano</label>
                        <select className=" border rounded py-2 px-3 text-gray-700 leading-tight 
                        focus:outline-none focus:shadow-outline w-64" name="mercadoria" id="mercadoria"
                            onChange={handleAnoChange}
                            value={anoSelecionado || ''}>
                            <option value="0"></option>
                            <option value="2023">2023</option>

                        </select>

                    </div>


                    <div className="w-4/6 h-3/6">
                        <Bar
                            options={options} data={data} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default GraficoEstoque
