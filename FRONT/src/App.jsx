import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { LojaProvider } from './context/LojaContext';
import CarrinhoPage from './pages/CarrinhoPage';
import CheckoutPage from './pages/CheckoutPage';
import ProdutosPage from './pages/ProdutosPage';

function App() {
  return (
    <LojaProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/produtos" replace />} />
          <Route path="produtos" element={<ProdutosPage />} />
          <Route path="carrinho" element={<CarrinhoPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/produtos" replace />} />
        </Route>
      </Routes>
    </LojaProvider>
  );
}

export default App;
