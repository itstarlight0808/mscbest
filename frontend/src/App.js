import React, {useState, useEffect, createContext} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { afterSignin } from './store/slices/userSlice';
/** Common pages for both admin and user, visitor **/
import Layout from "./layout/index";
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Class from "./pages/Class";
import ClassDetail from "./pages/ClassDetail";
import Teachers from './pages/Teachers';
import ContactUs from "./pages/ContactUs";
import Ads from "./pages/Ads";
import NotFound from "./NotFound";

/*** Routes after Sign In ***/
/** Student & Teacher pages **/
import Dashboard from "./pages/dashboard/Dashboard";
import Notification from "./pages/Notification";

/** Admin pages **/
import DashboardAdmin from "./pages/admin/dashboard";

export const RootContext = createContext();
function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);
  const [context, setContext] = useState({});

  useEffect(() => {    // called in the case of reload when already signed in.
    if(userInfo)
      dispatch(afterSignin(userInfo.accountType, userInfo.isAdmin));
  }, [])

  return (
    <RootContext.Provider value={{ context, setContext }}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/signin" component={Signin} />
            <Route path="/register" component={Register} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/about" component={About} />
            <Route path="/class/:id/detail" component={ClassDetail} />
            <Route path="/class/:id" component={Class} exact={true}/>
            <Route path="/class" component={Classes} exact={true} />
            <Route path="/teacher" component={Teachers} exact={true} />
            <Route path="/contact" component={ContactUs} />
            <Route path="/ads" component={Ads} />

            {/* {userInfo?.isAdmin === 1 && adminRoute} */}
            {!userInfo?.isAdmin && userInfo && 
              <Route path="/dashboard" component={Dashboard} />
            }
            {!userInfo?.isAdmin && userInfo && 
              <Route path="/notifications" component={Notification} />
            }
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Layout>
      </BrowserRouter>
    </RootContext.Provider>
  );
}

export default App;