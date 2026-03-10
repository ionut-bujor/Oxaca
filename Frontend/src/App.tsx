import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './pages/Menu'
import Auth from './pages/Auth'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import WaiterDashboard from './pages/WaiterDashboard'
import { useAuth } from './context/AuthContext'

const App: React.FC = () => {
  const { isWaiter } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>
        <Route path='/register' element={<Register />}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/dashboard" element={isWaiter() ? <WaiterDashboard /> : <CustomerDashboard />} />

      </Routes>
    </Router>
  )

};

export default App;
