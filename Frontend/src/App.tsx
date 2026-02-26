import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './pages/menu'
import Auth from './pages/auth'
import CustomerDashboard from './pages/CustomerDashboard'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />
        <Route path='/dashboard' element={<CustomerDashboard />} />
      </Routes>
    </Router>
  )

};

export default App;
