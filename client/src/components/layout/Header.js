import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOutUser} from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileAction';
class Header extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser();
  }
  authLink = () =>{
    const {user} = this.props.auth;
    return (
      <ul className = "navbar-nav ml-auto">
        <li className="nav-item">
          <Link 
            to ="/feed"
            className="nav-link"
          >Post Feed          
          </Link>
        </li>
	      <li className="nav-item">
          <Link 
            to ="/dashboard"
            className="nav-link"
          >DashBoard          
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to =""
            onClick = {this.onLogoutClick}
            className="nav-link"
          >
            <img
              className = "rounded-circle"
              src = {user.avatar}
              alt = {user.name}
              style ={{width: '25px', marginRight: '5px'}}
              title = "You must have a Gravatar connected to your email to display an image"                
            />{' '}
            logout
          </Link>
      </li>
    </ul>
    )
  } 
  guestLink = () =>{
    return (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
    )
  } 
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/landing" className="navbar-brand">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>

            {isAuthenticated ?  this.authLink() : this.guestLink() }
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logOutUser, clearCurrentProfile})(Header);