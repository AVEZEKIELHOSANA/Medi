import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState();

    let navigate = useNavigate;

    function onNameChange(e) {
        let name = e.target.value;
        console.log(setName(name));

    }
    function onEmailChange(e) {
        let email = e.target.value;
        setEmail(email);
    }

    function onPasswordChange(e) {
        let password = e.target.value;
        setPassWord(password);
    }
    function onConfirmChange(e) {
        let confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    }
    function handleSubmit(e) {


        e.preventDefault();

        let commonPassword = ['Password', 'Password123', name,];
        if (name.length == 0 || password.length == 0 || email.length == 0) {
            setError('Please fill the form');
            console.log('Sign up failed')
        }
        else if (name > 30) {
            console.log('Name is too long')
            setError('The name should not be more than 30 letters');
        }
        else if (password == commonPassword) {
            setError('password cannot be' + commonPassword);
            console.log('Failed signup');
        }
        else if (password != confirmPassword) {
            setError('password is incorrect');
            console.log('Signup failed')
        }
        else {
            navigate('/Home');
            setError('Succesful Sign up');
            console.log('Sign up succesful' + 'Going to home page');
        }

    }

    return (
        <div>
            <h1>
                WELCOME TO MEDIFINDER
            </h1>
            <div className='body'>

                <h2>SignUp</h2>
                <form
                    onSubmit={handleSubmit}>

                    <span>
                        <input

                            placeholder="Enter Your Name"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={onNameChange}
                        /></span><br />
                    <span>
                        <input
                            placeholder="Enter email"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChange}
                        /></span><br />

                    <span>
                        <input
                            placeholder="Enter password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={onPasswordChange}
                        /></span><br />
                    <span>
                        <input
                            placeholder="Enter password again"
                            type="password"
                            autoComplete="off"
                            value={confirmPassword}
                            onChange={onConfirmChange}
                        /></span><br /><br />

                    <button
                        type='submit'>
                        SIGN UP
                    </button> <br />

                    <p>{error}</p>

                </form>



            </div>
            <p id='accountexist'>Already have an account?
                <Link to="/Login">Login</Link>
            </p>
        </div>

    );
}

export default Signup;