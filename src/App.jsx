import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import MyAccount from "./components/myaccount/MyAccount";
import { UserStorage } from "./context/GlobalContext";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<SignUp />} />
            <Route path="/minhaconta" element={<MyAccount />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
