import React from 'react'
import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './Login.css'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import scologo from '../../../assets/scologo.svg'
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit login form logic here
  };
  return (
   <>
   <div className="form">

     <form onSubmit={handleSubmit}>
        <img src={scologo} alt="" srcset="" />
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        />

      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        />

      <Button
      className='mb-4'
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        >
        Log in
      </Button>
      <p>Dont have an Account ? <Link to="/signup">Sign Up Now!</Link> </p>
    </form>
    </div>
   </>
  )
}

export default Login
