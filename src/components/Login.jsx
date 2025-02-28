// Importing necessary libraries and components
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { storeAuthToken } from '../utils/auth.jsx';
import axios from 'axios'; 

// Define the Login component
function Login() {
  // Initializing state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    
    e.preventDefault();

    
    setLoading(true);

    try {
      // Make a POST request to the login API endpoint with the email and password
      const response = await axios.post('http://rrn24.techchantier.site/Medi-finder/public/api/auth/login', {
        email,
        password,
      });

      // Check if the response contains an authentication token
      if (response.data.token) {
        // Store the authentication token using the custom utility function
        storeAuthToken(response.data.token);

        // Navigate to the protected dashboard route
        navigate('/Home');
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      if (error.response) {
        // Set the error message to the error response data
        setErrorMessage(error.response.data.message || 'Login failed.');
      } else {
        // Set a generic error message if no error response data is available
        setErrorMessage('An error occurred.');
      }
    } finally {
      // Set the loading status to false after the login process is complete
      setLoading(false);
    }
  };

  // Render the login form component
  return (
    <div>
      <h2>Login</h2>

      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}


export default Login;
