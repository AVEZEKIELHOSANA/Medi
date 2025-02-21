import React from "react";
import {Search, Sliders} from 'lucide-react';

import './Home.css';

function Home(){

    return(

        <div className="Home">
          <div className="Home-container">
          {/*Search */}
          <div className="Search">
            <Search className="search-icon" siwe={20}/>
            <input type="text" placeholder="search for pharmacie or medical facility"/>
            <Sliders className="filter-icon" size={20}/>
          </div>
          <div className="greetings">
           <h1 className="hello">HELLO!</h1>
           <p className="textlg">How are you doing today?</p>
           </div>
           {/*Banner section */}
           <div className="message">
            <p  className="one-stop">MediFinder is your one-stop 
            solution to find pharmacies near you at anytime and anywhere.</p>
            <img src="" alt="pharmacy"/>
           </div>
           
           <div className="container">
            <p className="pharmacie">Pharmacies</p>
            <p className="pharmacie">Prescriptions</p>
            <p className="pharmacie">Hospitals</p>

           </div>
          </div>
        </div>
    );
}
export default Home;