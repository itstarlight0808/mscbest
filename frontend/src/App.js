import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
/** Common pages for both admin and user, visitor **/
import Layout from "./layout/index";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import About from "./pages/About";
import Classes from "./pages/Classes";
import Class from "./pages/Class";
import ContactUs from "./pages/ContactUs";

/** Admin pages **/
import DashboardAdmin from "./pages/admin/dashboard";


function App() {

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  const userRoute = (
    <>
      
    </>
  );
  const adminRoute = (
    <>
      <Route path="/dashboard" exact={true} component={DashboardAdmin} />
    </>
  );

  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact={true} component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <Route path="/class" component={Classes} exact={true} />
        <Route path="/class/:id" component={Class} />
        <Route path="/contact" component={ContactUs} />

        {userInfo?.isAdmin? adminRoute: userRoute}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
