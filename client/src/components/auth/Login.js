import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import TextFieldGroup from '../utils/textFieldGroup';

class Login extends Component{
    state ={
            email: '',
            password: '',
            errors: {}
        } 
    componentDidMount(){
      if (this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isAuthenticated){
           this.props.history.push('/dashboard'); 
        }
        if (nextProps.error){
          this.setState({errors: nextProps.error})
        }
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const {email, password} = this.state;
        const userData ={
            email, password
        }
        this.props.loginUser(userData);
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render(){
        const {errors} = this.state
        return (
            <div className="login">
            <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate
               onSubmit={this.onSubmit}>
               <TextFieldGroup
                type="email"
                className={errors.email}
                placeholder="Email address"
                name = "email"
                value = {this.state.email}
                onChange = {this.onChange}
                errors = {errors.email}
                />
                 <TextFieldGroup
                  type="password"
                  className={errors.password}
                  placeholder="Password"
                  name = "password"
                  value = {this.state.password}
                  onChange = {this.onChange}
                  errors = {errors.password}
                />                
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
        )
    }
}
function mapStateToProps(state){
  return {
    auth: state.auth,
    error: state.error
  }
}
export default connect(mapStateToProps,{loginUser})(Login);
			