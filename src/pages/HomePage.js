import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
 
// Pages to keep
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";
import DashboardOverview from "./dashboard/DashboardOverview";
import DashboardPrediction from "./dashboard/DashboardPrediction";
import feedbackDashboard from "./dashboard/feedbackDashboard"
import UserInput from './examples/userInput';
 
// Layout
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
 
const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
 
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Component {...props} />
        </>
      )}
    />
  );
};
 
const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
 
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);
 
  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true;
  };
 
  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
 
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  };
 
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />
          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
          </main>
        </>
      )}
    />
  );
};
 
export default () => (
  <Switch>
    {/* Default route redirects to Sign In */}
    <Redirect exact from="/" to={Routes.Signin.path} />
 
    {/* Auth pages */}
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />
 
    {/* Main app pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.DashboardPrediction.path} component={DashboardPrediction} />
    <RouteWithSidebar exact path={Routes.FeedbackDashboard.path} component={feedbackDashboard} />
    <RouteWithSidebar exact path={Routes.UserInput.path} component={UserInput} />
 
    {/* Catch-all */}
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);