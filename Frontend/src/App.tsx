import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './pages/menu'
import Auth from './pages/auth'

const App: React.FC = () => {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}/>
        <Route path='/portal' element={<Auth />}/>
      </Routes>
    </Router>
    </>
  )

};

export default App;
