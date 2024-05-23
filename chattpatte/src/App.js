import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from './components/navbar/NavigationBar';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Contacts from './components/contacts/Contacts';
import CartDetails from "./components/cartDetails/CartDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/cartDetails" element={<CartDetails/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
