import React, {Component} from 'react';
import classNames from 'classnames';

class TextAreaFieldGroup extends Component{
    render(){
        const {className, placeholder, name, value, onChange, errors, info} = this.props;
        return (
            <div className="form-group">
                <textarea 
                className={classNames("form-control form-control-lg", 
                {"is-invalid": className})}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                />
                    {info && <small className="form-text text-muted">{info}</small>}
                    {errors ? 
                        <div className="invalid-feedback">{errors} </div>  
                        : null}
            </div>
        )
    }
}


export default TextAreaFieldGroup;
			