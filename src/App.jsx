import './App.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastrar' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
