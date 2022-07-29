import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, FormControlLabel, Checkbox, OutlinedInput, InputAdornment } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getUserLocale, userSignin } from "../store/slices/userSlice";

function Signin(props) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { loading, userInfo } = useSelector(state => state.user);
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
    dispatch(getUserLocale());
  }, [])
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const updateRemember = (e) => {
    setRemember(e.target.checked);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignin(email, password));

  }
  return (
    <div className="signin-container">
      <form onSubmit={submitHandler} >
        <h1 className="title">Account Login</h1>
        <span className="description">
          If you are already a member you can login with your email address and password.
        </span>
        <div className="form-container">
          <div className="form-control-1">
            <label htmlFor="email" className="d-block">Email</label>
            <TextField
              fullWidth
              type="email" 
              id="email" 
              className="mt-2" 
              variant="outlined" 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-control-1 mt-3">
            <label htmlFor="password" className="d-block">Password</label>
            <OutlinedInput
              fullWidth
              id="password"
              variant="outlined" 
              type={showPassword ? 'text' : 'password'}
              className="mt-2" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              endAdornment={
                <InputAdornment position="end">
                  <span onClick={(e) => setShowPassword(!showPassword)}>
                    <FontAwesomeIcon icon={showPassword? "far fa-eye": "far fa-eye-slash"} />
                  </span>
                </InputAdornment>
              }
            />
          </div>
          <div className="ctrl-container mt-3">
            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={updateRemember}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <button type="submit" className="btn btn-purple w-100">
              { loading? <FontAwesomeIcon icon="fas fa-spinner" spin />: "Log In" }
            </button>
          </div>
          <div className="mt-3 signin-footer">
            <span>Don't have an account?</span>
            <Link to="/register" className="ms-3 text-decoration-none" >Sign Up Here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Signin;