import React, { useState } from 'react';
import scologo from '../../../assets/scologo.svg';
import './Signup.css';
import {Link} from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [values, setValues] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: '',
    showPassword: false,
    agreedToTerms: false,
  });

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleAgreedToTerms = (event) => {
    setValues({ ...values, agreedToTerms: event.target.checked });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    console.log(captchaValue);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  }

  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
      <img className='mb-4' src={scologo} alt="scologo" />
      <h2>Sign Up</h2>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="userName"
        label="User Name"
        name="userName"
        autoComplete="uname"
        autoFocus
        value={values.userName}
        onChange={handleChange('userName')}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="fullName"
        label="Full Name"
        name="fullName"
        autoComplete="fname"
        value={values.lastName}
        onChange={handleChange('fullName')}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
      />
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
        <FormHelperText>Must be at least 8 characters long</FormHelperText>
      </FormControl>
      <FormGroup>
      <FormControlLabel
          control={
            <Checkbox
              checked={values.agreedToTerms}
              onChange={handleAgreedToTerms}
              name="agreedToTerms"
              color="primary"
            />
          }
          label="I agree to the Terms of Service and Privacy Policy."
        />
      </FormGroup>
      <ReCAPTCHA
    sitekey="6LfSC_YlAAAAAEVINWZepBwmxF51K5oDWihracFD"
  
  />
      <Button
      className='mb-5'
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!values.agreedToTerms}
      >
           Sign Up
      </Button>
      <p>Already Have an Account ? <Link to="/">Login</Link> </p>
    </form>
    </div>
  );
};

export default Signup;