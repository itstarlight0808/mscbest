import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, TextField, Select, MenuItem, makeStyles } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userRegister, getUserLocale } from '../store/slices/userSlice';
import { addNewError } from "../store/slices/errorSlice"

const useStyles = makeStyles( theme => {
  return {
    formControl: {
      width: "90%",
      marginTop: "10px",
    }
  }
})

function Register(props) {
  const classes = useStyles();

  const { loading, userInfo, userLocale } = useSelector(state => state.user);

  console.log("=========user locale========")
  console.log(userLocale)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLocale());
  }, [])
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    // console.log("state registered",userInfo.registered)
    if(userInfo && userInfo.registered)
      props.history.push("/welcome");
    else if (userInfo) {
      console.log("redirect", redirect)
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const [accountType, setAccountType] = useState(0);
  const onChangeAccountType = e => {
    setAccountType(e.target.value);
  }
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== rePassword) {
      dispatch(addNewError({
        status: false,
        title: "SignUp",
        msg: "Password Error! Try again!" 
      }))

      return;
    }
    
    let params = { accountType, firstName, lastName, email, phoneNumber, password };
    dispatch(userRegister(params));
  }
  return (
    <div className="registeration-container" >
      <h1 className="title">Become a member and enjoy exclusive promotions.</h1>
      <div className="form-container mx-auto mt-5 px-3">
        <div className="w-50">
          <label className="d-block required" htmlFor="name">
            Account Type
          </label>
          <FormControl className={classes.formControl}>
            <Select
              value={accountType}
              onChange={onChangeAccountType}
              variant="outlined"
              inputProps={{
                id: 'account_type',
                name: 'account_type'
              }}
            >
              <MenuItem value={0}>Student</MenuItem>
              <MenuItem value={1}>Teacher</MenuItem>
              <MenuItem value={2}>School</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="d-flex mt-5">
          <div className="w-50">
            <label className="d-block required" htmlFor="first-name">First Name</label>
            <TextField
              type="text"
              id="first-name"
              variant="outlined"
              className={classes.formControl}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="w-50">
            <label className="d-block required" htmlFor="last-name">Last Name</label>
            <TextField
              type="text"
              id="last-name"
              variant="outlined"
              className={classes.formControl}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="d-flex mt-5">
          <div className="w-50">
            <label className="d-block required" htmlFor="email">Email</label>
            <TextField
              type="email"
              id="email"
              variant="outlined"
              className={classes.formControl}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-50 mt-2">
            <label className="d-block" htmlFor="mobile-number">Mobile Number</label>
            <PhoneInput
              id="mobile-number"
              international
              countryCallingCodeEditable={false}
              defaultCountry={userLocale?.location.country.code}
              value={phoneNumber}
              onChange={setPhoneNumber}
              className={classes.formControl}
            />
          </div>
        </div>
        <div className="d-flex mt-5">
          <div className="w-50">
            <label className="d-block required" htmlFor="password">Password</label>
            <TextField
              type="password"
              id="password"
              variant="outlined"
              className={classes.formControl}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setCheckPassword(password === rePassword)}
              required
            />
          </div>
          <div className="w-50">
            <label className="d-block required" htmlFor="rePassword">Re-Enter Password</label>
            <TextField 
              type="password"
              id="rePassword"
              variant="outlined"
              className={classes.formControl}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              onBlur={() => setCheckPassword(password === rePassword)}
              required
            />
            { checkPassword !== "" && 
              <FontAwesomeIcon
                icon={ checkPassword? "fas fa-check": "fas fa-xmark" }
                className={ checkPassword? "check-icon-success": "check-icon-failed" }
              />
            }
          </div>
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <button type="submit" className="btn btn-purple"  onClick={submitHandler}>
            {loading? <FontAwesomeIcon icon="fas fa-spinner" spin />: "Register"}
          </button>
        </div>
        <div className="mt-3">
            Already have an account? &nbsp;
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="text-center" >Sign In</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;