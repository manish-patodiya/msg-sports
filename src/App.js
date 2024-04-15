
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Frontend from './components/Frontend'
import Admin from './components/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Frontend />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
