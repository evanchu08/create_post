import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllProfiles} from '../../actions/profileAction';
import Spinner from '../utils/spinner';
import ProfileItem from './ProfileItem';

class Profiles extends Component{
    componentDidMount(){
        this.props.getAllProfiles();
    }
    render(){
        const {profiles, isLoading} = this.props.profile;
        let profileItems;
        if (isLoading || profiles === null){
            profileItems = <Spinner />
        } else {       
            if (profiles.length > 0){
                profileItems = profiles.map(profile =>(
                    <ProfileItem key={profile._id} profile={profile} /> 
                ))
            } else {
                profileItems = <h1>No Profile Found</h1>
            }
        }
        return (
            <div className = "profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md_12">
                            <h1 className="display-4 text-center">Developer Profiles"></h1>
                                <p className="lead text-center">
                                    Browse and connect with developers
                                </p>					
                                {profileItems}
                        </div>
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
export default connect(mapStateToProps, {getAllProfiles})(Profiles);
			