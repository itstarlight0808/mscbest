import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "@material-ui/core";

import { signin } from '../store/actions/userActions';

function Signin(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));

  }
  return (
    <form className="w-50" onSubmit={submitHandler} >
      <h2>Account Login</h2>
      <span>
        If you are already a member you can login with your email address and password.
      </span>
      <div className="form-container">
        <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <TextField type="email" id="email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <TextField type="password" id="password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="btn btn-purple">Log In</button>
        </div>
        <div>
         Don't have an account?&nbsp;
          <Link to="/register" className="text-center" >Sign Up Here</Link>
        </div>
      </div>
    </form>
  );
}
export default Signin;