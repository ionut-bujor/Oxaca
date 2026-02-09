import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './pages/Menu'
import Auth from './pages/Auth'

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
