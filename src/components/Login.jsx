import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

  }

  return (
    <div>
      <h1>Hello!
        MediFinder is glad to see you again.</h1>
      <div className='body'>
        <p>Login to your account</p>
        <form onSubmit={handleSubmit}>    <div>
          <span>
            <input id='nlogin'
              value={name}
              type='text' placeholder='Enter your user name or email' />
          </span>
          <span>
            <input
              value={password}
              type='Password' id='passwd' placeholder='Enter password' />
          </span>
          <button type='submit'>Log in</button>
          <p>{error}</p>
        </div>

        </form>
      </div>
      <p id='sign'>Do not have an account? <Link to="/Signup">Create account</Link></p>
      <div>
        <p id='or'>OR</p>
        <button id='goglog'>Login With Google</button>

      </div>
    </div>
  );

}
export default Login