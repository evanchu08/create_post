import React from 'react';
import classNames from 'classnames';

const SelectListGroup = (props) => {   
    const { className, placeholder, name, value, onChange, errors, info, options} = props   
    const selectOptions = options.map(option =>(
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))
    return (
        <div className="form-group">
            <select
                className={classNames("form-control form-control-lg", 
                {"is-invalid": className})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            > {selectOptions}
            </select>
                {info && <small className="form-text text-muted">{info}</small>}
            {errors ? <div className="invalid-feedback">{errors}</div> : null}
      </div>
    )
}



export default SelectListGroup