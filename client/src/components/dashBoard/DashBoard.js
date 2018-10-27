import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getUserProfile, deleteAccount} from '../../actions/profileAction';
import Spinner from '../utils/spinner';
import ProfileAction from './ProfileAction';
import Experience from './Experience';
import Education from './Education';

class DashBoard extends Component{
    componentDidMount(){
        this.props.getUserProfile();
    }
    onDeleteClick = () =>{
        this.props.deleteAccount();
    }
    render(){
        const {name} = this.props.auth.user;
        const {isLoading, profile} = this.props.profile;
        let dashBoardContent;
        if (isLoading || profile === null){
            dashBoardContent = <Spinner />
        } else {
            if (Object.keys(profile).length > 0){
                dashBoardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcom <Link to={`/profile/${profile.handle}`}>{name}</Link>
                        </p>
                        <ProfileAction />
                        <Experience profile={profile}/>
                        <Education profile={profile} />
                        <div style={{marginButtom: '60px'}}>
                            <button onClick={this.onDeleteClick} className="btn btn-danger">
                                Delete My Account
                            </button>
                        </div>                       
                    </div>
                )
            }  else {
                dashBoardContent = (
                    <div>
                        <p className="lead text-muted"> Welcome {name}</p>
                        <p>You have not set profile, please add some info</p>
                        <Link to="/create_profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                )
            }        
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                                {dashBoardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
      auth: state.auth,
      profile: state.profile
    }
  }

export default connect(mapStateToProps, {getUserProfile, deleteAccount})(DashBoard);
			