import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser} from '../../actions/authAction';
import TextFieldGroup from '../utils/textFieldGroup';

class Register extends Component{
    state ={
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        } 
    componentDidMount(){
      if (this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.error){
          this.setState({errors: nextProps.error})
        }
    }    
    onSubmit = (e) =>{
        e.preventDefault();
        const {name, email, password, password2} = this.state;
        const newUser ={
            name, email, password, password2
        }

        this.props.registerUser(newUser, this.props.history)

        /*
        axios.post('/api/user/register', newUser)
          .then(response => console.log(response.data))
          .catch(err => this.setState({errors: err.response.data}))
        */
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render(){  
        const {errors} = this.state;
        return (            
            <div className="register">
            <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>          
                <TextFieldGroup
                  type="text"
                  className={errors.name}
                  placeholder="name"
                  name = "name"
                  value = {this.state.name}
                  onChange = {this.onChange}
                  errors = {errors.name}
                />
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
                <TextFieldGroup
                  type="password"
                  className={errors.password2}
                  placeholder="Confirm Password"
                  name = "password2"
                  value = {this.state.password2}
                  onChange = {this.onChange}
                  errors = {errors.password2}
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
export default connect(mapStateToProps, {registerUser})(withRouter(Register));
			
			