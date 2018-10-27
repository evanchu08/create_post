import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

// component
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import DashBoard from './components/dashBoard/DashBoard';
import PrivateRoute from './components/utils/privateRoute';
import CreateProfile from './components/create_profile/CreateProfile';
import EditProfile from './components/create_profile/EditProfile';
import AddExperience from './components/create_profile/AddExperience';
import AddEducation from './components/create_profile/AddEducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/Profile';
import PageNotFound from './components/utils/pageNotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import store from './store';
import setAuthToken from './components/utils/setAuthToken';
import {setCurrentUser, logOutUser} from './actions/authAction';
import {clearCurrentProfile} from './actions/profileAction';
import './App.css';

if (localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime){
    // log out user
    store.dispatch(logOutUser());
    //TODO: clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
  store.dispatch(setCurrentUser(decoded));
} 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>      
          <div className="App">
            <Header />                   
            <Route exact path = "/login" component={Login} />
            <Route exact path = "/profiles" component={Profiles} />
            <Route exact path = "/profile/:handle" component={Profile} />
            <Route exact path = "/register" component={Register} />
            <Route exact path = "/" component={Landing} />
            <Switch>
              <PrivateRoute exact path = "/dashboard" component={DashBoard} />
              <PrivateRoute exact path = "/create_profile" component={CreateProfile} />
              <PrivateRoute exact path ="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path ="/add-experience" component={AddExperience} />
              <PrivateRoute exact path ="/add-education" component={AddEducation} />
              <PrivateRoute exact path ="/feed" component={Posts} />
              <PrivateRoute exact path ="/post/:id" component={Post} />
            </Switch>     
            <Footer />
            <Route exact path="/not-found" component={PageNotFound} />      
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
