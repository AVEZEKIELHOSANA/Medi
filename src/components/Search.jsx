import React from "react";
import {Search} from 'lucide-react';
//import axios from 'axios';

function Searching(){
    function handleClick(){


        
    }
 /*const handleClick = async () =>
 {
    const query = document.getElementById('search').value;

    try{
        const response = await axios.get('http://location/api/medical-facilities/search',
            {
                params: {
                    query,
                },
            }
        );
        const searchResults = response.data.data;
        console.log(searchResults);
    }
 catch(error){
    console.error(error);
 }
 }*/

    return(
        <div className="Search-fxn">
<input id="Search" type="text" placeholder="Search for health service"/>
    <button
    onClick={handleClick}>
<Search/></button>
        </div>
    );
}
export default Searching;