import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import InputGroup from '../utils/inputGroup';
import SelectListGroup from '../utils/selectListGroup';
import TextAreaGroup from '../utils/textAreaGroup';
import TextFieldGroup from '../utils/textFieldGroup';
import {createProfile} from '../../actions/profileAction';

class CreateProfile extends Component{
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubUsername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.error){
            this.setState({errors: nextProps.error})
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const profileData ={
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUsername: this.state.githubUsername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history)
    }
    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    render(){
        const errors = this.state.errors;
        
       //select optons for status
       const options = [
            {label: '* Select Professional Status', value: 0},
            {label: 'Developer', value: 'Developer'},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Other', value: 'Other'}
        ]
        let socialInput;
        if (this.state.displaySocialInputs){
            socialInput = (
                <div>            
                    <InputGroup 
                        placeholder = "Twitter Profile URL"
                        name = "twitter"
                        icon = "fab fa-twitter"
                        value={this.state.value}
                        onChange={this.onChange}
                        errors = {errors.twitter}
                        className= {errors.twitter}
                        type = "text"
                    />
                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        errors={errors.facebook}
                        className= {errors.facebook}
                        type = "text"
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        errors={errors.linkedin}
                        className= {errors.linkedin}
                        type = "text"
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        errors={errors.youtube}
                        className= {errors.youtube}
                        type = "text"
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        errors={errors.instagram}
                        className= {errors.youtube}
                        type = "text"
                    />
                </div>
            )
        }            
    
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    name ="handle"
                                    type ="text"
                                    placeholder="* Profile Handle"
                                    onChange = {this.onChange}
                                    errors = {errors.handle}
                                    className ={errors.handle}
                                    value = {this.state.handle} 
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup 
                                    placeholder = "Status"
                                    name = "status"
                                    onChange = {this.onChange}
                                    errors = {errors.status}
                                    options = {options}
                                    className ={errors.status}
                                    info = "Give us an idea where are you at your career"
                                    value = {this.state.status}
                                />
                                 <TextFieldGroup
                                    placeholder="Company"
                                    type ="text"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    className ={errors.company}
                                    errors={errors.company}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    type ="text"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    className ={errors.website}
                                    errors={errors.website}
                                    info="Could be your own website or a company one"
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
                                <TextFieldGroup
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    type ="text"
                                    onChange={this.onChange}
                                    className ={errors.skills}
                                    errors={errors.skills}
                                    info="Please use comma separated values (eg.
                                        HTML,CSS,JavaScript,PHP"
                                />
                                <TextFieldGroup
                                    placeholder="Github Username"
                                    name="githubUsername"
                                    type ="text"
                                    className ={errors.githubUsername}
                                    value={this.state.githubUsername}
                                    onChange={this.onChange}
                                    errors={errors.githubUsername}
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaGroup
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    type ="text"
                                    className ={errors.bio}
                                    errors={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div className = "mb-3">
                                    <button type="button"
                                        onClick = {() =>{
                                        this.setState(() => ({
                                            displaySocialInputs: !this.state.displaySocialInputs
                                        }))
                                        }} className="btn btn-light"
                                    >
                                        Add Social Network Links
                                    </button>
                                    <span className = "text-muted">Optional</span>
                                </div>
                                {socialInput}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
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

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
			
