import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  // State to track user type
  const [userType, setUserType] = useState(''); // Default to "finder"
  const navigate = useNavigate

  useEffect(() => {
    const data = response.data
    // Store the authentication token using the custom utility function
    localStorage.getItem(data.token);
    console.log(data.user);

    const user = JSON.parse(localStorage.getItem('user'));

    if(data && user){

      setUserType(user.userType);

    }
    else{
      navigate('/Login')
    }

  }, [] );

  return (
    <div>
      <Navbar />

      
      {/* Hero Section */}
      <section className="hero1 max-w-100% max-h-96 border-gray-400">
        {userType === "finder" ? (
          <div>
            <h1 className="text-3xl font-bold">Welcome, Finder!</h1>
            <p>Find the best medical facilities near you.</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">Welcome, Medical Facility!</h1>
            <p>Manage your facility and connect with patients.</p>
          </div>
        )}
      </section>

      {/* Facilities Section */}
      <section className="viewfacility border-blue-200">
        {userType === "finder" ? (
          <div>
            <h2 className="text-2xl font-bold">Explore Facilities</h2>
            <p>Discover top-rated medical facilities.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">Manage Your Facility</h2>
            <p>Update your information and connect with patients.</p>
            <button className="bg-green-500 hover:bg-amber-100 hover:text-black">Update Information</button>
          </div>
        )}
      </section>

      {/* New Services Section */}
      <section className="max-h-96 border-gray-400">
        {userType === "finder" ? (
          <div>
            <h2 className="text-2xl font-bold">New Services for Finders</h2>
            <p>Check out the latest features for finding facilities.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">New Services for Facilities</h2>
            <p>Explore tools to enhance your facility management.</p>
          </div>
        )}
      </section>

      {/* Why Use This App Section */}
      <section className=" max-h-96 border border-gray-800">
        {userType === "finder" ? (
          <div>
            <h2 className="text-2xl font-bold">Why Use This App as a Finder?</h2>
            <div className="flex justify-around align-middle">
<img src="" alt="health care"/>
            <p>Find the best care quickly and easily.</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold">Why Use This App as a Facility?</h2>
            <p>Reach more patients and streamline operations.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;