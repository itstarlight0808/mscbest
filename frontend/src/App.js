import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import Layout from "./layout/index";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';

import DashboardAdmin from "./pages/admin/dashboard";


function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const userRoute = (
    <>
      <Route path="/" exact={true} component={Home} />
    </>
  );
  const adminRoute = (
    <>
      <Route path="/" exact={true} component={DashboardAdmin} />
    </>
  );

  return (
    <BrowserRouter>
      <Layout>
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />

        {userInfo?.isAdmin? adminRoute: userRoute}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
