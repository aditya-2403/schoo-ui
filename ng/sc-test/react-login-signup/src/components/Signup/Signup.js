import React, { useState } from 'react';
import './Signup.css'
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

const Signup = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
    agreedToTerms: false,
  });

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
  };

  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="fname"
        autoFocus
        value={values.firstName}
        onChange={handleChange('firstName')}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        value={values.lastName}
        onChange={handleChange('lastName')}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!values.agreedToTerms}
      >
        Sign Up
      </Button>
    </form>
    </div>
  );
};

export default Signup;