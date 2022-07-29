import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
/** Common pages for both admin and user, visitor **/
import Layout from "./layout/index";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Class from "./pages/Class";
import Teachers from './pages/Teachers';
import ContactUs from "./pages/ContactUs";
import Ads from "./pages/Ads";

/** Student pages **/
import Dashboard from "./pages/dashboard/Dashboard";

/** Admin pages **/
import DashboardAdmin from "./pages/admin/dashboard";


function App() {

  const {userInfo} = useSelector(state => state.user);

  const studentRoute = (
    <>
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
  const teacherRoute = (
    <>
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
  const adminRoute = (
    <>
      <Route path="/dashboard" component={DashboardAdmin} />
    </>
  );

  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" component={Home} exact={true} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/class/:id" component={Class} />
        <Route path="/class" component={Classes} exact={true} />
        <Route path="/teacher" component={Teachers} exact={true} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/ads" component={Ads} />

        {userInfo?.isAdmin && adminRoute}
        {userInfo?.accountType === 0 && studentRoute}
        {userInfo?.accountType === 1 && teacherRoute}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
