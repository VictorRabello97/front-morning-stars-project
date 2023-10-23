import Home from "./pages/Home";
import Mercadoria from "./pages/Mercadoria";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstoqueEntrada from "./pages/EstoqueEntrada";
import EstoqueSaida from "./pages/EstoqueSaida";
import GraficoEstoque from "./pages/GraficoEstoque";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mercadorias" element={<Mercadoria />} />
        <Route path="/estoqueEntrada" element={<EstoqueEntrada />} />
        <Route path="/estoqueSaida" element={<EstoqueSaida />} />
        <Route path="/grafico" element={<GraficoEstoque />} />
      </Routes>
    </BrowserRouter>

  )

}

export default App;
