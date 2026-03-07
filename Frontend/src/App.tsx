import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import Auth from './pages/Auth'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import StripeCancel from "./pages/StripeCancel";
import StripeSuccess from "./pages/StripeSuccess";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/success" element={<StripeSuccess />} />
        <Route path="/cancel" element={<StripeCancel />} />

      </Routes>
    </Router>
  )

};

export default App;
