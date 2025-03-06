//import { useState } from 'react'
import React from 'react';
import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';

import HomePage from './components/Home.jsx';
import Personel from './components/personel.jsx';
import MedicalFacilitiesList from './components/hospital.jsx';
import MedicalUnits from './components/pharmacyList.jsx';
import Emergency from './components/emergency.jsx';
import MedicalFacilitySearch from './components/Search.jsx';


function App() {
  
  return (
    <div>
    
        <BrowserRouter>
        
        <Routes>
        
            <Route path='/' element = {<HomePage/>}/>
            <Route path ="/Signup" element = {<Signup/>}/>
            <Route path="/Login" element={<Login/>}/> 
            <Route path='/Home' element={<HomePage/>}/>
            <Route path='/personel' element={<Personel/>}/>
            <Route path='/hospital' element={<MedicalFacilitiesList/>}/>
            <Route path='/pharmacyList' element={<MedicalUnits/>}/>
            <Route path='/search' element={<MedicalFacilitySearch/>}/>
            <Route path='/emergency' element={<Emergency/>}/>
            
        </Routes>
    </BrowserRouter>
    

      
    

    </div>
  );
}

export default App
