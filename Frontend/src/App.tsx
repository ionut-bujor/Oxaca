import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from "./pages/Checkout.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import Menu from './pages/Menu'
import Auth from './pages/Auth'
import CustomerDashboard from './pages/CustomerDashboard'

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>

        <Route path="/checkout" element={<Checkout />} />
<Route path="/order-confirmation" element={<OrderConfirmation />} />
<Route path="/dashboard" element={<CustomerDashboard />} />

      </Routes>
    </Router>
    </>
  )

};

export default App;
