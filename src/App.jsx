//import { useState } from 'react'
import React from 'react';
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
//import Routes from './components/Routes';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
//import navbar from './components/navbar.jsx';

function App() {
  
  return (
    <div>
    
        <BrowserRouter>
        
        <Routes>
        
            <Route path='/' element = {<Signup/>}/>
            <Route path ="/Signup" element = {<Signup/>}/>
            <Route path="/Login" element={<Login/>}/> 
            <Route path="/Home" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
    

      
    

    </div>
  );
}

export default App
