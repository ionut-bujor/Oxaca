import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './pages/Menu'
import Auth from './pages/Auth'
import CustomerDasboard from './pages/CustomerDashboard'

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>
        <Route path='/dashboard' element={<CustomerDasboard />}/>
      </Routes>
    </Router>
    </>
  )

};

export default App;
