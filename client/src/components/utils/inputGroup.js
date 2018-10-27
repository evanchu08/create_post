import React from 'react';
import classNames from 'classnames';
const InputGroup = (props) => {   
    const { className, placeholder, name, value, onChange, errors, type, icon} = props   
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input 
                type = {type}
                className={classNames("form-control form-control-lg", 
                {"is-invalid": className})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {errors ? <div className="invalid-feedback">{errors}</div> : null}
        </div>
    )
}

export default InputGroup