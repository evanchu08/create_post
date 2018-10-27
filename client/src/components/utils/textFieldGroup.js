import React from 'react';
import classNames from 'classnames';

const TextFieldGroup = (props) => {
    const {type, className, placeholder, name, value, onChange, errors, info, disabled} = props   
    return (
        <div className="form-group">
        <input
          type={type}
          className={classNames("form-control form-control-lg", 
          {"is-invalid": className})}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
            {info && <small className="form-text text-muted">{info}</small>}
          {errors ? <div className="invalid-feedback">{errors}</div> : null}
      </div>
    )  
}

export default TextFieldGroup