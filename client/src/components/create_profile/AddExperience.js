import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {createExperience} from '../../actions/profileAction';
import TextFieldGroup from '../utils/textFieldGroup';
import TextAreaFieldGroup from '../utils/textAreaGroup';


class AddExperience extends Component{
    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.error){
            this.setState({
                errors: nextProps.error
            })
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const addExp = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.createExperience(addExp, this.props.history);
    }
    onChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    onCurrent = (e) =>{
        this.setState({
            current: !this.state.current,
            disabled: !this.state.disabled
        })
    }
    render(){
        const {errors} = this.state;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Experience</h1>
                            <p className="lead text-center">
                                Add any job or description that you have had in the past or current
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                        placeholder="* Company"
                                        type ="text"
                                        name="company"
                                        value={this.state.company}
                                        onChange={this.onChange}
                                        className ={errors.company}
                                        errors={errors.company}
                                    />
                                <TextFieldGroup
                                    placeholder="* Job Title"
                                    name="title"
                                    type ="text"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    className ={errors.title}
                                    errors={errors.title}
                                />
                                 <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    type ="text"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    className ={errors.location}
                                    errors={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    placeholder="From"
                                    name="from"
                                    type ="date"
                                    value={this.state.from}
                                    onChange={this.onChange}
                                    className ={errors.from}
                                    errors={errors.from}                                
                                />
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    placeholder="To"
                                    name="to"
                                    type ="date"
                                    value={this.state.to}
                                    onChange={this.onChange}
                                    className ={errors.to}
                                    errors={errors.to}
                                    disabled = {this.state.disabled ? 'disabled': ''}
                                />
                                <div className="form-check mb-4">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"                                       
                                        name="current"
                                        value={this.state.current}
                                        onChange={this.onCurrent}
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>	
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Description"
                                    name="description"
                                    type ="text"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    className ={errors.description}
                                    errors={errors.description}
                                    info="Tell us about the the position"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />                                
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
      profile: state.profile,
      error: state.error
    }
  }

export default connect(mapStateToProps, {createExperience})(withRouter(AddExperience));			