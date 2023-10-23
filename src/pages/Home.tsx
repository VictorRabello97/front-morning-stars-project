import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cadastrarMercadoria from '../API/CadastrarMercadoria';
import cadastrarEstoque from '../API/CadastrarEstoque';
import mostrarMercadorias from '../API/MostrarMercadorias';

function Home() {

  const schema = yup.object({
    nome: yup.string().required(),
    numeroDeRegistro: yup.number().required(),
    fabricante: yup.string().required(),
    tipo: yup.string().required(),
    descricao: yup.string().required(),
  })




  const schemaEstoque = yup.object({
    quantidade: yup.number().required(),
    local: yup.string().required(),
    operacao: yup.string().required(),
    dataRegistro: yup.date(),
    mercadoriaId: yup.string().required()
  })

  const { handleSubmit: handleEstoque, register: registerEstoque, formState: { errors: errorsEstoque } } = useForm({
    resolver: yupResolver(schemaEstoque)

  })


  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema)

  })



  type Mercadoria = {
    id: number,
    nome: string,
    fabricante: string,
    tipo: string,
    numeroDeRegistro: number,
    descricao: string,
  }


  const [dadosMercadoria, setDadosMercadoria] = useState({ nome: '', numeroDeRegistro: '', dataRegistro: '', fabricante: '', tipo: '', descricao: '' });
  const [dadosEstoque, setDadosEstoque] = useState({ quantidade: '', local: '', operacao: '', dataRegistro: '', mercadoriaId: '' });

  const handleSubmitMercadoria = async () => {
    try {

      const resultado = await cadastrarMercadoria(dadosMercadoria);
      setMostraCadastroSucesso(true)
      setDadosMercadoria({ nome: '', numeroDeRegistro: '', fabricante: '', tipo: '', descricao: '', dataRegistro: '' })
      setTimeout(() => {
        setMostraCadastroSucesso(false)
      }, 10000,);

      console.log(resultado);
    } catch (error) {
    }
  };



  const handleSubmitEstoque = async () => {

    try {
      const resultado = await cadastrarEstoque(dadosEstoque);
      setMostraCadastroSucesso(true)
      setDadosEstoque({ quantidade: '', local: '', operacao: '', mercadoriaId: '', dataRegistro: '' })
      setTimeout(() => {
        setMostraCadastroSucesso(false)
      }, 10000,);

    } catch (error) {
    }
  };





  const [mercadorias, setMercadorias] = useState<Mercadoria[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await mostrarMercadorias();
      setMercadorias(data);
    }

    fetchData();
  }, []);

  const [mostrarFormularioMercadoria, setMostrarFormularioMercadoria] = useState(false);

  const toggleFormularioMercadoria = () => {
    setMostrarFormularioMercadoria(!mostrarFormularioMercadoria);
    setMostrarFormularioEstoque(false);

  };

  const [mostraCadastroSucesso, setMostraCadastroSucesso] = useState(false);

  const [mostrarFormularioEstoque, setMostrarFormularioEstoque] = useState(false);
  const toggleFormularioEstoque = () => {
    setMostrarFormularioEstoque(!mostrarFormularioEstoque);
    setMostrarFormularioMercadoria(false);

  };

  return (


    <div
      className="bg-[url('./assets/background.png')] h-screen w-screen bg-center"
    >
      <div className=" mx-auto p-4 md:py-8 ml-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-300">
            <li>
              <a href="/mercadorias" className="mr-4 hover:underline md:mr-6 ">Mercadorias</a>
            </li>
            <li>
              <a href="/estoqueEntrada" className="mr-4 hover:underline md:mr-6">Entrada de Mercadorias</a>
            </li>

            <li>
              <a href="/estoqueSaida" className="mr-4 hover:underline md:mr-6">Saída de Mercadorias</a>
            </li>
            <li>
              <a href="/grafico" className="mr-4 hover:underline md:mr-6 ">Gráfico</a>
            </li>
          </ul>

          {mostraCadastroSucesso && (
            <div className='text-white bg-green-500 opacity-90 rounded-lg text-xl h-12 flex justify-center items-center p-4 font-bold'>
              Cadastro feito com sucesso!
            </div>
          )}
        </div>
      </div>



      <div className="flex items-center ml-6 mt-6">

        <div className='flex flex-col gap-4'>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 w-46 px-4 rounded focus:outline-none focus:shadow-outline"

            type="button"
            onClick={toggleFormularioMercadoria}
          >
            Cadastrar Mercadoria
          </button>

          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 w-46 px-4 rounded focus:outline-none focus:shadow-outline"

            type="button"
            onClick={toggleFormularioEstoque}
          >
            Cadastrar Estoque
          </button>
        </div>
      </div>


      {mostrarFormularioMercadoria && (
        <div className=" flex items-center mt-6 ml-6 h-4/6">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleSubmitMercadoria)}>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Nome </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none 
              focus:shadow-outline" id="nome"
                {...register("nome")}

                value={dadosMercadoria.nome}
                type="text" placeholder="Nome"
                onChange={(e) => setDadosMercadoria({ ...dadosMercadoria, nome: e.target.value })} />
              {errors?.nome &&
                <p className='text-xs text-red-500'>* Nome da Mercadoria é obrigatório</p>}
            </div>


            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Número de Registro </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline" id="numeroDeRegistro"

                value={dadosMercadoria.numeroDeRegistro}
                {...register("numeroDeRegistro")}
                type="number" placeholder="Número de Registro"
                onChange={(e) => setDadosMercadoria({ ...dadosMercadoria, numeroDeRegistro: e.target.value })} />
              {errors?.numeroDeRegistro &&
                <p className='text-xs text-red-500'>* Número de Registro é obrigatório</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Fabricante </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"

                value={dadosMercadoria.fabricante}
                {...register("fabricante")}
                id="fabricante" type="text" placeholder="Fabricante"
                onChange={(e) => setDadosMercadoria({ ...dadosMercadoria, fabricante: e.target.value })} />
              {errors?.fabricante &&
                <p className='text-xs text-red-500'>* Informe o Fabricante</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Tipo </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"


                value={dadosMercadoria.tipo}
                {...register("tipo")}
                id="tipo" type="text" placeholder="Tipo"
                onChange={(e) => setDadosMercadoria({ ...dadosMercadoria, tipo: e.target.value })} />
              {errors?.tipo &&
                <p className='text-xs text-red-500'>* Tipo da Mercadoria é Obrigatório</p>}

            </div>


            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Descrição </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"

                value={dadosMercadoria.descricao}
                {...register("descricao")}
                id="descricao" type="text" placeholder="Descrição da Mercadoria"
                onChange={(e) => setDadosMercadoria({ ...dadosMercadoria, descricao: e.target.value })} />
              {errors?.descricao &&
                <p className='text-xs text-red-500'>* Informe a descrição do mercadoria</p>}

            </div>

            <div className="flex items-center justify-between ">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32
               px-4 rounded focus:outline-none focus:shadow-outline"

                type="submit">
                Cadastrar
              </button>
            </div>

          </form>
        </div>
      )}





      {mostrarFormularioEstoque && (
        <div className=" flex items-center -mt-4 ml-6 h-4/6">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleEstoque(handleSubmitEstoque)}>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Quantidade </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"

                value={dadosEstoque.quantidade}
                {...registerEstoque("quantidade")}
                id="quantidade" type="number" placeholder="Quantidade"
                onChange={(e) => setDadosEstoque({ ...dadosEstoque, quantidade: e.target.value })} />
              {errorsEstoque?.quantidade &&
                <p className='text-xs text-red-500'>* Quantidade é obrigatório</p>}

            </div>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Local </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"


                value={dadosEstoque.local}
                {...registerEstoque("local")}
                id="local" type="text" placeholder="Local"
                onChange={(e) => setDadosEstoque({ ...dadosEstoque, local: e.target.value })} />
              {errorsEstoque?.local &&
                <p className='text-xs text-red-500'>* Local é obrigatório</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" id="operacao">Selecione a Operação:</label>
              <select className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"

                value={dadosEstoque.operacao}
                {...registerEstoque("operacao")}
                name="operacao" id="operacao"
                onChange={(e) => setDadosEstoque({ ...dadosEstoque, operacao: e.target.value })}>

                <option value=""></option>
                <option value="entrada">Entrada</option>
                <option value="saida">Saida</option>
              </select>
              {errorsEstoque?.operacao &&
                <p className='text-xs text-red-500'>* Tipo de operação obrigatório</p>}
            </div>


            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" id="mercadoriaId">
                Selecione a Mercadoria:
              </label>
              <select className="border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"

                value={dadosEstoque.mercadoriaId}
                {...registerEstoque("mercadoriaId")}
                name="mercadoriaId" id="mercadoriaId"
                onChange={(e) => setDadosEstoque({ ...dadosEstoque, mercadoriaId: e.target.value })}>

                <option value=""></option>
                {mercadorias.map((mercadoria) => (
                  <option key={mercadoria.id} value={mercadoria.id}>
                    {mercadoria.nome}
                  </option>
                ))}

              </select>
              {errorsEstoque?.mercadoriaId &&
                <p className='text-xs text-red-500'>* Selecione a Mercadoria</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" > Data de Registro </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"


                value={dadosEstoque.dataRegistro}
                {...registerEstoque("dataRegistro")}
                id="dataRegistro" type="date" placeholder="Insira uma data"
                onChange={(e) => setDadosEstoque({ ...dadosEstoque, dataRegistro: e.target.value })} />
              {errorsEstoque?.dataRegistro &&
                <p className='text-xs text-red-500'>* Informe a Data</p>}
            </div>

            <div className="flex items-center justify-between ">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-32 px-4 
              rounded focus:outline-none focus:shadow-outline"

                type="submit">
                Cadastrar
              </button>
            </div>

          </form>
        </div>
      )}


    </div>


  );
}

export default Home;
