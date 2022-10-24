import './App.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Home from './components/home/Home'
import Header from './components/header/Header'
import MyAccount from './components/myaccount/MyAccount'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadastrar' element={<SignUp />} />
            <Route path='/minhaconta' element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
