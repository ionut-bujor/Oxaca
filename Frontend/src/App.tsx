import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from "./pages/Checkout.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import Menu from './pages/Menu'
import Auth from './pages/Auth'

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
    </>
  )

};

export default App;
