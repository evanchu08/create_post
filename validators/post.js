const validator = require('validator');
const isEmpty = require('./is-empty');

 const validatePost = (data) =>{
    let errors = {};
    data.text = isEmpty(data.text) ? '' : data.text;    
   
    if (validator.isEmpty(data.text)){
        errors.text = 'Text is required'
    }
    
    if (!validator.isLength(data.text, {min: 5, max: 10000})){
        errors.text = 'Text must be between 5 and 10000 characters'
    }   
        
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validatePost