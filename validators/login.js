const validator = require('validator');
const isEmpty = require('./is-empty');

 const validateLogin = (data) =>{
    let errors = {};
    data.password = isEmpty(data.password) ? '' : data.password;
    data.email = isEmpty(data.email) ? '' : data.email;

   
    if (validator.isEmpty(data.email)){
        errors.email = 'Email is required'
    }
    
    if (!validator.isLength(data.email, {min: 3, max: 40})){
        errors.email = 'Email must be between 3 and 40 characters'
    }
    
    
    if (!validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }

    if (validator.isEmpty(data.password)){
        errors.password = 'Password is required'
    }
    if (!validator.isLength(data.password, {min: 5, max: 30})){
        errors.password = 'Password must be between 5 and 30 characters'
    }
        
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLogin