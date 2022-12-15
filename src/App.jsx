import "./App.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import MyAccount from "./pages/myaccount/MyAccount";
import { UserStorage } from "./context/GlobalContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<SignUp />} />
            <Route path="/minhaconta/:id" element={<MyAccount />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
