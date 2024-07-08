import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavigationBar from './components/navbar/NavigationBar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Contacts from './components/contacts/Contacts';
import CartDetails from "./components/cartDetails/CartDetails";
import Login from "./components/login/Login";
import Item from "./components/item/Item";
import SignUp from "./components/signUp/SignUp";
import ForgotPassword from "./components/passwordReset/forgotPassword/ForgotPassword";
import PasswordReset from "./components/passwordReset/passwordReset/PasswordReset";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/cartDetails" element={<CartDetails/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/getItemsByID/:id" element={<Item/>} />
          <Route path="/forgotPassword/:id/:token" element={<ForgotPassword/>} />
         <Route path="/resetPassword" element={<PasswordReset/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
