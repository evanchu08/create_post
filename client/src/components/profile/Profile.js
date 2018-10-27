import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ProfileAbout from './ProfileAbout';
import ProfileHeader from './ProfileHeader';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import {getProfileByHandle} from '../../actions/profileAction';
import Spinner from '../utils/spinner';

class Profile extends Component{
    componentDidMount(){
        if (this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    render(){
        const {profile, isLoading} = this.props.profile;
        let profileContent;
        if (isLoading || profile === null) {
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
                            </Link>
                        </div>
                        <div className="col-md-6" />
                    </div>	
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile = {profile}/>
                    <ProfileCreds  education= {profile.education} experience = {profile.experience}/>
                    {profile.githubUsername ? 
                        <ProfileGithub username={profile.githubUsername} />
                     : null}                    
                </div>
            )
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">{profileContent}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        profile: state.profile
    }
}
export default connect(mapStateToProps, {getProfileByHandle})(Profile);
			